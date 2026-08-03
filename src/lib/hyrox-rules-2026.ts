/**
 * Structured data for the 2026/27 HYROX rule-change briefing
 * (/hyrox-rule-changes-2026).
 *
 * Everything the interactive components render lives here so the page copy,
 * the triage board, the penalty calculator and the JSON-LD all stay in sync
 * with a single edit. Penalty values are taken from the 2026/27 Singles,
 * Doubles and Team Relay rulebooks; where a rulebook does not publish a
 * numeric penalty we deliberately store `null` rather than guess one.
 */

export type Severity = 'dq' | 'time' | 'good' | 'know';
export type RaceFormat = 'singles' | 'doubles' | 'relay';

export interface RuleChange {
  id: string;
  /** Short card headline. */
  title: string;
  severity: Severity;
  /** Which race formats the rule applies to. */
  formats: RaceFormat[];
  /** The price of getting it wrong, in as few words as possible. */
  cost: string;
  /** One-sentence plain-English summary — also used for the card collapsed state. */
  summary: string;
  /** The detail, as short paragraphs. */
  detail: string[];
  /** The habit that protects you. */
  doThis?: string;
  /** True for changes that are new or materially tightened this season. */
  isNew?: boolean;
}

export const SEVERITY_META: Record<
  Severity,
  { label: string; short: string; blurb: string }
> = {
  dq: {
    label: 'Ends your race',
    short: 'DQ',
    blurb: 'Get this wrong and there is no time on the board at all.',
  },
  time: {
    label: 'Costs you time',
    short: 'Penalty',
    blurb: 'A published penalty gets added to your finish time. No warnings.',
  },
  good: {
    label: 'In your favour',
    short: 'Good news',
    blurb: 'Things you are now explicitly allowed to do. Use them.',
  },
  know: {
    label: 'Worth knowing',
    short: 'Context',
    blurb: 'Unlikely to bite you on race day, but it shapes the season.',
  },
};

export const FORMAT_META: Record<RaceFormat, { label: string }> = {
  singles: { label: 'Singles' },
  doubles: { label: 'Doubles' },
  relay: { label: 'Relay' },
};

const ALL_FORMATS: RaceFormat[] = ['singles', 'doubles', 'relay'];

