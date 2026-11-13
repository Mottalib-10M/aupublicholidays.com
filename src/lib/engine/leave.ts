/**
 * Long weekends, bridges and annual leave planning, for one state.
 *
 * The calendar is cut into alternating blocks: free blocks (Saturdays, Sundays and full-day public holidays of the
 * state) and work blocks (Monday to Friday with no holiday). Taking every day of a work block as leave joins the
 * free blocks on either side into one run of days off.
 * - `longWeekends`: free blocks of three days or more that contain a weekday public holiday.
 * - `bridges`: work blocks of at most `max` days next to a weekday holiday, best return first.
 * - `plan`: the best use of a budget of leave days, by dynamic programming over the work blocks: most days off in a
 *   row; on a tie, fewer leave days. Exact.
 * Only years whose holidays are known count; a block that touches an unknown year is left out.
 */
import { holidays, offSet, basis, type State } from './holidays';
import { fromIso, toIso, isWeekend, dayNum } from './days';

interface Block { free: boolean; start: number; len: number; hol: boolean }
const known = (st: State, y: number) => [y - 1, y, y + 1].filter((yy) => basis(st, yy));

export function blocks(st: State, y: number): Block[] {
  const ys = known(st, y), hol = offSet(st, ys);
  const a = ys.includes(y - 1) ? dayNum(y - 1, 12, 1) : dayNum(y, 1, 1), b = ys.includes(y + 1) ? dayNum(y + 1, 1, 31) : dayNum(y, 12, 31);
  const out: Block[] = [];
  for (let d = a; d <= b; d++) {
    const h = hol.has(d), free = h || isWeekend(d), counts = h && !isWeekend(d);
    const last = out[out.length - 1];
    if (last && last.free === free) { last.len++; last.hol ||= counts; } else out.push({ free, start: d, len: 1, hol: counts });
  }
  return out;
}
const inYear = (start: number, len: number, y: number) => start >= dayNum(y, 1, 1) && start + len - 1 <= dayNum(y, 12, 31);
const namesIn = (st: State, a: number, b: number) => {
  const out: string[] = [];
  for (const yy of [toIso(a).slice(0, 4), toIso(b).slice(0, 4)].map(Number).filter((v, i, s) => s.indexOf(v) === i))
    for (const h of holidays(st, yy) ?? []) { const n = fromIso(h.date); if (h.off && n >= a && n <= b && !out.includes(h.name)) out.push(h.name); }
  return out;
};

export interface LongWeekend { from: string; to: string; days: number; holidays: string[] }
/** Runs of three or more free days that include a weekday public holiday, starting in year y. */
export function longWeekends(st: State, y: number): LongWeekend[] {
  if (!basis(st, y)) return [];
  return blocks(st, y).filter((b) => b.free && b.hol && b.len >= 3 && b.start >= dayNum(y, 1, 1) && b.start <= dayNum(y, 12, 31))
    .map((b) => ({ from: toIso(b.start), to: toIso(b.start + b.len - 1), days: b.len, holidays: namesIn(st, b.start, b.start + b.len - 1) }));
}

export interface Bridge { leaveFrom: string; leaveTo: string; leave: number; offFrom: string; offTo: string; off: number; holidays: string[] }
const mkBridge = (st: State, bl: Block[], i: number, j: number): Bridge => {
  const pre = bl[i - 1], post = bl[j + 1];
  const a = pre ? pre.start : bl[i].start, b = post ? post.start + post.len - 1 : bl[j].start + bl[j].len - 1;
  let leave = 0; for (let k = i; k <= j; k++) if (!bl[k].free) leave += bl[k].len;
  return { leaveFrom: toIso(bl[i].start), leaveTo: toIso(bl[j].start + bl[j].len - 1), leave, offFrom: toIso(a), offTo: toIso(b), off: b - a + 1, holidays: namesIn(st, a, b) };
};
/** Every bridge of a year: a work block of up to `max` days beside a weekday holiday, best return first. */
export function bridges(st: State, y: number, max = 4): Bridge[] {
  if (!basis(st, y)) return [];
  const bl = blocks(st, y), out: Bridge[] = [];
  for (let i = 1; i < bl.length - 1; i++) {
    const b = bl[i];
    if (b.free || b.len > max || !inYear(b.start, b.len, y)) continue;
    if (!bl[i - 1].hol && !bl[i + 1].hol) continue;
    out.push(mkBridge(st, bl, i, i));
  }
  return out.sort((a, b) => b.off / b.leave - a.off / a.leave || b.off - a.off || a.leaveFrom.localeCompare(b.leaveFrom));
}

