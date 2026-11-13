import { defineGuide } from '../../lib/page-types';
import { K, D, DW, DM, N, F, SUB, COUNT, WEEKDAY, WORK, LW, PLAN } from '../_k';
const S = 'tas', lw = LW(S), reg = K.tasRegional(2027), t = K.terms(S, 2027)!, p4 = PLAN(S, 4);
const R = (e: string) => reg.find((x) => x.event === e)!.date;
export default defineGuide({
  id: 'tas-public-holidays-2027', group: 'states', order: 6, tool: 'st', toolArg: { state: S, year: 2027 },
  related: ['tas-regional-holidays-2027', 'easter-2027', 'christmas-2027', 'long-weekends-2027'],
  sources: ['tas-act', 'tas-worksafe', 'tas-terms', 'fairwork-ph'],
  en: {
    slug: 'tas-public-holidays-2027', nav: 'TAS public holidays 2027', card: 'Eight Hours Day, Easter Sunday for the first time, regional days',
    title: 'TAS public holidays 2027: Tasmania dates and Eight Hours Day',
    description: `TAS public holidays 2027 under Tasmania's holiday Act: ${N(COUNT(S))} days with the weekday, Eight Hours Day ${DM(F(S, 'eighthours'))}, Easter Sunday, the Regatta and Recreation Day.`,
    h1: 'TAS public holidays 2027 in Tasmania',
    intro: `Tasmania has ${N(COUNT(S))} statewide public holidays in 2027, the fewest of any state, and Easter Sunday becomes one for the first time.`,
    resume: `Tasmania's public holidays are set by the Statutory Holidays Act 2000. Applied to 2027, they are New Year's Day on ${DW('2027-01-01')}, Australia Day on ${DW(F(S, 'australia'))}, Eight Hours Day on ${DW(F(S, 'eighthours'))}, Good Friday on ${D(F(S, 'goodfri'))}, Easter Sunday on ${D(F(S, 'eastersun'))}, Easter Monday on ${D(F(S, 'eastermon'))}, Anzac Day on ${DW('2027-04-25')}, the King's Birthday on ${DW(F(S, 'kings'))}, and Christmas. Christmas Day falls on Saturday 25 December, so ${DW(SUB(S, 'christmas')[0])} is added, and Boxing Day, a Sunday, is kept on ${DW(F(S, 'boxing'))}. Easter Saturday is not a public holiday in Tasmania. On top of these, each region has one more day: the Royal Hobart Regatta on ${D(R('Royal Hobart Regatta'))} in the south, or Recreation Day on ${D(R('Recreation Day'))} in the rest of the state.`,
    faqs: [
      { q: 'Is Easter Sunday a public holiday in Tasmania in 2027?', a: `Yes, for the first time. An amendment to the Statutory Holidays Act made Easter Sunday a public holiday from October 2026, so ${DW(F(S, 'eastersun'))} is the first Easter Sunday holiday in Tasmania. Easter Saturday remains an ordinary day, unlike in most mainland states.` },
      { q: 'Does Tasmania give an extra day when Anzac Day is a Sunday?', a: `No. The Act keeps Anzac Day on 25 April whatever the day of the week, so in 2027 the holiday is ${DW('2027-04-25')} and Tasmanians get no Monday off. NSW, Queensland, WA, the ACT and the Northern Territory do give ${DM('2027-04-26')}.` },
      { q: 'Do I get the Hobart Regatta or Recreation Day?', a: `One or the other, depending on where you work. The Royal Hobart Regatta on ${DW(R('Royal Hobart Regatta'))} covers the south of the state, Recreation Day on ${DW(R('Recreation Day'))} covers the areas that do not observe the Regatta. Show days are added in some council areas.` },
      { q: 'Why does this page say the dates are worked out from the Act?', a: 'The Tasmanian government page that lists public holidays refused automated reading, so each date is computed from the sections of the Statutory Holidays Act 2000. Holidays declared by the minister for a single year are not in the Act and are not shown; check WorkSafe Tasmania before you book.' },
    ],
    body: (h) => `
<h2>TAS public holidays 2027 from the Act</h2>
<p>The ${h.src('tas-act', 'Statutory Holidays Act 2000')} sets the Tasmanian holidays in section 4 and its Schedule 1. New Year's Day and Australia Day move to the Monday when they fall at the weekend; in 2027 neither does. Eight Hours Day, Tasmania's name for Labour Day, is the second Monday in March, ${h.day(F(S, 'eighthours'))}.</p>
<p>Christmas is where the Act's substitution rules matter in 2027. Christmas Day is a Saturday, so the next Monday, ${h.day(SUB(S, 'christmas')[0])}, becomes a holiday as well; Boxing Day is a Sunday, so it is kept on the Tuesday, ${h.day(F(S, 'boxing'))}. The result matches the mainland: four days off from Saturday to Tuesday.</p>
${h.mini('leave', { t: 'Make Tasmanian leave go further', d: { st: 5, leave: 4 }, e: 'Example for Tasmania with 4 leave days' })}
<h2>Long weekends in Tasmania</h2>
<p>Tasmania has ${N(lw.length)} statewide long weekends in 2027: ${lw.map((x) => `${h.sd(x.from)} (${N(x.days)} days)`).join(', ')}. The regional Monday holidays add one more: the Regatta in the south or Recreation Day in the north. Four days of leave give ${N(p4.off)} days off. School term 1 runs from ${h.day(t[0].start)} to ${h.day(t[0].end)}.</p>
<h2>Regional holidays in Tasmania</h2>
<p>Schedule 1 of the Act gives ${N(reg.length)} regional holidays, from the Royal Hobart Regatta to the Devonport Show on ${h.day(R('Devonport Show'))}. Find your area on ${h.a('tas-regional-holidays-2027', 'Tasmanian regional holidays 2027')}. ${h.src('tas-worksafe', 'WorkSafe Tasmania')} publishes the yearly list and any one-off holiday.</p>`,
  },
});
