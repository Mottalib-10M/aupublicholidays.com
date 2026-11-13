import { describe, it, expect } from 'vitest';
import { GUIDES } from '../src/lib/pages';
import { HOME } from '../src/content/home';
import { helpers } from '../src/lib/helpers';
import { PLANNED_GUIDES } from '../src/lib/planned';
import { runTool, SPECS } from '../src/lib/tool-specs';
import { getSpec } from '../src/lib/mini-specs';

const words = (s: string) => s.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
const pages = [{ id: 'home', title: HOME.title, description: HOME.description, resume: HOME.resume, faqs: HOME.faqs, intro: HOME.intro, h1: HOME.h1 }, ...GUIDES.map((g) => ({ id: g.id, ...g.en }))];
describe('content', () => {
  it('titles, descriptions, résumé and FAQ sizes', () => {
    const bad: string[] = [];
    for (const p of pages) {
      if (p.title.length < 50 || p.title.length > 60) bad.push(`${p.id} title ${p.title.length}`);
      if (p.description.length < 150 || p.description.length > 160) bad.push(`${p.id} description ${p.description.length}`);
      if (words(p.resume) < 120) bad.push(`${p.id} resume ${words(p.resume)}`);
      for (const f of p.faqs) { const w = words(f.a); if (w < 40 || w > 90) bad.push(`${p.id} faq ${w}: ${f.q}`); }
    }
    expect(bad).toEqual([]);
  });
  it('every FAQ question appears once on the site', () => {
    const qs = pages.flatMap((p) => p.faqs.map((f) => f.q.toLowerCase()));
    expect(qs.filter((q, i) => qs.indexOf(q) !== i)).toEqual([]);
  });
  it('bodies render and link only to known pages', () => {
    const h = helpers('en');
    for (const g of GUIDES) expect(g.en.body(h).length).toBeGreaterThan(500);
    expect(HOME.sections(h).length).toBeGreaterThan(3);
  });
  it('every planned page exists', () => { expect(PLANNED_GUIDES.filter((id) => !GUIDES.some((g) => g.id === id))).toEqual([]); });
  it('every tool and mini runs with its defaults', () => {
    for (const k of Object.keys(SPECS)) expect(runTool(k, 'en').value.length).toBeGreaterThan(0);
    for (const k of ['leave', 'lw', 'day', 'term']) { const s = getSpec(k); const v = Object.fromEntries(s.inputs.map((i) => [i.id, i.def])); expect(s.run(v).head[1].length).toBeGreaterThan(0); }
  });
});
