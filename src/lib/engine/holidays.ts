/**
 * Public holidays of the eight states and territories.
 *
 * - NSW, VIC, QLD, WA, SA: the dates exactly as each government publishes them (src/data/listed.json, read on
 *   2026-11-13). A year that a state has not published is `null`: nothing is guessed.
 * - TAS, ACT, NT: their government pages refused automated reading, so the engine applies the rules written in the
 *   holiday Act of each (Statutory Holidays Act 2000 s 4 and Sch 1, Holidays Act 1958 s 3, Public Holidays Act 1981
 *   Sch 2). Days that a minister declares each year by notice are not in an Act and are not shown.
 */
import L from '../../data/listed.json';
import { easterSunday, nthWeekday, addDays, wdOf, fromIso, toIso, dayNum } from './days';

export type State = 'nsw' | 'vic' | 'qld' | 'wa' | 'sa' | 'tas' | 'act' | 'nt';
export const STATES: State[] = ['nsw', 'vic', 'qld', 'wa', 'sa', 'tas', 'act', 'nt'];
export const STATE_NAME: Record<State, string> = { nsw: 'New South Wales', vic: 'Victoria', qld: 'Queensland', wa: 'Western Australia', sa: 'South Australia', tas: 'Tasmania', act: 'Australian Capital Territory', nt: 'Northern Territory' };
export const STATE_SHORT: Record<State, string> = { nsw: 'NSW', vic: 'VIC', qld: 'QLD', wa: 'WA', sa: 'SA', tas: 'TAS', act: 'ACT', nt: 'NT' };
export const YEARS = [2026, 2027, 2028];

export type Flag = 'sub' | 'obs' | 'part' | 'area' | 'bank' | 'tbc';
export const HOL_NAME: Record<string, string> = {
  newyear: "New Year's Day", australia: 'Australia Day', labour: 'Labour Day', eighthours: 'Eight Hours Day', canberra: 'Canberra Day', adelaidecup: 'Adelaide Cup Day',
  goodfri: 'Good Friday', eastersat: 'Easter Saturday', eastersun: 'Easter Sunday', eastermon: 'Easter Monday', anzac: 'Anzac Day', mayday: 'May Day',
  reconciliation: 'Reconciliation Day', kings: "King's Birthday", waday: 'Western Australia Day', bank: 'Bank Holiday', picnic: 'Picnic Day',
  ekka: 'Royal Queensland Show (Ekka)', grandfinal: 'Friday before the AFL Grand Final', showday: 'Show Day', cup: 'Melbourne Cup Day',
  xmaseve: 'Christmas Eve', christmas: 'Christmas Day', boxing: 'Boxing Day', proclamation: 'Boxing Day / Proclamation Day', nye: "New Year's Eve",
};
const PART_HOURS: Partial<Record<State, string>> = { qld: '6pm to midnight', sa: '7pm to midnight', nt: '7pm to midnight' };

export interface Hol {
  id: string; date: string; flag?: Flag;
  /** Name as shown, with « additional day », part-day hours or area. */
  name: string;
  /** A full-day public holiday across the state: what most employees have off. */
  off: boolean;
}
export function label(id: string, flag: Flag | undefined, st: State): string {
  const n = HOL_NAME[id] ?? id;
  switch (flag) {
    case 'sub': return `${n} (additional day)`;
    case 'obs': return `${n} (observed)`;
    case 'part': return `${n}, ${PART_HOURS[st] ?? 'part-day'}`;
    case 'area': return id === 'ekka' ? `${n}, Brisbane area only` : `${n} (regional)`;
    case 'bank': return `${n} (banks only, not a public holiday)`;
    case 'tbc': return `${n} (to be confirmed)`;
    default: return n;
  }
}
const mk = (st: State, id: string, date: string, flag?: Flag): Hol => ({ id, date, flag, name: label(id, flag, st), off: !flag || flag === 'sub' || flag === 'obs' || flag === 'tbc' });

/* ---------------------------------------------------------------- Rules from the Acts (TAS, ACT, NT) */
const sat = (iso: string) => wdOf(iso) === 6, sun = (iso: string) => wdOf(iso) === 0;
const nextMon = (iso: string) => { let d = fromIso(iso) + 1; while (new Date(d * 864e5).getUTCDay() !== 1) d++; return toIso(d); };

