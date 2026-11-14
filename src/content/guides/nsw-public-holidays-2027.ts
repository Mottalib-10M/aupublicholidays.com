import { defineGuide } from '../../lib/page-types';
import { K, D, DW, DM, N, F, SUB, COUNT, WEEKDAY, WORK, LW, PLAN, PLAN_TXT } from '../_k';
const S = 'nsw', lw = LW(S), p3 = PLAN(S, 3), loc = K.NSW_LOCAL_2027, t1 = K.terms(S, 2027)!;
export default defineGuide({
  id: 'nsw-public-holidays-2027', group: 'states', order: 1, tool: 'st', toolArg: { state: S, year: 2027 },
  related: ['nsw-local-public-holidays-2027', 'long-weekends-2027', 'annual-leave-planner-2027', 'school-terms-2027'],
  sources: ['nsw-ph', 'nsw-local', 'nsw-terms-2027', 'nsw-copyright', 'fairwork-ph'],
  en: {
    slug: 'nsw-public-holidays-2027', nav: 'NSW public holidays 2027', card: `${N(COUNT(S))} days off, Anzac and Christmas additional days, the bank holiday`,
    title: 'NSW public holidays 2027: dates, extra days, long weekends',
    description: `NSW public holidays 2027 as the NSW Government lists them: ${N(COUNT(S))} days off with the weekday, the additional days for Anzac Day and Christmas, and ${N(lw.length)} long weekends.`,
    h1: 'NSW public holidays 2027',
    intro: `New South Wales has ${N(COUNT(S))} public holidays in 2027, ${N(WEEKDAY(S))} of them on a weekday, including two additional days after Christmas.`,
    resume: `The NSW Government lists ${N(COUNT(S))} statewide public holidays for 2027. They start with New Year's Day on ${DW('2027-01-01')} and Australia Day on ${DW(F(S, 'australia'))}. Easter runs four days, Good Friday ${D(F(S, 'goodfri'))} to Easter Monday ${D(F(S, 'eastermon'))}, and all four are public holidays in NSW. Anzac Day falls on ${DW('2027-04-25')}, so NSW adds ${DW(SUB(S, 'anzac')[0])} as an additional day. The King's Birthday is ${DW(F(S, 'kings'))} and Labour Day ${DW(F(S, 'labour'))}. Christmas Day is a Saturday and Boxing Day a Sunday, and the list adds ${DW(SUB(S, 'christmas')[0])} and ${DW(SUB(S, 'boxing')[0])}. The Bank Holiday on ${D(F(S, 'bank'))} closes banks only. That leaves ${N(WORK(S))} working days from Monday to Friday.`,
    faqs: [
      { q: 'Is Anzac Day 2027 a Monday off in NSW?', a: `Yes. Anzac Day itself is ${DW('2027-04-25')}, and the NSW Government lists ${DW(SUB(S, 'anzac')[0])} as an additional public holiday. Together with the weekend, that gives a three-day break from Saturday ${DM('2027-04-24')}, during the NSW school holidays for most of the state.` },
      { q: 'Is the August bank holiday a day off for everyone in NSW?', a: `No. The Bank Holiday on ${DW(F(S, 'bank'))} applies to banks and some financial institutions only. Shops, offices and schools open as normal, and it is not a public holiday for other employees unless their award or agreement says otherwise.` },
      { q: 'Are Easter Saturday and Easter Sunday public holidays in NSW?', a: `Yes. NSW lists all four days of Easter 2027 as public holidays: Good Friday ${DM(F(S, 'goodfri'))}, Easter Saturday ${DM(F(S, 'eastersat'))}, Easter Sunday ${DM(F(S, 'eastersun'))} and Easter Monday ${DM(F(S, 'eastermon'))}. It matters mostly for people who work weekends, because penalty rates under many awards follow the public holiday list.` },
      { q: 'Does my town have an extra local holiday in NSW?', a: `Some do. The NSW Government lists ${N(loc.length)} local public holidays for 2027, mostly show days and race days such as the Walcha Cup and the Parkes Show. They apply only in the named area, and some only for part of the day.` },
    ],
    body: (h) => `
<h2>NSW public holidays 2027 and the days around them</h2>
<p>The list above is the one the ${h.src('nsw-ph', 'NSW Government')} publishes, copied date by date under its CC BY 4.0 licence. The year opens with a long weekend: New Year's Day is a Friday, so ${h.day('2027-01-01')} to ${h.day('2027-01-03')} are free. Australia Day on a Tuesday is the opposite case: no long weekend unless you take ${h.wday('2027-01-25')} off, which gives four days in a row for one day of leave.</p>
<p>Easter is early in 2027 and falls in term 1: schools are open from ${h.day(t1[0].start)} to ${h.day(t1[0].end)}, so the term holidays start almost two weeks after Easter Monday. The April holidays then contain the Anzac Day weekend instead.</p>
${h.mini('leave', { t: 'How far does your NSW leave go in 2027?', d: { st: 0, leave: 3 }, e: 'Example for NSW with 3 leave days' })}
<h2>Long weekends in New South Wales</h2>
<p>NSW gets ${N(lw.length)} long weekends in 2027: ${lw.map((x) => `${h.sd(x.from)} (${N(x.days)} days)`).join(', ')}. Three days of leave placed where they go furthest give ${PLAN_TXT(p3)}. The ${h.a('long-weekends-2027', 'long weekends page')} compares NSW with the other states.</p>
<h2>What sits outside the statewide list</h2>
<p>Local holidays come on top. The ${h.a('nsw-local-public-holidays-2027', 'NSW local public holidays 2027')} page lists the ${N(loc.length)} show and race days of 2027, from the ${loc[0].event} on ${h.day(loc[0].date)} to the ${loc[loc.length - 1].event} on ${h.day(loc[loc.length - 1].date)}. They apply only in the named area. Whether you work on any public holiday, and at what rate, is set by the ${h.src('fairwork-ph', 'National Employment Standards')} and your award.</p>`,
  },
});
