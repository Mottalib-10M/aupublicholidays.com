import { defineGuide } from '../../lib/page-types';
import { K, D, DW, DM, N, F, SUB, COUNT, WEEKDAY, WORK, LW, PLAN } from '../_k';
const S = 'act', lw = LW(S), p5 = PLAN(S, 5);
export default defineGuide({
  id: 'act-public-holidays-2027', group: 'states', order: 7, tool: 'st', toolArg: { state: S, year: 2027 },
  related: ['nsw-public-holidays-2027', 'long-weekends-2027', 'annual-leave-planner-2027', 'anzac-day-2027'],
  sources: ['act-act', 'act-cmtedd', 'fairwork-ph'],
  en: {
    slug: 'act-public-holidays-2027', nav: 'ACT public holidays 2027', card: 'Canberra Day, Reconciliation Day and the most long weekends',
    title: 'ACT public holidays 2027: Canberra Day, Reconciliation Day',
    description: `ACT public holidays 2027 from the Holidays Act 1958: ${N(COUNT(S))} days in Canberra with the weekday, Canberra Day ${DM(F(S, 'canberra'))}, Reconciliation Day ${DM(F(S, 'reconciliation'))}, ${N(lw.length)} long weekends.`,
    h1: 'ACT public holidays 2027 in Canberra',
    intro: `The Australian Capital Territory has ${N(COUNT(S))} public holidays in 2027 and ${N(lw.length)} long weekends, more than any state.`,
    resume: `Applying the ACT Holidays Act 1958 to 2027 gives these public holidays: New Year's Day on ${DW('2027-01-01')}, Australia Day on ${DW(F(S, 'australia'))}, Canberra Day on ${DW(F(S, 'canberra'))}, the four days of Easter from ${D(F(S, 'goodfri'))} to ${D(F(S, 'eastermon'))}, Anzac Day kept on ${DW(F(S, 'anzac'))} because 25 April is a Sunday, Reconciliation Day on ${DW(F(S, 'reconciliation'))}, the King's Birthday on ${DW(F(S, 'kings'))}, Labour Day on ${DW(F(S, 'labour'))}, and Christmas Day and Boxing Day, with ${DW(SUB(S, 'christmas')[0])} and ${DW(SUB(S, 'boxing')[0])} added because both fall at the weekend. The Bank Holiday on ${D(F(S, 'bank'))} applies to banks only. Of these holidays ${N(WEEKDAY(S))} fall on a weekday, which leaves ${N(WORK(S))} working days in Canberra in 2027.`,
    faqs: [
      { q: 'When is Reconciliation Day 2027 in the ACT?', a: `Reconciliation Day is the first Monday on or after 27 May, so in 2027 it is ${DW(F(S, 'reconciliation'))}. It began in 2018 and is the only public holiday of its kind in Australia. With the King's Birthday two weeks later, Canberra gets two June-time long weekends.` },
      { q: 'Is Canberra Day always in March?', a: `Yes. Canberra Day is the second Monday of March, ${DW(F(S, 'canberra'))} in 2027. It marks the naming of Canberra in 1913 and falls on the same Monday as Labour Day in Victoria, Eight Hours Day in Tasmania and Adelaide Cup Day in South Australia.` },
      { q: 'Could the ACT change how Anzac Day is kept?', a: 'A bill on Anzac Day was before the ACT Legislative Assembly in 2026, and we could not confirm whether it has passed. This page applies the Holidays Act as published on the ACT legislation register when we read it. If the Act changes, the ACT Government notice is the one that counts.' },
    ],
    body: (h) => `
<h2>ACT public holidays 2027 by season</h2>
<p>Canberra's year starts like NSW, with New Year's Day on a Friday and Australia Day on a Tuesday. March is where it parts ways: Canberra Day, the second Monday in March, falls on ${h.day(F(S, 'canberra'))}, nearly three weeks before Easter.</p>
<p>May and June are the richest months of any state or territory. Reconciliation Day on ${h.wday(F(S, 'reconciliation'))} and the King's Birthday on ${h.wday(F(S, 'kings'))} make two long weekends a fortnight apart. Labour Day comes in October, ${h.wday(F(S, 'labour'))}, on the same day as NSW and South Australia.</p>
${h.mini('leave', { t: 'Plan Canberra leave for 2027', d: { st: 6, leave: 5 }, e: 'Example for the ACT with 5 leave days' })}
<h2>Long weekends in the ACT</h2>
<p>The ACT has ${N(lw.length)} long weekends in 2027: ${lw.map((x) => `${h.sd(x.from)} (${N(x.days)} days)`).join(', ')}. Five days of leave placed well give ${N(p5.off)} days off. The ${h.a('annual-leave-planner-2027', 'annual leave planner')} shows the exact days.</p>
<h2>How these dates were worked out</h2>
<p>The ${h.src('act-cmtedd', 'ACT Government holidays page')} refused automated reading, so each date here comes from the ${h.src('act-act', 'Holidays Act 1958')}: fixed dates, Mondays counted from the calendar, and the rules for a holiday that falls at the weekend. A holiday the minister declares for one year only would not be in the Act; it appears on the government page and in the gazette. ACT school terms are not shown, as the education directorate page refused reading too.</p>`,
  },
});