export const RULE_CHANGES: RuleChange[] = [
  {
    id: 'incomplete-station',
    title: 'An incomplete station is now a disqualification',
    severity: 'dq',
    formats: ALL_FORMATS,
    cost: 'Disqualification',
    isNew: true,
    summary:
      'Every one of the eight workout stations must be completed in full. Leave one unfinished and you are out — not penalised, not given a time with an asterisk.',
    detail: [
      'This is written as a blanket standard now, and the rulebook spells out where it bites: leaving the SkiErg or the rower before the full 1,000 metres, leaving the wall balls before 100 valid reps, missing a sled lane on the push or the pull, missing a lap on the farmers carry, or missing an entire station or an entire 1km run.',
      'The SkiErg and rower are the traps. You are deep in a race, your eyes are streaming, the monitor is a blur, and you decide you have done enough. Under the old interpretation there was room for argument. There is none now.',
      'Expect this to catch the most people at the wall balls, because that is where judgement is worst and the temptation to walk away is highest. If the screen has not gone green and your judge has not confirmed, you are not finished.',
    ],
    doThis:
      'Do not leave any station until a judge confirms you are done. If you genuinely cannot tell whether you have finished, ask. Ten seconds of asking beats a DQ.',
  },
  {
    id: 'missed-run-lap',
    title: 'Missed run laps now have a published scale',
    severity: 'time',
    formats: ALL_FORMATS,
    cost: '3–7 min, or DQ at one-lap venues',
    isNew: true,
    summary:
      'What used to be a vague range is now a fixed scale that depends on how your venue lays out its 1km loop — and at single-loop venues a missed lap is a disqualification.',
    detail: [
      'Four laps per kilometre costs 3 minutes per missed lap. Three laps costs 5 minutes. Two laps costs 7 minutes. One lap per kilometre is a straight disqualification.',
      'The one-lap venues are the ones to watch. If your race is a big arena with a single long loop, a missed lap is not a penalty, it is the end of your day.',
      'The lap screens at the venue are a convenience, not an official record, and the rulebook says so directly.',
    ],
    doThis:
      'Find out before you start whether your venue is a one, two, three or four lap setup, and count your own laps.',
  },
  {
    id: 'sandbag-support',
    title: 'The sandbag rule got better, then stricter',
    severity: 'time',
    formats: ALL_FORMATS,
    cost: '15 sec per infringement',
    isNew: true,
    summary:
      'Dropping the sandbag twice no longer disqualifies you — each infringement is 15 seconds instead. But the support standard is tighter than most people realise, and there are no warnings.',
    detail: [
      'Good news first: the two-drop disqualification is gone. Each infringement is a 15 second penalty. That is a fairer outcome.',
      'The catch is that the sandbag has to stay fully supported by you for the whole 100 metres. Not resting on a barricade, not propped on your feet, not on the floor while you catch your breath. If it is bearing its weight anywhere other than on you, that is 15 seconds.',
      'If your lunges fall apart at 60 metres and you have been getting away with a cheeky rest on the barrier, that habit now has a price.',
    ],
    doThis:
      'Train the back half of the lunges under load so you never need the barrier. Rest standing, with the bag still on you.',
  },
  {
    id: 'chalk',
    title: 'Chalk is allowed at two stations only',
    severity: 'time',
    formats: ALL_FORMATS,
    cost: '2 min',
    isNew: true,
    summary:
      'Sled pull and farmers carry. Using chalk anywhere else is a 2 minute penalty, and powdered chalk at the wall balls is called out specifically.',
    detail: [
      'It has to be the chalk the event provides, and you cannot carry it from one station to another.',
      'Powdered chalk at the wall balls is a specific 2 minute penalty.',
    ],
    doThis:
      'Chalk up at the sled pull and the farmers carry, and leave it there. Nothing in a pocket, nothing on a wrist band.',
  },
  {
    id: 'water',
    title: 'Aid station water is for drinking',
    severity: 'time',
    formats: ALL_FORMATS,
    cost: '2 min per go',
    isNew: true,
    summary:
      'You can no longer tip aid station water over your head. It is a slip hazard for everyone behind you, and it costs 2 minutes each time.',
    detail: [
      'Fair enough as rules go — a wet floor on a run lane is a genuine hazard for the athletes following you.',
      'If you race hot, sort your cooling before you start rather than mid-race.',
    ],
    doThis:
      'Pre-cool before the start, and use your own kit for cooling rather than the aid station cups.',
  },
  {
    id: 'skierg-jump',
    title: 'You can jump on the SkiErg',
    severity: 'good',
    formats: ALL_FORMATS,
    cost: 'No penalty — explicitly allowed',
    isNew: true,
    summary:
      'A dynamic or jumping motion on the SkiErg is now explicitly allowed. Your feet may leave the base plate during the movement.',
    detail: [
      'The only requirement is that your feet land back on the base plate and not on the floor.',
      'Plenty of strong skiers have been coached out of that technique because they were not sure it was legal. It is. If jumping suits you, use it.',
    ],
    doThis:
      'If you have been suppressing a natural jumping ski stroke, test it in training and see what it does to your 1,000m split.',
  },
  {
    id: 'overtaking',
    title: 'Overtaking is officially fine',
    severity: 'good',
    formats: ALL_FORMATS,
    cost: 'No penalty — explicitly allowed',
    isNew: true,
    summary:
      'On the lunges, burpee broad jumps and farmers carry you may pass a slower athlete whenever it is safe to do so.',
    detail: [
      'Grid lines and lane markings at those stations are orientation only. You are not obliged to stay inside them.',
      'Anyone who has been stuck behind someone on a burpee lane knows why this matters.',
    ],
    doThis: 'Look up, pick your line, and pass early rather than shuffling in someone else’s rhythm.',
  },
  {
    id: 'doubles-togetherness',
    title: 'Doubles togetherness is down to a 10 second gap',
    severity: 'time',
    formats: ['doubles'],
    cost: 'Out of ranking after 3 infringements',
    isNew: true,
    summary:
      'The maximum gap between partners is now ten seconds, measured by the timing equipment going in and out of the RoxZone. You still cannot start a station until you are both there.',
    detail: [
      'If you race doubles, this is the change to actually train for. Ten seconds is not much when one of you is having a rough run.',
      'The teams that get punished here are the mismatched ones, where the stronger runner drifts off without noticing.',
      'The ceiling is low. Rack up more than three togetherness infringements and you are marked out of competition with no ranking at all. Three is your entire budget for the race.',
    ],
    doThis:
      'Practise running together at the pace of whoever is having the worse day — not at the average of your two paces.',
  },
  {
    id: 'relay-transition-chip',
    title: 'Relay: you still run the transition zone when you go back-to-back',
    severity: 'time',
    formats: ['relay'],
    cost: 'Automatic penalty',
    isNew: true,
    summary:
      'If one member does two runs and two stations back to back, they still have to run through the transition zone after each workout so their chip gets read.',
    detail: [
      'It feels wrong, because you have not swapped with anyone. But the timing system needs to see you, and missing that read is an automatic penalty.',
      'This is the relay rule that most teams do not know exists until it costs them.',
    ],
    doThis:
      'Brief it before the race: every workout ends with a transition zone pass, swap or no swap.',
  },
  {
    id: 'relay-finish',
    title: 'Relay: the finish has a protocol',
    severity: 'know',
    formats: ['relay'],
    cost: 'Scattered team, missed photo',
    summary:
      'Once your fourth member leaves the transition zone for the last run, the other three have a specific route to the wall ball rig — and all four cross the line together.',
    detail: [
      'The three finished members head to the wall ball station through the spectator pathways, come in via the marked relay entry point once their teammate has started throwing, and stand under the rig.',
      'All four then run to the finisher stage and cross the line together.',
      'Most teams do not know this and end up scattered across the venue for the photo.',
    ],
    doThis: 'Walk the route as a team during your venue recce, and agree a meeting point under the rig.',
  },
  {
    id: 'out-of-ranking',
    title: 'HYROX can declare an event out of ranking',
    severity: 'know',
    formats: ALL_FORMATS,
    cost: 'Time stands, but does not count',
    isNew: true,
    summary:
      'An event or a single day can now be declared out of ranking for qualification and world record purposes if conditions affect performance or safety.',
    detail: [
      'Wet turf, extreme heat, that sort of thing.',
      'Your time still stands. It just will not count towards Worlds qualification or a record.',
    ],
  },
  {
    id: 'fast-lane',
    title: 'Sub 4:00/km must use the fast lane',
    severity: 'know',
    formats: ALL_FORMATS,
    cost: 'Traffic management',
    summary:
      'If you are running 4:00 per kilometre or quicker you are required to use the inside fast lane. Everyone else stays outside.',
    detail: [
      'Worth knowing which side of that line you fall on before the gun, so you are not the person drifting across a lane at 6km.',
    ],
  },
  {
    id: 'smart-glasses',
    title: 'Smart glasses are banned',
    severity: 'know',
    formats: ALL_FORMATS,
    cost: 'Banned equipment',
    isNew: true,
    summary:
      'Along with headphones, phones, body cameras and ear plugs. Anything with a camera, recording, streaming or augmented reality function is out.',
    detail: [
      'The category is deliberately broad — it is about the function, not the form factor.',
    ],
  },
  {
    id: 'challenger-division',
    title: 'The Challenger Division',
    severity: 'know',
    formats: ['singles'],
    cost: 'New pathway',
    isNew: true,
    summary:
      'New this season for athletes ranked 16 to 30. Each Challenger race winner earns a slot in the Elite 15 at the next elite event.',
    detail: [
      'Not relevant to most of us, but it is a proper pathway that did not exist before.',
    ],
  },
  {
    id: 'elite-qualification',
    title: 'Elite qualification is points based',
    severity: 'know',
    formats: ['singles', 'doubles'],
    cost: 'Licence required',
    isNew: true,
    summary:
      'A rolling 365 day window, best five singles results or best three doubles results, and you need an athlete licence for any of it to count.',
    detail: ['Licences cannot be applied retrospectively, so buy it before the race you want to count.'],
  },
  {
    id: 'doubles-nationality',
    title: 'Pro doubles partners must share a nationality',
    severity: 'know',
    formats: ['doubles'],
    cost: 'Qualification eligibility',
    isNew: true,
    summary:
      'For Pro doubles chasing elite qualification, both partners must hold the same nationality, evidenced by passport.',
    detail: ['This is the rule that breaks up some well known partnerships.'],
  },
  {
    id: 'age-60',
    title: 'Age 60 and over',
    severity: 'know',
    formats: ['singles', 'doubles'],
    cost: 'Qualification route',
    isNew: true,
    summary:
      'You can still race Pro at regular events and take age group podiums, but qualification for Worlds is through Open only, and you race Open weights at Worlds.',
    detail: [],
  },
];

