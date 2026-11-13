import { defineGuide } from '../../lib/page-types';
import { K, D, DW, DM, N } from '../_k';
import { STATES, STATE_SHORT, STATE_NAME } from '../../lib/engine/holidays';
const S = STATES.filter((s) => K.terms(s, 2027));
const T = (s: typeof STATES[number]) => K.terms(s, 2027)!;
const first = [...S].sort((a, b) => T(a)[0].start.localeCompare(T(b)[0].start)), lastEnd = [...S].sort((a, b) => T(b)[3].end.localeCompare(T(a)[3].end));
export default defineGuide({
  id: 'school-terms-2027', group: 'plan', order: 25, tool: 'sc', toolArg: { state: 'nsw', year: 2027 },
  related: ['easter-2027', 'anzac-day-2027', 'annual-leave-planner-2027', 'long-weekends-2027'],
  sources: ['nsw-terms-2027', 'vic-terms', 'qld-terms', 'qld-future', 'wa-terms', 'sa-ph', 'tas-terms', 'act-terms', 'nt-terms'],
  en: {
    slug: 'school-terms-2027', nav: 'School terms 2027', card: 'Term dates and school holidays for six states',
    title: 'School terms 2027: term dates and holidays for each state',
    description: `School terms 2027 for NSW, Victoria, Queensland, WA, SA and Tasmania: the first and last day of each term, the holidays between them and the long weekends.`,
    h1: 'School terms 2027 by state',
    intro: `School terms 2027 start between ${D(T(first[0])[0].start)} and ${D(T(first[first.length - 1])[0].start)} depending on the state, and the year ends on ${D(T(lastEnd[0])[3].end)} at the latest.`,
    resume: `Each state's education department sets its own four terms for government schools, and the dates rarely match. In 2027 ${S.filter((s) => T(s)[0].start === '2027-01-27').map((s) => STATE_SHORT[s]).join(', ')} start on ${DW('2027-01-27')}, the day after Australia Day; Western Australia starts on ${DW(T('wa')[0].start)}, NSW on ${DW(T('nsw')[0].start)} and Tasmania on ${DW(T('tas')[0].start)}. Easter, early in 2027, falls inside term 1 in NSW, WA, South Australia and Tasmania, but marks the start of the holidays in Queensland and Victoria. The longest break is summer: in Queensland it runs from ${D(K.addDays(T('qld')[3].end, 1))}. The ACT and Northern Territory term dates are not shown, because their pages refused automated reading. Catholic and independent schools may use other dates, so check with your school before booking a trip.`,
    faqs: [
      { q: 'Do school holidays line up with the public holidays?', a: `Only by chance. Term dates are set by education departments, holidays by state laws. In 2027 the Anzac Day Monday falls in the NSW and WA school holidays but in term time in Queensland, and the WA King's Birthday on ${DM(K.dateOf('wa', 'kings', 2027)!.date)} lands in the spring break.` },
      { q: 'Are the NSW term dates the same across the whole state?', a: 'Not entirely. The dates shown are for the Eastern division, which covers most of NSW. Schools in the Western division, in the far west of the state, start term 1 later and finish term 4 earlier, on dates the department publishes separately. Check the NSW Department of Education calendar.' },
      { q: 'How are the South Australian terms worked out here?', a: 'From the school holiday periods listed on the SafeWork SA public holidays page: a term ends on the Friday before a holiday period and starts on the Monday after it, and the first day of the school year comes from the same page. The Department for Education calendar is the reference to confirm.' },
    ],
    body: (h) => `
<h2>School terms 2027 side by side</h2>
${h.table(['State', 'Term 1', 'Term 2', 'Term 3', 'Term 4'], S.map((s) => [STATE_NAME[s], ...T(s).map((t) => `${h.sd(t.start)} – ${h.sd(t.end)}`)]), 'Government school terms 2027 by state')}
<p>Sources: ${h.src('nsw-terms-2027', 'NSW Department of Education')}, ${h.src('vic-terms', 'Victorian Government')}, ${h.src('qld-terms', 'Queensland Department of Education')}, ${h.src('wa-terms', 'WA Department of Education')}, ${h.src('tas-terms', 'Tasmanian Department for Education, Children and Young People')} and, for South Australia, the holiday periods on ${h.src('sa-ph', 'SafeWork SA')}.</p>
${h.mini('term', { t: 'One term at a time', d: { st: 2, n: 3 }, e: 'Example: term 3 in Queensland' })}
<h2>Using the school holidays well</h2>
<p>Public holidays inside the school holidays give parents a free day of the break. In 2027 that happens with Easter in Queensland and Victoria, with the Anzac Day Monday in NSW and WA, and with the King's Birthday in Western Australia. The ${h.a('annual-leave-planner-2027', 'annual leave planner')} finds the best leave days; check them against the terms above.</p>`,
  },
});
