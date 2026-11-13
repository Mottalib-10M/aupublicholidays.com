import { defineGuide } from '../../lib/page-types';
import { K, D, DW, DM, N } from '../_k';
import { STATES, STATE_SHORT } from '../../lib/engine/holidays';
const R = K.READ_ON;
const nx = STATES.map((s) => ({ s, h: K.upcoming(s, R, 3).filter((x) => x.date > R) }));
export default defineGuide({
  id: 'next-public-holiday', group: 'plan', order: 22, tool: 'countdown',
  related: ['long-weekends-2027', 'christmas-2027', 'public-holidays-2026', 'annual-leave-planner-2027'],
  sources: ['nsw-ph', 'qld-ph', 'wa-ph', 'sa-ph', 'mcv-2026', 'mcv-2027', 'tas-act', 'act-act', 'nt-act'],
  en: {
    slug: 'next-public-holiday', nav: 'Next public holiday', card: 'Live countdown, and whether today is a holiday where you are',
    title: 'Next public holiday in your state: countdown and today',
    description: 'Next public holiday in each Australian state or territory, counted down live to midnight in your state, whether today is a public holiday, and the school term.',
    h1: 'Next public holiday in your state',
    intro: 'Pick your state to see the next public holiday, a live countdown to midnight in your own time zone, and whether today is a public holiday.',
    resume: `The countdown reads the same holiday lists as the rest of the site and counts to midnight in the state you choose, using that state's time zone: Perth runs two or three hours behind Sydney, Adelaide and Darwin half an hour off the eastern states, and Brisbane does not use daylight saving. It then shows the next few holidays, including part-day ones such as Christmas Eve evening in Queensland, and where today sits in the school year. When these lists were read on ${D(R)}, the next public holiday was ${nx.map((x) => `${STATE_SHORT[x.s]}: ${x.h[0]?.name ?? 'none'} on ${x.h[0] ? DM(x.h[0].date) : '–'}`).join('; ')}. Nothing you choose is sent anywhere; the state stays in the page address only if you change it.`,
    faqs: [
      { q: 'Is today a public holiday in my state?', a: 'The box on the right answers that for the state you pick, using today’s date in that state, not in your device’s time zone. It says yes for a full-day public holiday, partly for an evening holiday such as Christmas Eve in South Australia, and no otherwise. Local show days are not included.' },
      { q: 'Why does the countdown differ between Perth and Sydney?', a: 'A public holiday starts at midnight local time. Perth is on Western Australian time, two hours behind Sydney in winter and three in summer, so the same holiday begins later there. The countdown uses each state’s own clock, so choosing WA or NSW changes the time left.' },
      { q: 'Can I put this countdown on my own website?', a: 'Yes. The embed page gives a short piece of code for clubs, schools and councils. Visitors choose their state, and the countdown moves on to later holidays by itself, as long as the state has published them and we have added them after checking.' },
    ],
    body: (h) => `
<h2>Next public holiday after ${h.day(R)}, state by state</h2>
${h.table(['State', 'Next holiday', 'Then'], nx.map((x) => [STATE_SHORT[x.s], x.h[0] ? `${x.h[0].name}, ${h.sd(x.h[0].date)}` : '–', x.h[1] ? `${x.h[1].name}, ${h.sd(x.h[1].date)}` : '–']), `The next public holidays as of ${h.day(R)}, when the lists were read`)}
<p>This table is fixed at the date the lists were read; the countdown above moves with your clock. Christmas is the next stop everywhere, and in 2026 it falls on a Friday, so Boxing Day is a Saturday and most states add ${h.wday('2026-12-28')}. The ${h.a('public-holidays-2026', 'rest of 2026')} page has the details.</p>
${h.mini('lw', { t: 'Long weekends after this one', d: { st: 0, y: 1 }, e: 'Example for NSW in 2027' })}
<h2>Embed or bookmark it</h2>
<p>The countdown is also available for other websites on the ${h.a('widget', 'embed page')}. To plan further ahead, the ${h.a('long-weekends-2027', 'long weekends 2027')} page lists every break of the year.</p>`,
  },
});
