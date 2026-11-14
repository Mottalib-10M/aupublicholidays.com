/**
 * Is today a public holiday in my state, and how long until the next one. Counts to midnight in the state's own
 * time zone (Perth, Darwin, Brisbane, Adelaide, Sydney, Melbourne, Hobart). First render = build day
 * (__BUILD_DAY__), the same on server and browser (RECETTE §17.5); the device clock takes over after mount.
 * Nothing is sent.
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import { ResultCard, Rows, ShareRow } from '../calc/parts';
import { readParams, updateURL } from '../../lib/url-state';
import { STATES, STATE_NAME, STATE_SHORT, onDate, upcoming, type State } from '../../lib/engine/holidays';
import { stateInstant, todayIn } from '../../lib/engine/days';
import { termStatus } from '../../lib/engine/terms';
import { dWeek, dShort } from '../../lib/dates';
import { t } from '../../i18n/ui';
import type { Lang } from '../../lib/format';

interface Props { lang: Lang; state?: string; methodHref?: string; idPrefix?: string }

export default function Countdown({ lang, state: s0, methodHref, idPrefix = 'c' }: Props) {
  const ui = t(lang);
  const [state, setState] = useState<State>((s0 as State) ?? 'nsw');
  const [now, setNow] = useState<number>(() => Date.parse(`${__BUILD_DAY__}T02:00:00Z`));
  const [live, setLive] = useState(false);
  const [moved, setMoved] = useState(false);
  useEffect(() => {
    const g = readParams(window.location.search).get('state') as State | null; if (g && STATES.includes(g)) setState(g);
    setNow(Date.now()); setLive(true);
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => { if (moved) updateURL({ state }); }, [state, moved]);
  const today = live ? todayIn(state, now) : __BUILD_DAY__;
  const todays = useMemo(() => onDate(state, today) ?? [], [state, today]);
  const list = useMemo(() => upcoming(state, today, 6).filter((h) => h.date > today), [state, today]);
  const term = useMemo(() => termStatus(state, today), [state, today]);
  const next = list[0];
  const isHol = todays.some((h) => h.off);
  const nf = new Intl.NumberFormat('en-AU');
  let cd: [number, number, number, number] | null = null;
  if (next) { const left = Math.max(0, stateInstant(state, next.date) - now); cd = [Math.floor(left / 864e5), Math.floor((left % 864e5) / 36e5), Math.floor((left % 36e5) / 6e4), Math.floor((left % 6e4) / 1e3)]; }
  const termRow: Array<[string, string]> = term ? [[term.kind === 'term' ? `School term ${term.term.n} (${STATE_SHORT[state]})` : `School holidays (${STATE_SHORT[state]})`, term.kind === 'term' ? `ends ${dShort(term.term.end)}` : term.next ? `term ${term.next.n} starts ${dShort(term.next.start)}` : 'next dates not published']] : [];
  return (
    <div className="rounded-xl border border-navy-200 bg-white p-4 sm:p-5">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]">
        <form data-simulateur className="grid content-start grid-cols-1 gap-x-4 gap-y-3" onSubmit={(e) => e.preventDefault()}>
          <SelectField id={`${idPrefix}-state`} label="Your state or territory" value={state} onChange={(v) => { setState(v as State); setMoved(true); }} options={STATES.map((g) => ({ value: g, label: STATE_NAME[g] }))} />
          <div className="rounded-lg border border-accent-200 bg-accent-50 px-4 py-3" data-chrome>
            <p className="text-sm font-medium text-navy-700">{next ? `Time left until ${next.name} ${next.date.slice(0, 4)}` : 'No later date published yet'}</p>
            {cd && <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1" aria-live="off">
              {[[cd[0], ui.days], [cd[1], ui.hours], [cd[2], ui.minutes], [cd[3], ui.seconds]].map(([v, u]) => <span key={String(u)} className="inline-flex items-baseline gap-1"><span className="tabular-nums text-2xl font-bold text-navy-900">{nf.format(Number(v))}</span><span className="text-sm text-navy-600">{u}</span></span>)}
            </p>}
            <p className="mt-1 text-xs text-navy-600">Counted to midnight in {STATE_NAME[state]}, using your device clock.</p>
          </div>
        </form>
        <ResultCard label={`Is today a public holiday in ${STATE_SHORT[state]}?`} value={isHol ? `Yes: ${todays.find((h) => h.off)!.name}` : todays.length ? `Partly: ${todays[0].name}` : 'No'} sub={`Today in ${STATE_SHORT[state]}: ${dWeek(today)}`}>
          <Rows rows={[
            ...(next ? [['Next public holiday', `${dShort(next.date)} ${next.date.slice(0, 4)}`] as [string, string]] : []),
            ...list.slice(1, 4).map((h) => [h.name, `${dShort(h.date)} ${h.date.slice(0, 4)}`] as [string, string]),
            ...termRow,
          ]} />
          <ShareRow methodHref={methodHref} labels={ui} />
        </ResultCard>
      </div>
    </div>
  );
}
