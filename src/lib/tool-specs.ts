/**
 * Declarative tools, shown by components/calc/SpecTool.tsx. One engine for tools, minis and page text.
 *   st  : state + year → every public holiday, with the weekday and what kind of day it is
 *   hd  : one holiday + year → its date in each state and territory
 *   ea  : year → Easter dates and which states keep Saturday and Sunday
 *   lw  : state + year → long weekends
 *   lv  : state + year + leave days → best leave plan (days off in total, over one or more breaks)
 *   sc  : state + year → school terms and breaks
 *   loc : district, area or council → local holiday (QLD show days, NSW local, Tasmania regional)
 */
import type { ToolSpec, ToolOut, Input, V, OutTable } from './tool-types';
import { resolve } from './tool-types';
import { formatNumber, formatDecimal } from './format';
import type { Lang } from './format';
import { STATES, STATE_NAME, STATE_SHORT, YEARS, HOL_NAME, holidays, basis, sourceOf, daysOff, weekdayCount, dateOf, type State, type Hol } from './engine/holidays';
import { easterSunday, gaussSteps, addDays, wdOf } from './engine/days';
import { longWeekends, plan, workingDays, weekdaysInYear } from './engine/leave';
import { terms, breaks, weeksOf, QLD_SHOW_2027, NSW_LOCAL_2027, tasRegional } from './engine/terms';
import { dWeek, dShort, span, days, dLong } from './dates';

export type Args = Record<string, number | string>;
const N = (x: number) => formatNumber(x, 0);
const stateIn = (def: string): Input => ({ kind: 'select', id: 'state', label: 'State or territory', def, options: STATES.map((s) => ({ value: s, label: STATE_NAME[s] })) });
const yearIn = (def: number, years = YEARS): Input => ({ kind: 'choice', id: 'year', label: 'Year', def: String(def), options: years.map((y) => ({ value: String(y), label: String(y) })) });
const st = (v: V) => String(v.state) as State;
const yr = (v: V) => Number(v.year);
const KIND: Record<string, string> = { sub: 'Additional day', obs: 'Moved to this day', part: 'Part day', area: 'Regional only', bank: 'Banks only', tbc: 'To be confirmed' };
export const kindOf = (h: Hol) => (h.flag ? KIND[h.flag] : 'Full day');
/** Plain words for how a state-year is known. */
export function basisNote(s: State, y: number): string {
  const b = basis(s, y);
  if (b === 'act') return `${STATE_SHORT[s]} ${y}: worked out from the holiday Act; days a minister declares by notice each year are not included.`;
  if (b === 'list') return `${STATE_SHORT[s]} ${y}: dates as the state government publishes them.`;
  return `${STATE_SHORT[s]} has not published its ${y} list yet.`;
}
const notYet = (s: State, y: number): ToolOut => {
  const known = YEARS.filter((x) => basis(s, x));
  return { label: `Public holidays ${y}, ${STATE_NAME[s]}`, value: 'Not yet published', sub: `The ${STATE_SHORT[s]} government has not published ${y} dates. We show none rather than guess.`, rows: known.map((x) => [`${x} list`, `${N(daysOff(s, x).length)} public holidays`] as [string, string]) };
};

