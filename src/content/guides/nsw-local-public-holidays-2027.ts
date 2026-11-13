import { defineGuide } from '../../lib/page-types';
import { K, D, DW, DM, N } from '../_k';
const L = K.NSW_LOCAL_2027;
const full = L.filter((x) => x.hours === 'full day');
export default defineGuide({
  id: 'nsw-local-public-holidays-2027', group: 'local', order: 31, tool: 'loc', toolArg: { set: 'nsw', place: 0 },
  related: ['nsw-public-holidays-2027', 'qld-show-holidays-2027', 'tas-regional-holidays-2027', 'annual-leave-planner-2027'],
  sources: ['nsw-local', 'nsw-ph', 'nsw-copyright'],
  en: {
    slug: 'nsw-local-public-holidays-2027', nav: 'NSW local public holidays 2027', card: `${L.length} show and cup days in country NSW, with their hours`,
    title: 'NSW local public holidays 2027: show and cup days by town',
    description: `NSW local public holidays 2027: the ${L.length} show and race days the NSW Government lists, from the ${L[0].event} to the ${L[L.length - 1].event}, with the area and hours of each.`,
    h1: 'NSW local public holidays 2027',
    intro: `The NSW local public holidays list for 2027 has ${N(L.length)} days, all in country towns, and most of them last only part of the day.`,
    resume: `New South Wales lets a council ask for a local public holiday for a show or race meeting, declared by the minister for a named area. The NSW Government list for 2027 has ${N(L.length)} of them: ${L.map((x) => `${x.event} (${DM(x.date)})`).join(', ')}. Only ${N(full.length)} ${full.length === 1 ? 'is' : 'are'} a full day; the rest run from midday or between set hours, such as 9am to 5pm. A local public holiday applies only to work in the area described, which may be a whole local government area, a few localities or the boundaries drawn on a council map. Outside that area it is an ordinary day. These days are in addition to the ${N(K.daysOff('nsw', 2027).length)} statewide holiday listings of NSW, and none of them makes a long weekend.`,
    faqs: [
      { q: 'Is a part-day local holiday paid like a public holiday?', a: 'For the hours it covers, yes: the local public holiday is a public holiday for work done in the area during those hours. Before and after them it is an ordinary working day. How the hours are paid depends on your award or agreement, so check it if your shift straddles the start time.' },
      { q: 'How does a town get a local public holiday in NSW?', a: 'The local council applies to the NSW Government, usually for a show or a race meeting, and the minister declares the holiday for the area and hours requested. The government then publishes it on its list of local public holidays, which is where these 2027 dates come from.' },
      { q: 'Why is the Albury Gold Cup only half a day?', a: `The council asked for a half-day holiday from midday, the hours of the race meeting. The Albury Gold Cup falls on ${DW(L.find((x) => x.event === 'Albury Gold Cup')!.date)}, so workers in the City of Albury finish at midday and get an early start to the weekend.` },
    ],
    body: (h) => `
<h2>NSW local public holidays 2027 with their hours</h2>
${h.table(['Date', 'Event', 'Hours'], L.map((x) => [h.wday(x.date), x.event, x.hours ?? '–']), 'Local public holidays 2027 declared for NSW areas')}
<p>The table follows the ${h.src('nsw-local', 'NSW Government list of local public holidays')}, used under ${h.src('nsw-copyright', 'CC BY 4.0')}. Pick an area in the tool above to read its full description, including links to council maps where the government gives them.</p>
${h.mini('leave', { t: 'Statewide leave planning in NSW', d: { st: 0, leave: 2 }, e: 'Example for NSW with 2 leave days' })}
<h2>Local holidays and the NSW calendar</h2>
<p>Most of these days fall midweek in winter and spring, far from the statewide holidays on the ${h.a('nsw-public-holidays-2027', 'NSW public holidays 2027')} page. The list may grow during the year as councils apply, so check the government page before planning around a local day.</p>`,
  },
});
