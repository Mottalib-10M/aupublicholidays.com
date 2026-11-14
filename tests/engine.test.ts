import { describe, it, expect } from 'vitest';
import { easterSunday, easterMeeus, wdOf, stateInstant, todayIn } from '../src/lib/engine/days';
import { holidays, STATES, tasRules, actRules, ntRules, basis, upcoming, onDate, weekdayCount } from '../src/lib/engine/holidays';
import { longWeekends, bridges, plan, workingDays } from '../src/lib/engine/leave';
import { terms, breaks, termStatus, QLD_SHOW_2027, NSW_LOCAL_2027, tasRegional } from '../src/lib/engine/terms';
import P from '../src/data/params-2026.json';

const dates = (a: Array<{ date: string }>) => a.map((h) => h.date);
describe('Easter', () => {
  it('matches known dates and Meeus for 1600-2600', () => {
    expect(easterSunday(2026)).toBe('2026-04-05');
    expect(easterSunday(2027)).toBe('2027-03-28');
    expect(easterSunday(2028)).toBe('2028-04-16');
    for (let y = 1600; y <= 2600; y++) expect(easterSunday(y)).toBe(easterMeeus(y));
  });
});
describe('Published lists (NSW, VIC, QLD, WA, SA)', () => {
  it('Easter dates in every published list match the engine', () => {
    for (const st of ['nsw', 'vic', 'qld', 'wa', 'sa'] as const) for (const y of [2026, 2027, 2028]) {
      const hs = holidays(st, y); if (!hs) continue;
      const e = easterSunday(y);
      const gf = hs.find((h) => h.id === 'goodfri')!; expect(gf.date).toBe(new Date(Date.parse(e) - 2 * 864e5).toISOString().slice(0, 10));
      expect(hs.find((h) => h.id === 'eastermon')!.date).toBe(new Date(Date.parse(e) + 864e5).toISOString().slice(0, 10));
    }
  });
  it('weekdays as printed by the governments', () => {
    expect(wdOf(holidays('nsw', 2027)!.find((h) => h.id === 'kings')!.date)).toBe(1);
    expect(holidays('qld', 2027)!.find((h) => h.id === 'anzac')!.date).toBe('2027-04-26');
    expect(holidays('vic', 2027)!.find((h) => h.id === 'cup')!.date).toBe('2027-11-02');
    expect(wdOf('2027-11-02')).toBe(2);
    expect(holidays('wa', 2027)!.some((h) => h.id === 'eastersat')).toBe(false);
    expect(holidays('wa', 2028)!.some((h) => h.id === 'eastersat')).toBe(true);
    for (const st of ['nsw', 'vic', 'qld', 'wa', 'sa'] as const) for (const y of [2026, 2027, 2028]) for (const h of holidays(st, y) ?? []) {
      if (['kings', 'labour', 'adelaidecup', 'waday', 'bank', 'eastermon'].includes(h.id) && !h.flag) expect(wdOf(h.date), `${st} ${h.id} ${h.date}`).toBe(1);
      if (h.flag === 'sub') expect([1, 2]).toContain(wdOf(h.date));
    }
  });
  it('NSW and VIC 2028 are not invented', () => {
    expect(holidays('nsw', 2028)).toBeNull();
    expect(holidays('vic', 2028)).toBeNull();
    expect(basis('qld', 2029)).toBeNull();
  });
});
describe('Rules from the Acts (TAS, ACT, NT)', () => {
  it('ACT 2027: Canberra Day 8 March, Reconciliation Day 31 May, Christmas and Boxing additional days', () => {
    const a = actRules(2027);
    expect(a.find((h) => h.id === 'canberra')!.date).toBe('2027-03-08');
    expect(a.find((h) => h.id === 'reconciliation')!.date).toBe('2027-05-31');
    expect(a.find((h) => h.id === 'anzac')!.date).toBe('2027-04-26');
    expect(dates(a.filter((h) => h.flag === 'sub'))).toEqual(['2027-12-27', '2027-12-28']);
    expect(actRules(2028).find((h) => h.id === 'newyear' && h.flag === 'sub')!.date).toBe('2028-01-03');
  });
  it('NT 2027: May Day 3 May, Picnic Day 2 August, part-day eves', () => {
    const n = ntRules(2027);
    expect(n.find((h) => h.id === 'mayday')!.date).toBe('2027-05-03');
    expect(n.find((h) => h.id === 'picnic')!.date).toBe('2027-08-02');
    expect(n.filter((h) => h.flag === 'part').length).toBe(2);
    expect(dates(n.filter((h) => h.flag === 'sub'))).toEqual(['2027-04-26' === '' ? '' : '2027-12-27', '2027-12-28'].filter(Boolean));
    expect(ntRules(2026).find((h) => h.id === 'boxing' && h.flag === 'sub')!.date).toBe('2026-12-28');
  });
  it('TAS: Eight Hours Day 8 March 2027, Easter Sunday only from 2027, Anzac Day never moves', () => {
    const t = tasRules(2027);
    expect(t.find((h) => h.id === 'eighthours')!.date).toBe('2027-03-08');
    expect(t.some((h) => h.id === 'eastersun')).toBe(true);
    expect(tasRules(2026).some((h) => h.id === 'eastersun')).toBe(false);
    expect(t.find((h) => h.id === 'anzac')!.date).toBe('2027-04-25');
    expect(dates(t.filter((h) => h.date >= '2027-12-24'))).toEqual(['2027-12-25', '2027-12-27', '2027-12-28']);
  });
  it('TAS regional 2027: Regatta 8 Feb, Recreation Day 1 Nov, Hobart Show 21 Oct, Launceston Show 7 Oct', () => {
    const r = Object.fromEntries(tasRegional(2027).map((x) => [x.event, x.date]));
    expect(r['Royal Hobart Regatta']).toBe('2027-02-08');
    expect(r['Recreation Day']).toBe('2027-11-01');
    expect(r['Royal Hobart Show']).toBe('2027-10-21');
    expect(r['Royal Launceston Show']).toBe('2027-10-07');
    expect(r['Burnie Show']).toBe('2027-10-01');
    expect(r['Devonport Show']).toBe('2027-11-26');
  });
});
describe('Leave tools', () => {
  it('every state has long weekends in 2027 and Australia Day 2027 is a Tuesday bridge', () => {
    for (const st of STATES) expect(longWeekends(st, 2027).length).toBeGreaterThan(3);
    expect(wdOf('2027-01-26')).toBe(2);
    expect(bridges('nsw', 2027, 1).some((b) => b.leaveFrom === '2027-01-25')).toBe(true);
  });
  it('the plan never spends more than the budget and is monotone', () => {
    for (const st of STATES) { let last = 0; for (const b of [0, 1, 3, 5, 10, 20]) { const p = plan(st, 2027, b); expect(p.leave).toBeLessThanOrEqual(b); expect(p.off).toBeGreaterThanOrEqual(last); last = p.off; } }
  });
  it('working days are plausible', () => {
    for (const st of STATES) { const w = workingDays(st, 2027)!.reduce((a, b) => a + b, 0); expect(w).toBeGreaterThan(245); expect(w).toBeLessThan(256); }
  });
});
describe('Terms and local holidays', () => {
  it('four terms, breaks in order', () => {
    for (const st of ['nsw', 'vic', 'qld', 'wa', 'sa', 'tas'] as const) { const t = terms(st, 2027)!; expect(t.length).toBe(4); for (const x of t) { expect(x.end > x.start).toBe(true); expect(wdOf(x.start)).toBeGreaterThan(0); } expect(breaks(st, 2027)!.length).toBeGreaterThanOrEqual(3); }
    expect(terms('act', 2027)).toBeNull();
    expect(termStatus('qld', '2027-05-01')!.kind).toBe('term');
  });
  it('97 QLD show holidays on 44 dates, 8 NSW local holidays', () => {
    expect(QLD_SHOW_2027.length).toBe(97);
    expect(new Set(QLD_SHOW_2027.map((x) => x.date)).size).toBe(44);
    expect(NSW_LOCAL_2027.length).toBe(8);
  });
});
describe('Clock helpers and sources', () => {
  it('midnight in Perth is 16:00 UTC the day before; Sydney in summer is UTC+11', () => {
    expect(new Date(stateInstant('wa', '2027-01-26')).toISOString()).toBe('2027-01-25T16:00:00.000Z');
    expect(new Date(stateInstant('nsw', '2027-01-26')).toISOString()).toBe('2027-01-25T13:00:00.000Z');
    expect(todayIn('wa', Date.parse('2027-01-25T17:00:00Z'))).toBe('2027-01-26');
  });
  it('upcoming and onDate', () => {
    expect(upcoming('nsw', '2026-11-13', 1)[0].id).toBe('christmas');
    expect(onDate('vic', '2027-11-02')![0].id).toBe('cup');
    expect(weekdayCount('nsw', 2027).weekday).toBeGreaterThan(8);
  });
  it('every source has a url', () => { for (const s of Object.values(P.sources)) expect(s.url.startsWith('https://')).toBe(true); });
});

