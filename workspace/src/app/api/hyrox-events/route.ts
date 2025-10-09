
import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET() {
  try {
    // These variables are populated by App Hosting from the secrets you've set
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;

    if (!clientEmail || !privateKey) {
      throw new Error('Google service account credentials are not set in the environment.');
    }
    
    // The private key from Secret Manager is a string. We need to handle escape characters.
    const credentials = {
      client_email: clientEmail,
      private_key: privateKey.replace(/\\n/g, '\n'),
    };

    const auth = new google.auth.GoogleAuth({
      credentials,
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
      return NextResponse.json({ events: [] });
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

    return NextResponse.json({ events });
  } catch (error) {
    console.error('Error fetching events from Google Sheets:', error);
    // Return a more descriptive error message in the response
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return NextResponse.json(
      { error: 'Failed to fetch events from Google Sheets.', details: errorMessage },
      { status: 500 }
    );
  }
}
