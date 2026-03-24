import { NextResponse } from 'next/server';
import { fetchHyroxEvents } from '@/lib/hyrox-events';

// TEMPORARY: Remove this file after debugging is complete
export async function GET() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;
  const sheetId = process.env.GOOGLE_SHEET_ID;

  const diagnostics = {
    hasEmail: !!clientEmail,
    emailPreview: clientEmail ? clientEmail.substring(0, 20) + '...' : null,
    hasKey: !!rawKey,
    keyLength: rawKey?.length ?? 0,
    keyHasEscapedNewlines: rawKey?.includes('\\n') ?? false,
    keyStartsCorrectly: rawKey?.includes('BEGIN PRIVATE KEY') ?? false,
    hasSheetId: !!sheetId,
    sheetId: sheetId ?? null,
  };

  let eventCount = 0;
  let fetchError: string | null = null;

  try {
    const events = await fetchHyroxEvents();
    eventCount = events.length;
  } catch (e: unknown) {
    fetchError = e instanceof Error ? e.message : String(e);
  }

  return NextResponse.json({ diagnostics, eventCount, fetchError });
}
