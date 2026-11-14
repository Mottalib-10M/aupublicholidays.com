import { defineGuide } from '../../lib/page-types';
import { K, D, DW, DM, N, F, SUB, COUNT, WEEKDAY, WORK, LW, PLAN, PLAN_TXT } from '../_k';
const S = 'vic', lw = LW(S), cup = F(S, 'cup'), gfn = F(S, 'grandfinal'), t = K.terms(S, 2027)!, p4 = PLAN(S, 4);
export default defineGuide({
  id: 'vic-public-holidays-2027', group: 'states', order: 2, tool: 'st', toolArg: { state: S, year: 2027 },
  related: ['melbourne-cup-2027', 'labour-day-2027', 'long-weekends-2027', 'school-terms-2027'],
  sources: ['mcv-2027', 'vic-business-2027', 'vic-copyright', 'vic-terms', 'fairwork-ph'],
  en: {
    slug: 'vic-public-holidays-2027', nav: 'VIC public holidays 2027', card: 'Labour Day in March, Grand Final eve, Melbourne Cup on a Tuesday',
    title: 'VIC public holidays 2027: Victoria, Cup Day, Grand Final',
    description: `VIC public holidays 2027: ${N(COUNT(S))} days in Victoria with the weekday, Labour Day ${DM(F(S, 'labour'))}, Melbourne Cup ${DM(cup)}, the Grand Final eve to confirm, Christmas extras.`,
    h1: 'VIC public holidays 2027 in Victoria',
    intro: `Victoria has ${N(COUNT(S))} public holidays in 2027 counting the Friday before the AFL Grand Final, which the government confirms once the fixture is set.`,
    resume: `Victoria's 2027 public holidays are New Year's Day on ${DW('2027-01-01')}, Australia Day on ${DW(F(S, 'australia'))}, Labour Day on ${DW(F(S, 'labour'))}, the four days of Easter from ${D(F(S, 'goodfri'))} to ${D(F(S, 'eastermon'))}, Anzac Day on ${DW('2027-04-25')} with no additional day, the King's Birthday on ${DW(F(S, 'kings'))}, the Friday before the AFL Grand Final, shown as ${D(gfn)} subject to confirmation, Melbourne Cup Day on ${DW(cup)}, and Christmas. Christmas Day falls on a Saturday and Boxing Day on a Sunday, so ${DW(SUB(S, 'christmas')[0])} and ${DW(SUB(S, 'boxing')[0])} are additional days. These dates come from the 2027 calendar of the Magistrates' Court of Victoria. Counting them all, ${N(WEEKDAY(S))} fall on a weekday and ${N(WORK(S))} working days remain.`,
    faqs: [
      { q: 'Does Victoria give a Monday off for Anzac Day 2027?', a: `No. Anzac Day falls on ${DW('2027-04-25')} and Victoria keeps it on that day, with no additional weekday. Victorians therefore have no long weekend in late April, unlike workers in NSW, Queensland, Western Australia, the ACT and the Northern Territory, who get Monday ${DM('2027-04-26')}.` },
      { q: 'When is the Grand Final public holiday in 2027?', a: `The holiday is the Friday before the AFL Grand Final. The court calendar shows ${DW(gfn)}, marked as subject to confirmation, because the Victorian Government confirms the date only once the AFL sets the Grand Final. If the match moves, the holiday moves with it.` },
      { q: 'Is Melbourne Cup Day a public holiday in all of Victoria?', a: `It is a statewide public holiday on ${DW(cup)}, except where a council outside metropolitan Melbourne has arranged a local holiday instead, often its own show or cup day. In those areas the local day replaces the Cup holiday for workers there.` },
      { q: 'When does the Victorian school year start in 2027?', a: `Term 1 starts on ${DW(t[0].start)}, the day after Australia Day, and ends on ${D(t[0].end)}, the day before Good Friday. Term 2 starts on ${D(t[1].start)}, so the Easter break lines up with the school holidays in 2027.` },
    ],
    body: (h) => `
<h2>VIC public holidays 2027 month by month</h2>
<p>March is busy in Victoria: Labour Day on ${h.wday(F(S, 'labour'))} gives a long weekend, and Easter follows less than three weeks later, from ${h.day(F(S, 'goodfri'))}. In 2027 the school term 1 ends the day before Good Friday, on ${h.day(t[0].end)}, and term 2 starts on ${h.day(t[1].start)}, so families get Easter and the school break together.</p>
<p>Spring holds the two days found nowhere else. The Friday before the AFL Grand Final has been a public holiday since 2015 and is shown here as ${h.day(gfn)}, the date the court calendar prints with a note that it is still to be confirmed. Melbourne Cup Day follows on ${h.wday(cup)}; a day of leave on ${h.wday('2027-11-01')} turns it into four days off.</p>
${h.mini('leave', { t: 'Plan Victorian leave around Easter', d: { st: 1, leave: 4, near: 1 }, e: 'Example for Victoria with 4 leave days' })}
<h2>Long weekends in Victoria</h2>
<p>Victoria has ${N(lw.length)} long weekends in 2027: ${lw.map((x) => `${h.sd(x.from)} (${N(x.days)} days)`).join(', ')}. Spread over the whole year rather than around Easter, four days of leave give ${PLAN_TXT(p4)}. The full comparison is on the ${h.a('long-weekends-2027', 'long weekends 2027')} page and Cup week has its own page, ${h.a('melbourne-cup-2027', 'Melbourne Cup 2027')}.</p>
<h2>Where the Victorian dates come from</h2>
<p>The Business Victoria page that lists public holidays could not be checked directly, so the dates here come from the ${h.src('mcv-2027', '2027 calendar of the Magistrates’ Court of Victoria')}, which marks each public holiday. The ${h.src('vic-business-2027', 'Business Victoria 2027 page')} stays the reference to check, especially for the Grand Final eve. Victoria’s government material is licensed under ${h.src('vic-copyright', 'CC BY 4.0')}.</p>`,
  },
});
