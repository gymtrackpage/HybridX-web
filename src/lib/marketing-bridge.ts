// src/lib/marketing-bridge.ts
//
// Connects this site to the mailing system in the app (app.hybridx.club,
// Firebase project hyroxedgeai).
//
// The two properties are separate apps in separate Firebase projects. This site
// captures the top of the funnel through its lead magnets; the app owns
// campaigns, journeys, consent and the suppression list. Before this bridge
// existed the two never spoke, which meant two problems:
//
//   - leads captured here were invisible to the system built to nurture them;
//   - an unsubscribe or spam complaint recorded there was invisible here, so
//     someone who had opted out could still receive magnet email — the exact
//     pattern that produces complaints and damages a sending domain both
//     properties now share.
//
// Every call is best-effort. Lead capture and magnet delivery are the things
// the visitor actually asked for; a marketing integration being down must never
// break either.

const BRIDGE_TIMEOUT_MS = 4000;

function bridgeConfig(): { url: string; secret: string } | null {
  const url = process.env.MARKETING_APP_URL?.replace(/\/$/, '');
  const secret = process.env.LEAD_BRIDGE_SECRET;
  if (!url || !secret) return null;
  return { url, secret };
}

/** Whether the bridge can be used at all. Surfaced by the admin email diagnostic. */
export function isBridgeConfigured(): boolean {
  return bridgeConfig() !== null;
}

/**
 * Fetch with a timeout, so a slow or unreachable app cannot hold a form
 * submission open. AbortSignal.timeout is available on the Node 18+ runtime
 * this deploys to.
 */
async function bridgeFetch(path: string, init: RequestInit): Promise<Response | null> {
  const config = bridgeConfig();
  if (!config) return null;

  try {
    return await fetch(`${config.url}${path}`, {
      ...init,
      headers: {
        ...init.headers,
        Authorization: `Bearer ${config.secret}`,
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(BRIDGE_TIMEOUT_MS),
      cache: 'no-store',
    });
  } catch (error) {
    console.error(
      `[marketing-bridge] ${path} unreachable:`,
      error instanceof Error ? error.message : String(error),
    );
    return null;
  }
}

export interface ForwardLeadInput {
  email: string;
  name?: string;
  /** Magnet identifier, matching the LeadSource values used by lib/leads.ts. */
  source: string;
  /**
   * Whether this person agreed to ongoing marketing, as opposed to merely
   * requesting the asset. Passing `true` without evidence is the failure that
   * turns a mailing list into a liability, so callers state it explicitly
   * rather than relying on a default.
   */
  consent: boolean;
  consentMethod?: string;
  utm?: Record<string, string>;
  tags?: string[];
}

/**
 * Push a captured lead into the mailing system.
 *
 * Deliberately swallows every failure: the lead is already saved to this
 * project's own `leads` collection, so a bridge outage costs a delay in
 * nurturing, not the lead itself. Losing the visitor's submission because a
 * downstream integration is unavailable would be a far worse trade.
 */
export async function forwardLead(input: ForwardLeadInput): Promise<void> {
  const response = await bridgeFetch('/api/marketing/leads', {
    method: 'POST',
    body: JSON.stringify(input),
  });

  if (!response) return;

  if (!response.ok) {
    console.error(`[marketing-bridge] lead forward rejected: ${response.status}`);
    return;
  }

  console.log(`[marketing-bridge] forwarded ${input.source} lead`);
}

/** Fire-and-forget wrapper, making the intent explicit at the call site. */
export function forwardLeadAsync(input: ForwardLeadInput): void {
  void forwardLead(input);
}

export interface SuppressionState {
  suppressed: boolean;
  complained: boolean;
  /** True when the bridge could not be reached, so the answer is unknown. */
  unknown: boolean;
}

const UNKNOWN: SuppressionState = { suppressed: false, complained: false, unknown: true };

/**
 * Ask the app whether an address is unmailable.
 *
 * Returns `unknown` rather than throwing when the bridge is unavailable, so
 * callers can choose their own failure posture. See `sendEmail` for the one
 * this site takes.
 */
export async function getSuppressionState(email: string): Promise<SuppressionState> {
  const response = await bridgeFetch(
    `/api/marketing/suppression?email=${encodeURIComponent(email)}`,
    { method: 'GET' },
  );

  if (!response?.ok) return UNKNOWN;

  try {
    const data = (await response.json()) as { suppressed?: boolean; complained?: boolean };
    return {
      suppressed: data.suppressed === true,
      complained: data.complained === true,
      unknown: false,
    };
  } catch {
    return UNKNOWN;
  }
}
