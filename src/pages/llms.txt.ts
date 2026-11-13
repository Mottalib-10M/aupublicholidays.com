/** llms.txt (RECETTE §21), built from the page registry. */
import { GUIDES } from '../lib/pages';
import { SITE_URL, LAST_UPDATED, SITE_NAMES } from '../data/site-config';
import { route } from '../i18n/routes';
import { GROUPS } from '../i18n/nav';
import { STATES, STATE_SHORT, daysOff, holidays } from '../lib/engine/holidays';
export function GET() {
  const counts = STATES.map((s) => `${STATE_SHORT[s]} ${new Set(daysOff(s, 2027).map((h) => h.date)).size}`).join(', ');
  const nsw = (holidays('nsw', 2027) ?? []).filter((h) => h.off).map((h) => `${h.name} ${h.date}`).join(', ');
  const lines = [
    `# ${SITE_NAMES.en}`, '',
    `> Australian public holidays 2026-2028 for the eight states and territories, long weekends, annual leave planning, school terms, Queensland show holidays, NSW local holidays and Tasmanian regional holidays, in Australian English. NSW, QLD, WA and SA dates as published by each government; VIC from the 2026 and 2027 calendars of the Magistrates' Court of Victoria; TAS, ACT and NT worked out from their holiday Acts. Full-day public holidays in 2027 (distinct dates): ${counts}. NSW 2027: ${nsw}. NSW and VIC 2028 lists are not yet published and are not shown. Easter by Gauss's formula, cross-checked against Meeus for 1600-2600. Everything runs in the browser; nothing entered is sent. Independent site by Radif Partners, not a government service. Last updated ${LAST_UPDATED}.`, '',
    `## Public holidays 2027`, `- [Public holidays 2027 by state](${SITE_URL}${route('home', 'en')})`, '',
    ...GROUPS.flatMap((g) => [`## ${g.label.en}`, ...GUIDES.filter((p) => p.group === g.id).map((p) => `- [${p.en.nav}](${SITE_URL}${route(p.id, 'en')}): ${p.en.card}`), '']),
    '## About', `- [Method](${SITE_URL}${route('method', 'en')})`, `- [About](${SITE_URL}${route('about', 'en')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
