/** Dates written the Australian way, built by hand so that server and browser print the same string. */
import { fromIso, weekday } from './engine/days';
const WD = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MO = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const p = (iso: string) => iso.split('-').map(Number);
/** « 26 January 2027 » */
export const dLong = (iso: string) => { const [y, m, d] = p(iso); return `${d} ${MO[m - 1]} ${y}`; };
/** « Tuesday 26 January 2027 » */
export const dWeek = (iso: string) => `${WD[weekday(fromIso(iso))]} ${dLong(iso)}`;
/** « Tuesday » */
export const wdLong = (iso: string) => WD[weekday(fromIso(iso))];
/** « Tue 26 Jan » */
export const dShort = (iso: string) => { const [, m, d] = p(iso); return `${WD[weekday(fromIso(iso))].slice(0, 3)} ${d} ${MO[m - 1].slice(0, 3)}`; };
/** « 26 January » */
export const dm = (iso: string) => { const [, m, d] = p(iso); return `${d} ${MO[m - 1]}`; };
/** « Sat 23 Jan – Tue 26 Jan 2027 » */
export const span = (a: string, b: string) => (a === b ? `${dShort(a)} ${a.slice(0, 4)}` : `${dShort(a)} – ${dShort(b)} ${b.slice(0, 4)}`);
export const days = (n: number) => `${n} day${n === 1 ? '' : 's'}`;
export const MONTHS = MO;