/* ── The eight stations, and what "complete" means at each ───────────────── */

export interface StationSpec {
  id: string;
  name: string;
  /** Order in the race, 1–8. */
  order: number;
  /** The completion standard. */
  standard: string;
  /** How people get it wrong. */
  trap: string;
  /** Called out explicitly in the rulebook as a DQ trigger. */
  namedInRulebook: boolean;
}

export const STATIONS: StationSpec[] = [
  {
    id: 'skierg',
    name: 'SkiErg',
    order: 1,
    standard: 'The full 1,000 metres on the monitor.',
    trap: 'Station one, fresh legs, and a monitor you can still read. Later in the race you cannot — but this is where people leave early because the number "looked close enough".',
    namedInRulebook: true,
  },
  {
    id: 'sled-push',
    name: 'Sled Push',
    order: 2,
    standard: 'Every lane of the push, in full. 50 metres.',
    trap: 'Missing a lane. In the fog of a heavy push it is genuinely easy to lose count of which lane you are on.',
    namedInRulebook: true,
  },
  {
    id: 'sled-pull',
    name: 'Sled Pull',
    order: 3,
    standard: 'Every lane of the pull, in full. 50 metres.',
    trap: 'Same as the push — a missed lane is now a DQ rather than a redo. Chalk is allowed here, which makes this one of only two legal chalk stations.',
    namedInRulebook: true,
  },
  {
    id: 'burpee-broad-jump',
    name: 'Burpee Broad Jump',
    order: 4,
    standard: 'The full 80 metres, chest to floor, jumping from two feet.',
    trap: 'Stopping short of the line because the lane ahead is blocked. You are now explicitly allowed to overtake here — use that instead of waiting.',
    namedInRulebook: false,
  },
  {
    id: 'row',
    name: 'Rowing',
    order: 5,
    standard: 'The full 1,000 metres on the monitor.',
    trap: 'The classic. Eyes streaming, monitor blurred, and you decide you have done enough. There is no room for argument under the new standard.',
    namedInRulebook: true,
  },
  {
    id: 'farmers-carry',
    name: 'Farmers Carry',
    order: 6,
    standard: 'The full 200 metres — which may be two laps or four, depending on the venue.',
    trap: 'Depending on the venue, 200 metres might be two laps or four. It is your job to know the athlete map. Nobody is going to count for you, and being wrong is now a race ender rather than a penalty.',
    namedInRulebook: true,
  },
  {
    id: 'sandbag-lunges',
    name: 'Sandbag Lunges',
    order: 7,
    standard: 'The full 100 metres, with the bag supported by you the whole way.',
    trap: 'Resting the bag on a barricade, on your feet, or on the floor. Each of those is now 15 seconds, with no warning first.',
    namedInRulebook: false,
  },
  {
    id: 'wall-balls',
    name: 'Wall Balls',
    order: 8,
    standard: '100 valid reps. Every division. Women included.',
    trap: 'This is where judgement is worst and the temptation to walk away is highest. If the screen has not gone green and your judge has not confirmed, you are not finished.',
    namedInRulebook: true,
  },
];

