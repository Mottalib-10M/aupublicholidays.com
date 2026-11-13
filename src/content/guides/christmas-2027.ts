import { defineGuide } from '../../lib/page-types';
import { K, D, DW, DM, N, PLAN } from '../_k';
import { STATES, STATE_SHORT } from '../../lib/engine/holidays';
const sh = (l: string[]) => l.map((s) => STATE_SHORT[s as keyof typeof STATE_SHORT]).join(', ');
const eve = STATES.filter((s) => (K.holidays(s, 2027) ?? []).some((h) => h.id === 'xmaseve'));
const nye = STATES.filter((s) => (K.holidays(s, 2027) ?? []).some((h) => h.id === 'nye'));
const p3 = PLAN('nsw', 3);
export default defineGuide({
  id: 'christmas-2027', group: 'days', order: 16, tool: 'hd', toolArg: { hol: 'christmas', state: 'nsw', year: 2027 },
  related: ['long-weekends-2027', 'annual-leave-planner-2027', 'sa-public-holidays-2027', 'public-holidays-2028'],
  sources: ['nsw-ph', 'qld-ph', 'wa-ph', 'sa-ph', 'mcv-2027', 'tas-act', 'act-act', 'nt-act'],
  en: {
    slug: 'christmas-2027', nav: 'Christmas 2027', card: 'A Saturday: the additional days on 27 and 28 December',
    title: 'Christmas 2027 public holidays: 27 and 28 December extras',
    description: `Christmas 2027 public holidays: Christmas Day is a Saturday and Boxing Day a Sunday, so every state gives Monday 27 and Tuesday 28 December, plus evening ones.`,
    h1: 'Christmas 2027 public holidays and the additional days',
    intro: `Christmas 2027 public holidays fall at the weekend, so all eight states and territories give ${DW('2027-12-27')} and ${DW('2027-12-28')} as additional days.`,
    resume: `Christmas Day 2027 is ${DW('2027-12-25')} and Boxing Day ${DW('2027-12-26')}. When these two holidays fall at the weekend, every state and territory gives two weekdays instead: ${DW('2027-12-27')} and ${DW('2027-12-28')}. The legal mechanism varies. Most states add the Monday and Tuesday as additional days and keep the Saturday and Sunday as public holidays too, which matters for weekend workers. Tasmania adds the Monday for Christmas and moves Boxing Day itself to the Tuesday. South Australia calls 26 December Proclamation Day. On top of that, Christmas Eve is a public holiday in the evening in ${sh(eve)}, and New Year's Eve in ${sh(nye)}. For someone working Monday to Friday, the result is the same across the country: four days off from Saturday 25 to Tuesday 28 December, then New Year's Day 2028 on a Saturday.`,
    faqs: [
      { q: 'Is New Year’s Day 2028 a day off if it falls on a Saturday?', a: `Most states move or add it. ${sh(STATES.filter((s) => (K.holidays(s, 2028) ?? []).some((h) => h.id === 'newyear' && (h.flag === 'sub' || h.flag === 'obs'))))} list ${DW('2028-01-03')} as the New Year's Day holiday or an additional day. NSW and Victoria have not published 2028 yet, so their Monday is not shown here.` },
      { q: 'Do weekend workers get both the Saturday and the Monday as public holidays?', a: 'In states that add a day rather than move one, yes: Christmas Day stays a public holiday on the Saturday and the Monday is added. Someone rostered on the Saturday may be paid public holiday rates under their award. Where the holiday is moved, only the new day counts.' },
      { q: 'How many leave days does a long Christmas break need in 2027?', a: `Only three. With the additional days on 27 and 28 December and New Year's Day falling on a Saturday, leave from Wednesday 29 to Friday 31 December gives nine days off, from Christmas Day to Sunday 2 January 2028, and ten where Monday 3 January is a public holiday.` },
    ],
    body: (h) => `
<h2>Christmas 2027 public holidays in each state</h2>
<p>The tool lists the Christmas Day dates in each state. The ${h.src('nsw-ph', 'NSW')}, ${h.src('qld-ph', 'Queensland')} and ${h.src('wa-ph', 'WA')} lists add Monday 27 December for Christmas and Tuesday 28 December for Boxing Day; ${h.src('sa-ph', 'South Australia')} does the same for Proclamation Day. The ${h.src('mcv-2027', 'Victorian court calendar')} marks the same two days. ${h.src('tas-act', 'Tasmania')} adds the Monday and moves Boxing Day to the Tuesday, and the ${h.src('act-act', 'ACT')} and ${h.src('nt-act', 'NT')} Acts give both weekdays.</p>
${h.mini('day', { t: 'Christmas days off in your state', d: { h: 7, st: 5 }, e: 'Example: Christmas Day in Tasmania' })}
<h2>The evenings of Christmas Eve and New Year's Eve</h2>
<p>Queensland makes Christmas Eve a public holiday from 6pm to midnight; South Australia and the Northern Territory do it from 7pm, and do the same on New Year's Eve. These part-day holidays change pay for evening shifts under many awards, but they are not days off, and this site never counts them in long weekends or leave plans.</p>
<h2>Leave between Christmas and New Year</h2>
<p>Between the additional days and New Year's Day, only ${h.wday('2027-12-29')}, Thursday 30 and Friday 31 December are working days. Three days of leave there join Christmas to the New Year weekend. Across the whole year, the best use of three leave days in NSW gives ${N(p3.off)} days off; the ${h.a('annual-leave-planner-2027', 'annual leave planner')} shows where for your state.</p>`,
  },
});
