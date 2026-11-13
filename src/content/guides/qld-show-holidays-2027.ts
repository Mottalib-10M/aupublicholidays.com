import { defineGuide } from '../../lib/page-types';
import { K, D, DW, DM, N, F } from '../_k';
import { MONTHS } from '../../lib/dates';
const L = K.QLD_SHOW_2027, dates = [...new Set(L.map((x) => x.date))].sort();
const by = dates.map((d) => ({ d, n: L.filter((x) => x.date === d).length })).sort((a, b) => b.n - a.n);
const rqs = L.filter((x) => x.event === 'Royal Queensland Show'), ekka = F('qld', 'ekka');
const tw = L.find((x) => x.event.startsWith('Toowoomba'))!;
const idx = L.findIndex((x) => x.event.startsWith('Toowoomba'));
export default defineGuide({
  id: 'qld-show-holidays-2027', group: 'local', order: 30, tool: 'loc', toolArg: { set: 'qld', place: idx },
  related: ['qld-public-holidays-2027', 'nsw-local-public-holidays-2027', 'tas-regional-holidays-2027', 'long-weekends-2027'],
  sources: ['qld-show', 'qld-ph', 'qld-copyright'],
  en: {
    slug: 'qld-show-holidays-2027', nav: 'QLD show holidays 2027', card: `${L.length} show districts, from Stanthorpe in January to the Ekka in August`,
    title: 'QLD show holidays 2027: show day for each district',
    description: `QLD show holidays 2027: the show day of all ${L.length} Queensland districts on the government list, from ${DM(dates[0])} to ${DM(dates[dates.length - 1])}, including the Ekka on ${DM(ekka)}.`,
    h1: 'QLD show holidays 2027 by district',
    intro: `The 2027 list of QLD show holidays covers ${N(L.length)} districts on ${N(dates.length)} different days; pick your district to see its date.`,
    resume: `In Queensland, most districts get one show holiday a year, a public holiday that applies only within the district, set each year by the government for the local agricultural show. The 2027 list published by the Queensland Government has ${N(L.length)} entries on ${N(dates.length)} days, from the ${L[0].event} on ${DW(dates[0])} to ${DW(dates[dates.length - 1])}. The busiest date is ${DW(by[0].d)}, with ${N(by[0].n)} districts, most of them taking the Royal Queensland Show day outside Brisbane. Brisbane itself has the Ekka holiday on ${DW(ekka)}. Toowoomba's show day is ${DW(tw.date)}. A show holiday covers the area described in the list, which can be a whole council, part of a former shire or a postcode, so read the description carefully. Employers in the district apply it as a public holiday.`,
    faqs: [
      { q: 'Why do some districts take the Royal Queensland Show on a Monday?', a: `The Ekka holiday in Brisbane is ${DW(ekka)}, but ${N(rqs.length)} districts outside Brisbane, such as Moreton Bay and Redland, have their Royal Queensland Show holiday on ${DW(rqs[0].date)}. Councils choose the day for their area, and many prefer a Monday that makes a long weekend.` },
      { q: 'What if my district is not on the list?', a: 'Then it has no show holiday in 2027, or its council asked for a different arrangement. Some districts choose another local event or none at all. The Queensland Government page is updated when a date changes, so check it close to the day if you are planning around it.' },
      { q: 'Does a show holiday apply if I live in the district but work elsewhere?', a: 'As a rule the holiday follows where the work is done, not where you live. If you work in a district with a show holiday, it is a public holiday for that work; if you live there but work in Brisbane, your day off is the Brisbane one. Your award may add rules.' },
    ],
    body: (h) => `
<h2>QLD show holidays 2027 month by month</h2>
${h.table(['Month', 'Show holidays'], [...new Set(dates.map((d) => d.slice(0, 7)))].map((m) => [MONTHS[Number(m.slice(5)) - 1], L.filter((x) => x.date.startsWith(m)).length]), 'Number of Queensland show holidays in each month of 2027', ['l', 'r'])}
<p>The season runs from the summer shows of the Southern Downs, Stanthorpe first, to the last shows in ${MONTHS[Number(dates[dates.length - 1].slice(5, 7)) - 1]}. The list is the ${h.src('qld-show', 'Queensland Government 2027 show holiday list')}, used under ${h.src('qld-copyright', 'CC BY 4.0')}; we copy the district descriptions as written.</p>
${h.mini('lw', { t: 'Statewide long weekends in Queensland', d: { st: 2, y: 1 }, e: 'Example for Queensland in 2027' })}
<h2>Show holidays and the statewide list</h2>
<p>A show holiday adds to the ${h.a('qld-public-holidays-2027', 'QLD public holidays 2027')}; it never replaces one. With the Royal Queensland Show Monday on ${h.day(rqs[0].date)}, districts north of Brisbane get a long weekend in August, a month with no statewide holiday.</p>`,
  },
});
