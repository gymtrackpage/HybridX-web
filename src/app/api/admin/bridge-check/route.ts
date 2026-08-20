import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { getBridgeContract, getSuppressionState, isBridgeConfigured } from '@/lib/marketing-bridge';

/**
 * Admin-only diagnostic for the link between this site and the mailing system.
 *
 * "Is the funnel working?" is not answerable by reading code, because the two
 * halves live in different Firebase projects and the failures that matter are
 * silent by design: lead forwarding is fire-and-forget so an outage cannot cost
 * a submission, which also means an outage looks exactly like success from
 * here. This performs the round trips and reports what actually happened.
 *
 * Everything it does is read-only. It never writes a lead, so it can be run
 * against production as often as you like without polluting the list.
 */

export const dynamic = 'force-dynamic';

const NO_STORE = {
  'Cache-Control': 'no-store, no-cache, must-revalidate',
  Pragma: 'no-cache',
};

interface Check {
  name: string;
  ok: boolean;
  detail: string;
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: NO_STORE });
  }

  const checks: Check[] = [];

  // 1 — Is the bridge even configured on this side?
  const configured = isBridgeConfigured();
  checks.push({
    name: 'Bridge configured',
    ok: configured,
    detail: configured
      ? `MARKETING_APP_URL and LEAD_BRIDGE_SECRET are both set (${process.env.MARKETING_APP_URL}).`
      : 'MARKETING_APP_URL or LEAD_BRIDGE_SECRET is missing. Leads are captured locally but never reach the mailing system.',
  });

  // 2 — Can we reach the app, and does it accept our credential? The contract
  //     endpoint is the cheapest authenticated call there is, and its answer is
  //     useful in its own right.
  const contract = configured ? await getBridgeContract() : null;
  checks.push({
    name: 'Authenticated round trip',
    ok: !!contract,
    detail: contract
      ? `Reached the mailing system and authenticated. Contract version ${contract.version}.`
      : 'Could not reach the mailing system, or the shared secret was rejected. Check that LEAD_BRIDGE_SECRET is identical in both Firebase projects.',
  });

  // 3 — Does the suppression lookup work? This is the check that protects the
  //     sending domain: without it we would mail people who have complained.
  const suppression = configured
    ? await getSuppressionState('bridge-diagnostic@hybridx.club')
    : null;
  checks.push({
    name: 'Suppression lookup',
    ok: !!suppression && !suppression.unknown,
    detail:
      suppression && !suppression.unknown
        ? 'The shared suppression list answered. Complainants will be filtered before any send.'
        : 'The suppression lookup did not answer. Sends fail open, so mail still goes out — including, potentially, to someone who reported us as spam.',
  });

  // 4 — Do the fields this site sends still exist in the contract? This is the
  //     drift check. The site once sent `utm.source` while the app read
  //     `utm.utm_source`, and every lead's attribution was discarded for months
  //     with nothing failing anywhere.
  if (contract) {
    const required = ['email', 'source', 'consent', 'utm', 'tags'];
    const missing = required.filter((f) => !(f in (contract.fields ?? {})));
    checks.push({
      name: 'Payload contract',
      ok: missing.length === 0,
      detail: missing.length
        ? `The mailing system no longer documents: ${missing.join(', ')}. This site may be sending fields that are now ignored.`
        : `All ${required.length} fields this site sends are still in the contract.`,
    });
  }

  const ok = checks.every((c) => c.ok);

  return NextResponse.json(
    {
      ok,
      summary: ok
        ? 'Every route between this site and the mailing system is working.'
        : 'One or more checks failed — see below.',
      checks,
      contract: contract ?? undefined,
      checkedAt: new Date().toISOString(),
    },
    { headers: NO_STORE },
  );
}