/* ── Lap configurations and the missed-lap scale ─────────────────────────── */

export interface LapConfig {
  /** Laps per kilometre at this venue. */
  lapsPerKm: 1 | 2 | 3 | 4;
  label: string;
  /** Penalty in seconds per missed lap, or null when the penalty is a DQ. */
  penaltySeconds: number | null;
  penaltyLabel: string;
  note: string;
}

export const LAP_CONFIGS: LapConfig[] = [
  {
    lapsPerKm: 4,
    label: '4 laps per km',
    penaltySeconds: 180,
    penaltyLabel: '3 min',
    note: 'Short loops. 32 laps across the race — the most counting, the cheapest mistake.',
  },
  {
    lapsPerKm: 3,
    label: '3 laps per km',
    penaltySeconds: 300,
    penaltyLabel: '5 min',
    note: '24 laps across the race. A single miscount costs more than most athletes’ wall ball split.',
  },
  {
    lapsPerKm: 2,
    label: '2 laps per km',
    penaltySeconds: 420,
    penaltyLabel: '7 min',
    note: '16 laps across the race. Seven minutes is a season’s worth of training gains, gone.',
  },
  {
    lapsPerKm: 1,
    label: '1 lap per km',
    penaltySeconds: null,
    penaltyLabel: 'Disqualification',
    note: 'Big arena, single long loop. A missed lap is not a penalty here — it is the end of your day.',
  },
];

