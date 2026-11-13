/** Where a mini-simulator's button leads: the page with the full tool on the same subject. */
import { ROUTES, route } from '../i18n/routes';
import type { Lang } from './format';
const TARGET: Record<string, string> = { leave: 'annual-leave-planner-2027', lw: 'long-weekends-2027', day: 'home', term: 'school-terms-2027', next: 'next-public-holiday' };
export const miniHref = (kind: string, lang: Lang, fallback: string) => { const id = TARGET[kind]; return id && ROUTES.some((r) => r.id === id) ? route(id, lang) : fallback; };
