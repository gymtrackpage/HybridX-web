/**
 * FIT activity export built on Garmin's official JavaScript SDK.
 * The SDK (~1 MB of profile tables) is dynamically imported so it only
 * loads when the user actually exports a FIT file.
 */

import { buildActivity, computeTotals, type ActivityOptions } from '@/lib/tcx';

const SEMICIRCLES_PER_DEGREE = 2 ** 31 / 180;

export interface FitOptions extends ActivityOptions {
  /** tagged as treadmill (indoor) unless a simulated GPS route is set */
  treadmill: boolean;
}

export async function generateFit(opts: FitOptions): Promise<Uint8Array> {
  const { Encoder, Profile, Utils } = await import('@garmin/fitsdk');

  const laps = buildActivity(opts);
  const totals = computeTotals(opts.segments);
  const startTime = Utils.convertDateToDateTime(opts.startTime);
  const endTime = startTime + totals.timeSec;
  const localTimestampOffset = opts.startTime.getTimezoneOffset() * -60;

  type Mesg = Record<string, unknown> & { mesgNum: number };
  const mesgs: Mesg[] = [];

  mesgs.push({
    mesgNum: Profile.MesgNum.FILE_ID,
    type: 'activity',
    manufacturer: 'development',
    product: 0,
    timeCreated: startTime,
    serialNumber: 1,
  });

  mesgs.push({
    mesgNum: Profile.MesgNum.DEVICE_INFO,
    deviceIndex: 'creator',
    manufacturer: 'development',
    product: 0,
    productName: 'HybridX Treadmill TCX Studio',
    serialNumber: 1,
    softwareVersion: 1.0,
    timestamp: startTime,
  });

  mesgs.push({
    mesgNum: Profile.MesgNum.EVENT,
    timestamp: startTime,
    event: 'timer',
    eventType: 'start',
  });

  let totalCalories = 0;
  const allHrs: number[] = [];

  laps.forEach((lap, lapIndex) => {
    for (const p of lap.points) {
      const record: Mesg = {
        mesgNum: Profile.MesgNum.RECORD,
        timestamp: startTime + Math.round(p.elapsedSec),
        distance: p.cumDistM,
        enhancedSpeed: p.speedMps,
        enhancedAltitude: p.elevationM,
      };
      if (p.hr !== null) {
        record.heartRate = Math.round(p.hr);
        allHrs.push(p.hr);
      }
      if (p.cad !== null) record.cadence = Math.round(p.cad);
      if (p.lat !== null && p.lon !== null) {
        record.positionLat = Math.round(p.lat * SEMICIRCLES_PER_DEGREE);
        record.positionLong = Math.round(p.lon * SEMICIRCLES_PER_DEGREE);
      }
      mesgs.push(record);
    }

    totalCalories += lap.calories;
    const seg = lap.segment;
    const lapMesg: Mesg = {
      mesgNum: Profile.MesgNum.LAP,
      messageIndex: lapIndex,
      timestamp: startTime + Math.round(lap.startElapsedSec + seg.timeSec),
      startTime: startTime + Math.round(lap.startElapsedSec),
      totalElapsedTime: seg.timeSec,
      totalTimerTime: seg.timeSec,
      totalDistance: seg.distanceM,
      enhancedAvgSpeed: seg.speedMps,
      enhancedMaxSpeed: seg.speedMps,
      totalCalories: lap.calories,
      event: 'lap',
      eventType: 'stop',
      intensity: 'active',
      lapTrigger: 'manual',
      sport: 'running',
    };
    if (seg.incline > 0) lapMesg.totalAscent = Math.round(seg.distanceM * (seg.incline / 100));
    if (lap.avgHr !== null) lapMesg.avgHeartRate = lap.avgHr;
    if (lap.maxHr !== null) lapMesg.maxHeartRate = lap.maxHr;
    mesgs.push(lapMesg);
  });

  mesgs.push({
    mesgNum: Profile.MesgNum.EVENT,
    timestamp: endTime,
    event: 'timer',
    eventType: 'stopAll',
  });

  const sessionMesg: Mesg = {
    mesgNum: Profile.MesgNum.SESSION,
    messageIndex: 0,
    timestamp: endTime,
    startTime: startTime,
    totalElapsedTime: totals.timeSec,
    totalTimerTime: totals.timeSec,
    totalDistance: totals.distanceM,
    totalAscent: Math.round(totals.climbM),
    totalCalories,
    enhancedAvgSpeed: totals.timeSec > 0 ? totals.distanceM / totals.timeSec : 0,
    enhancedMaxSpeed: Math.max(...opts.segments.map((s) => s.speedMps)),
    sport: 'running',
    subSport: opts.treadmill ? 'treadmill' : 'generic',
    firstLapIndex: 0,
    numLaps: laps.length,
    event: 'session',
    eventType: 'stop',
  };
  if (allHrs.length) {
    sessionMesg.avgHeartRate = Math.round(allHrs.reduce((a, b) => a + b, 0) / allHrs.length);
    sessionMesg.maxHeartRate = Math.round(Math.max(...allHrs));
  }
  mesgs.push(sessionMesg);

  mesgs.push({
    mesgNum: Profile.MesgNum.ACTIVITY,
    timestamp: endTime,
    numSessions: 1,
    localTimestamp: endTime + localTimestampOffset,
    totalTimerTime: totals.timeSec,
  });

  const encoder = new Encoder();
  mesgs.forEach((m) => encoder.writeMesg(m));
  return encoder.close();
}
