import { defineGuide } from '../../lib/page-types';
import { K, D, DW, DM, N, F, SUB, COUNT, WEEKDAY, WORK, LW, PLAN, PLAN_TXT } from '../_k';
const S = 'wa', lw = LW(S), t = K.terms(S, 2027)!, p2 = PLAN(S, 2);
export default defineGuide({
  id: 'wa-public-holidays-2027', group: 'states', order: 4, tool: 'st', toolArg: { state: S, year: 2027 },
  related: ['public-holidays-2028', 'labour-day-2027', 'kings-birthday-2027', 'long-weekends-2027'],
  sources: ['wa-ph', 'wa-terms', 'wa-edu-copyright', 'fairwork-ph'],
  en: {
    slug: 'wa-public-holidays-2027', nav: 'WA public holidays 2027', card: 'Labour Day in March, WA Day in June, King’s Birthday in September',
    title: 'WA public holidays 2027: Western Australia dates and WA Day',
    description: `WA public holidays 2027: ${N(COUNT(S))} days in Western Australia with the weekday, Labour Day ${DM(F(S, 'labour'))}, WA Day ${DM(F(S, 'waday'))}, King's Birthday ${DM(F(S, 'kings'))} and the 2028 changes.`,
    h1: 'WA public holidays 2027 in Western Australia',
    intro: `Western Australia has ${N(COUNT(S))} public holidays in 2027, ${N(WEEKDAY(S))} of them on a weekday, and is the only state where the King's Birthday falls in September.`,
    resume: `The WA Government lists these public holidays for 2027: New Year's Day on ${DW('2027-01-01')}, Australia Day on ${DW(F(S, 'australia'))}, Labour Day on ${DW(F(S, 'labour'))}, Good Friday on ${D(F(S, 'goodfri'))}, Easter Sunday and Easter Monday on ${D(F(S, 'eastersun'))} and ${D(F(S, 'eastermon'))}, Anzac Day on ${DW('2027-04-25')} with an additional day on ${DW(SUB(S, 'anzac')[0])}, Western Australia Day on ${DW(F(S, 'waday'))}, the King's Birthday on ${DW(F(S, 'kings'))}, and Christmas Day and Boxing Day with ${DW(SUB(S, 'christmas')[0])} and ${DW(SUB(S, 'boxing')[0])} as additional days. Easter Saturday is not a public holiday in Western Australia in 2027. The calendar changes from 2028: the same government page shows Easter Saturday as a public holiday and a new Show Day set by proclamation.`,
    faqs: [
      { q: 'Is Easter Saturday 2027 a public holiday in WA?', a: `No. In 2027 Western Australia keeps Good Friday, Easter Sunday and Easter Monday, but not Easter Saturday, ${DM('2027-03-27')}. The WA Government page shows Easter Saturday becoming a public holiday from 2028, when it falls on ${D(F(S, 'eastersat', 2028))}, the day before Easter Sunday.` },
      { q: 'When is WA Day in 2027?', a: `Western Australia Day is the first Monday of June, ${DW(F(S, 'waday'))}. It marks the founding of the Swan River Colony in 1829. For most workers it gives a long weekend, a week before the King's Birthday holiday of the other states.` },
      { q: 'Why is the King’s Birthday in September in Western Australia?', a: `WA sets the King's Birthday by proclamation, usually at the end of September or the start of October, instead of the June date used in most states. In 2027 it is ${DW(F(S, 'kings'))}. The 2028 list on the same page shows the King's Birthday on ${D(F(S, 'kings', 2028))}.` },
      { q: 'When does term 1 start in WA in 2027?', a: `Western Australian public schools start term 1 on ${DW(t[0].start)} and finish it on ${D(t[0].end)}, eleven days after Easter Monday. Term 2 starts on ${D(t[1].start)}, the day after the Anzac Day additional holiday, so the April break covers the long weekend.` },
    ],
    body: (h) => `
<h2>WA public holidays 2027 and the Perth calendar</h2>
<p>Western Australia starts its holidays early: Labour Day is the first Monday of March, ${h.wday(F(S, 'labour'))}, a week before Victoria and Tasmania. Easter follows on ${h.day(F(S, 'goodfri'))}, then Anzac Day, a Sunday, with Monday ${h.day(SUB(S, 'anzac')[0])} added. June brings WA Day on ${h.wday(F(S, 'waday'))}, and the King's Birthday closes the season on ${h.wday(F(S, 'kings'))}, in the school holidays between term 3 and term 4.</p>
${h.mini('leave', { t: 'Two leave days in WA, best placed', d: { st: 3, leave: 2 }, e: 'Example for WA with 2 leave days' })}
<h2>Long weekends in Western Australia</h2>
<p>WA has ${N(lw.length)} long weekends in 2027: ${lw.map((x) => `${h.sd(x.from)} (${N(x.days)} days)`).join(', ')}. Two days of leave placed well give ${PLAN_TXT(p2)}. The ${h.a('long-weekends-2027', 'long weekends page')} lists them next to the other states.</p>
<h2>What changes in 2028</h2>
<p>The ${h.src('wa-ph', 'WA Government page')} already shows 2028 with Easter Saturday as a public holiday and a new Show Day, to be set by proclamation for the first Monday of the September and October school holidays. The ${h.a('public-holidays-2028', 'public holidays 2028')} page has the dates as published. The WA Government's page terms do not allow commercial reproduction, so we give the dates as facts with a link; term dates come from the ${h.src('wa-terms', 'Department of Education')}, licensed under ${h.src('wa-edu-copyright', 'CC BY 4.0')}.</p>`,
  },
});
