/**
 * Pure logic for the Treadmill TCX Generator.
 * Everything here runs client-side only — no data leaves the browser.
 */

export type Unit = 'km' | 'mi';

export function unitMeters(unit: Unit): number {
  return unit === 'mi' ? 1609.34 : 1000;
}

/* ---------------- workout model ---------------- */

export interface SegmentDraft {
  id: number;
  kind: 'segment';
  name: string;
  mode: 'time' | 'distance';
  /** mm:ss or decimal minutes when mode=time; distance in current unit when mode=distance */
  value: string;
  /** mm:ss per current unit */
  pace: string;
  /** percent grade */
  incline: string;
}

export interface RepeatDraft {
  id: number;
  kind: 'repeat';
  count: number;
  skipLastRest: boolean;
  children: SegmentDraft[];
}

export type BlockDraft = SegmentDraft | RepeatDraft;

export interface FlatSegment {
  name: string;
  timeSec: number;
  distanceM: number;
  speedMps: number;
  incline: number;
}

/* ---------------- parsing & formatting ---------------- */

/** "5:30" -> 330, "5" -> 300, "5.5" -> 330 (decimal minutes). Null when invalid. */
export function parseMinSec(str: string): number | null {
  const s = String(str).trim();
  if (s === '') return null;
  if (s.includes(':')) {
    const parts = s.split(':');
    if (parts.length !== 2) return null;
    const m = parseFloat(parts[0]);
    const sec = parseFloat(parts[1]);
    if (isNaN(m) || isNaN(sec) || sec >= 60 || m < 0 || sec < 0) return null;
    return m * 60 + sec;
  }
  const v = parseFloat(s);
  if (isNaN(v) || v < 0) return null;
  return v * 60;
}

export function parseDurationSec(str: string): number | null {
  const v = parseMinSec(str);
  return v !== null && v > 0 ? v : null;
}

export function parsePaceToSecPerKm(str: string, unit: Unit): number | null {
  const secPerUnit = parseMinSec(str);
  if (secPerUnit === null || secPerUnit <= 0) return null;
  return secPerUnit / (unitMeters(unit) / 1000);
}

export function parseDistanceToMeters(str: string, unit: Unit): number | null {
  const v = parseFloat(str);
  if (isNaN(v) || v <= 0) return null;
  return v * unitMeters(unit);
}

export function parseIncline(str: string): number | null {
  const v = parseFloat(str);
  if (isNaN(v)) return null;
  return Math.max(-10, Math.min(40, v));
}

