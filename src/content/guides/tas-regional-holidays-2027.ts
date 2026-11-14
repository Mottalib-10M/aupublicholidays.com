import { defineGuide } from '../../lib/page-types';
import { K, D, DW, DM, N } from '../_k';
const L = K.tasRegional(2027), R = (e: string) => L.find((x) => x.event === e)!.date;
export default defineGuide({
  id: 'tas-regional-holidays-2027', group: 'local', order: 32, tool: 'loc', toolArg: { set: 'tas', place: 0 },
  related: ['tas-public-holidays-2027', 'qld-show-holidays-2027', 'nsw-local-public-holidays-2027', 'long-weekends-2027'],
  sources: ['tas-act', 'tas-worksafe'],
  en: {
    slug: 'tas-regional-holidays-2027', nav: 'TAS regional holidays 2027', card: 'Hobart Regatta, Recreation Day and the show days by area',
    title: 'TAS regional holidays 2027: Regatta, Recreation Day, shows',
    description: `TAS regional holidays 2027 from Schedule 1 of the Statutory Holidays Act: Royal Hobart Regatta ${DM(R('Royal Hobart Regatta'))}, Recreation Day ${DM(R('Recreation Day'))} and the show days by area.`,
    h1: 'TAS regional holidays 2027',
    intro: `Tasmania's ${N(L.length)} regional holidays for 2027 depend on where you work: the south has the Hobart Regatta in February, the rest of the state Recreation Day in November.`,
    resume: `Besides its statewide holidays, Tasmania gives each part of the state its own days under Schedule 1 of the Statutory Holidays Act 2000. Applied to 2027, they are the Royal Hobart Regatta on ${DW(R('Royal Hobart Regatta'))} in the south, the King Island Show on ${DW(R('King Island Show'))}, Agfest on ${DW(R('Agfest'))} in Circular Head, the Burnie Show on ${DW(R('Burnie Show'))}, the Royal Launceston Show on ${DW(R('Royal Launceston Show'))}, the Flinders Island Show on ${DW(R('Flinders Island Show'))}, the Royal Hobart Show on ${DW(R('Royal Hobart Show'))}, Recreation Day on ${DW(R('Recreation Day'))} for areas without the Regatta, and the Devonport Show on ${DW(R('Devonport Show'))}. The Act ties each date to a weekday rule, such as the second Monday of February for the Regatta, and an area may agree on another day with WorkSafe Tasmania.`,
    faqs: [
      { q: 'Which parts of Tasmania get the Hobart Regatta holiday?', a: `The south: the Act describes it as the part of the state south of and including Oatlands and Swansea, with some exceptions such as the West Coast. It falls on the second Monday of February, ${DW(R('Royal Hobart Regatta'))}. Everywhere else gets Recreation Day instead.` },
      { q: 'When is Recreation Day 2027?', a: `Recreation Day is the first Monday in November, ${DW(R('Recreation Day'))}. It applies to every part of Tasmania that does not observe the Royal Hobart Regatta, which in practice means the north and north-west, including Launceston, Devonport and Burnie.` },
      { q: 'Why are the Tasmanian show days on Thursdays and Fridays?', a: 'Schedule 1 sets most show days as the day before a given Saturday in October or November, matching the show programme. The Royal Launceston and Royal Hobart Shows take the Thursday, the Burnie, Flinders Island and Devonport Shows the Friday. Agfest takes the Friday after the first Thursday in May.' },
    ],
    body: (h) => `
<h2>TAS regional holidays 2027 in date order</h2>
${h.table(['Date', 'Holiday'], L.map((x) => [h.wday(x.date), x.event]), 'Regional holidays 2027 under Schedule 1 of the Statutory Holidays Act 2000')}
<p>Dates are worked out from the ${h.src('tas-act', 'Statutory Holidays Act 2000')} because the ${h.src('tas-worksafe', 'WorkSafe Tasmania page')} could not be checked directly. Pick an area in the tool above for its full description.</p>
${h.mini('lw', { t: 'Statewide long weekends in Tasmania', d: { st: 5, y: 1 }, e: 'Showing Tasmania in 2027' })}
<h2>Regatta or Recreation Day: one long weekend each</h2>
<p>Both main regional holidays are Mondays, so each region gets one more long weekend than the ${h.a('tas-public-holidays-2027', 'TAS public holidays 2027')} list shows. The Regatta weekend is in February, before Eight Hours Day; Recreation Day in November is the last Monday holiday of the year in the north.</p>`,
  },
});