/* ── Penalty calculator inputs ───────────────────────────────────────────── */

export interface PenaltyItem {
  id: string;
  label: string;
  /** Short explanation shown under the label. */
  hint: string;
  /** Seconds added per occurrence. `null` means the outcome is not a time penalty. */
  seconds: number | null;
  /** 'dq' ends the race, 'ranking' removes you from the rankings. */
  outcome?: 'dq' | 'ranking';
  formats: RaceFormat[];
  /** Maximum times you can plausibly log it, for the counter UI. */
  max: number;
  /** Rule card this maps to. */
  ruleId: string;
}

export const PENALTY_ITEMS: PenaltyItem[] = [
  {
    id: 'sandbag',
    label: 'Sandbag unsupported',
    hint: 'Rested on a barricade, your feet, or the floor. 15 sec each, no warnings.',
    seconds: 15,
    formats: ALL_FORMATS,
    max: 6,
    ruleId: 'sandbag-support',
  },
  {
    id: 'chalk',
    label: 'Chalk outside the sled pull or farmers carry',
    hint: 'Includes powdered chalk at the wall balls, and carrying chalk between stations.',
    seconds: 120,
    formats: ALL_FORMATS,
    max: 4,
    ruleId: 'chalk',
  },
  {
    id: 'water',
    label: 'Aid station water over your head',
    hint: 'Drinking only. Tipping it over yourself is 2 min a go.',
    seconds: 120,
    formats: ALL_FORMATS,
    max: 4,
    ruleId: 'water',
  },
  {
    id: 'missed-lap',
    label: 'Missed run lap',
    hint: 'Cost depends entirely on your venue layout — set it above.',
    seconds: 0, // resolved from the selected lap configuration
    formats: ALL_FORMATS,
    max: 4,
    ruleId: 'missed-run-lap',
  },
  {
    id: 'togetherness',
    label: 'Togetherness infringement',
    hint: 'More than a 10 sec gap in or out of the RoxZone. Three is your whole budget.',
    seconds: null,
    outcome: 'ranking',
    formats: ['doubles'],
    max: 5,
    ruleId: 'doubles-togetherness',
  },
  {
    id: 'transition-zone',
    label: 'Missed transition zone chip read',
    hint: 'Back-to-back legs still have to run through the zone after every workout.',
    seconds: null,
    formats: ['relay'],
    max: 4,
    ruleId: 'relay-transition-chip',
  },
  {
    id: 'incomplete',
    label: 'Left a station unfinished',
    hint: 'The one change this season that ends your race outright.',
    seconds: null,
    outcome: 'dq',
    formats: ALL_FORMATS,
    max: 1,
    ruleId: 'incomplete-station',
  },
];

/* ── Doubles standards that are not new, but still catch people ──────────── */

export const DOUBLES_STANDARDS: { title: string; body: string }[] = [
  {
    title: 'The resting partner stays on their feet',
    body: 'No kneeling, sitting or lying down at any station. Rest standing, however bad it feels.',
  },
  {
    title: 'Nothing gets passed forward',
    body: 'Kettlebells and the sandbag can never be passed forward. Sideways or backwards only.',
  },
  {
    title: 'No flying wall ball transitions',
    body: 'One of you throwing while the other catches in the squat is a no rep. Complete the rep, then swap.',
  },
  {
    title: 'Hands off the rope on the sled pull',
    body: 'You can shout, gesture and guide, but you cannot touch the rope or step into the Racer’s Box.',
  },
];

