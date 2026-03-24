import { google } from 'googleapis';

export interface HyroxEvent {
  name: string;
  startDate: string | null;
  endDate: string | null;
  city: string | null;
  country: string | null;
  continent: string | null;
  bookingStatus: string | null;
  eventUrl: string | null;
  eventId: string | null;
}

export async function fetchHyroxEvents(): Promise<HyroxEvent[]> {
  try {
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const rawKey = process.env.GOOGLE_PRIVATE_KEY;
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (!clientEmail || !rawKey || !sheetId) {
      console.error('[hyrox-events] Missing env vars:', {
        hasEmail: !!clientEmail,
        hasKey: !!rawKey,
        hasSheetId: !!sheetId,
      });
      return [];
    }

    // Handle both escaped (\n) and real newline formats from Secret Manager
    const privateKey = rawKey.includes('\\n')
      ? rawKey.replace(/\\n/g, '\n')
      : rawKey;

    // Use JWT directly — more compatible with Node 18+ / OpenSSL 3.x
    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Fetch data from the Google Sheet (columns A-L)
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'Events!A:L',
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      return [];
    }

    // Skip the header row and filter out empty cells
    const events = rows
      .slice(1) // Skip header row
      .filter((row) => row[0] && row[0].trim() !== '') // Filter out empty rows
      .map((row) => ({
        name: row[0].trim(),
        startDate: row[1] || null,        // Column B
        endDate: row[2] || null,          // Column C
        city: row[5] || null,             // Column F
        country: row[4] || null,          // Column E
        continent: row[6] || null,        // Column G
        bookingStatus: row[7] || null,    // Column H
        eventUrl: row[9] || null,         // Column J
        eventId: row[10] || null,         // Column K
      }));

    return events;
  } catch (error) {
    console.error('[hyrox-events] Error fetching from Google Sheets:', error);
    return [];
  }
}
