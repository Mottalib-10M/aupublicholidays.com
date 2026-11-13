import { defineGuide } from '../../lib/page-types';
import { K, D, DW, DM, N, F } from '../_k';
import { STATES, STATE_SHORT } from '../../lib/engine/holidays';
const e = K.easterSunday(2027), g = K.gaussSteps(2027);
const noSat = STATES.filter((s) => !(K.holidays(s, 2027) ?? []).some((h) => h.id === 'eastersat'));
const inTerm = STATES.filter((s) => { const t = K.terms(s, 2027); return t && t[0].end >= F(s, 'eastermon'); });
const inBreak = STATES.filter((s) => { const t = K.terms(s, 2027); return t && t[0].end < F(s, 'goodfri'); });
const sh = (l: string[]) => l.map((s) => STATE_SHORT[s as keyof typeof STATE_SHORT]).join(', ');
export default defineGuide({
  id: 'easter-2027', group: 'days', order: 10, tool: 'ea', toolArg: { year: 2027 },
  related: ['long-weekends-2027', 'school-terms-2027', 'anzac-day-2027', 'tas-public-holidays-2027'],
  sources: ['nsw-ph', 'qld-ph', 'wa-ph', 'sa-ph', 'tas-act'],
  en: {
    slug: 'easter-2027', nav: 'Easter 2027', card: 'Good Friday to Easter Monday, state by state, with the school break',
    title: 'Easter 2027 Australia: Good Friday to Easter Monday dates',
    description: `Easter 2027 in Australia: Good Friday ${DM(F('nsw', 'goodfri'))} to Easter Monday ${DM(F('nsw', 'eastermon'))}, which states keep Saturday and Sunday, and where Easter falls in the school term.`,
    h1: 'Easter 2027 in Australia',
    intro: `Easter 2027 falls early: Good Friday is ${DW(F('nsw', 'goodfri'))} and Easter Monday ${DW(F('nsw', 'eastermon'))}, a four-day weekend in every state.`,
    resume: `Easter Sunday 2027 is ${D(e)}, eight days earlier than in 2026 and nineteen days earlier than in 2028. Good Friday, ${D(F('nsw', 'goodfri'))}, and Easter Monday, ${D(F('nsw', 'eastermon'))}, are public holidays in every state and territory, so everyone gets four days off from Friday to Monday. The difference is in the weekend days. Easter Saturday, ${D(F('nsw', 'eastersat'))}, is a public holiday everywhere except ${sh(noSat)}. Easter Sunday is one in every state and territory, Tasmania included for the first time in 2027. That matters mostly for people who work weekends, because their award may pay a public holiday rate. Easter also lands in the middle of the school term in ${sh(inTerm)}, but in the school holidays in ${sh(inBreak)}.`,
    faqs: [
      { q: 'How is the date of Easter worked out?', a: `Easter Sunday is the first Sunday after the Paschal full moon, the church's full moon on or after 21 March. In 2027 that full moon falls on ${g.OG <= 31 ? `${g.OG} March` : `${g.OG - 31} April`} and the following Sunday is ${D(e)}. We compute it with Gauss's formula and check it against Meeus's method.` },
      { q: 'Is Easter Saturday a public holiday in Western Australia in 2027?', a: `Not in 2027. Western Australia keeps Good Friday, Easter Sunday and Easter Monday. From 2028 the WA Government lists Easter Saturday as a public holiday too, on ${D(F('wa', 'eastersat', 2028))}. Tasmania does not have Easter Saturday as a public holiday either.` },
      { q: 'Are schools on holiday at Easter 2027?', a: `It depends on the state. Queensland and Victoria finish term 1 on ${DW(K.terms('qld', 2027)![0].end)}, so Easter starts the school holidays. NSW, WA, South Australia and Tasmania keep term 1 running until ${D(K.terms('nsw', 2027)![0].end)}, and their pupils return after Easter Monday.` },
      { q: 'When is Easter in 2028?', a: `Easter Sunday 2028 is ${D(K.easterSunday(2028))}, so Good Friday falls on ${D(F('qld', 'goodfri', 2028))} and Easter Monday on ${D(F('qld', 'eastermon', 2028))}. Anzac Day 2028 is a Tuesday, eight days after Easter Monday, which makes a short gap between the two holidays.` },
    ],
    body: (h) => `
<h2>Easter 2027 public holidays in each state</h2>
<p>The table in the tool shows which of the four Easter days each state treats as a public holiday. Two differences stand out. Western Australia and Tasmania leave Easter Saturday as an ordinary day, and Tasmania now joins the other states on Easter Sunday after its Act was amended in 2026. For most people working Monday to Friday, the result is the same everywhere: Friday ${h.day(F('nsw', 'goodfri'))} and Monday ${h.day(F('nsw', 'eastermon'))} off.</p>
${h.mini('leave', { t: 'Stretch Easter with annual leave', d: { st: 0, leave: 4 }, e: 'Example for NSW with 4 leave days' })}
<h2>Turning Easter into a longer break</h2>
<p>Four days of leave from ${h.wday(K.addDays(F('nsw', 'eastermon'), 1))} to ${h.wday(K.addDays(F('nsw', 'eastermon'), 4))} give ten days off in a row, from Good Friday to the following Sunday. In NSW, WA, Queensland, the ACT and the Northern Territory, Anzac Day comes four weeks later with a Monday off, a second short break. The ${h.a('annual-leave-planner-2027', 'annual leave planner')} works out the best combination for your state.</p>
<h2>Why Easter 2027 is early</h2>
<p>By Gauss's formula, the Paschal full moon of 2027 is on day ${g.OG} counted from 1 March, and the next Sunday comes ${g.OE} days later. In 2028 Easter falls on ${h.day(K.easterSunday(2028))}, so it slides back to mid-April and lines up with the April school holidays in most states. State lists such as those of ${h.src('nsw-ph', 'NSW')} and ${h.src('qld-ph', 'Queensland')} confirm the 2027 dates.</p>`,
  },
});
