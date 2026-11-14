/** Writing helpers for content: every date and number in a text comes from the engine, never typed by hand. */
import { KIT as K } from '../lib/kit';
import { dLong, dWeek, wdLong, dShort, span, dm, days } from '../lib/dates';
import { formatNumber } from '../lib/format';
import type { State } from '../lib/engine/holidays';
import { keptOn } from '../lib/tool-specs';
export { K };
/** « 26 January 2027 » */ export const D = dLong;
/** « Tuesday 26 January 2027 » */ export const DW = dWeek;
/** « Tuesday » */ export const WD = wdLong;
/** « Tue 26 Jan » */ export const DS = dShort;
/** « 26 January » */ export const DM = dm;
export const SPAN = span;
export const DAYS = days;
export const N = (x: number) => formatNumber(x, 0);
/** The date a holiday is kept on (observed date if moved), in a state-year. */
export const F = (st: State, id: string, y = 2027) => { const h = K.dateOf(st, id, y); if (!h) throw new Error(`${st} ${id} ${y} missing`); return h.date; };
/** Additional days of a holiday in a state-year. */
export const SUB = (st: State, key: string, y = 2027) => (keptOn(st, key, y) ?? []).filter((h) => h.flag === 'sub').map((h) => h.date);
/** Distinct full-day public holiday dates. */
export const COUNT = (st: State, y = 2027) => new Set(K.daysOff(st, y).map((h) => h.date)).size;
export const WEEKDAY = (st: State, y = 2027) => K.weekdayCount(st, y).weekday;
export const WORK = (st: State, y = 2027) => K.workingDays(st, y)!.reduce((a, b) => a + b, 0);
export const LW = (st: State, y = 2027) => K.longWeekends(st, y);
export const PLAN = (st: State, n: number, y = 2027) => K.plan(st, y, n);
/** A plan in words. One break: « 9 days off in a row, from … to … ». Several: the total is a total, never « in a row »
 *  (testeurs naïfs du 2026-11-14 : « 14 days off in a row » for 4 + 10 days in two breaks). */
export const PLAN_TXT = (p: ReturnType<typeof K.plan>) => {
  const l = p.longest;
  if (!l) return 'no extra days off';
  if (p.blocks.length === 1) return `${formatNumber(p.off, 0)} days off in a row, from ${dShort(l.offFrom)} to ${dShort(l.offTo)} ${l.offTo.slice(0, 4)}`;
  return `${formatNumber(p.off, 0)} days off in total, across ${formatNumber(p.blocks.length, 0)} breaks (the longest: ${formatNumber(l.off, 0)} days, ${dShort(l.offFrom)} to ${dShort(l.offTo)})`;
};
/** Table rows of a state-year: holiday, date with weekday, kind. */
export const ROWS = (st: State, y = 2027) => (K.holidays(st, y) ?? []).map((h) => [h.name, dWeek(h.date)]);
