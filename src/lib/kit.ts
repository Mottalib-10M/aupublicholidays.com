/**
 * Writing kit: every date and figure in a page comes from here, never typed by hand.
 *   K.P                         dated parameters and sources (params-2026.json)
 *   K.holidays, K.dateOf …      public holidays (engine/holidays.ts)
 *   K.longWeekends, K.plan …    long weekends and leave (engine/leave.ts)
 *   K.terms, K.breaks, K.QLD_SHOW_2027 …  school terms and local holidays (engine/terms.ts)
 */
import P from '../data/params-2026.json';
import * as D from './engine/days';
import * as H from './engine/holidays';
import * as Lv from './engine/leave';
import * as Tm from './engine/terms';
import { LAST_UPDATED } from '../data/site-config';
export const KIT = { P, ...D, ...H, ...Lv, ...Tm, READ_ON: LAST_UPDATED };
export type Kit = typeof KIT;
