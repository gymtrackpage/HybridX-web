import { NextResponse } from 'next/server';
import { fetchHyroxEvents } from '@/lib/hyrox-events';

export async function GET() {
  try {
    const events = await fetchHyroxEvents();
    return NextResponse.json({ events });
  } catch (error) {
    console.error('Error fetching events from Google Sheets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}
