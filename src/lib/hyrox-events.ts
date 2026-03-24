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
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (!sheetId) {
      console.error('[hyrox-events] Missing GOOGLE_SHEET_ID env var');
      return [];
    }

    // Fetch sheet as CSV via Google's public export URL (sheet must be publicly readable)
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=Events`;
    const response = await fetch(url, { next: { revalidate: 3600 } });

    if (!response.ok) {
      console.error('[hyrox-events] Failed to fetch sheet:', response.status, response.statusText);
      return [];
    }

    const csv = await response.text();
    const rows = parseCSV(csv);

    if (rows.length < 2) return [];

    // Skip header row (row[0]), map data rows
    return rows.slice(1)
      .filter((row) => row[0] && row[0].trim() !== '')
      .map((row) => ({
        name: row[0].trim(),
        startDate: row[1] || null,      // Column B: Start Date
        endDate: row[2] || null,        // Column C: End Date
        city: row[5] || null,           // Column F: City
        country: row[4] || null,        // Column E: Country
        continent: row[6] || null,      // Column G: Continent
        bookingStatus: row[7] || null,  // Column H: Booking Status
        eventUrl: row[9] || null,       // Column J: Event URL
        eventId: row[10] || null,       // Column K: Event ID
      }));
  } catch (error) {
    console.error('[hyrox-events] Error fetching events:', error);
    return [];
  }
}

// Minimal CSV parser that handles quoted fields with commas/newlines
function parseCSV(csv: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < csv.length; i++) {
    const ch = csv[i];
    const next = csv[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        field += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        field += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ',') {
        row.push(field);
        field = '';
      } else if (ch === '\n' || (ch === '\r' && next === '\n')) {
        if (ch === '\r') i++;
        row.push(field);
        rows.push(row);
        row = [];
        field = '';
      } else {
        field += ch;
      }
    }
  }

  if (field || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}
