import { defineGuide } from '../../lib/page-types';
import { K, D, DW, DM, N, F, SUB, COUNT, WEEKDAY, WORK, LW, PLAN, PLAN_TXT } from '../_k';
const S = 'sa', lw = LW(S), t = K.terms(S, 2027)!, p3 = PLAN(S, 3);
export default defineGuide({
  id: 'sa-public-holidays-2027', group: 'states', order: 5, tool: 'st', toolArg: { state: S, year: 2027 },
  related: ['christmas-2027', 'labour-day-2027', 'long-weekends-2027', 'school-terms-2027'],
  sources: ['sa-ph', 'fairwork-ph'],
  en: {
    slug: 'sa-public-holidays-2027', nav: 'SA public holidays 2027', card: 'Adelaide Cup Day, Proclamation Day and two part-day evenings',
    title: 'SA public holidays 2027: South Australia and Adelaide Cup',
    description: `SA public holidays 2027: ${N(COUNT(S))} days in South Australia by weekday, Adelaide Cup Day ${DM(F(S, 'adelaidecup'))}, Proclamation Day and the Christmas Eve and New Year's Eve nights.`,
    h1: 'SA public holidays 2027 in South Australia',
    intro: `South Australia has ${N(COUNT(S))} full-day public holidays in 2027 and two part-day ones, on the evenings of Christmas Eve and New Year's Eve.`,
    resume: `SafeWork SA lists South Australia's public holidays for 2027: New Year's Day on ${DW('2027-01-01')}, Australia Day on ${DW(F(S, 'australia'))}, Adelaide Cup Day on ${DW(F(S, 'adelaidecup'))}, the four days of Easter from ${D(F(S, 'goodfri'))} to ${D(F(S, 'eastermon'))}, Anzac Day on ${DW('2027-04-25')} with no additional day, the King's Birthday on ${DW(F(S, 'kings'))}, Labour Day on ${DW(F(S, 'labour'))}, Christmas Day on Saturday 25 December and Proclamation Day, which South Australia keeps on Boxing Day, Sunday 26 December. Because both fall at the weekend, ${DW(SUB(S, 'christmas')[0])} and ${DW(SUB(S, 'boxing')[0])} are added. Christmas Eve and New Year's Eve are public holidays from 7pm to midnight. In all, ${N(WEEKDAY(S))} full-day holidays fall on a weekday in 2027, leaving ${N(WORK(S))} working days.`,
    faqs: [
      { q: 'What is Proclamation Day in South Australia?', a: 'It marks the proclamation of the province of South Australia on 28 December 1836. South Australia now keeps it on 26 December, the same day as Boxing Day elsewhere, and its official list names the day Boxing Day / Proclamation Day. In 2027 it falls on a Sunday, with an additional day on Tuesday 28 December.' },
      { q: 'Is Adelaide Cup Day a holiday for the whole state?', a: `Yes. Adelaide Cup Day, ${DW(F(S, 'adelaidecup'))}, is a statewide public holiday in South Australia, not only in Adelaide. It falls on the same Monday as Labour Day in Victoria, Eight Hours Day in Tasmania and Canberra Day in the ACT.` },
      { q: 'Are the Christmas Eve and New Year’s Eve evenings paid as a public holiday?', a: 'From 7pm to midnight on both evenings, South Australia treats the hours as a public holiday. Whether you are paid a higher rate for a shift in those hours depends on your award or agreement; many retail and hospitality awards apply the public holiday rate to them.' },
    ],
    body: (h) => `
<h2>SA public holidays 2027 in order</h2>
<p>South Australia's list comes from ${h.src('sa-ph', 'SafeWork SA')}, the state's workplace regulator. Its year starts with New Year's Day on a Friday, then Australia Day on a ${h.wd(F(S, 'australia'))}. March brings Adelaide Cup Day on ${h.wday(F(S, 'adelaidecup'))}, and Easter follows from ${h.day(F(S, 'goodfri'))}. The Adelaide Cup long weekend and Easter fall in term 1, which runs from ${h.day(t[0].start)} to ${h.day(t[0].end)}.</p>
<p>Anzac Day stays on the Sunday in 2027 with no extra day. The second half of the year has the King's Birthday on ${h.wday(F(S, 'kings'))} and Labour Day on ${h.wday(F(S, 'labour'))}, in the school holidays just before term 4.</p>
${h.mini('lw', { t: 'Long weekends in South Australia', d: { st: 4, y: 1 }, e: 'Showing SA in 2027' })}
<h2>Long weekends in South Australia</h2>
<p>There are ${N(lw.length)} long weekends in 2027: ${lw.map((x) => `${h.sd(x.from)} (${N(x.days)} days)`).join(', ')}. Three days of leave placed well give ${PLAN_TXT(p3)}; the ${h.a('annual-leave-planner-2027', 'annual leave planner')} works this out for any number of days.</p>
<h2>Christmas 2027 in South Australia</h2>
<p>The Christmas period runs from Christmas Eve, a part-day holiday from 7pm on ${h.wday('2027-12-24')}, to Tuesday 28 December, the additional day for Proclamation Day. New Year's Eve, ${h.wday('2027-12-31')}, is again a part-day holiday from 7pm. See ${h.a('christmas-2027', 'Christmas 2027')} for the other states.</p>`,
  },
});