export interface Plan { blocks: Bridge[]; leave: number; off: number; spare: number }
/** Best split of `budget` leave days in year y (only days in year y cost leave). */
export function plan(st: State, y: number, budget: number): Plan {
  const B = Math.max(0, Math.min(60, Math.floor(budget)));
  if (!basis(st, y)) return { blocks: [], leave: 0, off: 0, spare: B };
  const bl = blocks(st, y);
  const runs: number[] = []; for (let i = 0; i < bl.length; i++) if (!bl[i].free) runs.push(i);
  const n = runs.length, NEG = -1e9;
  const ok = (r: number) => { const i = runs[r]; return i > 0 && i < bl.length - 1 && inYear(bl[i].start, bl[i].len, y) && bl[i].len <= 10; };
  const fr = (i: number) => (bl[i] && bl[i].free ? bl[i].len : 0);
  const hol = (i: number) => !!(bl[i] && bl[i].free && bl[i].hol);
  const dp: Float64Array[][] = [], from: Int32Array[][] = [];
  for (let r = 0; r <= n; r++) { dp.push([0, 1, 2].map(() => new Float64Array(B + 1).fill(NEG))); from.push([0, 1, 2].map(() => new Int32Array(B + 1).fill(-1))); }
  dp[0][0][0] = 0;
  for (let r = 0; r < n; r++) {
    const i = runs[r], cost = bl[i].len;
    for (let c = 0; c <= B; c++) for (let s = 0; s < 3; s++) {
      const v = dp[r][s][c]; if (v <= NEG / 2) continue;
      if (s !== 2 && v > dp[r + 1][0][c]) { dp[r + 1][0][c] = v; from[r + 1][0][c] = s; }
      if (ok(r) && c + cost <= B) {
        const gain = s ? cost + fr(i + 1) : fr(i - 1) + cost + fr(i + 1);
        const has = s === 1 || (s === 0 && hol(i - 1)) || hol(i + 1);
        const t = has ? 1 : 2, nv = v + 100 * gain - cost;
        if (nv > dp[r + 1][t][c + cost]) { dp[r + 1][t][c + cost] = nv; from[r + 1][t][c + cost] = s; }
      }
    }
  }
  let best = 0, bc = 0, bs = 0;
  for (let c = 0; c <= B; c++) for (let s = 0; s < 2; s++) if (dp[n][s][c] > best) { best = dp[n][s][c]; bc = c; bs = s; }
  const chosen: boolean[] = new Array(n).fill(false);
  for (let r = n, c = bc, s = bs; r > 0; r--) { const p = from[r][s][c]; if (s) { chosen[r - 1] = true; c -= bl[runs[r - 1]].len; } s = p < 0 ? 0 : p; }
  const out: Bridge[] = [];
  for (let r = 0; r < n; r++) {
    if (!chosen[r]) continue;
    let e = r; while (e + 1 < n && chosen[e + 1]) e++;
    out.push(mkBridge(st, bl, runs[r], runs[e])); r = e;
  }
  const leave = out.reduce((a, b) => a + b.leave, 0);
  return { blocks: out, leave, off: out.reduce((a, b) => a + b.off, 0), spare: B - leave };
}

/** Working days (Mon–Fri minus full-day public holidays) per month; null if the year is unknown. */
export function workingDays(st: State, y: number): number[] | null {
  if (!basis(st, y)) return null;
  const hol = offSet(st, [y]), out: number[] = [];
  for (let m = 1; m <= 12; m++) { let c = 0; for (let d = dayNum(y, m, 1); d < dayNum(y, m + 1, 1); d++) if (!isWeekend(d) && !hol.has(d)) c++; out.push(c); }
  return out;
}
export const weekdaysInYear = (y: number) => { let c = 0; for (let d = dayNum(y, 1, 1); d <= dayNum(y, 12, 31); d++) if (!isWeekend(d)) c++; return c; };
