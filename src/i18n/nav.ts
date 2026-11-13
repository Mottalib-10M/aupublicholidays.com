import { route, hasRoute, type Locale } from './routes';
import { GUIDES, guideById } from '../lib/pages';
import type { Group } from '../lib/page-types';
export interface NavLink { href: string; label: string } export interface NavCategory { label: string; links: NavLink[] }
const CORE: Record<string, string> = { home: 'Public holidays 2027', method: 'Method', about: 'About', widget: 'Embed the countdown', contact: 'Contact', editorial: 'Editorial policy', privacy: 'Privacy', terms: 'Legal notice', cookies: 'Cookies' };
/** `short`: top menu label (one or two words); `label`: full label. */
export const GROUPS: Array<{ id: Group; label: Record<Locale, string>; short: Record<Locale, string> }> = [
  { id: 'states', label: { en: 'Public holidays by state and territory' }, short: { en: 'By state' } },
  { id: 'days', label: { en: 'One holiday across Australia' }, short: { en: 'Holidays' } },
  { id: 'plan', label: { en: 'Long weekends, leave and school terms' }, short: { en: 'Plan' } },
  { id: 'local', label: { en: 'Show days and local holidays' }, short: { en: 'Local' } },
];
export const label = (id: string, _lang: Locale = 'en') => CORE[id] ?? guideById(id)?.en.nav ?? id;
const link = (id: string, lang: Locale): NavLink => ({ href: route(id, lang), label: label(id, lang) });
export const inGroup = (g: Group, lang: Locale): NavLink[] => GUIDES.filter((p) => p.group === g && hasRoute(p.id, lang)).map((p) => link(p.id, lang));
export function navCategories(lang: Locale, short = true): NavCategory[] {
  return GROUPS.map((g) => ({ label: (short ? g.short : g.label)[lang], links: g.id === 'states' ? [link('home', lang), ...inGroup(g.id, lang)] : inGroup(g.id, lang) })).filter((c) => c.links.length);
}
/** The method page is not in the top menu: it sits under each tool and in the footer. */
export const navDirect = (_lang: Locale): NavLink[] => [];
export const footerColumns = (lang: Locale): NavCategory[] => {
  const site = { label: 'This site', links: ['home', 'method', 'about', 'contact', 'editorial', 'widget', 'terms', 'privacy', 'cookies'].map((i) => link(i, lang)) };
  return [...GROUPS.map((g) => ({ label: g.label[lang], links: inGroup(g.id, lang) })), site];
};
/** The tools, one click from any page. */
export const popularLinks = (lang: Locale): NavLink[] => [link('home', lang), ...['next-public-holiday', 'long-weekends-2027', 'annual-leave-planner-2027'].filter((id) => hasRoute(id, lang)).map((id) => link(id, lang))];
