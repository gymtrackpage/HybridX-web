'use client';

import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';

const STORAGE_KEY = 'hybridx-rules-2026-checklist';

const HABITS = [
  {
    id: 'judge',
    title: 'Never leave a station until a judge tells you you are finished',
    body: 'That single habit protects you from the only rule here that can end your race. If you genuinely cannot tell whether you are done, ask — ten seconds of asking beats a disqualification.',
  },
  {
    id: 'laps',
    title: 'Count your own run laps, and know your venue before the gun',
    body: 'One, two, three or four laps per kilometre changes a missed lap from a 3 minute penalty to the end of your day. The lap screens at the venue are a convenience, not an official record.',
  },
  {
    id: 'together',
    title: 'If you race doubles, train at the pace of whoever is having the worse day',
    body: 'Ten seconds is not much when one of you is struggling, and three infringements is your entire budget for the race.',
  },
];

/**
 * The three habits that cover almost all of the 2026/27 downside risk.
 * Ticks persist in localStorage so an athlete can come back to this page in
 * race week and see what they already sorted.
 */
export default function RaceDayChecklist() {
  const [done, setDone] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setDone(JSON.parse(stored));
    } catch {
      /* storage unavailable — the checklist just starts empty */
    }
    setHydrated(true);
  }, []);

  const toggle = (id: string) => {
    setDone((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* non-fatal */
      }
      if (!prev.includes(id)) trackEvent('rules_checklist_tick', { habit: id, total: next.length });
      return next;
    });
  };

  return (
    <div>
      <ul className="space-y-3">
        {HABITS.map((habit, index) => {
          const checked = hydrated && done.includes(habit.id);
          return (
            <li key={habit.id}>
              <button
                type="button"
                onClick={() => toggle(habit.id)}
                aria-pressed={checked}
                className={cn(
                  'flex w-full items-start gap-4 rounded-2xl border p-5 text-left transition-all',
                  checked
                    ? 'border-emerald-500/50 bg-emerald-500/[0.06]'
                    : 'border-border bg-card hover:border-foreground/30'
                )}
              >
                <span
                  className={cn(
                    'mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border-2 font-headline text-sm font-bold transition-colors',
                    checked
                      ? 'border-emerald-600 bg-emerald-600 text-white'
                      : 'border-border bg-background text-muted-foreground'
                  )}
                  aria-hidden="true"
                >
                  {checked ? <Check className="h-4 w-4" /> : index + 1}
                </span>
                <span className="min-w-0">
                  <span
                    className={cn(
                      'block font-headline text-base font-bold leading-snug text-foreground',
                      checked && 'line-through decoration-emerald-600/60'
                    )}
                  >
                    {habit.title}
                  </span>
                  <span className="mt-1.5 block font-body text-sm leading-relaxed text-muted-foreground">
                    {habit.body}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <p className="mt-4 text-center font-body text-xs text-muted-foreground" aria-live="polite">
        {hydrated && done.length === HABITS.length
          ? 'All three sorted. Everything else on this page is worth knowing, but those were the ones that decide whether you get a finish time.'
          : `Tap to tick off. Saved on this device — ${hydrated ? done.length : 0} of ${HABITS.length} done.`}
      </p>
    </div>
  );
}
