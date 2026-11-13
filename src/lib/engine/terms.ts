/**
 * Government school terms (src/data/terms.json) and local holidays (QLD show days, NSW local public holidays,
 * Tasmania's regional holidays from Schedule 1 of the Statutory Holidays Act 2000).
 */
import TJ from '../../data/terms.json';
import QS from '../../data/qld-show-2027.json';
import NL from '../../data/nsw-local-2027.json';
import { fromIso, toIso, addDays, nthWeekday, dayNum, weekday } from './days';
import type { State } from './holidays';

const T = TJ as unknown as Record<string, { from: string[]; years: Record<string, Array<[string, string]>> }>;
export interface Term { n: number; start: string; end: string }
export interface Break { name: string; start: string; end: string; days: number }
export const termsKnown = (st: State) => !!T[st];
export const termSources = (st: State) => T[st]?.from ?? [];
export function terms(st: State, y: number): Term[] | null {
  const r = T[st]?.years[String(y)]; return r ? r.map(([start, end], i) => ({ n: i + 1, start, end })) : null;
}
/** Breaks between terms of one year, plus the summer break to the next year's term 1 when known. */
export function breaks(st: State, y: number): Break[] | null {
  const t = terms(st, y); if (!t) return null;
  const out: Break[] = [];
  for (let i = 0; i < t.length - 1; i++) { const s = addDays(t[i].end, 1), e = addDays(t[i + 1].start, -1); out.push({ name: `After term ${i + 1}`, start: s, end: e, days: fromIso(e) - fromIso(s) + 1 }); }
  const nx = terms(st, y + 1);
  if (nx) { const s = addDays(t[3].end, 1), e = addDays(nx[0].start, -1); out.push({ name: `Summer ${y}–${String(y + 1).slice(2)}`, start: s, end: e, days: fromIso(e) - fromIso(s) + 1 }); }
  return out;
}
export const weeksOf = (t: Term) => Math.round((fromIso(t.end) - fromIso(t.start) + 3) / 7);
/** Where a date sits: in a term (with days to its end) or in a break (with days to the next term), or unknown. */
export function termStatus(st: State, iso: string): { kind: 'term'; term: Term; left: number } | { kind: 'break'; next?: Term; left?: number } | null {
  const y = Number(iso.slice(0, 4)), n = fromIso(iso);
  const all = [...(terms(st, y - 1) ?? []), ...(terms(st, y) ?? []), ...(terms(st, y + 1) ?? [])];
  if (!terms(st, y)) return null;
  for (const t of all) if (n >= fromIso(t.start) && n <= fromIso(t.end)) return { kind: 'term', term: t, left: fromIso(t.end) - n };
  const nx = all.find((t) => fromIso(t.start) > n);
  return { kind: 'break', next: nx, left: nx ? fromIso(nx.start) - n : undefined };
}

/* ---------------------------------------------------------------- Local holidays */
export interface Local { date: string; area: string; event: string; hours?: string }
export const QLD_SHOW_2027: Local[] = (QS as Array<{ date: string; district: string; event: string }>).map((x) => ({ date: x.date, area: x.district, event: x.event }));
export const NSW_LOCAL_2027: Local[] = (NL as Array<{ date: string; area: string; event: string; hours: string }>).map((x) => ({ ...x }));
/** Day before the n-th Saturday of a month (weekday w = 4 Thursday, 5 Friday). */
const before = (y: number, m: number, n: number, w: number) => { const s = fromIso(nthWeekday(y, m, 6, n)); return toIso(s - ((6 - w + 7) % 7 || 7)); };
/** Tasmania, Statutory Holidays Act 2000, Schedule 1 Part 1: regional statutory holidays. */
export function tasRegional(y: number): Local[] {
  const lastNov = dayNum(y, 11, 30);
  let fri = lastNov; while (weekday(fri) !== 5) fri--;
  const fri2 = fri + 7; const devonport = (fri2 <= dayNum(y, 12, 1) && fri2 - lastNov < lastNov - fri) ? fri2 : fri;
  const firstThuMay = fromIso(nthWeekday(y, 5, 4, 1));
  const out: Local[] = [
    { date: nthWeekday(y, 2, 1, 2), area: 'Southern Tasmania: south of and including Oatlands and Swansea, excluding Bronte Park, Catagunya, Strathgordon, Tarraleah, Wayatinah and the West Coast', event: 'Royal Hobart Regatta' },
    { date: nthWeekday(y, 3, 2, 1), area: 'Municipal area of King Island', event: 'King Island Show' },
    { date: toIso(firstThuMay + 1), area: 'Municipal area of Circular Head', event: 'Agfest' },
    { date: before(y, 10, 1, 5), area: 'Municipal areas of Burnie, Waratah-Wynyard and West Coast', event: 'Burnie Show' },
    { date: before(y, 10, 2, 4), area: "Break O'Day, Dorset, George Town, Launceston, Meander Valley, Northern Midlands and West Tamar", event: 'Royal Launceston Show' },
    { date: before(y, 10, 3, 5), area: 'Municipal area of Flinders', event: 'Flinders Island Show' },
    { date: before(y, 10, 4, 4), area: 'South of and including Oatlands and Swansea, plus Bronte Park, Strathgordon, Tarraleah and Wayatinah, excluding the West Coast', event: 'Royal Hobart Show' },
    { date: nthWeekday(y, 11, 1, 1), area: 'Every part of Tasmania that does not observe the Royal Hobart Regatta holiday', event: 'Recreation Day' },
    { date: toIso(devonport), area: 'Municipal areas of Devonport, Kentish and Latrobe', event: 'Devonport Show' },
  ];
  return out.sort((a, b) => a.date.localeCompare(b.date));
}
export { fromIso };