/* ── Relay finish protocol, in order ─────────────────────────────────────── */

export const RELAY_FINISH_STEPS: { step: string; body: string }[] = [
  {
    step: 'Fourth member leaves for the last run',
    body: 'The clock is still running. This is the trigger for everyone else to move.',
  },
  {
    step: 'The other three head for the wall balls',
    body: 'Through the spectator pathways — not across the race floor.',
  },
  {
    step: 'Enter via the marked relay entry point',
    body: 'Only once your teammate has started throwing. Not before.',
  },
  {
    step: 'Stand under the rig, together',
    body: 'All four of you in one place, ready to move as a unit.',
  },
  {
    step: 'Run to the finisher stage and cross together',
    body: 'One team, one line, one photo. This is the bit most teams get wrong.',
  },
];

/* ── FAQ (also emitted as FAQPage JSON-LD) ───────────────────────────────── */

export const RULE_FAQS: { question: string; answer: string }[] = [
  {
    question: 'What are the biggest HYROX rule changes for the 2026/27 season?',
    answer:
      'The single biggest change is that failing to complete any workout station in full is now a disqualification rather than a penalty. Alongside that: missed run laps have a published penalty scale (3 minutes at four-lap venues, 5 minutes at three-lap, 7 minutes at two-lap, and disqualification at one-lap venues), the sandbag two-drop disqualification has been replaced by a 15 second penalty per infringement, chalk is restricted to the sled pull and farmers carry, tipping aid station water over your head costs 2 minutes, and the doubles togetherness gap has been reduced to ten seconds.',
  },
  {
    question: 'Can you be disqualified for not finishing a HYROX station?',
    answer:
      'Yes. Under the 2026/27 rulebooks every workout station must be completed in full, and an incomplete station is a disqualification rather than a time penalty. The rulebook specifically names leaving the SkiErg or rower before 1,000 metres, leaving the wall balls before 100 valid reps, missing a sled lane, missing a farmers carry lap, and missing an entire station or 1km run.',
  },
  {
    question: 'What is the penalty for a missed run lap in HYROX?',
    answer:
      'It depends on how many laps your venue uses per kilometre. Four laps per kilometre is 3 minutes per missed lap, three laps is 5 minutes, two laps is 7 minutes, and at one-lap venues a missed lap is a straight disqualification. Venue lap screens are a convenience, not an official record, so count your own laps.',
  },
  {
    question: 'Is dropping the sandbag still a disqualification in HYROX?',
    answer:
      'No. Dropping the sandbag twice no longer disqualifies you — each infringement is a 15 second penalty instead. The support standard is stricter, though: the bag must be fully supported by you for the whole 100 metres, so resting it on a barricade, on your feet or on the floor each counts as an infringement, and there are no warnings.',
  },
  {
    question: 'Can you jump on the SkiErg in HYROX?',
    answer:
      'Yes. A dynamic or jumping motion on the SkiErg is now explicitly allowed. Your feet may leave the base plate during the movement, provided they land back on the base plate and not on the floor.',
  },
  {
    question: 'What is the HYROX doubles togetherness rule for 2026/27?',
    answer:
      'Partners must stay within a maximum ten second gap, measured by the timing equipment going in and out of the RoxZone, and neither partner may start a station until both are present. More than three togetherness infringements means the team is marked out of competition with no ranking.',
  },
  {
    question: 'How many wall balls do women do in HYROX?',
    answer:
      'Women do 100 wall balls in every division, and have done since September 2024. Any page claiming 75 reps is working from outdated information.',
  },
  {
    question: 'Where can I read the official HYROX rulebooks?',
    answer:
      'The official Singles, Doubles and Team Relay rulebooks are published on hyrox.com and are the only version that counts on race day. Any summary, including this one, is a reading of them rather than a substitute for them.',
  },
];

/* ── Helpers ─────────────────────────────────────────────────────────────── */

export function formatSeconds(totalSeconds: number): string {
  const safe = Math.max(0, Math.round(totalSeconds));
  const h = Math.floor(safe / 3600);
  const m = Math.floor((safe % 3600) / 60);
  const s = safe % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

export function countBySeverity(severity: Severity): number {
  return RULE_CHANGES.filter((rule) => rule.severity === severity).length;
}