/* ---------------------------------------------------------------- st */
function stSpec(_l: Lang, arg?: Args): ToolSpec {
  return {
    inputs: [stateIn(String(arg?.state ?? 'nsw')), yearIn(Number(arg?.year ?? 2027))],
    run: (v) => {
      const s = st(v), y = yr(v), hs = holidays(s, y);
      if (!hs) return notYet(s, y);
      const offs = daysOff(s, y), wc = weekdayCount(s, y), lw = longWeekends(s, y);
      const part = hs.filter((h) => h.flag === 'part' || h.flag === 'area').length;
      const tb: OutTable = { caption: `Every ${STATE_SHORT[s]} public holiday in ${y}`, headers: ['Holiday', 'Date', 'Kind'], rows: hs.map((h) => [HOL_NAME[h.id] ?? h.id, dWeek(h.date), kindOf(h)]) };
      return {
        label: `${STATE_NAME[s]}, ${y}`, value: `${N(new Set(offs.map((h) => h.date)).size)} public holidays`, sub: `${N(wc.weekday)} of them fall Monday to Friday`,
        rows: [...(hs.some((h) => h.flag === 'bank') ? [['Not counted above', hs.filter((h) => h.flag === 'bank').map((h) => `${HOL_NAME[h.id] ?? h.id} (banks only)`).join(', ')] as [string, string]] : []), ['Long weekends (3 days or more)', N(lw.length)], ['Working days, Monday to Friday', N(workingDays(s, y)!.reduce((a, b) => a + b, 0))], ...(part ? [['Part-day or regional days', N(part)] as [string, string]] : [])],
        table: tb, note: basisNote(s, y), assume: `Showing ${STATE_NAME[s]}, ${y}`, assumeHelp: 'pick another state or year to see yours',
      };
    },
  };
}

/* ---------------------------------------------------------------- hd */
/** Holidays that exist across states, with the local id of each state when it differs. */
export const ACROSS: Array<{ key: string; name: string; per?: Partial<Record<State, string>> }> = [
  { key: 'newyear', name: "New Year's Day" }, { key: 'australia', name: 'Australia Day' }, { key: 'goodfri', name: 'Good Friday' },
  { key: 'eastermon', name: 'Easter Monday' }, { key: 'anzac', name: 'Anzac Day' },
  { key: 'labour', name: 'Labour Day', per: { tas: 'eighthours', nt: 'mayday' } }, { key: 'kings', name: "King's Birthday" },
  { key: 'christmas', name: 'Christmas Day' }, { key: 'boxing', name: 'Boxing Day', per: { sa: 'proclamation' } },
];
/** The dates a holiday is kept in one state-year: the day itself and any additional day. */
export function keptOn(s: State, key: string, y: number): Hol[] | null {
  const hs = holidays(s, y); if (!hs) return null;
  const a = ACROSS.find((x) => x.key === key), id = a?.per?.[s] ?? key;
  return hs.filter((h) => h.id === id && h.flag !== 'bank');
}
function hdSpec(_l: Lang, arg?: Args): ToolSpec {
  return {
    inputs: [{ kind: 'select', id: 'hol', label: 'Holiday', def: String(arg?.hol ?? 'anzac'), options: ACROSS.map((a) => ({ value: a.key, label: a.name })) }, stateIn(String(arg?.state ?? 'nsw')), yearIn(Number(arg?.year ?? 2027))],
    run: (v) => {
      const key = String(v.hol), s = st(v), y = yr(v), a = ACROSS.find((x) => x.key === key)!;
      const mine = keptOn(s, key, y);
      const cell = (k: Hol[] | null) => (k === null ? 'Not yet published' : k.length ? k.map((h) => `${dShort(h.date)}${h.flag === 'sub' ? ' (additional)' : h.flag === 'obs' ? ' (moved)' : h.flag === 'tbc' ? ' (to be confirmed)' : ''}`).join(' + ') : 'Not a public holiday');
      // Christmas: Boxing Day sits beside it (testeurs naïfs du 2026-11-14 : « where is Tuesday 28? »).
      const tb: OutTable = key === 'christmas'
        ? { caption: `Christmas Day and Boxing Day ${y} in each state and territory`, headers: ['State', 'Christmas Day', 'Boxing Day'], rows: STATES.map((x) => [STATE_SHORT[x], cell(keptOn(x, 'christmas', y)), cell(keptOn(x, 'boxing', y))]) }
        : { caption: `${a.name} ${y} in each state and territory`, headers: ['State', 'Day off', 'Name'], rows: STATES.map((x) => { const k = keptOn(x, key, y); return [STATE_SHORT[x], cell(k), k && k[0] ? HOL_NAME[k[0].id] : '–']; }) };
      if (mine === null) return { ...notYet(s, y), table: tb };
      const main = mine.find((h) => !h.flag || h.flag === 'obs' || h.flag === 'tbc') ?? mine[0];
      const extra = mine.filter((h) => h.flag === 'sub');
      return {
        label: `${a.name} ${y}, ${STATE_SHORT[s]}`, value: main ? dWeek(main.date) : 'Not a public holiday',
        sub: extra.length ? `Plus an additional day on ${extra.map((h) => dWeek(h.date)).join(' and ')}` : main && (wdOf(main.date) === 0 || wdOf(main.date) === 6) ? `No weekday off in ${STATE_NAME[s]}: it stays on the ${wdOf(main.date) === 0 ? 'Sunday' : 'Saturday'}` : main?.flag === 'obs' ? 'Moved from the weekend to this weekday' : main ? 'A weekday off for most employees' : undefined,
        rows: main ? [['Name in this state', HOL_NAME[main.id]], ['Public holiday dates for it', N(mine.filter((h) => h.off).length)]] : [],
        table: tb, note: basisNote(s, y), assume: `Showing ${a.name} in ${STATE_NAME[s]}, ${y}`, assumeHelp: 'pick another holiday, state or year to see yours',
      };
    },
  };
}

