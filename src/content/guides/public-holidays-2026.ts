import { defineGuide } from '../../lib/page-types';
import { K, D, DW, DM, N } from '../_k';
import { STATES, STATE_SHORT } from '../../lib/engine/holidays';
const R = K.READ_ON, Y = 2026;
const left = (s: typeof STATES[number]) => (K.holidays(s, Y) ?? []).filter((h) => h.date > R);
export default defineGuide({
  id: 'public-holidays-2026', group: 'plan', order: 24, tool: 'st', toolArg: { state: 'nsw', year: 2026 },
  related: ['next-public-holiday', 'christmas-2027', 'australia-day-2027', 'long-weekends-2027'],
  sources: ['nsw-ph', 'qld-ph', 'wa-ph', 'sa-ph', 'mcv-2026', 'tas-act', 'act-act', 'nt-act'],
  en: {
    slug: 'public-holidays-2026', nav: 'Public holidays 2026', card: 'Christmas 2026 and what is left of the year, by state',
    title: 'Public holidays 2026: Christmas and the rest of the year',
    description: 'Public holidays 2026 still to come in each state: Christmas Day on a Friday, Boxing Day on a Saturday, the Monday 28 December holiday and the evening ones.',
    h1: 'Public holidays 2026 still to come',
    intro: `The public holidays 2026 has left after ${D(R)} are the Christmas ones: Christmas Day on ${DW('2026-12-25')}, Boxing Day on ${DW('2026-12-26')} and, in every state, ${DW('2026-12-28')}.`,
    resume: `By mid-November 2026 every state has used its year's public holidays except Christmas. Christmas Day 2026 is a Friday, which gives a long weekend from ${D('2026-12-25')} to ${D('2026-12-28')}. Boxing Day falls on the Saturday, so states give ${DW('2026-12-28')}: NSW, Queensland, Western Australia, South Australia, the ACT and the Northern Territory add it as an extra day, while Victoria and Tasmania move Boxing Day to the Monday. Queensland also has Christmas Eve from 6pm, and South Australia and the Northern Territory have Christmas Eve and New Year's Eve from 7pm. New Year's Day 2027 is a Friday, so the next long weekend follows a week later. Before Christmas, nothing: Melbourne Cup Day, ${D(K.dateOf('vic', 'cup', Y)!.date)}, was the last other holiday of 2026.`,
    faqs: [
      { q: 'Is 28 December 2026 a public holiday?', a: 'Yes, in every state and territory. Boxing Day 2026 falls on a Saturday, and every state gives Monday 28 December instead, either as an additional day or by moving Boxing Day to it. South Australia calls the day Proclamation Day. Shops and services follow public holiday hours.' },
      { q: 'How many leave days for a break from Christmas 2026 to New Year?', a: 'Three. Christmas Day is a Friday and Monday 28 December is a public holiday, so leave on Tuesday 29, Wednesday 30 and Thursday 31 December joins it to New Year’s Day, Friday 1 January 2027, for ten days off from Christmas Day to Sunday 3 January.' },
      { q: 'Are there any public holidays left in November 2026?', a: 'No statewide ones. Melbourne Cup Day on 3 November was the last before Christmas in Victoria, and no other state has a November holiday. Tasmania’s Recreation Day on 2 November and the local show days were regional, so they applied only in their own area.' },
    ],
    body: (h) => `
<h2>Public holidays 2026 left in each state</h2>
${h.table(['State', 'Still to come in 2026'], STATES.map((s) => [STATE_SHORT[s], left(s).map((x) => `${x.name} (${h.sd(x.date)})`).join(', ')]), `Public holidays after ${h.day(R)}, the date the lists were read`)}
<p>The tool shows the whole 2026 year for each state, including the days already past. The lists come from the state governments and the ${h.src('mcv-2026', '2026 court calendar of Victoria')}.</p>
${h.mini('leave', { t: 'Then plan 2027', d: { st: 0, leave: 5 }, e: 'Example for NSW with 5 leave days' })}
<h2>Into 2027</h2>
<p>New Year's Day 2027 is ${h.wday('2027-01-01')}, then ${h.a('australia-day-2027', 'Australia Day')} on a Tuesday. The ${h.a('next-public-holiday', 'next public holiday')} countdown follows the dates live.</p>`,
  },
});
