import { defineGuide } from '../../lib/page-types';
import { K, D, DW, DM, N, F } from '../_k';
import { STATES, STATE_SHORT } from '../../lib/engine/holidays';
const k = F('nsw', 'kings'), kq = F('qld', 'kings'), kw = F('wa', 'kings');
const june = STATES.filter((s) => F(s, 'kings') === k);
const sh = (l: string[]) => l.map((s) => STATE_SHORT[s as keyof typeof STATE_SHORT]).join(', ');
export default defineGuide({
  id: 'kings-birthday-2027', group: 'days', order: 12, tool: 'hd', toolArg: { hol: 'kings', state: 'nsw', year: 2027 },
  related: ['qld-public-holidays-2027', 'wa-public-holidays-2027', 'long-weekends-2027', 'public-holidays-2028'],
  sources: ['nsw-ph', 'qld-ph', 'wa-ph', 'sa-ph', 'mcv-2027', 'tas-act', 'act-act', 'nt-act'],
  en: {
    slug: 'kings-birthday-2027', nav: 'King’s Birthday 2027', card: 'June in six states, September in WA, October in Queensland',
    title: "King's Birthday 2027: June, September or October by state",
    description: `King's Birthday 2027: ${DW(k)} in six states and territories, ${DM(kw)} in WA and ${DM(kq)} in Queensland, plus the 2028 dates already published.`,
    h1: "King's Birthday 2027 public holiday by state",
    intro: `The King's Birthday public holiday 2027 is ${DW(k)} in ${N(june.length)} states and territories, but ${D(kw)} in Western Australia and ${D(kq)} in Queensland.`,
    resume: `King Charles III was born on 14 November, yet no Australian state keeps his birthday in November. The holiday follows the old date of the Queen's Birthday, the second Monday in June, in ${sh(june)}: in 2027 that is ${DW(k)}, which happens to fall on 14 June. Western Australia sets its own date by proclamation, ${DW(kw)} in 2027, in the September school holidays. Queensland moved the holiday to the first Monday in October in 2016, so it falls on ${DW(kq)}, the same day as Labour Day in NSW, South Australia and the ACT. Every state gives a full day off and, because it is a Monday, a long weekend. The holiday applies to the whole state; there is no regional version.`,
    faqs: [
      { q: 'Why is the King’s Birthday not on the King’s real birthday?', a: 'The holiday has never followed the monarch’s real birthday. It took its June date under earlier monarchs and kept it when King Charles III, born on 14 November, succeeded in 2022. A November holiday would also crowd Melbourne Cup Day in Victoria.' },
      { q: 'When is the King’s Birthday in Queensland in 2027?', a: `It is ${DW(kq)}, the first Monday in October. Queensland moved it there in 2016 and moved Labour Day to May. The October long weekend falls in the Queensland spring school holidays, since term 4 starts on ${DW(K.terms('qld', 2027)![3].start)}.` },
      { q: 'Does Western Australia move the King’s Birthday in 2028?', a: `Yes. The WA Government list for 2028 shows the King's Birthday on ${DW(F('wa', 'kings', 2028))}, in line with most states, and Western Australia Day moved to ${D(F('wa', 'waday', 2028))}. A new Show Day is to be proclaimed for the first Monday of the spring school holidays.` },
    ],
    body: (h) => `
<h2>King's Birthday 2027 in each state and territory</h2>
<p>The tool shows the date in each state. Six use the second Monday of June, a rule written in their Acts or published lists: ${h.src('nsw-ph', 'NSW')}, ${h.src('mcv-2027', 'Victoria')}, ${h.src('sa-ph', 'South Australia')}, ${h.src('tas-act', 'Tasmania')}, ${h.src('act-act', 'the ACT')} and ${h.src('nt-act', 'the Northern Territory')}. ${h.src('qld-ph', 'Queensland')} uses the first Monday of October and ${h.src('wa-ph', 'Western Australia')} a proclaimed day.</p>
${h.mini('day', { t: "King's Birthday in your state", d: { h: 6, st: 2 }, e: "Example: King's Birthday in Queensland" })}
<h2>A long weekend in winter or spring</h2>
<p>In the six June states the long weekend runs from ${h.day(K.addDays(k, -2))} to ${h.day(k)}. In the ACT it comes two weeks after Reconciliation Day, so Canberra gets two winter long weekends. Queensland's October date lines up with the end of the spring school holidays, while Western Australia's falls inside them. The ${h.a('long-weekends-2027', 'long weekends')} page puts them in order.</p>
<h2>What changes in 2028</h2>
<p>The 2028 lists published so far show the June date in South Australia, Tasmania, the ACT and the Northern Territory (${h.day(F('sa', 'kings', 2028))}), ${h.day(F('qld', 'kings', 2028))} in Queensland, and a change in Western Australia, which moves the King's Birthday to June and WA Day to November. NSW and Victoria have not published 2028 yet; see ${h.a('public-holidays-2028', 'public holidays 2028')}.</p>`,
  },
});
