import { defineGuide } from '../../lib/page-types';
import { K, D, DW, DM, N, PLAN, PLAN_TXT, SPAN } from '../_k';
import { STATES, STATE_SHORT, STATE_NAME } from '../../lib/engine/holidays';
const b1 = K.bridges('nsw', 2027, 1), p5 = PLAN('nsw', 5), p10 = PLAN('nsw', 10), p20 = PLAN('nsw', 20);
export default defineGuide({
  id: 'annual-leave-planner-2027', group: 'plan', order: 21, tool: 'lv', toolArg: { state: 'nsw', leave: 5, year: 2027 },
  related: ['long-weekends-2027', 'australia-day-2027', 'easter-2027', 'christmas-2027'],
  sources: ['nsw-ph', 'qld-ph', 'wa-ph', 'sa-ph', 'mcv-2027', 'fairwork-ph'],
  en: {
    slug: 'annual-leave-planner-2027', nav: 'Annual leave planner 2027', card: 'Where your leave days go furthest, for your state',
    title: 'Annual leave planner 2027: most days off for your leave',
    description: `Annual leave planner 2027 for each Australian state: enter your leave days and see where to take them. In NSW, 5 days give ${N(p5.off)} days off in total, 10 give ${N(p10.off)}.`,
    h1: 'Annual leave planner 2027',
    intro: `This annual leave planner finds where your leave days give the most time off in 2027: in NSW, 5 days of leave give ${PLAN_TXT(p5)}.`,
    resume: `The planner takes your state, the number of annual leave days you want to use and the year, then tests every way of placing them next to weekends and public holidays. It keeps the plan that gives the most days off in total, adding up every break, and on a tie the one that uses fewer leave days. Each break is shown with its own length, so you can see the longest one. In NSW in 2027, the best single day is ${DW(b1[0]?.leaveFrom ?? '2027-01-25')}, which joins a weekend to a holiday. Five leave days give ${N(p5.off)} days off in total, ten give ${N(p10.off)} and twenty give ${N(p20.off)}. Results differ by state because the holidays differ: with ten days, ${STATES.map((s) => `${STATE_SHORT[s]} ${N(PLAN(s, 10).off)}`).join(', ')}. The plan counts Monday to Friday as working days and only full-day public holidays of the state as days off; check your roster and award before booking.`,
    faqs: [
      { q: 'How many weeks of annual leave do Australian employees get?', a: 'Under the National Employment Standards, full-time and part-time employees get four weeks of paid annual leave a year, pro rata for part-time hours. Some shift workers get five weeks. Casual employees get no paid annual leave. Public holidays that fall during your leave are not taken out of it.' },
      { q: 'What is the best leave day in 2027?', a: `In most states it is Monday ${DM('2027-01-25')}, before Australia Day on a Tuesday: one day of leave gives four days off. Victorians have a second one on Monday ${DM('2027-11-01')}, before Melbourne Cup Day, and Queenslanders and Northern Territorians gain from the Anzac and May Day Mondays a week apart.` },
      { q: 'Does the planner know my school holidays or roster?', a: 'No. It assumes you work Monday to Friday and counts only full-day public holidays of your state. It does not know your rostered days off, shutdown periods, regional show days or school terms. Use it to find candidate dates, then check them against your roster and the term dates.' },
    ],
    body: (h) => `
<h2>Annual leave planner results for 2027</h2>
${h.table(['State', '5 leave days', '10 leave days', '15 leave days'], STATES.map((s) => [STATE_NAME[s], `${PLAN(s, 5).off} days off`, `${PLAN(s, 10).off} days off`, `${PLAN(s, 15).off} days off`]), 'Days off in total in 2027 for a given number of leave days, best placement, by state (several breaks added up)', ['l', 'r', 'r', 'r'])}
<p>In NSW the single-day bridges of 2027 come down to ${b1.map((b) => `${h.wday(b.leaveFrom)} (${N(b.off)} days off)`).join(', ')}. A bridge here is a working day between a weekend and a holiday; one day of leave there gives the best return of the year.</p>
${h.mini('leave', { t: 'Quick check for your state', d: { st: 0, leave: 3 }, e: 'Example for NSW with 3 leave days' })}
<h2>How the plan is built</h2>
<p>The year is split into runs of free days and runs of working days. Taking every day of a working run as leave joins the free days on either side. The planner tries every way of placing your leave, in runs of up to ten working days, and keeps the one that gives the most days off: the exact best answer, not a rule of thumb. Details are on the ${h.a('method', 'method')} page. Your right to take leave, and to refuse work on a public holiday, comes from the ${h.src('fairwork-ph', 'National Employment Standards')}.</p>`,
  },
});
