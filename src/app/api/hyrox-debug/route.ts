import { NextResponse } from 'next/server';
import { google } from 'googleapis';

// TEMPORARY: Remove this file after debugging is complete
export async function GET() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;
  const sheetId = process.env.GOOGLE_SHEET_ID;

  const privateKey = rawKey?.includes('\\n')
    ? rawKey.replace(/\\n/g, '\n')
    : rawKey;

  let sheetsError: string | null = null;
  let rowCount: number | null = null;

  try {
    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'Events!A:L',
    });
    rowCount = response.data.values?.length ?? 0;
  } catch (e: unknown) {
    sheetsError = e instanceof Error ? e.message : String(e);
  }

  return NextResponse.json({
    hasEmail: !!clientEmail,
    hasKey: !!rawKey,
    keyLength: rawKey?.length ?? 0,
    keyHasEscapedNewlines: rawKey?.includes('\\n') ?? false,
    sheetId: sheetId ?? null,
    sheetsError,
    rowCount,
  });
}
