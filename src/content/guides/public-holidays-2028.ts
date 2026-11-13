import { defineGuide } from '../../lib/page-types';
import { K, D, DW, DM, N, F, COUNT, LW } from '../_k';
import { STATES, STATE_SHORT } from '../../lib/engine/holidays';
const Y = 2028, known = STATES.filter((s) => K.basis(s, Y)), missing = STATES.filter((s) => !K.basis(s, Y));
const sh = (l: string[]) => l.map((s) => STATE_SHORT[s as keyof typeof STATE_SHORT]).join(', ');
export default defineGuide({
  id: 'public-holidays-2028', group: 'plan', order: 23, tool: 'st', toolArg: { state: 'qld', year: 2028 },
  related: ['wa-public-holidays-2027', 'kings-birthday-2027', 'easter-2027', 'christmas-2027'],
  sources: ['qld-ph', 'wa-ph', 'sa-ph', 'tas-act', 'act-act', 'nt-act'],
  en: {
    slug: 'public-holidays-2028', nav: 'Public holidays 2028', card: 'What is already known, and what NSW and Victoria have not published',
    title: 'Public holidays 2028: dates published so far, by state',
    description: `Public holidays 2028 in Australia: dates already published or set by Act for ${sh(known)}, Easter ${DM(K.easterSunday(Y))}, and WA changes. NSW, VIC still to come.`,
    h1: 'Public holidays 2028 published so far',
    intro: `Public holidays 2028 are known for ${N(known.length)} states and territories; ${sh(missing)} have not published their 2028 lists yet, so nothing is shown for them.`,
    resume: `As of ${D(K.READ_ON)}, Queensland, Western Australia and South Australia have published their 2028 public holidays, and the Tasmanian, ACT and Northern Territory dates follow from their Acts. NSW and Victoria have not published 2028; their dates will appear here only once they do. The 2028 calendar is kinder than 2027 at Christmas, which falls on a Monday and Tuesday, but harsher at New Year: 1 January 2028 is a Saturday, and most states give ${DW('2028-01-03')} instead. Australia Day is a midweek holiday on ${DW('2028-01-26')}. Easter Sunday is ${D(K.easterSunday(Y))}, and Anzac Day falls on ${DW('2028-04-25')}, so no state needs an extra day. Western Australia changes most: Easter Saturday becomes a public holiday, the King's Birthday moves to June, WA Day to November, and a new Show Day is added.`,
    faqs: [
      { q: 'Why are NSW and Victorian 2028 public holidays not shown?', a: 'Neither government had published its 2028 list when we read the sources. Some holidays could be predicted from the rules, but a state can change a date or add a one-off holiday, as Victoria does each year for the Grand Final eve. We prefer to show nothing rather than a guess.' },
      { q: 'What is the new Show Day in Western Australia?', a: `The WA Government page lists a new public holiday from 2028, to be set by proclamation on the first Monday of the September and October school holidays. It shows ${DW(F('wa', 'showday', Y))} as the expected date, still to be confirmed by proclamation.` },
      { q: 'Is 2028 a leap year, and does it change the holidays?', a: 'Yes, 2028 has 366 days with a 29 February, which is a Tuesday. It moves no public holiday: fixed dates such as Anzac Day follow the calendar, and Monday holidays are counted from each month. It only adds one working day to the year.' },
    ],
    body: (h) => `
<h2>Public holidays 2028 counts by state</h2>
${h.table(['State', 'Full-day public holidays', 'Long weekends', 'Basis'], STATES.map((s) => [STATE_SHORT[s], K.basis(s, Y) ? COUNT(s, Y) : 'Not yet published', K.basis(s, Y) ? LW(s, Y).length : '–', K.basis(s, Y) === 'list' ? 'Government list' : K.basis(s, Y) === 'act' ? 'Worked out from the Act' : '–']), 'Public holidays 2028 known on the date the sources were read')}
<p>The tool shows Queensland by default; switch the state to see each list. The ${h.src('wa-ph', 'WA Government page')} is the one with the most changes, and the ${h.src('qld-ph', 'Queensland')} and ${h.src('sa-ph', 'South Australian')} lists follow their usual pattern.</p>
${h.mini('lw', { t: 'Long weekends in 2028', d: { st: 2, y: 2 }, e: 'Example for Queensland in 2028' })}
<h2>Easter and Anzac Day 2028</h2>
<p>Easter falls on ${h.day(K.easterSunday(Y))}, so Good Friday is ${h.day(F('qld', 'goodfri', Y))} and Easter Monday ${h.day(F('qld', 'eastermon', Y))}. Anzac Day follows eight days later on a ${h.wd('2028-04-25')}, which gives a short week. See ${h.a('easter-2027', 'Easter 2027')} for the year before.</p>`,
  },
});
