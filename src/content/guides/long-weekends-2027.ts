import { defineGuide } from '../../lib/page-types';
import { K, D, DW, DM, N, F, LW } from '../_k';
import { STATES, STATE_SHORT, STATE_NAME } from '../../lib/engine/holidays';
const c = STATES.map((s) => ({ s, n: LW(s).length }));
const max = Math.max(...c.map((x) => x.n)), min = Math.min(...c.map((x) => x.n));
const top = c.filter((x) => x.n === max).map((x) => x.s), low = c.filter((x) => x.n === min).map((x) => x.s);
const sh = (l: string[]) => l.map((s) => STATE_SHORT[s as keyof typeof STATE_SHORT]).join(', ');
const four = LW('nsw').filter((x) => x.days >= 4);
export default defineGuide({
  id: 'long-weekends-2027', group: 'plan', order: 20, tool: 'lw', toolArg: { state: 'nsw', year: 2027 },
  related: ['annual-leave-planner-2027', 'easter-2027', 'christmas-2027', 'act-public-holidays-2027'],
  sources: ['nsw-ph', 'qld-ph', 'wa-ph', 'sa-ph', 'mcv-2027', 'tas-act', 'act-act', 'nt-act'],
  en: {
    slug: 'long-weekends-2027', nav: 'Long weekends 2027', card: 'Every three- and four-day weekend, state by state',
    title: 'Long weekends 2027 in each state: dates and how many',
    description: `Long weekends 2027 by state: ${STATES.map((s) => `${STATE_SHORT[s]} ${LW(s).length}`).join(', ')}. Every three- and four-day weekend with its dates and the holiday behind it.`,
    h1: 'Long weekends 2027 in every state and territory',
    intro: `The number of long weekends in 2027 runs from ${N(min)} in ${sh(low)} to ${N(max)} in ${sh(top)}, counting every break of three days or more made by a public holiday.`,
    resume: `A long weekend here means three days off in a row or more, made by a full-day public holiday next to a Saturday or Sunday, without any leave. In 2027 the ACT is best served with ${N(LW('act').length)}, thanks to Canberra Day and Reconciliation Day, followed by Western Australia and the Northern Territory with ${N(LW('wa').length)}. NSW, Victoria, Queensland and South Australia have ${N(LW('nsw').length)} each; Tasmania has ${N(LW('tas').length)}, because Anzac Day 2027 stays on a Sunday and Tasmania has no October holiday. Every state shares three: New Year's Day from ${D('2027-01-01')}, Easter from ${DW(F('nsw', 'goodfri'))} and Christmas, four days from ${D('2027-12-25')}. Australia Day, a Tuesday, is not a long weekend unless you take the Monday off.`,
    faqs: [
      { q: 'Which state has the most long weekends in 2027?', a: `The ACT, with ${N(LW('act').length)}. Besides the shared ones it gets Canberra Day in March, Anzac Day moved to Monday, Reconciliation Day on ${DM(K.dateOf('act', 'reconciliation', 2027)!.date)}, the King's Birthday and Labour Day in October. Tasmania has the fewest, ${N(LW('tas').length)}, because its Anzac Day stays on the Sunday and its spring holiday is regional.` },
      { q: 'Does a regional holiday like the Ekka count as a long weekend?', a: 'Not here. The Ekka falls on a Wednesday in 2027 and covers the Brisbane area only, and show days apply only to their district. This page counts statewide full-day public holidays, so the result is the same for everyone in the state. Your local day may add one more.' },
      { q: 'Which long weekends last four days in 2027?', a: `Two, in every state: Easter, from Good Friday ${DM(four[0].from)} to Easter Monday ${DM(four[0].to)}, and Christmas, from Saturday ${DM(four[1].from)} to Tuesday ${DM(four[1].to)} thanks to the additional days. No other 2027 holiday reaches four days without leave, so these two are the natural base for a longer trip.` },
    ],
    body: (h) => `
<h2>Long weekends 2027 compared across states</h2>
${h.table(['State', 'Long weekends', 'Four days or more'], STATES.map((s) => [STATE_NAME[s], LW(s).length, LW(s).filter((x) => x.days >= 4).length]), 'Long weekends 2027 by state and territory', ['l', 'r', 'r'])}
<p>The tool above lists each state's long weekends with dates. Where they differ, the cause is always a state holiday: Labour Day falls in March in WA, Victoria and Tasmania, in May in Queensland and the NT, and in October in NSW, South Australia and the ACT. Anzac Day gives a Monday in five states and territories but not in Victoria, South Australia or Tasmania.</p>
${h.mini('lw', { t: 'Long weekends in another state or year', d: { st: 3, y: 1 }, e: 'Showing WA in 2027' })}
<h2>From long weekend to a real break</h2>
<p>A long weekend is the cheapest base for a holiday, because one or two leave days next to it double its length. Easter is the clearest case: four leave days in the week before Good Friday, or in the week after Easter Monday, give ten days off. The ${h.a('annual-leave-planner-2027', 'annual leave planner')} finds the best combination for any number of leave days in your state.</p>`,
  },
});
