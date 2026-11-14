import { defineGuide } from '../../lib/page-types';
import { K, D, DW, DM, N, F } from '../_k';
const cup = F('vic', 'cup'), c26 = F('vic', 'cup', 2026), c28 = K.nthWeekday(2028, 11, 2, 1), gfn = F('vic', 'grandfinal'), t = K.terms('vic', 2027)!;
const p1 = K.plan('vic', 2027, 1, 'cup');
export default defineGuide({
  id: 'melbourne-cup-2027', group: 'days', order: 14, tool: 'lv', toolArg: { state: 'vic', leave: 1, year: 2027, near: 'cup' },
  related: ['vic-public-holidays-2027', 'annual-leave-planner-2027', 'long-weekends-2027', 'next-public-holiday'],
  sources: ['mcv-2027', 'mcv-2026', 'vic-business-2027', 'vic-copyright'],
  en: {
    slug: 'melbourne-cup-2027', nav: 'Melbourne Cup 2027', card: 'Cup Day on Tuesday 2 November and the Monday to bridge',
    title: 'Melbourne Cup 2027: Tuesday 2 November public holiday',
    description: `Melbourne Cup 2027 is ${DW(cup)}, a Victorian public holiday unless your council swaps it. A leave day on Monday ${DM(K.addDays(cup, -1))} makes four days off.`,
    h1: 'Melbourne Cup 2027 public holiday in Victoria',
    intro: `The Melbourne Cup 2027 public holiday is ${DW(cup)}; take the Monday off and you have four days in a row.`,
    resume: `Melbourne Cup Day is the first Tuesday in November, ${DW(cup)} in 2027, and a public holiday in Victoria. It falls on a Tuesday by design: the Cup has been run on the first Tuesday of November since 1876, and the holiday follows the race. That makes Monday ${D(K.addDays(cup, -1))} the obvious day to take off: one day of leave gives four days in a row, from ${DW(K.addDays(cup, -3))} to the Tuesday. The holiday covers the whole state except areas where a council outside metropolitan Melbourne has arranged a different local holiday, usually a show or local cup day. Outside Victoria, Cup Day is a normal working day, though many offices stop for the race in the afternoon. In 2026 it fell on ${D(c26)}.`,
    faqs: [
      { q: 'Is Melbourne Cup Day a public holiday outside Melbourne?', a: `It is a public holiday in every part of Victoria unless the local council has arranged a substitute day. Some councils outside metropolitan Melbourne replace it with their own show or cup day, and workers there get that day instead of ${DM(cup)}. Check your council's notice.` },
      { q: 'Is Melbourne Cup Day a holiday in other states?', a: 'No. Only Victoria declares it a public holiday. Elsewhere it is an ordinary working day; any time off to watch the race is a matter for your employer. NSW has local cup days of its own, such as the Albury Gold Cup, which apply only in their area.' },
      { q: 'When is the Melbourne Cup in 2028?', a: `By the first-Tuesday rule it falls on ${DW(c28)}. Victoria has not published its 2028 public holidays yet, so this site does not list it as a holiday until the government confirms it, as it does every year.` },
    ],
    body: (h) => `
<h2>Melbourne Cup 2027 and the four-day weekend</h2>
<p>The planner above is set for Victoria with one day of leave around Cup Day. Its best use gives ${N(p1.off)} days off. Cup week falls in term 4, which runs from ${h.day(t[3].start)} to ${h.day(t[3].end)}, so Victorian schools close on the Tuesday but are open on the Monday.</p>
${h.mini('leave', { t: 'Add more leave around Cup Day', d: { st: 1, leave: 4, near: 3 }, e: 'Example for Victoria with 4 leave days' })}
<h2>Spring public holidays in Victoria</h2>
<p>The Cup is Victoria's second spring holiday. The first is the Friday before the AFL Grand Final, shown in the ${h.src('mcv-2027', 'court calendar')} as ${h.day(gfn)} and still to be confirmed. After Cup Day the next Victorian public holiday is Christmas. The full list is on ${h.a('vic-public-holidays-2027', 'VIC public holidays 2027')}, and the ${h.src('vic-business-2027', 'Business Victoria page')} is where the government confirms the dates.</p>`,
  },
});
