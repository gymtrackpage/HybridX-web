import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { adminFirestore } from '@/lib/firebase-admin';

function csvEscape(value: unknown): string {
  const str = value === null || value === undefined ? '' : String(value);
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
  }

  const source = request.nextUrl.searchParams.get('source') || undefined;
  const collection = adminFirestore.collection('leads');
  const query = source
    ? collection.where('source', '==', source).orderBy('createdAt', 'desc').limit(2000)
    : collection.orderBy('createdAt', 'desc').limit(2000);

  const snapshot = await query.get();

  const rows = [['Date', 'Source', 'Name', 'Email', 'Details']];
  snapshot.docs.forEach((doc) => {
    const data = doc.data();
    const createdAt = data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : '';
    const extra = data.extra || {};
    const details = Object.entries(extra)
      .filter(([, v]) => v && (typeof v !== 'object' || Object.keys(v as object).length))
      .map(([k, v]) => `${k}: ${typeof v === 'object' ? JSON.stringify(v) : v}`)
      .join(' | ');
    rows.push([createdAt, data.source || '', data.name || '', data.email || '', details]);
  });

  const csv = rows.map((row) => row.map(csvEscape).join(',')).join('\n');

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="leads${source ? `-${source}` : ''}.csv"`,
    },
  });
}