/** Tasmania, Statutory Holidays Act 2000, s 4 (holidays observed generally). Easter Sunday from 9 October 2026 (Act No. 18 of 2026). */
export function tasRules(y: number): Hol[] {
  const e = easterSunday(y), out: Hol[] = [];
  const ny = `${y}-01-01`; out.push(sat(ny) || sun(ny) ? mk('tas', 'newyear', nextMon(ny), 'obs') : mk('tas', 'newyear', ny));
  const au = `${y}-01-26`; out.push(sat(au) || sun(au) ? mk('tas', 'australia', nextMon(au), 'obs') : mk('tas', 'australia', au));
  out.push(mk('tas', 'eighthours', nthWeekday(y, 3, 1, 2)));
  out.push(mk('tas', 'goodfri', addDays(e, -2)));
  if (y >= 2027) out.push(mk('tas', 'eastersun', e));
  out.push(mk('tas', 'eastermon', addDays(e, 1)));
  out.push(mk('tas', 'anzac', `${y}-04-25`));
  out.push(mk('tas', 'kings', nthWeekday(y, 6, 1, 2)));
  const xm = `${y}-12-25`, bx = `${y}-12-26`;
  out.push(mk('tas', 'christmas', xm));
  if (sat(xm)) out.push(mk('tas', 'christmas', addDays(xm, 2), 'sub'));
  if (sun(xm)) out.push(mk('tas', 'christmas', addDays(xm, 2), 'sub'));
  if (sat(bx)) out.push(mk('tas', 'boxing', addDays(bx, 2), 'obs'));
  else if (sun(bx)) out.push(mk('tas', 'boxing', addDays(bx, 2), 'obs'));
  else out.push(mk('tas', 'boxing', bx));
  return out.sort((a, b) => a.date.localeCompare(b.date));
}
/** ACT, Holidays Act 1958, s 3(1)(a). */
export function actRules(y: number): Hol[] {
  const e = easterSunday(y), out: Hol[] = [];
  const ny = `${y}-01-01`; out.push(mk('act', 'newyear', ny)); if (sat(ny) || sun(ny)) out.push(mk('act', 'newyear', nextMon(ny), 'sub'));
  const au = `${y}-01-26`; out.push(sat(au) || sun(au) ? mk('act', 'australia', nextMon(au), 'obs') : mk('act', 'australia', au));
  out.push(mk('act', 'canberra', nthWeekday(y, 3, 1, 2)));
  out.push(mk('act', 'goodfri', addDays(e, -2)), mk('act', 'eastersat', addDays(e, -1)), mk('act', 'eastersun', e), mk('act', 'eastermon', addDays(e, 1)));
  const an = `${y}-04-25`; out.push(sun(an) ? mk('act', 'anzac', addDays(an, 1), 'obs') : mk('act', 'anzac', an));
  const rc = `${y}-05-27`; out.push(mk('act', 'reconciliation', wdOf(rc) === 1 ? rc : nextMon(rc)));
  out.push(mk('act', 'kings', nthWeekday(y, 6, 1, 2)));
  out.push(mk('act', 'labour', nthWeekday(y, 10, 1, 1)));
  const xm = `${y}-12-25`, bx = `${y}-12-26`;
  out.push(mk('act', 'christmas', xm)); if (sat(xm)) out.push(mk('act', 'christmas', addDays(xm, 2), 'sub')); if (sun(xm)) out.push(mk('act', 'christmas', addDays(xm, 2), 'sub'));
  out.push(mk('act', 'boxing', bx)); if (sat(bx)) out.push(mk('act', 'boxing', addDays(bx, 2), 'sub')); if (sun(bx)) out.push(mk('act', 'boxing', addDays(bx, 2), 'sub'));
  out.push(mk('act', 'bank', nthWeekday(y, 8, 1, 1), 'bank'));
  return out.sort((a, b) => a.date.localeCompare(b.date));
}
/** Northern Territory, Public Holidays Act 1981, Schedule 2. */
export function ntRules(y: number): Hol[] {
  const e = easterSunday(y), out: Hol[] = [];
  const ny = `${y}-01-01`; out.push(mk('nt', 'newyear', ny)); if (sat(ny) || sun(ny)) out.push(mk('nt', 'newyear', nextMon(ny), 'sub'));
  const au = `${y}-01-26`; out.push(sat(au) || sun(au) ? mk('nt', 'australia', nextMon(au), 'obs') : mk('nt', 'australia', au));
  out.push(mk('nt', 'goodfri', addDays(e, -2)), mk('nt', 'eastersat', addDays(e, -1)), mk('nt', 'eastersun', e), mk('nt', 'eastermon', addDays(e, 1)));
  const an = `${y}-04-25`; out.push(sun(an) ? mk('nt', 'anzac', addDays(an, 1), 'obs') : mk('nt', 'anzac', an));
  out.push(mk('nt', 'mayday', nthWeekday(y, 5, 1, 1)));
  out.push(mk('nt', 'kings', nthWeekday(y, 6, 1, 2)));
  out.push(mk('nt', 'picnic', nthWeekday(y, 8, 1, 1)));
  const xm = `${y}-12-25`, bx = `${y}-12-26`;
  out.push(mk('nt', 'xmaseve', `${y}-12-24`, 'part'));
  out.push(mk('nt', 'christmas', xm)); if (sat(xm) || sun(xm)) out.push(mk('nt', 'christmas', nextMon(xm), 'sub'));
  out.push(mk('nt', 'boxing', bx));
  if (sat(bx)) out.push(mk('nt', 'boxing', addDays(bx, 2), 'sub'));
  else if (sun(bx) || wdOf(bx) === 1) out.push(mk('nt', 'boxing', addDays(bx, wdOf(bx) === 0 ? 2 : 1), 'sub'));
  out.push(mk('nt', 'nye', `${y}-12-31`, 'part'));
  return out.sort((a, b) => a.date.localeCompare(b.date) || (a.flag === 'sub' ? 1 : 0) - (b.flag === 'sub' ? 1 : 0));
}

