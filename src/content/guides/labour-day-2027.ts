import { defineGuide } from '../../lib/page-types';
import { K, D, DW, DM, N, F } from '../_k';
const L = { wa: F('wa', 'labour'), vic: F('vic', 'labour'), tas: F('tas', 'eighthours'), qld: F('qld', 'labour'), nt: F('nt', 'mayday'), nsw: F('nsw', 'labour') };
export default defineGuide({
  id: 'labour-day-2027', group: 'days', order: 13, tool: 'hd', toolArg: { hol: 'labour', state: 'vic', year: 2027 },
  related: ['vic-public-holidays-2027', 'qld-public-holidays-2027', 'wa-public-holidays-2027', 'long-weekends-2027'],
  sources: ['wa-ph', 'mcv-2027', 'tas-act', 'qld-ph', 'nt-act', 'nsw-ph', 'sa-ph', 'act-act'],
  en: {
    slug: 'labour-day-2027', nav: 'Labour Day 2027', card: 'March, May or October: four different Mondays',
    title: 'Labour Day 2027: March, May or October in your state',
    description: `Labour Day 2027 is on four Mondays: ${DM(L.wa)} in WA, ${DM(L.vic)} in Victoria and Tasmania, ${DM(L.qld)} in Queensland and the NT, ${DM(L.nsw)} in NSW, SA and the ACT.`,
    h1: 'Labour Day 2027 in each state',
    intro: `Labour Day 2027 is a Monday public holiday in every state, but on four different dates, from ${D(L.wa)} in Western Australia to ${D(L.nsw)} in NSW.`,
    resume: `Labour Day celebrates the eight-hour working day that Australian unions won in the 1850s, and each state marks it when its own campaign succeeded or when its Act says so. In 2027 Western Australia goes first on ${DW(L.wa)}. Victoria follows a week later on ${DW(L.vic)}, the same day Tasmania keeps as Eight Hours Day. Queensland has Labour Day on ${DW(L.qld)}, and the Northern Territory has May Day the same Monday. New South Wales, South Australia and the ACT wait for the first Monday in October, ${DW(L.nsw)}. Every version is a full-day public holiday across the state, so every state gets a long weekend from it, just not at the same time. The 8 March Monday in Victoria and Tasmania is also Adelaide Cup Day in South Australia and Canberra Day in the ACT.`,
    faqs: [
      { q: 'Why is Labour Day on different dates in each state?', a: `Each state's Labour Day marks the local fight for the eight-hour day and was set by its own law. Victoria and Tasmania kept a March date, Queensland and the Northern Territory chose early May, and NSW, South Australia and the ACT use October. No national law aligns them.` },
      { q: 'Is Eight Hours Day the same as Labour Day?', a: `Yes. Tasmania's Statutory Holidays Act calls it Eight Hours Day, held on the second Monday in March: ${DW(L.tas)} in 2027, the same day as Victoria's Labour Day. The name recalls the eight-hour working day the holiday was created to mark.` },
      { q: 'Which Labour Day falls in the school holidays in 2027?', a: `The October one does. In NSW, Labour Day on ${DM(L.nsw)} is the last Monday before term 4 starts on ${D(K.terms('nsw', 2027)![3].start)}. In South Australia it also falls in the break before term 4. The March and May dates fall during term.` },
    ],
    body: (h) => `
<h2>Labour Day 2027 dates side by side</h2>
<p>The tool gives the Labour Day date in each state. In order through the year: ${h.src('wa-ph', 'Western Australia')} on ${h.day(L.wa)}, ${h.src('mcv-2027', 'Victoria')} and ${h.src('tas-act', 'Tasmania')} on ${h.day(L.vic)}, ${h.src('qld-ph', 'Queensland')} and the ${h.src('nt-act', 'Northern Territory')} on ${h.day(L.qld)}, then ${h.src('nsw-ph', 'NSW')}, ${h.src('sa-ph', 'South Australia')} and the ${h.src('act-act', 'ACT')} on ${h.day(L.nsw)}.</p>
${h.mini('day', { t: 'Labour Day in your state', d: { h: 5, st: 3 }, e: 'Example: Labour Day in WA' })}
<h2>A March, May or October long weekend</h2>
<p>For a Victorian, Labour Day is the first long weekend after Australia Day, and Easter comes less than three weeks later. For a Queenslander, the May Labour Day follows Anzac Day by one week, so two Monday holidays sit in a row. In NSW the October Labour Day is the last public holiday before Christmas. See every long weekend on ${h.a('long-weekends-2027', 'long weekends 2027')}.</p>`,
  },
});
