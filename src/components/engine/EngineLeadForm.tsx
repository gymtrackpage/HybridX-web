'use client';

import React, { useActionState, useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, Download, Loader2 } from 'lucide-react';
import {
  submitEngineLead,
  type EngineLeadState,
} from '@/app/build-a-bigger-engine/actions';
import Heartbeat from './Heartbeat';
import { trackEvent } from '@/lib/analytics';

type Variant = 'dark' | 'light' | 'band';

interface EngineLeadFormProps {
  variant?: Variant;
  /** Stable id used to label the email field and scroll targets. */
  formId: string;
  /** Where this form sits, for analytics (e.g. "hero", "mid", "final"). */
  placement: string;
  className?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EngineLeadForm({
  variant = 'dark',
  formId,
  placement,
  className = '',
}: EngineLeadFormProps) {
  const initialState: EngineLeadState = { status: '', message: '' };
  const [state, formAction, isPending] = useActionState(submitEngineLead, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const [clientError, setClientError] = useState('');
  const [utm, setUtm] = useState<Record<string, string>>({});
  const startedRef = useRef(false);
  const viewedRef = useRef(false);
  const leadFiredRef = useRef(false);

  // Capture src + utm_* params once on mount.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const next: Record<string, string> = {};
    const src = params.get('src');
    if (src) next.src = src;
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach((k) => {
      const v = params.get(k);
      if (v) next[k] = v;
    });
    setUtm(next);
  }, []);

  // Fire view_lead_form when the form first scrolls into view.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !viewedRef.current) {
            viewedRef.current = true;
            trackEvent('view_lead_form', { placement });
            obs.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [placement]);

  // Fire generate_lead once on success.
  useEffect(() => {
    if (state.status === 'success' && !leadFiredRef.current) {
      leadFiredRef.current = true;
      trackEvent('generate_lead', { placement, currency: 'USD', value: 0 });
    }
    if (state.status === 'error') {
      trackEvent('lead_submit_error', { placement, message: state.message });
    }
  }, [state, placement]);

  // ---- Success state ----------------------------------------------------
  if (state.status === 'success') {
    const dark = variant !== 'light';
    return (
      <div
        ref={sectionRef}
        data-engine-form
        className={`rounded-2xl p-8 text-center ${
          dark
            ? 'bg-white/5 border border-[#7A2530] text-engine-paper'
            : 'bg-engine-blush border-t-4 border-engine-crimson text-engine-ink'
        } ${className}`}
        role="status"
        aria-live="polite"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-engine-crimson/15">
          <CheckCircle2 className="h-8 w-8 text-engine-heart" />
        </div>
        <h3 className="font-anton text-2xl uppercase tracking-wide mb-2">Check your inbox</h3>
        <p className={`font-body text-base mb-1 ${dark ? 'text-engine-paper/80' : 'text-engine-inkSoft'}`}>
          Your guide is on its way. It should land in under a minute.
        </p>
        <p className={`font-body text-sm mb-6 ${dark ? 'text-engine-paper/60' : 'text-engine-mutedrose'}`}>
          No email? Check your spam or promotions tab, then grab it directly below.
        </p>

        {state.pdfUrl && (
          <a
            href={state.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('pdf_download_click', { placement })}
            className="inline-flex items-center justify-center gap-2 rounded-[14px] bg-engine-crimson px-7 py-3.5 font-archivo font-extrabold uppercase tracking-wide text-engine-paper shadow-lg transition-colors duration-150 hover:bg-engine-crimsonD focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-engine-heart"
          >
            <Download className="h-5 w-5" /> Download the guide
          </a>
        )}

        <div className="mt-6">
          <a
            href="/app"
            onClick={() => trackEvent('cta_app_click', { placement })}
            className={`inline-flex items-center gap-1.5 font-archivo font-bold text-sm uppercase tracking-wider transition-colors ${
              dark ? 'text-engine-heart hover:text-engine-paper' : 'text-engine-crimson hover:text-engine-crimsonD'
            }`}
          >
            See what HybridX can do for your training <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    );
  }

  // ---- Idle / error state ----------------------------------------------
  const dark = variant === 'dark';
  const band = variant === 'band';

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value?.trim() || '';
    if (!EMAIL_RE.test(email)) {
      e.preventDefault();
      setClientError('That email looks incomplete. Please check and try again.');
      return;
    }
    setClientError('');
    trackEvent('lead_submit_attempt', { placement });
  }

  function handleFocus() {
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent('lead_form_start', { placement });
    }
  }

  const errorMsg = clientError || (state.status === 'error' ? state.message : '');
  const errorId = `${formId}-error`;

  // Field styling per surface.
  const inputClasses =
    dark || band
      ? 'bg-white/95 text-engine-ink placeholder-engine-mutedrose border-2 border-transparent focus:border-engine-crimson'
      : 'bg-white text-engine-ink placeholder-engine-mutedrose border-2 border-engine-line focus:border-engine-crimson';

  return (
    <div ref={sectionRef} data-engine-form className={className}>
      <form
        ref={formRef}
        action={formAction}
        onSubmit={handleSubmit}
        className="w-full"
        noValidate
        aria-describedby={errorMsg ? errorId : undefined}
      >
        {/* Honeypot: hidden from users + assistive tech, catches bots. */}
        <div className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
          <label htmlFor={`${formId}-company`}>Company</label>
          <input
            id={`${formId}-company`}
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Hidden tracking fields. */}
        <input type="hidden" name="src" value={utm.src || ''} />
        <input type="hidden" name="utm_source" value={utm.utm_source || ''} />
        <input type="hidden" name="utm_medium" value={utm.utm_medium || ''} />
        <input type="hidden" name="utm_campaign" value={utm.utm_campaign || ''} />
        <input type="hidden" name="utm_content" value={utm.utm_content || ''} />
        <input type="hidden" name="utm_term" value={utm.utm_term || ''} />

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <label htmlFor={`${formId}-email`} className="sr-only">
              Email address
            </label>
            <input
              id={`${formId}-email`}
              type="email"
              name="email"
              inputMode="email"
              autoComplete="email"
              required
              placeholder="you@email.com"
              onFocus={handleFocus}
              aria-invalid={errorMsg ? true : undefined}
              aria-describedby={errorMsg ? errorId : undefined}
              className={`h-14 w-full rounded-[14px] px-5 font-body text-base outline-none transition-colors duration-150 focus:ring-4 focus:ring-engine-crimson/20 ${inputClasses}`}
            />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex h-14 items-center justify-center gap-2 rounded-[14px] bg-engine-crimson px-7 font-archivo font-extrabold uppercase tracking-wide text-engine-paper shadow-lg transition-all duration-150 hover:bg-engine-crimsonD hover:-translate-y-px active:translate-y-0 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-engine-heart disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" /> Sending...
              </>
            ) : (
              'Send me the free guide'
            )}
          </button>
        </div>

        {/* Accessible status / error region. */}
        <div id={errorId} aria-live="polite" className="min-h-[1.25rem]">
          {errorMsg && (
            <p className={`mt-2 text-sm font-semibold ${dark || band ? 'text-engine-paper' : 'text-engine-crimsonD'}`}>
              {errorMsg}
            </p>
          )}
        </div>

        <p className={`mt-1 text-sm ${dark || band ? 'text-engine-paper/70' : 'text-engine-mutedrose'}`}>
          Free. No spam. Unsubscribe anytime.
        </p>
      </form>
    </div>
  );
}

// Re-export the heartbeat so sections can import a single module if preferred.
export { Heartbeat };
