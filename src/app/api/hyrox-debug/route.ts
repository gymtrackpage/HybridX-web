import { NextResponse } from 'next/server';
import { fetchHyroxEvents } from '@/lib/hyrox-events';

// TEMPORARY: Remove this file after debugging is complete
export async function GET() {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  let eventCount = 0;
  let fetchError: string | null = null;
  let csvStatus: number | null = null;

  // Test raw CSV access
  try {
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=Events`;
    const res = await fetch(url);
    csvStatus = res.status;
  } catch (e: unknown) {
    fetchError = e instanceof Error ? e.message : String(e);
  }

  // Test full fetch
  try {
    const events = await fetchHyroxEvents();
    eventCount = events.length;
  } catch (e: unknown) {
    fetchError = e instanceof Error ? e.message : String(e);
  }

  return NextResponse.json({ sheetId, csvStatus, eventCount, fetchError });
}
