/**
 * Day arithmetic without time zones: every day is an integer (days since 1970-01-01, UTC), so daylight saving and
 * the visitor's clock never shift a date.
 * - Easter: Gauss's formula in the Lichtenberg form; `easterMeeus` is a second, independent method used by the tests.
 * - `stateMidnight`: midnight of a date in a state's own time zone, as an instant (for the countdowns).
 */
const MS = 86400000;
export const dayNum = (y: number, m: number, d: number) => Date.UTC(y, m - 1, d) / MS;
export const fromIso = (iso: string) => { const [y, m, d] = iso.split('-').map(Number); return dayNum(y, m, d); };
export const toIso = (n: number) => new Date(n * MS).toISOString().slice(0, 10);
/** 0 = Sunday … 6 = Saturday */
export const weekday = (n: number) => new Date(n * MS).getUTCDay();
export const wdOf = (iso: string) => weekday(fromIso(iso));
export const isWeekend = (n: number) => { const w = weekday(n); return w === 0 || w === 6; };
export const addDays = (iso: string, d: number) => toIso(fromIso(iso) + d);
export const daysBetween = (a: string, b: string) => fromIso(b) - fromIso(a);

/** Easter Sunday by Gauss (Lichtenberg form), as an ISO date. */
export function easterSunday(x: number): string {
  const K = Math.floor(x / 100);
  const M = 15 + Math.floor((3 * K + 3) / 4) - Math.floor((8 * K + 13) / 25);
  const S = 2 - Math.floor((3 * K + 3) / 4);
  const A = x % 19;
  const D = (19 * A + M) % 30;
  const R = Math.floor((D + Math.floor(A / 11)) / 29);
  const OG = 21 + D - R;
  const SZ = 7 - ((x + Math.floor(x / 4) + S) % 7);
  const OE = 7 - ((((OG - SZ) % 7) + 7) % 7);
  return toIso(dayNum(x, 3, 1) + OG + OE - 1);
}
/** Second, independent method (Meeus/Jones/Butcher), for the tests only. */
export function easterMeeus(y: number): string {
  const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4;
  const f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31), day = ((h + l - 7 * m + 114) % 31) + 1;
  return toIso(dayNum(y, month, day));
}
/** The intermediate values of Gauss's formula, to show them on a page. */
export function gaussSteps(x: number) {
  const K = Math.floor(x / 100), M = 15 + Math.floor((3 * K + 3) / 4) - Math.floor((8 * K + 13) / 25), S = 2 - Math.floor((3 * K + 3) / 4);
  const A = x % 19, D = (19 * A + M) % 30, R = Math.floor((D + Math.floor(A / 11)) / 29), OG = 21 + D - R;
  const SZ = 7 - ((x + Math.floor(x / 4) + S) % 7), OE = 7 - ((((OG - SZ) % 7) + 7) % 7);
  return { K, M, S, A, D, R, OG, SZ, OE, OS: OG + OE };
}
/** n-th weekday of a month (n = −1: last). wd 0 = Sunday. */
export function nthWeekday(y: number, m: number, wd: number, n: number): string {
  if (n > 0) { const first = dayNum(y, m, 1); return toIso(first + ((wd - weekday(first) + 7) % 7) + 7 * (n - 1)); }
  const last = dayNum(y, m + 1, 1) - 1; return toIso(last - ((weekday(last) - wd + 7) % 7));
}
/** Weekdays (Mon–Fri) in [a, b], both ends included. */
export function weekdaysBetween(a: number, b: number): number {
  let c = 0; for (let d = a; d <= b; d++) if (!isWeekend(d)) c++; return c;
}
/** IANA time zone of each state and territory. */
export const TZ: Record<string, string> = { nsw: 'Australia/Sydney', vic: 'Australia/Melbourne', qld: 'Australia/Brisbane', wa: 'Australia/Perth', sa: 'Australia/Adelaide', tas: 'Australia/Hobart', act: 'Australia/Sydney', nt: 'Australia/Darwin' };
/** UTC offset (minutes) of a time zone at an instant, read from Intl. */
function offsetAt(tz: string, ms: number): number {
  const p = new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).formatToParts(new Date(ms));
  const g = (t: string) => Number(p.find((x) => x.type === t)?.value);
  return (Date.UTC(g('year'), g('month') - 1, g('day'), g('hour') % 24, g('minute')) - ms) / 60000;
}
/** The instant (ms) of a local date and time in a state. */
export function stateInstant(state: string, iso: string, hour = 0): number {
  const tz = TZ[state] ?? 'Australia/Sydney';
  const local = fromIso(iso) * MS + hour * 3600e3;
  const o1 = offsetAt(tz, local - 10 * 3600e3);
  const o2 = offsetAt(tz, local - o1 * 60000);
  return local - o2 * 60000;
}
/** Today's date (ISO) in a state, for an instant. */
export function todayIn(state: string, ms: number): string {
  const p = new Intl.DateTimeFormat('en-CA', { timeZone: TZ[state] ?? 'Australia/Sydney', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(ms));
  return p.slice(0, 10);
}