// Testeurs naïfs du 2026-11-14 : « 14 days off in a row » was a total over two breaks; NSW lost its Christmas
// bridge (6 days for 3 leave days, against 10 in Queensland) because 2028 was unknown.
import { getSpec } from '../src/lib/mini-specs';
import { runTool } from '../src/lib/tool-specs';
describe('leave plan: totals, longest break, year end', () => {
  it('the total is the sum of the breaks and the longest break is named', () => {
    const p = plan('nsw', 2027, 5);
    expect(p.blocks.length).toBe(2);
    expect(p.off).toBe(p.blocks.reduce((a, b) => a + b.off, 0));
    expect(p.longest!.off).toBe(Math.max(...p.blocks.map((b) => b.off)));
    expect(p.longest!.off).toBeLessThan(p.off);
  });
  it('NSW and Victoria keep the Christmas bridge with 2028 unpublished (weekends only)', () => {
    for (const s of ['nsw', 'vic'] as const) {
      expect(basis(s, 2028)).toBeNull();
      const p = plan(s, 2027, 3);
      const xmas = p.blocks.find((b) => b.leaveFrom === '2027-12-29');
      if (s === 'nsw') { expect(xmas).toBeDefined(); expect(xmas!.offFrom).toBe('2027-12-25'); expect(xmas!.offTo).toBe('2028-01-02'); expect(xmas!.off).toBe(9); }
    }
  });
  it('no text says « in a row » for a total of several breaks', () => {
    const m = getSpec('leave').run({ st: 0, leave: 5 });
    expect(m.head[0]).toContain('in total');
    expect(m.rows.find((r) => r[0] === 'Longest break')![1]).toContain('10 days');
    const t = runTool('lv', 'en', { state: 'nsw', leave: 5, year: 2027 });
    expect(t.value).toBe('14 days off in total');
    const one = getSpec('leave').run({ st: 0, leave: 1 });
    expect(one.head[0]).toContain('in a row');
  });
  it('says when leave is left over (ACT, 5 days → 4 used)', () => {
    const m = getSpec('leave').run({ st: 6, leave: 5 });
    expect(m.rows[0][1]).toBe('4 of 5');
    expect(m.note).toContain('Only 4 of your 5 days');
  });
  it('the Anzac Day mini says « no weekday off » in Victoria', () => {
    const m = getSpec('day').run({ h: 4, st: 1 });
    expect(m.alert).toContain('No weekday off in Victoria');
  });
});

