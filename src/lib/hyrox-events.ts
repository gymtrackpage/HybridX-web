import { google } from 'googleapis';

export interface HyroxEvent {
  name: string;
  startDate: string | null;
  endDate: string | null;
}

export async function fetchHyroxEvents(): Promise<HyroxEvent[]> {
  try {
    // Initialize Google Sheets API with service account credentials
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Fetch data from the Google Sheet (columns A, B, C)
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Events!A:C', // Columns A, B, C from the Events tab
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
        startDate: row[1] || null, // Column B
        endDate: row[2] || null,   // Column C
      }));

    return events;
  } catch (error) {
    console.error('Error fetching events from Google Sheets:', error);
    return [];
  }
}