/* ---------------------------------------------------------------- ea */
function eaSpec(_l: Lang, arg?: Args): ToolSpec {
  return {
    inputs: [{ id: 'year', label: 'Year', def: Number(arg?.year ?? 2027), min: 1600, max: 2600 }],
    run: (v) => {
      const y = Math.round(Number(v.year)), e = easterSunday(y), g = gaussSteps(y);
      const known = YEARS.includes(y);
      const tb: OutTable | undefined = known ? { caption: `Easter ${y}: which days each state keeps`, headers: ['State', 'Good Friday', 'Saturday', 'Sunday', 'Monday'], rows: STATES.map((s) => { const hs = holidays(s, y); if (!hs) return [STATE_SHORT[s], 'Not yet published', '', '', '']; const has = (id: string) => (hs.some((h) => h.id === id) ? 'Yes' : 'No'); return [STATE_SHORT[s], has('goodfri'), has('eastersat'), has('eastersun'), has('eastermon')]; }) } : undefined;
      return {
        label: `Easter Sunday ${y}`, value: dLong(e), sub: `Good Friday ${dShort(addDays(e, -2))} · Easter Monday ${dShort(addDays(e, 1))}`,
        rows: [['Paschal full moon (Gauss)', `${g.OG <= 31 ? `${g.OG} March` : `${g.OG - 31} April`}`], ['Days from 21 March to Easter', N(g.OS - 21)], ['Easter Saturday', dShort(addDays(e, -1))]],
        table: tb, assume: `Showing Easter ${y}`, assumeHelp: 'type another year to see it', note: known ? undefined : 'Dates by Gauss’s formula; state lists for this year are not published, so the table is hidden.',
      };
    },
  };
}

/* ---------------------------------------------------------------- lw */
function lwSpec(_l: Lang, arg?: Args): ToolSpec {
  return {
    inputs: [stateIn(String(arg?.state ?? 'nsw')), yearIn(Number(arg?.year ?? 2027))],
    run: (v) => {
      const s = st(v), y = yr(v);
      if (!basis(s, y)) return notYet(s, y);
      const lw = longWeekends(s, y), four = lw.filter((x) => x.days >= 4);
      return {
        label: `Long weekends ${y}, ${STATE_SHORT[s]}`, value: `${N(lw.length)} long weekends`, sub: four.length ? `${N(four.length)} of them run four days or more` : 'All of them run three days',
        rows: lw.slice(0, 3).map((x) => [x.holidays.join(' + '), span(x.from, x.to)] as [string, string]),
        table: { caption: `Every long weekend of ${y} in ${STATE_NAME[s]}`, headers: ['From', 'To', 'Days', 'Because of'], rows: lw.map((x) => [dShort(x.from), dShort(x.to), N(x.days), x.holidays.join(', ')]), align: ['l', 'l', 'r', 'l'] },
        note: 'Saturday, Sunday and full-day public holidays of the state. Part-day and regional holidays are left out.', assume: `Showing ${STATE_NAME[s]}, ${y}`, assumeHelp: 'pick another state or year to see yours',
      };
    },
  };
}