export function secPerKmToPaceStr(secPerKm: number, unit: Unit): string {
  const secPerUnit = secPerKm * (unitMeters(unit) / 1000);
  let m = Math.floor(secPerUnit / 60);
  let s = Math.round(secPerUnit % 60);
  if (s === 60) {
    m++;
    s = 0;
  }
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function speedHint(paceStr: string, unit: Unit): string | null {
  const secPerUnit = parseMinSec(paceStr);
  if (secPerUnit === null || secPerUnit <= 0) return null;
  const sp = 3600 / secPerUnit;
  return `${sp.toFixed(1)} ${unit === 'mi' ? 'mph' : 'km/h'}`;
}

export function metersToDistStr(m: number, unit: Unit): string {
  return (m / unitMeters(unit))
    .toFixed(2)
    .replace(/\.00$/, '')
    .replace(/(\.\d)0$/, '$1');
}

export function fmtHMS(totalSec: number): string {
  const t = Math.round(totalSec);
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = t % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function fmtMinSec(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function xmlEscape(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ---------------- flatten & totals ---------------- */

export function computeSegment(seg: SegmentDraft, unit: Unit): FlatSegment | null {
  const paceSecPerKm = parsePaceToSecPerKm(seg.pace, unit);
  const incline = parseIncline(seg.incline);
  if (paceSecPerKm === null || incline === null) return null;
  const speedMps = 1000 / paceSecPerKm;
  let timeSec: number;
  let distanceM: number;
  if (seg.mode === 'time') {
    const t = parseDurationSec(seg.value);
    if (t === null) return null;
    timeSec = t;
    distanceM = speedMps * t;
  } else {
    const d = parseDistanceToMeters(seg.value, unit);
    if (d === null) return null;
    distanceM = d;
    timeSec = d / speedMps;
  }
  return { name: seg.name || 'Segment', timeSec, distanceM, speedMps, incline };
}

export interface FlattenResult {
  segments: FlatSegment[];
  hasErrors: boolean;
}

export function flattenBlocks(blocks: BlockDraft[], unit: Unit): FlattenResult {
  const out: FlatSegment[] = [];
  let hasErrors = false;
  for (const b of blocks) {
    if (b.kind === 'segment') {
      const c = computeSegment(b, unit);
      if (c) out.push(c);
      else hasErrors = true;
    } else {
      for (let r = 0; r < b.count; r++) {
        let kids = b.children;
        if (b.skipLastRest && r === b.count - 1 && kids.length > 1) kids = kids.slice(0, -1);
        for (const k of kids) {
          const c = computeSegment(k, unit);
          if (!c) {
            hasErrors = true;
            continue;
          }
          if (b.count > 1) c.name = `${c.name} (${r + 1}/${b.count})`;
          out.push(c);
        }
      }
    }
  }
  return { segments: out, hasErrors };
}

export interface Totals {
  timeSec: number;
  distanceM: number;
  climbM: number;
}

export function computeTotals(segments: FlatSegment[]): Totals {
  let timeSec = 0;
  let distanceM = 0;
  let climbM = 0;
  for (const s of segments) {
    timeSec += s.timeSec;
    distanceM += s.distanceM;
    const rise = s.distanceM * (s.incline / 100);
    if (rise > 0) climbM += rise;
  }
  return { timeSec, distanceM, climbM };
}

/**
 * Estimated energy cost from the ACSM metabolic equations
 * (walking below 8 km/h, running at or above). Returns kcal.
 */
export function estimateCalories(segments: FlatSegment[], weightKg: number): number {
  if (!(weightKg > 0)) return 0;
  let kcal = 0;
  for (const s of segments) {
    const vMPerMin = s.speedMps * 60;
    const grade = Math.max(0, s.incline / 100);
    const running = s.speedMps >= 8000 / 3600;
    const vo2 = running
      ? 3.5 + 0.2 * vMPerMin + 0.9 * vMPerMin * grade
      : 3.5 + 0.1 * vMPerMin + 1.8 * vMPerMin * grade;
    kcal += ((vo2 * weightKg) / 200) * (s.timeSec / 60);
  }
  return Math.round(kcal);
}

/* ---------------- sensor file parsing (GPX / TCX) ---------------- */

export interface SensorPoint {
  t: number; // seconds since first point
  hr: number | null;
  cad: number | null;
}

export interface SensorTrack {
  points: SensorPoint[];
  durationSec: number;
  count: number;
  hrMin: number | null;
  hrMax: number | null;
  hasCadence: boolean;
  fileName: string;
}

/**
 * Parse a GPX or TCX file exported by a watch and lift out the
 * timestamped heart-rate / cadence stream. Format is detected from the
 * document itself, not the file extension.
 */
export function parseSensorFile(text: string, fileName: string): SensorTrack {
  const doc = new DOMParser().parseFromString(text, 'application/xml');
  if (doc.querySelector('parsererror')) throw new Error('The file is not valid XML.');

  const isTcx = doc.getElementsByTagName('TrainingCenterDatabase').length > 0;
  const points = isTcx ? extractTcxPoints(doc) : extractGpxPoints(doc);
  if (!points.length) throw new Error('No timestamped track points were found in the file.');

  points.sort((a, b) => a.t - b.t);
  const hrVals = points.map((p) => p.hr).filter((v): v is number => v !== null);
  return {
    points,
    durationSec: points[points.length - 1].t,
    count: points.length,
    hrMin: hrVals.length ? Math.round(Math.min(...hrVals)) : null,
    hrMax: hrVals.length ? Math.round(Math.max(...hrVals)) : null,
    hasCadence: points.some((p) => p.cad !== null),
    fileName,
  };
}

function extractGpxPoints(doc: Document): SensorPoint[] {
  const trkpts = Array.from(doc.getElementsByTagName('trkpt'));
  if (!trkpts.length) throw new Error('No GPX track points found — is this a GPX activity file?');
  const points: SensorPoint[] = [];
  let firstTime: number | null = null;
  for (const pt of trkpts) {
    const timeEl = pt.getElementsByTagName('time')[0];
    if (!timeEl) continue;
    const t = new Date(timeEl.textContent || '').getTime();
    if (isNaN(t)) continue;
    if (firstTime === null) firstTime = t;
    let hr: number | null = null;
    let cad: number | null = null;
    for (const el of Array.from(pt.getElementsByTagName('*'))) {
      const ln = el.localName.toLowerCase();
      if (ln === 'hr') hr = numOrNull(el.textContent);
      else if (ln === 'cad') cad = numOrNull(el.textContent);
    }
    points.push({ t: (t - firstTime) / 1000, hr, cad });
  }
  return points;
}

function extractTcxPoints(doc: Document): SensorPoint[] {
  const tps = Array.from(doc.getElementsByTagName('Trackpoint'));
  if (!tps.length) throw new Error('No TCX trackpoints found — is this a TCX activity file?');
  const points: SensorPoint[] = [];
  let firstTime: number | null = null;
  for (const tp of tps) {
    const timeEl = tp.getElementsByTagName('Time')[0];
    if (!timeEl) continue;
    const t = new Date(timeEl.textContent || '').getTime();
    if (isNaN(t)) continue;
    if (firstTime === null) firstTime = t;
    let hr: number | null = null;
    let cad: number | null = null;
    const hrEl = tp.getElementsByTagName('HeartRateBpm')[0];
    if (hrEl) {
      const vEl = hrEl.getElementsByTagName('Value')[0];
      if (vEl) hr = numOrNull(vEl.textContent);
    }
    for (const el of Array.from(tp.getElementsByTagName('*'))) {
      if (el.localName === 'RunCadence' || el.localName === 'Cadence') {
        cad = numOrNull(el.textContent);
        break;
      }
    }
    points.push({ t: (t - firstTime) / 1000, hr, cad });
  }
  return points;
}

function numOrNull(text: string | null): number | null {
  const v = parseFloat(text || '');
  return isNaN(v) ? null : v;
}

/**
 * Binary-search interpolating sampler over the sensor stream.
 * O(log n) per lookup instead of the naive O(n) scan.
 */
export function createSensorSampler(points: SensorPoint[]) {
  return function sample(tSec: number, key: 'hr' | 'cad'): number | null {
    if (!points.length) return null;
    if (tSec <= points[0].t) return points[0][key];
    const last = points[points.length - 1];
    if (tSec >= last.t) return last[key];
    let lo = 0;
    let hi = points.length - 1;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (points[mid].t <= tSec) lo = mid;
      else hi = mid;
    }
    const a = points[lo];
    const b = points[hi];
    const av = a[key];
    const bv = b[key];
    if (av === null) return bv;
    if (bv === null) return av;
    const frac = b.t - a.t === 0 ? 0 : (tSec - a.t) / (b.t - a.t);
    return av + (bv - av) * frac;
  };
}

/* ---------------- activity simulation (shared by TCX & FIT export) ---------------- */

export type SensorAlign = 'stretch' | 'realtime';

export interface ActivityOptions {
  name: string;
  startTime: Date;
  segments: FlatSegment[];
  /** seconds between trackpoints */
  resolutionSec: number;
  startElevationM: number;
  sensor?: SensorTrack | null;
  /** stretch: map sensor timeline onto the workout; realtime: 1:1 from the start */
  sensorAlign?: SensorAlign;
  /** body weight for the calorie estimate; omit to write 0 calories */
  weightKg?: number | null;
  /** when set, draws a small looping GPS track at the anchor (outdoor mode) */
  route?: { lat: number; lon: number; radiusM: number } | null;
}

export interface ActivityPoint {
  elapsedSec: number;
  cumDistM: number;
  elevationM: number;
  speedMps: number;
  hr: number | null;
  cad: number | null;
  lat: number | null;
  lon: number | null;
}

export interface ActivityLap {
  segment: FlatSegment;
  startElapsedSec: number;
  points: ActivityPoint[];
  calories: number;
  avgHr: number | null;
  maxHr: number | null;
}

/**
 * Run the workout simulation once: one lap per flattened segment, with
 * elapsed time, cumulative distance and elevation carried across the whole
 * activity, sensor data re-timed on, and an optional simulated GPS loop.
 */
export function buildActivity(opts: ActivityOptions): ActivityLap[] {
  const {
    segments,
    resolutionSec,
    startElevationM,
    sensor,
    sensorAlign = 'stretch',
    weightKg,
    route,
  } = opts;

  const totals = computeTotals(segments);
  const hasSensor = !!(sensor && sensor.points.length);
  const sample = hasSensor ? createSensorSampler(sensor.points) : null;

  const sensorAt = (elapsedSec: number, key: 'hr' | 'cad'): number | null => {
    if (!sample || !sensor) return null;
    if (sensorAlign === 'realtime') {
      // 1:1 mapping; beyond the recording just holds the last value,
      // which the sampler already does.
      return sample(elapsedSec, key);
    }
    const frac = totals.timeSec > 0 ? elapsedSec / totals.timeSec : 0;
    return sample(frac * sensor.durationSec, key);
  };

  const circumference = route ? 2 * Math.PI * route.radiusM : 0;
  const cosLat = route ? Math.cos((route.lat * Math.PI) / 180) : 1;

  let elapsed = 0;
  let cumDist = 0;
  let elevation = startElevationM;

  return segments.map((seg) => {
    const startElapsedSec = elapsed;
    const points: ActivityPoint[] = [];
    const hrs: number[] = [];
    let t = 0;
    while (t < seg.timeSec - 1e-9) {
      const dt = Math.min(resolutionSec, seg.timeSec - t);
      const dDist = seg.speedMps * dt;
      cumDist += dDist;
      elevation += dDist * (seg.incline / 100);
      elapsed += dt;
      t += dt;

      const hr = sensorAt(elapsed, 'hr');
      const cad = sensorAt(elapsed, 'cad');
      if (hr !== null) hrs.push(hr);

      let lat: number | null = null;
      let lon: number | null = null;
      if (route) {
        const wobble = 1.6 * Math.sin(cumDist * 0.045) + 0.9 * Math.sin(cumDist * 0.013 + 1.7);
        const r = route.radiusM + wobble;
        const angle = ((cumDist % circumference) / circumference) * 2 * Math.PI;
        lat = route.lat + (r * Math.sin(angle)) / 111320;
        lon = route.lon + (r * Math.cos(angle)) / (111320 * cosLat);
      }

      points.push({
        elapsedSec: elapsed,
        cumDistM: cumDist,
        elevationM: elevation,
        speedMps: seg.speedMps,
        hr,
        cad,
        lat,
        lon,
      });
    }

    return {
      segment: seg,
      startElapsedSec,
      points,
      calories: weightKg && weightKg > 0 ? estimateCalories([seg], weightKg) : 0,
      avgHr: hrs.length ? Math.round(hrs.reduce((a, b) => a + b, 0) / hrs.length) : null,
      maxHr: hrs.length ? Math.round(Math.max(...hrs)) : null,
    };
  });
}

/* ---------------- TCX generation ---------------- */

export function generateTcx(opts: ActivityOptions): string {
  const { name, startTime } = opts;
  const laps = buildActivity(opts);

  const isoAt = (elapsedSec: number) =>
    new Date(startTime.getTime() + elapsedSec * 1000).toISOString().split('.')[0] + 'Z';

  const lapXml = laps
    .map((lap) => {
      const seg = lap.segment;
      const trkpts = lap.points.map((p) => {
        const posXml =
          p.lat !== null && p.lon !== null
            ? `<Position><LatitudeDegrees>${p.lat.toFixed(6)}</LatitudeDegrees><LongitudeDegrees>${p.lon.toFixed(6)}</LongitudeDegrees></Position>`
            : '';
        const tpx =
          `<Speed>${p.speedMps.toFixed(3)}</Speed>` +
          (p.cad !== null ? `<RunCadence>${Math.round(p.cad)}</RunCadence>` : '');
        return (
          `<Trackpoint><Time>${isoAt(p.elapsedSec)}</Time>${posXml}` +
          `<AltitudeMeters>${p.elevationM.toFixed(1)}</AltitudeMeters>` +
          `<DistanceMeters>${p.cumDistM.toFixed(2)}</DistanceMeters>` +
          (p.hr !== null ? `<HeartRateBpm><Value>${Math.round(p.hr)}</Value></HeartRateBpm>` : '') +
          `<Extensions><TPX xmlns="http://www.garmin.com/xmlschemas/ActivityExtension/v2">${tpx}</TPX></Extensions>` +
          `</Trackpoint>`
        );
      });

      const avgHrXml =
        lap.avgHr !== null ? `<AverageHeartRateBpm><Value>${lap.avgHr}</Value></AverageHeartRateBpm>` : '';
      const maxHrXml =
        lap.maxHr !== null ? `<MaximumHeartRateBpm><Value>${lap.maxHr}</Value></MaximumHeartRateBpm>` : '';

      return (
        `<Lap StartTime="${isoAt(lap.startElapsedSec)}">` +
        `<TotalTimeSeconds>${seg.timeSec.toFixed(1)}</TotalTimeSeconds>` +
        `<DistanceMeters>${seg.distanceM.toFixed(2)}</DistanceMeters>` +
        `<MaximumSpeed>${seg.speedMps.toFixed(3)}</MaximumSpeed>` +
        `<Calories>${lap.calories}</Calories>` +
        avgHrXml +
        maxHrXml +
        `<Intensity>Active</Intensity>` +
        `<TriggerMethod>Manual</TriggerMethod>` +
        `<Track>\n        ${trkpts.join('\n        ')}\n      </Track>` +
        `<Notes>${xmlEscape(seg.name)}</Notes>` +
        `</Lap>`
      );
    })
    .join('\n      ');

  const safeName = xmlEscape(name || 'Treadmill Session');
  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<TrainingCenterDatabase xmlns="http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2 http://www.garmin.com/xmlschemas/TrainingCenterDatabasev2.xsd">\n' +
    '  <Activities>\n' +
    '    <Activity Sport="Running">\n' +
    `      <Id>${isoAt(0)}</Id>\n` +
    `      ${lapXml}\n` +
    `      <Notes>${safeName}</Notes>\n` +
    '    </Activity>\n' +
    '  </Activities>\n' +
    '</TrainingCenterDatabase>'
  );
}
