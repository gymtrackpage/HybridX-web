import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET() {
  try {
    // Initialize Google Sheets API using Application Default Credentials
    // This will automatically use the service account in the App Hosting environment
    const auth = new google.auth.GoogleAuth({
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
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}
