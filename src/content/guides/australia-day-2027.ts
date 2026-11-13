import { defineGuide } from '../../lib/page-types';
import { K, D, DW, DM, N, WD, PLAN } from '../_k';
import { STATES } from '../../lib/engine/holidays';
const a = '2027-01-26';
const t1 = (s: 'qld' | 'vic' | 'nsw' | 'wa' | 'sa' | 'tas') => K.terms(s, 2027)![0].start;
export default defineGuide({
  id: 'australia-day-2027', group: 'days', order: 15, tool: 'hd', toolArg: { hol: 'australia', state: 'nsw', year: 2027 },
  related: ['long-weekends-2027', 'annual-leave-planner-2027', 'school-terms-2027', 'public-holidays-2026'],
  sources: ['nsw-ph', 'qld-ph', 'wa-ph', 'sa-ph', 'mcv-2027', 'tas-act', 'act-act', 'nt-act'],
  en: {
    slug: 'australia-day-2027', nav: 'Australia Day 2027', card: 'A Tuesday: the best bridge day of the year',
    title: 'Australia Day 2027: Tuesday 26 January and the bridge day',
    description: `Australia Day 2027 is ${DW(a)}, a public holiday in every state and territory. One leave day on Monday ${DM('2027-01-25')} gives four days in a row.`,
    h1: 'Australia Day 2027 public holiday',
    intro: `The Australia Day public holiday 2027 falls on ${DW(a)} in every state and territory, so no state moves it and there is no automatic long weekend.`,
    resume: `Australia Day is ${DW(a)}. It is a public holiday in all ${N(STATES.length)} states and territories, and because 26 January falls on a weekday no state moves it or adds a day. The Tuesday creates the best value leave day of 2027: take ${DW('2027-01-25')} off and you have four days in a row, from Saturday 23 to Tuesday 26 January. It also sits at the very end of the summer school holidays. Queensland, Victoria and South Australia start term 1 the next day, ${D(t1('qld'))}, while Western Australia starts on ${D(t1('wa'))} and NSW on ${D(t1('nsw'))}. In 2026 Australia Day was a Monday, and in 2028 it falls on a ${WD('2028-01-26')}, which gives a midweek holiday with no long weekend.`,
    faqs: [
      { q: 'Do I get a day off if Australia Day falls on a weekend?', a: 'Yes, in every state. When 26 January is a Saturday or a Sunday, the public holiday moves to the following Monday. That happens next in 2030, when 26 January is a Saturday. In 2027 it is a Tuesday, so the holiday stays on the day.' },
      { q: 'Is Monday 25 January 2027 a public holiday?', a: 'No. Monday 25 January is an ordinary working day in every state. It is simply the best bridge of the year: one day of annual leave between the weekend and Australia Day gives four days off. Many workplaces close that day, so ask early if you want it.' },
      { q: 'Is Australia Day a school day in 2027?', a: `No school is open on a public holiday. In Queensland, Victoria and South Australia the school year starts the next day, ${DW(t1('qld'))}. Tasmanian pupils start on ${D(t1('tas'))}, the latest start of the states with published dates.` },
    ],
    body: (h) => `
<h2>Australia Day 2027 in every state</h2>
<p>The tool shows the same date in all eight columns: ${h.wday(a)}. Australia Day is in each state's Act or list; ${h.src('nsw-ph', 'NSW')}, ${h.src('qld-ph', 'Queensland')}, ${h.src('wa-ph', 'Western Australia')} and ${h.src('sa-ph', 'South Australia')} publish it, and the ${h.src('tas-act', 'Tasmanian')}, ${h.src('act-act', 'ACT')} and ${h.src('nt-act', 'NT')} Acts set it on 26 January, moved to Monday only when it falls at the weekend.</p>
${h.mini('leave', { t: 'One leave day around Australia Day', d: { st: 0, leave: 1 }, e: 'Example for NSW with 1 leave day' })}
<h2>The first long weekend of 2027</h2>
<p>New Year's Day is a Friday, so the year opens with a three-day weekend. Australia Day then gives a second break if you take the Monday. With one day of leave, the planner finds ${N(PLAN('nsw', 1).off)} days off in NSW; the best single leave day of the year is on either side of a Tuesday or Thursday holiday, and 2027 has few of them. The ${h.a('long-weekends-2027', 'long weekends 2027')} page lists every break, state by state.</p>`,
  },
});