/* ---------------------------------------------------------------- lv */
function lvSpec(_l: Lang, arg?: Args): ToolSpec {
  return {
    inputs: [stateIn(String(arg?.state ?? 'nsw')), { id: 'leave', label: 'Annual leave days to use', def: Number(arg?.leave ?? 5), unit: 'days', min: 0, max: 40 }, yearIn(Number(arg?.year ?? 2027))],
    run: (v) => {
      const s = st(v), y = yr(v);
      if (!basis(s, y)) return notYet(s, y);
      // Testeurs naïfs du 2026-11-14, tour 2 : on a holiday page (`arg.near`), the plan stays around that holiday.
      const near = arg?.near ? String(arg.near) : undefined, nn = near ? HOL_NAME[near] : '';
      if (near && !dateOf(s, near, y)) return { label: `${nn} ${y}, ${STATE_SHORT[s]}`, value: 'Not a holiday here', sub: `${nn} is not a public holiday in ${STATE_NAME[s]}: pick another state.`, rows: [] };
      const asked = Math.max(0, Math.round(Number(v.leave))), p = plan(s, y, asked, near), l = p.longest;
      // Testeurs naïfs du 2026-11-14 : the total is spread over several breaks, so it is never called « in a row »;
      // the longest break is shown by itself, and leave the plan does not need is said in words.
      return {
        label: `Best use of ${days(asked)} of leave${near ? ` around ${nn}` : ''}, ${STATE_SHORT[s]} ${y}`, value: `${N(p.off)} days off${p.blocks.length > 1 ? ' in total' : ''}`,
        sub: !l ? 'Add leave days to see a plan' : p.blocks.length === 1 ? `In a row: ${span(l.offFrom, l.offTo)}` : `Across ${N(p.blocks.length)} breaks. Longest: ${days(l.off)} in a row, ${span(l.offFrom, l.offTo)}`,
        rows: [['Leave days used', `${N(p.leave)} of ${N(asked)}`], ['Breaks', N(p.blocks.length)], ...(p.leave ? [['Days off per leave day', formatDecimal(p.off / p.leave, 1)] as [string, string]] : [])],
        table: p.blocks.length ? { caption: 'Where to take the leave, break by break', headers: ['Take leave', 'Leave days', 'Days off in a row', 'Holidays used'], rows: p.blocks.map((b) => [span(b.leaveFrom, b.leaveTo), N(b.leave), `${N(b.off)} (${span(b.offFrom, b.offTo)})`, b.holidays.join(', ') || '–']), align: ['l', 'r', 'l', 'l'] } : undefined,
        assume: `Example: ${days(asked)} of leave in ${STATE_NAME[s]}, Monday-to-Friday work`,
        note: `${p.spare > 0 && p.leave > 0 ? `The best plan needs only ${N(p.leave)} of your ${N(asked)} days; a day left over on any Friday or Monday still gives a three-day weekend. ` : ''}Each break joins your leave to a public holiday; the total adds up the breaks. Check your roster, award or agreement before booking.`,
      };
    },
  };
}