/* ---------------------------------------------------------------- One interface for all eight */
type Row = [string, string, Flag?];
const LISTED = L as unknown as Record<string, { from: string | Record<string, string>; years: Record<string, Row[]> }>;
export type Basis = 'list' | 'act';
/** How a state-year is known: published list, rules of the Act, or not at all. */
export function basis(st: State, y: number): Basis | null {
  if (st === 'tas' || st === 'act' || st === 'nt') return YEARS.includes(y) ? 'act' : null;
  return LISTED[st]?.years[String(y)] ? 'list' : null;
}
/** Source key (params-2026.json) of a state-year. */
export function sourceOf(st: State, y: number): string {
  if (st === 'tas') return 'tas-act'; if (st === 'act') return 'act-act'; if (st === 'nt') return 'nt-act';
  const f = LISTED[st].from; return typeof f === 'string' ? f : (f[String(y)] ?? Object.values(f)[0]);
}
/** Every holiday of a state-year (full days, part days, area days, bank days), by date; null if unknown. */
export function holidays(st: State, y: number): Hol[] | null {
  const b = basis(st, y); if (!b) return null;
  if (st === 'tas') return tasRules(y); if (st === 'act') return actRules(y); if (st === 'nt') return ntRules(y);
  return LISTED[st].years[String(y)].map(([id, date, flag]) => mk(st, id, date, flag)).sort((a, b) => a.date.localeCompare(b.date));
}
/** Full-day statewide public holidays of a state-year. */
export const daysOff = (st: State, y: number) => (holidays(st, y) ?? []).filter((h) => h.off);
/** Days (as integers) that are full-day public holidays, over the years that are known. */
export function offSet(st: State, years: number[]): Set<number> {
  const s = new Set<number>(); for (const y of years) for (const h of daysOff(st, y)) s.add(fromIso(h.date)); return s;
}
/** What a given date is in a state: the holidays that fall on it (empty array = ordinary day; null = year unknown). */
export function onDate(st: State, iso: string): Hol[] | null {
  const hs = holidays(st, Number(iso.slice(0, 4))); return hs ? hs.filter((h) => h.date === iso) : null;
}
/** The next `n` holidays (full or part day) on or after `today`, over the known years. */
export function upcoming(st: State, today: string, n = 5): Hol[] {
  const y = Number(today.slice(0, 4)), out: Hol[] = [];
  for (const yy of [y, y + 1, y + 2]) for (const h of holidays(st, yy) ?? []) if (h.date >= today && (h.off || h.flag === 'part')) out.push(h);
  return out.slice(0, n);
}
/** The date of a holiday id in a state-year (first match, observed date when moved), or undefined. */
export function dateOf(st: State, id: string, y: number): Hol | undefined {
  const hs = holidays(st, y) ?? []; return hs.find((h) => h.id === id && h.flag !== 'sub') ?? hs.find((h) => h.id === id);
}
/** Weekdays (Mon–Fri) lost to full-day holidays, and holidays that fall at the weekend with no replacement. */
export function weekdayCount(st: State, y: number) {
  const offs = daysOff(st, y), dates = new Set(offs.map((h) => h.date));
  const wk = [...dates].filter((d) => { const w = wdOf(d); return w >= 1 && w <= 5; });
  return { weekday: wk.length, total: dates.size };
}
export { dayNum };
