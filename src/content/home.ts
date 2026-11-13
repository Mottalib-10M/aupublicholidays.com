/** Home (pillar): public holidays 2027 in Australia, by state. Every date from the engine via _k.ts. */
import type { FAQ, Helpers } from '../lib/page-types';
import { K, D, DW, WD, DS, DM, N, F, SUB, COUNT, WEEKDAY, LW, PLAN } from './_k';
import { STATES, STATE_SHORT, STATE_NAME } from '../lib/engine/holidays';

interface Home {
  title: string; description: string; h1: string; intro: string; resume: string;
  facts: Array<{ k: string; v: string }>; toolsTitle: string; foldTitle: string; faqs: FAQ[];
  why: (h: Helpers) => string; sections: (h: Helpers) => Array<{ title: string; html: string }>;
  sources: string[];
}
const Y = 2027;
const counts = STATES.map((s) => COUNT(s));
const most = STATES.filter((s) => COUNT(s) === Math.max(...counts)), least = STATES.filter((s) => COUNT(s) === Math.min(...counts));
const au = F('nsw', 'australia'), gf = F('nsw', 'goodfri'), em = F('nsw', 'eastermon'), xm = '2027-12-25', bx = '2027-12-26';
const k14 = F('nsw', 'kings'), kQ = F('qld', 'kings'), kW = F('wa', 'kings');
const cup = F('vic', 'cup'), ekka = F('qld', 'ekka');
const p5 = PLAN('nsw', 5), p10 = PLAN('nsw', 10);
const lwN = LW('nsw').length;
const anzacMove = STATES.filter((s) => (K.holidays(s, Y) ?? []).some((h) => h.id === 'anzac' && (h.flag === 'sub' || h.flag === 'obs')));
const anzacStay = STATES.filter((s) => !anzacMove.includes(s));
const short = (l: string[]) => l.map((s) => STATE_SHORT[s as keyof typeof STATE_SHORT]).join(', ');

