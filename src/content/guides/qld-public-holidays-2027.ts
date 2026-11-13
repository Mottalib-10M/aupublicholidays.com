import { defineGuide } from '../../lib/page-types';
import { K, D, DW, DM, N, F, SUB, COUNT, WEEKDAY, WORK, LW, PLAN } from '../_k';
const S = 'qld', lw = LW(S), ekka = F(S, 'ekka'), show = K.QLD_SHOW_2027, t = K.terms(S, 2027)!, p5 = PLAN(S, 5);
const dates = new Set(show.map((x) => x.date)).size;
export default defineGuide({
  id: 'qld-public-holidays-2027', group: 'states', order: 3, tool: 'st', toolArg: { state: S, year: 2027 },
  related: ['qld-show-holidays-2027', 'kings-birthday-2027', 'labour-day-2027', 'school-terms-2027'],
  sources: ['qld-ph', 'qld-act', 'qld-show', 'qld-copyright', 'qld-terms'],
  en: {
    slug: 'qld-public-holidays-2027', nav: 'QLD public holidays 2027', card: 'Labour Day in May, King’s Birthday in October, the Ekka and show days',
    title: 'QLD public holidays 2027: Queensland dates and the Ekka',
    description: `QLD public holidays 2027 from the Queensland Government: ${N(COUNT(S))} days with the weekday, Anzac Day moved to Monday, Labour Day in May, the Ekka and ${N(show.length)} show days.`,
    h1: 'QLD public holidays 2027 in Queensland',
    intro: `Queensland has ${N(COUNT(S))} public holidays across the state in 2027, plus the Ekka in Brisbane and ${N(show.length)} show holidays in the regions.`,
    resume: `The Queensland Government lists these public holidays for 2027: New Year's Day on ${DW('2027-01-01')}, Australia Day on ${DW(F(S, 'australia'))}, Good Friday, Easter Saturday, Easter Sunday and Easter Monday from ${D(F(S, 'goodfri'))} to ${D(F(S, 'eastermon'))}, Anzac Day observed on ${DW(F(S, 'anzac'))} because 25 April is a Sunday, Labour Day on ${DW(F(S, 'labour'))}, the King's Birthday on ${DW(F(S, 'kings'))}, Christmas Day and Boxing Day, with ${DW(SUB(S, 'christmas')[0])} and ${DW(SUB(S, 'boxing')[0])} added because both fall at the weekend. Christmas Eve is a part-day public holiday from 6pm to midnight. The Royal Queensland Show holiday, the Ekka, is ${DW(ekka)} in the Brisbane area only. Queensland differs from the southern states on two counts: Labour Day comes in May and the King's Birthday in October.`,
    faqs: [
      { q: 'Why is Anzac Day 2027 on a Monday in Queensland?', a: `Under Queensland's Holidays Act, when 25 April falls on a Sunday the public holiday is the following Monday. In 2027 that is ${DW(F(S, 'anzac'))}. Services and marches still take place on Sunday 25 April; the Monday is the day off for workers.` },
      { q: 'Who gets the Ekka public holiday in 2027?', a: `The Royal Queensland Show holiday on ${DW(ekka)} applies in the Brisbane City Council area and the other districts the government lists for it. Elsewhere in Queensland it is a normal working day, and towns have their own show holiday on another date during the year.` },
      { q: 'Is Christmas Eve a public holiday in Queensland?', a: `Partly. From 6pm to midnight on ${DW('2027-12-24')}, Christmas Eve is a public holiday in Queensland. It matters for retail and hospitality workers on an evening shift, whose award may pay a public holiday rate for those hours.` },
      { q: 'When are the Queensland school holidays around Easter 2027?', a: `Term 1 ends on ${DW(t[0].end)} and term 2 starts on ${D(t[1].start)}, so the Easter weekend falls inside the school holidays in 2027. Anzac Day, observed on ${DM(F(S, 'anzac'))}, comes two weeks into term 2, so most pupils are back at school by then.` },
    ],
    body: (h) => `
<h2>QLD public holidays 2027: what is different in Queensland</h2>
<p>Queensland moves two holidays away from the national pattern. Labour Day is the first Monday of May, ${h.wday(F(S, 'labour'))}, rather than March or October. The King's Birthday is the first Monday of October, ${h.wday(F(S, 'kings'))}, rather than June. The result is a year with no public holiday at all between May and October for most of the state, except the local show day.</p>
<p>Anzac Day is handled by moving it: the ${h.src('qld-act', 'Holidays Act 1983')} makes the Monday the holiday when 25 April is a Sunday, which is why the list shows ${h.wday(F(S, 'anzac'))} and not the Sunday. New South Wales reaches the same Monday by adding a day, while Victoria, South Australia and Tasmania give nothing.</p>
${h.mini('leave', { t: 'Plan Queensland leave for 2027', d: { st: 2, leave: 5 }, e: 'Example for Queensland with 5 leave days' })}
<h2>Long weekends in Queensland</h2>
<p>Queensland has ${N(lw.length)} long weekends in 2027: ${lw.map((x) => `${h.sd(x.from)} (${N(x.days)} days)`).join(', ')}. Five days of leave placed well give ${N(p5.off)} days off. Term 1 ends on ${h.day(t[0].end)}, the day before Good Friday.</p>
<h2>Show holidays outside Brisbane</h2>
<p>Each show district in Queensland has its own show holiday, set every year by the government. The ${h.src('qld-show', '2027 list')} has ${N(show.length)} districts on ${N(dates)} different days, from ${h.day(show[0].date)} to ${h.day(show[show.length - 1].date)}. Find yours on ${h.a('qld-show-holidays-2027', 'Queensland show holidays 2027')}. Queensland Government material is used under ${h.src('qld-copyright', 'CC BY 4.0')}.</p>`,
  },
});