// Testeurs naïfs du 2026-11-14, tour 2 : « Stretch Easter with annual leave » answered with the Christmas break
// (the mini took the best break of the year, not the holiday of the page). Every leave mini whose title names a
// holiday is now tied to it (`near`), and its break must contain that holiday.
import { GUIDES } from '../src/lib/pages';
import { helpers } from '../src/lib/helpers';
import { NEAR } from '../src/lib/mini-specs';
import { dateOf } from '../src/lib/engine/holidays';
describe('holiday-page leave minis stay around their holiday', () => {
  const minis = GUIDES.flatMap((g) => [...g.en.body(helpers('en')).matchAll(/<!--mini:leave\|([A-Za-z0-9+/=]+)-->/g)]
    .map((m) => ({ id: g.id, ...(JSON.parse(Buffer.from(m[1], 'base64').toString('utf8')) as { t: string; d: Record<string, number> }) })));
  it('finds the leave minis', () => { expect(minis.length).toBeGreaterThan(5); });
  it('a title naming a holiday sets `near` to that holiday', () => {
    for (const m of minis) for (const [i, [, name]] of NEAR.entries()) {
      if (!i) continue;
      const named = m.t.includes(name) || (name === 'Melbourne Cup Day' && m.t.includes('Cup Day'));
      if (named) expect([m.id, m.d.near]).toEqual([m.id, i]);
    }
  });
  it('the break shown contains the holiday', () => {
    for (const m of minis.filter((x) => x.d.near)) {
      const out = getSpec('leave').run(m.d), hol = dateOf(STATES[m.d.st], NEAR[m.d.near][0], 2027)!.date;
      const l = plan(STATES[m.d.st], 2027, m.d.leave, NEAR[m.d.near][0]).longest!;
      expect([m.id, l.offFrom <= hol && hol <= l.offTo]).toEqual([m.id, true]);
      expect(out.head[0]).toContain(`${NEAR[m.d.near][1]} break`);
    }
  });
  it('Easter: mini, page text and planner agree on NSW (Mon 22 – Thu 25 Mar, 10 days)', () => {
    const e = plan('nsw', 2027, 4, 'goodfri').longest!;
    expect([e.leaveFrom, e.leaveTo, e.off]).toEqual(['2027-03-22', '2027-03-25', 10]);
    expect(plan('nsw', 2027, 5).blocks.some((b) => b.leaveFrom === e.leaveFrom && b.off === e.off)).toBe(true);
  });
  it('the Melbourne Cup tool stays on Cup Day, and says so outside Victoria', () => {
    const t = runTool('lv', 'en', { state: 'vic', leave: 1, year: 2027, near: 'cup' });
    expect(t.label).toContain('around Melbourne Cup Day');
    expect(t.table!.rows[0][3]).toContain('Melbourne Cup');
    expect(runTool('lv', 'en', { state: 'nsw', leave: 1, year: 2027, near: 'cup' }).value).toBe('Not a holiday here');
  });
});