export const HOME: Home = {
  title: 'Public holidays 2027 by state: dates and long weekends',
  description: `Public holidays 2027 for all eight states and territories: each date with its weekday, the additional days for Christmas and Anzac Day, and ${N(lwN)} NSW long weekends.`,
  h1: 'Public holidays 2027 in every Australian state and territory',
  intro: `The public holidays of 2027 give between ${N(Math.min(...counts))} and ${N(Math.max(...counts))} days off depending on your state, and Christmas Day falls on a Saturday, so most states add Monday 27 and Tuesday 28 December.`,
  resume: `Australia has no single list of public holidays: each state and territory declares its own under its own Act. In 2027, ${short(most)} ${most.length > 1 ? 'have' : 'has'} the most full-day public holidays (${N(Math.max(...counts))} dates) and ${short(least)} the fewest (${N(Math.min(...counts))}). Seven days are shared by every state: New Year's Day on ${DW('2027-01-01')}, Australia Day on ${DW(au)}, Good Friday on ${D(gf)}, Easter Monday on ${D(em)}, Anzac Day, Christmas Day and Boxing Day. The year is awkward at both ends of the calendar. Anzac Day, ${DW('2027-04-25')}, moves to or gains a Monday in ${short(anzacMove)}, but not in ${short(anzacStay)}. Christmas Day is a Saturday and Boxing Day a Sunday, so most states give ${DW('2027-12-27')} and ${DW('2027-12-28')} instead. The King's Birthday is ${D(k14)} in most states, but ${D(kW)} in Western Australia and ${D(kQ)} in Queensland. In NSW, 5 days of leave placed well give ${N(p5.off)} days off in a row.`,
  facts: [
    { k: 'Most public holidays (2027)', v: `${N(Math.max(...counts))}, ${short(most)}` },
    { k: 'Easter 2027', v: `${DS(gf)} – ${DS(em)}` },
    { k: 'Christmas extra days', v: `${DS('2027-12-27')}, ${DS('2027-12-28')}` },
    { k: 'NSW long weekends', v: N(lwN) },
  ],
  toolsTitle: 'Tools to plan your days off',
  foldTitle: 'The 2027 calendar, topic by topic',
  faqs: [
    { q: 'How many public holidays are there in Australia in 2027?', a: `It depends on the state. Counting full-day public holidays on distinct dates, ${STATES.map((s) => `${STATE_SHORT[s]} has ${N(COUNT(s))}`).join(', ')}. Part-day holidays such as Christmas Eve evening in Queensland and South Australia, regional days such as the Ekka, and the NSW bank holiday are not counted.` },
    { q: 'Is there a national public holiday list that applies everywhere?', a: 'No. The Fair Work Act lists the national holidays an employee may be absent on, but it also counts any day a state or territory declares under its own law. Each state publishes its own list, so a worker in Perth and one in Hobart can have different days off in the same week.' },
    { q: 'Why do some states get a day off on 27 and 28 December 2027?', a: `Christmas Day 2027 is a Saturday and Boxing Day a Sunday. Most states replace a holiday that falls at the weekend with a weekday, so Monday ${DM('2027-12-27')} and Tuesday ${DM('2027-12-28')} become public holidays in most of the country. The exact rule differs, so check your state's page.` },
    { q: 'Which public holidays move from year to year?', a: `Easter moves with the moon: Good Friday is ${D(gf)} in 2027, and ${D(F('qld', 'goodfri', 2028))} in 2028. Holidays set as the n-th Monday of a month also move, such as the King's Birthday on ${D(k14)} in most states and Labour Day, which falls in March, May or October depending on the state.` },
    { q: 'Do I get paid if I work on a public holiday?', a: 'The National Employment Standards let you take a public holiday off unless your employer reasonably asks you to work. Any penalty rate comes from your award or agreement, not from the holiday list. The Fair Work Ombudsman explains how the rules apply to your job.' },
    { q: 'When is the next long weekend in 2027?', a: `In NSW the first long weekends of 2027 are New Year's Day, Friday ${DM('2027-01-01')} to Sunday ${DM('2027-01-03')}, then Easter, four days from ${D(gf)}. Australia Day falls on a Tuesday, so it needs a day of leave on Monday ${DM('2027-01-25')}.` },
  ],
  why: (h) => `
<h2>Public holidays 2027 that every state shares</h2>
<p>Seven public holidays exist in every state and territory, but the day off is not always the same. The table shows where each falls in 2027 and which states give an additional or moved day. The ${h.a('nsw-public-holidays-2027', 'NSW public holidays 2027')} page and the seven others list each state in full.</p>
${h.table(['Holiday', ...STATES.map((s) => STATE_SHORT[s])], ['newyear', 'australia', 'goodfri', 'eastermon', 'anzac', 'christmas', 'boxing'].map((id) => [K.HOL_NAME[id] ?? id, ...STATES.map((s) => (K.holidays(s, Y) ?? []).filter((x) => (x.id === id || (id === 'boxing' && x.id === 'proclamation')) && x.off).map((x) => DS(x.date)).join(' + ') || '–')]), 'Shared public holidays 2027: the day or days off in each state and territory')}
<p>Anzac Day is the one that splits the country. It falls on a Sunday in 2027; ${short(anzacMove)} give Monday ${DM('2027-04-26')}, while ${short(anzacStay)} keep the Sunday and add nothing. Christmas works the other way round: almost every state gives a weekday for both Christmas Day and Boxing Day, and the result is a four-day break from ${DW(xm)} to ${DW('2027-12-28')}.</p>
${h.mini('leave', { t: 'Make your annual leave go further', d: { st: 0, leave: 5 }, e: 'Example for NSW with 5 leave days' })}
<h3>Full-day public holidays 2027, state by state</h3>
<ol>${STATES.map((s) => `<li>${STATE_NAME[s]}: ${N(COUNT(s))} days, ${N(WEEKDAY(s))} of them Monday to Friday</li>`).join('')}</ol>
${h.box('Additional day or moved day?', `<p>An additional day is added on top of the holiday, which stays a public holiday on the weekend. A moved day replaces it. For someone working Monday to Friday the result is the same; for weekend workers it changes which day is paid as a public holiday.</p>`)}
<p>Every date on this site names its source at the foot of the page: the state government list for NSW, Queensland, Western Australia and South Australia, the ${h.src('mcv-2027', 'Magistrates’ Court of Victoria 2027 calendar')} for Victoria, and the holiday Act for Tasmania, the ACT and the Northern Territory.</p>`,
  sections: (h) => [
    { title: 'Days only one state keeps', html: `<p>Beyond the shared seven, each state adds its own. Victoria has Labour Day on ${D(F('vic', 'labour'))}, the Friday before the AFL Grand Final, provisionally ${D(F('vic', 'grandfinal'))}, and Melbourne Cup Day on ${DW(cup)}. Queensland has the Royal Queensland Show, the Ekka, on ${DW(ekka)} in the Brisbane area only. Western Australia keeps Western Australia Day on ${D(F('wa', 'waday'))}. South Australia has Adelaide Cup Day on ${D(F('sa', 'adelaidecup'))}, Canberra has Canberra Day on ${D(F('act', 'canberra'))} and Reconciliation Day on ${D(F('act', 'reconciliation'))}, and the Northern Territory has Picnic Day on ${D(F('nt', 'picnic'))}.</p><p>See ${h.a('melbourne-cup-2027', 'Melbourne Cup 2027')} and ${h.a('qld-show-holidays-2027', 'Queensland show holidays 2027')} for the local days.</p>` },
    { title: 'Labour Day and the King’s Birthday are on different dates', html: `<p>Labour Day is the clearest case of each state choosing its own date. Western Australia has it on ${D(F('wa', 'labour'))}, Victoria on ${D(F('vic', 'labour'))} (Tasmania calls the same day Eight Hours Day), Queensland on ${D(F('qld', 'labour'))} and the Northern Territory has May Day the same Monday, while NSW, the ACT and South Australia wait until ${D(F('nsw', 'labour'))}.</p><p>The King's Birthday follows the same pattern: ${D(k14)} in six states and territories, ${D(kW)} in Western Australia and ${D(kQ)} in Queensland. The pages on ${h.a('labour-day-2027', 'Labour Day 2027')} and the ${h.a('kings-birthday-2027', 'King’s Birthday 2027')} compare them side by side.</p>` },
    { title: 'Easter 2027 comes early', html: `<p>Easter Sunday is ${D(K.easterSunday(Y))}, eight days earlier than in 2026 (${D(K.easterSunday(2026))}). Good Friday, ${D(gf)}, and Easter Monday, ${D(em)}, are public holidays everywhere. Easter Saturday is one in every state except Western Australia and Tasmania, and Easter Sunday is now a public holiday in every state and territory, Tasmania included from 2027.</p>${h.mini('lw', { t: 'Long weekends in your state', d: { st: 0, y: 1 }, e: 'Example for NSW in 2027' })}<p>Early Easter also means it lands outside most school holidays: in NSW, term 1 runs until ${D(K.terms('nsw', Y)![0].end)}. The ${h.a('easter-2027', 'Easter 2027')} page shows every state.</p>` },
    { title: 'Long weekends and annual leave', html: `<p>A long weekend is three days or more off in a row thanks to a public holiday. NSW has ${N(lwN)} of them in 2027, two lasting four days (Easter and Christmas). Australia Day, a ${WD(au)}, is the best bridge of the year: one day of leave on ${D('2027-01-25')} gives four days off.</p><p>Using 5 days of leave where they go furthest gives ${N(p5.off)} days off in NSW; 10 days give ${N(p10.off)}. The ${h.a('annual-leave-planner-2027', 'annual leave planner')} does this for your state and your number of days, and the ${h.a('long-weekends-2027', 'long weekends 2027')} page lists every one.</p>${h.mini('day', { t: 'When is a 2027 holiday in your state?', d: { h: 4, st: 0 }, e: 'Example: Anzac Day in NSW' })}` },
    { title: 'School terms and public holidays', html: `<p>School terms are set by each education department and do not follow the public holidays. In 2027 Queensland and Victoria start on ${D(K.terms('qld', Y)![0].start)}, the day after Australia Day; NSW starts on ${D(K.terms('nsw', Y)![0].start)} and Western Australia on ${D(K.terms('wa', Y)![0].start)}. See ${h.a('school-terms-2027', 'school terms 2027')} for every state with published dates.</p>${h.mini('term', { t: 'Term dates in your state', d: { st: 0, n: 2 }, e: 'Example: term 2 in NSW' })}` },
    { title: 'What a public holiday means at work', html: `<p>Under the ${h.src('fairwork-ph', 'National Employment Standards')}, an employee is entitled to be absent on a public holiday and be paid for the ordinary hours they would have worked. An employer can ask you to work if the request is reasonable, and you can refuse if it is not. The ${h.src('fairwork-2027', 'Fair Work Ombudsman list for 2027')} repeats the state dates. Penalty rates, rosters and part-day holidays such as Christmas Eve from 6pm in Queensland are set by your award or agreement.</p><p>When a state adds a day by proclamation after this page was read, the gazette applies and this page shows it only after we have read it. Dates for ${STATE_NAME.nsw} and ${STATE_NAME.vic} in 2028 are not yet published; the ${h.a('public-holidays-2028', 'public holidays 2028')} page shows what is known.</p>` },
  ],
  sources: ['nsw-ph', 'qld-ph', 'wa-ph', 'sa-ph', 'mcv-2027', 'tas-act', 'act-act', 'nt-act', 'fairwork-ph', 'nsw-copyright', 'qld-copyright'],
};
