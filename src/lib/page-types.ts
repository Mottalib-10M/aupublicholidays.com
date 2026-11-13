/**
 * One page = ONE content file: `src/content/guides/<id>.ts`. Routes, menus, sitemap, schemas and internal links
 * read these files and nothing else.
 */
import type { Kit } from './kit';
import type { Lang } from './format';

export interface FAQ { q: string; a: string }
export interface MiniOpts { /** title */ t?: string; /** default values */ d?: Record<string, number>; /** link text */ c?: string; /** what the example assumes */ e?: string }

export interface Helpers extends Kit {
  lang: Lang;
  /** Internal link by page id. Unknown id = failing test. */
  a: (id: string, text: string) => string;
  table: (headers: string[], rows: Array<Array<string | number>>, caption?: string, align?: Array<'l' | 'r'>) => string;
  /** Link to a source of params-2026.json (key). */
  src: (key: string, text?: string) => string;
  ext: (url: string, text: string) => string;
  box: (title: string, html: string) => string;
  mini: (kind: string, opts?: MiniOpts) => string;
  n: (x: number, d?: number) => string;
  /** « 26 January 2027 » */
  day: (iso: string) => string;
  /** « Tuesday 26 January 2027 » */
  wday: (iso: string) => string;
  /** « Tuesday » */
  wd: (iso: string) => string;
  /** « Tue 26 Jan » */
  sd: (iso: string) => string;
}

export type Group = 'states' | 'days' | 'plan' | 'local';

export interface LangPage {
  slug: string;
  nav: string; card: string;
  /** 50 to 60 characters, key term first. */
  title: string;
  /** 150 to 160 characters. */
  description: string;
  h1: string; intro: string;
  /** ONE paragraph of 120 words or more: the direct answer, with figures. */
  resume: string;
  faqs: FAQ[];
  body: (h: Helpers) => string;
}
export interface GuideDef {
  id: string; group: Group; order: number;
  /** Tool at the top: a key of tool-specs.ts, or `countdown`. */
  tool: string;
  toolArg?: Record<string, number | string>;
  related: string[];
  /** Keys of params-2026.json > sources. */
  sources: string[];
  en: LangPage;
}
export const defineGuide = (p: GuideDef): GuideDef => p;
