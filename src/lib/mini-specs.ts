/**
 * Mini-simulators placed in the text of the pages (§9.3), read by components/calc/MiniSim.tsx. Same engine as the
 * big tools; values are numeric (indexes of states, years, holidays) as MiniSim requires.
 *   leave : state + leave days → days off in a row (2027)
 *   lw    : state + year → long weekends
 *   day   : holiday + state → date in 2027
 *   term  : state + term → first and last day in 2027
 */
import type { MiniSpec, MiniInput } from './mini-types';
import { formatNumber, formatDecimal } from './format';
import { STATES, STATE_NAME, STATE_SHORT, YEARS, basis, HOL_NAME } from './engine/holidays';
import { plan, longWeekends } from './engine/leave';
import { terms, weeksOf } from './engine/terms';
import { ACROSS, keptOn } from './tool-specs';
import { dWeek, dShort, span, days } from './dates';

const N = (x: number) => formatNumber(x, 0);
const stateIn = (def = 0, list = STATES): MiniInput => ({ id: 'st', label: 'State or territory', def, options: list.map((s, i) => ({ value: String(i), label: STATE_NAME[s] })) });
const TERM_STATES = STATES.filter((s) => terms(s, 2027));

export function getSpec(kind: string, _lang = 'en'): MiniSpec {
  switch (kind) {
    case 'leave': return {
      title: 'How many days off does your leave buy in 2027?', cta: 'Open the annual leave planner',
      exemple: (v) => `Example for ${STATE_SHORT[STATES[v.st]]} with ${N(v.leave)} leave days`,
      inputs: [stateIn(0), { id: 'leave', label: 'Leave days', def: 5, unit: 'days', max: 40 }],
      run: (v) => {
        const s = STATES[v.st], p = plan(s, 2027, Math.round(v.leave)), b = p.blocks[0];
        return { head: [`${STATE_SHORT[s]} 2027: days off in a row`, days(p.off)], rows: [['Leave days used', N(p.leave)], ['Days off per leave day', p.leave ? formatDecimal(p.off / p.leave, 1) : '–'], ...(b ? [['First break', span(b.offFrom, b.offTo)] as [string, string]] : [])] };
      },
    };
    case 'lw': return {
      title: 'Long weekends in your state', cta: 'See every long weekend',
      exemple: (v) => `Example for ${STATE_SHORT[STATES[v.st]]} in ${YEARS[v.y]}`,
      inputs: [stateIn(0), { id: 'y', label: 'Year', def: 1, options: YEARS.map((y, i) => ({ value: String(i), label: String(y) })) }],
      run: (v) => {
        const s = STATES[v.st], y = YEARS[v.y];
        if (!basis(s, y)) return { head: [`${STATE_SHORT[s]} ${y}`, 'Not yet published'], rows: [], note: 'The state has not published this year: nothing is guessed.' };
        const lw = longWeekends(s, y);
        return { head: [`Long weekends ${y}, ${STATE_SHORT[s]}`, N(lw.length)], rows: lw.slice(0, 4).map((x) => [x.holidays.join(' + '), span(x.from, x.to)] as [string, string]) };
      },
    };
    case 'day': return {
      title: 'When is it in your state?', cta: 'Every 2027 holiday by state',
      exemple: (v) => `Example: ${ACROSS[v.h].name} in ${STATE_SHORT[STATES[v.st]]}`,
      inputs: [{ id: 'h', label: 'Holiday', def: 4, options: ACROSS.map((a, i) => ({ value: String(i), label: a.name })) }, stateIn(0)],
      run: (v) => {
        const a = ACROSS[v.h], s = STATES[v.st], k = keptOn(s, a.key, 2027) ?? [];
        const main = k.find((h) => h.flag !== 'sub') ?? k[0];
        return { head: [`${a.name} 2027, ${STATE_SHORT[s]}`, main ? dShort(main.date) : 'Not a holiday'], rows: [...(main ? [['Date', dWeek(main.date)] as [string, string], ['Name here', HOL_NAME[main.id]] as [string, string]] : []), ...k.filter((h) => h.flag === 'sub').map((h) => ['Additional day', dWeek(h.date)] as [string, string])] };
      },
    };
    case 'term': return {
      title: 'School term dates 2027', cta: 'All terms and holidays by state',
      exemple: (v) => `Example: term ${v.n} in ${STATE_SHORT[TERM_STATES[v.st]]}`,
      inputs: [stateIn(0, TERM_STATES), { id: 'n', label: 'Term', def: 2, options: [1, 2, 3, 4].map((n) => ({ value: String(n), label: `Term ${n}` })) }],
      run: (v) => {
        const s = TERM_STATES[v.st], t = terms(s, 2027)![v.n - 1];
        return { head: [`Term ${v.n} 2027, ${STATE_SHORT[s]}`, span(t.start, t.end)], rows: [['First day', dWeek(t.start)], ['Last day', dWeek(t.end)], ['Weeks', N(weeksOf(t))]] };
      },
    };
    default: throw new Error(`unknown mini-simulator: ${kind}`);
  }
}
