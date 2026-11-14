import { defineGuide } from '../../lib/page-types';
import { K, D, DW, DM, N, F, SUB, COUNT, WEEKDAY, WORK, LW, PLAN, PLAN_TXT } from '../_k';
const S = 'nt', lw = LW(S), p4 = PLAN(S, 4);
export default defineGuide({
  id: 'nt-public-holidays-2027', group: 'states', order: 8, tool: 'st', toolArg: { state: S, year: 2027 },
  related: ['next-public-holiday', 'long-weekends-2027', 'christmas-2027', 'labour-day-2027'],
  sources: ['nt-act', 'nt-ph', 'fairwork-ph'],
  en: {
    slug: 'nt-public-holidays-2027', nav: 'NT public holidays 2027', card: 'May Day, Picnic Day in August, evenings of Christmas and New Year',
    title: 'NT public holidays 2027: Northern Territory and Picnic Day',
    description: `NT public holidays 2027 from the Public Holidays Act: ${N(COUNT(S))} days in the Northern Territory by weekday, May Day ${DM(F(S, 'mayday'))}, Picnic Day ${DM(F(S, 'picnic'))} and two evening holidays.`,
    h1: 'NT public holidays 2027 in the Northern Territory',
    intro: `The Northern Territory has ${N(COUNT(S))} full-day public holidays in 2027, including Picnic Day in August, found nowhere else in Australia.`,
    resume: `Under the Northern Territory Public Holidays Act 1981, the 2027 public holidays are New Year's Day on ${DW('2027-01-01')}, Australia Day on ${DW(F(S, 'australia'))}, the four days of Easter from ${D(F(S, 'goodfri'))} to ${D(F(S, 'eastermon'))}, Anzac Day kept on ${DW(F(S, 'anzac'))} because 25 April is a Sunday, May Day on ${DW(F(S, 'mayday'))}, the King's Birthday on ${DW(F(S, 'kings'))}, Picnic Day on ${DW(F(S, 'picnic'))}, and Christmas, with ${DW(SUB(S, 'christmas')[0])} and ${DW(SUB(S, 'boxing')[0])} added because Christmas Day and Boxing Day fall at the weekend. Christmas Eve and New Year's Eve are public holidays from 7pm to midnight. Show days in Darwin, Katherine, Tennant Creek and Alice Springs are set each year by notice for their region and are not shown here. ${N(WEEKDAY(S))} holidays fall on a weekday.`,
    faqs: [
      { q: 'What is Picnic Day in the Northern Territory?', a: `Picnic Day is the first Monday in August, ${DW(F(S, 'picnic'))} in 2027. It began as a day off for railway workers and is now a public holiday across the whole Territory, for most people a long weekend in the middle of the dry season. No state has an equivalent day.` },
      { q: 'Is May Day the NT version of Labour Day?', a: `Yes. The Northern Territory marks Labour Day as May Day, the first Monday in May: ${DW(F(S, 'mayday'))} in 2027. Queensland has its Labour Day on the same Monday, while the southern states keep theirs in March or October.` },
      { q: 'Are NT show days public holidays for everyone?', a: 'No. Each show day applies only to its region, such as Darwin or Alice Springs, and the date is set each year by notice in the government gazette. Those notices are not part of the Act, so they are not listed here; the NT Government page publishes them.' },
    ],
    body: (h) => `
<h2>NT public holidays 2027 through the dry season</h2>
<p>The Territory's calendar is spread more evenly than most. After Easter, ${h.day(F(S, 'goodfri'))} to ${h.day(F(S, 'eastermon'))}, comes Anzac Day, moved to ${h.wday(F(S, 'anzac'))}, then May Day a week later on ${h.wday(F(S, 'mayday'))}. The King's Birthday on ${h.wday(F(S, 'kings'))} and Picnic Day on ${h.wday(F(S, 'picnic'))} carry the dry season, the months when most Territorians travel.</p>
${h.mini('lw', { t: 'Long weekends in the Territory', d: { st: 7, y: 1 }, e: 'Showing the NT in 2027' })}
<h2>Long weekends in the Northern Territory</h2>
<p>The NT has ${N(lw.length)} long weekends in 2027: ${lw.map((x) => `${h.sd(x.from)} (${N(x.days)} days)`).join(', ')}. With four days of leave placed well you get ${PLAN_TXT(p4)}. The Anzac and May Day weekends sit a week apart, so four leave days between them join them into one break of ${N(K.daysBetween('2027-04-24', '2027-05-03') + 1)} days.</p>
<h2>Evening holidays and how the dates were found</h2>
<p>Christmas Eve, ${h.wday('2027-12-24')}, and New Year's Eve, ${h.wday('2027-12-31')}, are public holidays from 7pm to midnight under the ${h.src('nt-act', 'Public Holidays Act 1981')}. The ${h.src('nt-ph', 'NT Government page')} could not be checked directly, so all dates are worked out from that Act, version in force at 1 June 2023. A holiday added by notice after that date would not appear here.</p>`,
  },
});