/* ---------------------------------------------------------------- sc */
const TERM_STATES = STATES.filter((s) => terms(s, 2027));
function scSpec(_l: Lang, arg?: Args): ToolSpec {
  return {
    inputs: [{ kind: 'select', id: 'state', label: 'State', def: String(arg?.state ?? 'nsw'), options: TERM_STATES.map((s) => ({ value: s, label: STATE_NAME[s] })) }, yearIn(Number(arg?.year ?? 2027))],
    run: (v) => {
      const s = st(v), y = yr(v), t = terms(s, y);
      if (!t) return { label: `School terms ${y}, ${STATE_SHORT[s]}`, value: 'Not yet published', sub: 'The education department has not published these dates.', rows: [] };
      const b = breaks(s, y)!;
      const wk = t.reduce((a, x) => a + weeksOf(x), 0);
      return {
        label: `School terms ${y}, ${STATE_NAME[s]}`, value: `${dShort(t[0].start)} – ${dShort(t[3].end)}`, sub: `About ${N(wk)} weeks of school in four terms`,
        rows: b.map((x) => [x.name, `${span(x.start, x.end)} (${days(x.days)})`] as [string, string]),
        table: { caption: `Government school terms ${y}, ${STATE_SHORT[s]}`, headers: ['Term', 'First day', 'Last day', 'Weeks'], rows: t.map((x) => [`Term ${x.n}`, dWeek(x.start), dWeek(x.end), N(weeksOf(x))]), align: ['l', 'l', 'l', 'r'] },
        assume: `Showing ${STATE_NAME[s]}, ${y}`, assumeHelp: 'pick another state or year to see yours',
        note: s === 'nsw' ? 'NSW Eastern division. Western division schools start and finish term 1 and term 4 on other days.' : 'Government schools. Catholic and independent schools may differ.',
      };
    },
  };
}

/* ---------------------------------------------------------------- loc */
type Set3 = 'qld' | 'nsw' | 'tas';
export const LOCAL_SETS: Record<Set3, () => Array<{ date: string; area: string; event: string; hours?: string }>> = {
  qld: () => QLD_SHOW_2027, nsw: () => NSW_LOCAL_2027, tas: () => tasRegional(2027),
};
function locSpec(_l: Lang, arg?: Args): ToolSpec {
  const set = (String(arg?.set ?? 'qld')) as Set3;
  const list = LOCAL_SETS[set]().map((x, i) => ({ ...x, i })).sort((a, b) => a.area.localeCompare(b.area));
  const lab = set === 'qld' ? 'Show district' : set === 'nsw' ? 'Council area' : 'Region';
  const short = (s: string) => (s.length > 70 ? `${s.slice(0, 67)}…` : s);
  return {
    inputs: [{ kind: 'select', id: 'place', label: lab, def: String(arg?.place ?? list[0].i), options: list.map((x) => ({ value: String(x.i), label: short(`${x.area} (${x.event})`) })), wide: true }],
    run: (v) => {
      const all = LOCAL_SETS[set](), x = all[Number(v.place)] ?? all[0];
      const same = all.filter((y) => y.date === x.date && y !== x);
      return {
        label: `${x.event}, ${short(x.area)}`, value: dWeek(x.date), sub: x.hours ? `Hours: ${x.hours}` : set === 'qld' ? 'Show holiday for the district only' : undefined,
        rows: [['Other places off the same day', N(same.length)], ['Local holidays in this list for 2027', N(all.length)]],
        table: { caption: 'Same date elsewhere', headers: ['Place', 'Event'], rows: same.slice(0, 12).map((y) => [y.area, y.event]) },
        assume: `Showing ${short(x.area)}`, assumeHelp: `pick your ${lab.toLowerCase()} to see its day`,
        note: set === 'tas' ? 'Tasmania’s Statutory Holidays Act 2000, Schedule 1. Employers and councils may agree on another day.' : 'As published by the state government. Only workers in the named area get the day.',
      };
    },
  };
}

export const SPECS: Record<string, (l: Lang, arg?: Args) => ToolSpec> = { st: stSpec, hd: hdSpec, ea: eaSpec, lw: lwSpec, lv: lvSpec, sc: scSpec, loc: locSpec };
export const TOOL_KINDS = [...Object.keys(SPECS), 'countdown'];
export function getTool(kind: string, l: Lang, arg?: Args): ToolSpec {
  const f = SPECS[kind]; if (!f) throw new Error(`unknown tool: ${kind}`);
  return f(l, arg);
}
/** Runs a tool with its defaults (or the values given): used by pages and tests. */
export function runTool(kind: string, l: Lang, arg?: Args, values?: V): ToolOut {
  const spec = getTool(kind, l, arg);
  const v = Object.fromEntries(spec.inputs.map((i) => [i.id, i.def])) as V;
  return spec.run(resolve(spec.inputs, { ...v, ...(values ?? {}) }));
}
export { weekdaysInYear };
