import { defineGuide } from '../../lib/page-types';
import { K, D, DW, DM, N } from '../_k';
import { STATES, STATE_SHORT } from '../../lib/engine/holidays';
const kinds = (y: number) => STATES.map((s) => ({ s, h: (K.holidays(s, y) ?? []).filter((x) => x.id === 'anzac') }));
const k27 = kinds(2027);
const added = k27.filter((x) => x.h.some((h) => h.flag === 'sub')).map((x) => x.s);
const moved = k27.filter((x) => x.h.some((h) => h.flag === 'obs')).map((x) => x.s);
const kept = k27.filter((x) => x.h.length === 1 && !x.h[0].flag).map((x) => x.s);
const sh = (l: string[]) => l.map((s) => STATE_SHORT[s as keyof typeof STATE_SHORT]).join(', ');
export default defineGuide({
  id: 'anzac-day-2027', group: 'days', order: 11, tool: 'hd', toolArg: { hol: 'anzac', state: 'nsw', year: 2027 },
  related: ['easter-2027', 'long-weekends-2027', 'qld-public-holidays-2027', 'vic-public-holidays-2027'],
  sources: ['nsw-ph', 'qld-ph', 'qld-act', 'wa-ph', 'act-act', 'nt-act', 'mcv-2027', 'sa-ph', 'tas-act'],
  en: {
    slug: 'anzac-day-2027', nav: 'Anzac Day 2027', card: 'A Sunday: who gets Monday 26 April and who does not',
    title: 'Anzac Day 2027: is Monday 26 April a public holiday?',
    description: `Anzac Day 2027 falls on a Sunday. ${sh([...added, ...moved])} give Monday 26 April off, while ${sh(kept)} keep the Sunday only. Each state's rule, with its source.`,
    h1: 'Anzac Day 2027: Sunday 25 April, and the Monday',
    intro: `Anzac Day 2027 falls on a Sunday, so whether Monday 26 April is a public holiday depends on where you live: yes in ${N(added.length + moved.length)} states and territories, no in ${N(kept.length)}.`,
    resume: `Anzac Day is ${DW('2027-04-25')}. Dawn services, marches and two-up happen that Sunday everywhere, but the day off for workers follows three different rules. ${sh(added)} keep 25 April as a public holiday and add ${DW('2027-04-26')} as an additional day. ${sh(moved)} move the holiday itself to the Monday. ${sh(kept)} keep Anzac Day on the Sunday and give no weekday. The result is a long weekend from Saturday 24 to Monday 26 April in five states and territories and none in the other three. In 2028 the question does not arise: Anzac Day falls on a ${K.wdOf('2028-04-25') === 2 ? 'Tuesday' : 'weekday'}, ${D('2028-04-25')}, and is a public holiday in every state on the day itself.`,
    faqs: [
      { q: 'Why does Victoria not give Monday 26 April 2027 off?', a: `Victoria's Public Holidays Act keeps Anzac Day on 25 April and does not provide a substitute day when it falls on a weekend. The court calendar for 2027 marks only ${DW('2027-04-25')}. South Australia and Tasmania follow the same approach in 2027.` },
      { q: 'What is the difference between an additional day and a moved holiday?', a: 'With an additional day, as in NSW and WA, 25 April stays a public holiday and Monday is added, so weekend workers can claim both. With a moved holiday, as in Queensland, the ACT and the Northern Territory, the Monday replaces the Sunday as the public holiday.' },
      { q: 'Do shops close on Anzac Day morning?', a: 'Trading rules for Anzac Day morning are set by each state and differ from the holiday rules. Many states restrict trading until the early afternoon on 25 April itself, even when it falls on a Sunday. Check your state’s retail trading law before planning a shift.' },
    ],
    body: (h) => `
<h2>Anzac Day 2027 in each state</h2>
<p>The tool lists the day or days off in each state and territory. The pattern follows each state's own law: the ${h.src('nsw-ph', 'NSW')} and ${h.src('wa-ph', 'WA')} lists add an additional Monday, Queensland's ${h.src('qld-act', 'Holidays Act')} moves the holiday to Monday, and the ${h.src('act-act', 'ACT Holidays Act')} and the ${h.src('nt-act', 'NT Public Holidays Act')} do the same. Victoria, South Australia and Tasmania leave the Sunday alone.</p>
${h.mini('day', { t: 'Check Anzac Day in your state', d: { h: 4, st: 1 }, e: 'Showing Anzac Day in Victoria' })}
<h2>A long weekend in the April school holidays</h2>
<p>Where the Monday is off, Anzac Day 2027 makes a three-day weekend from ${h.day('2027-04-24')}. In NSW and WA it falls in the school holidays between term 1 and term 2; in Queensland pupils are already back in class, since term 2 started on ${h.day(K.terms('qld', 2027)![1].start)}. The ${h.a('long-weekends-2027', 'long weekends 2027')} page lists all of them.</p>
<h2>Anzac Day in 2026 and 2028</h2>
<p>In 2026 Anzac Day was a Saturday, and the same split applied: NSW and WA gave Monday 27 April, while ${sh(STATES.filter((s) => (K.holidays(s, 2026) ?? []).filter((x) => x.id === 'anzac').length === 1))} gave nothing. In 2028 it is a ${h.wd('2028-04-25')}, so every state has the day itself off with no extra day.</p>`,
  },
});
