# "Build a Bigger Engine" Nurture Sequence

Ready-to-paste copy for the VO2max guide funnel. Tag every subscriber from
`/build-a-bigger-engine` with **`vo2max-guide`** and run this sequence on that tag.

Voice: warm, direct, encouraging, plain language. No em-dashes. One idea, one
button per email. Merge tag `{{first_name}}` falls back gracefully if empty.

Email 0 (instant delivery) is sent automatically by the website the moment someone
submits (see `src/lib/email/send-engine-guide.ts`). The five emails below run in your
ESP (ConvertKit, MailerLite, Resend Audiences, Mailchimp, etc.).

---

## Email 1 — Day 0/1 — "Did you grab your guide?"

**Subject:** Did you open it yet?
**Preview:** The one section most people screenshot.

Hi {{first_name}},

Quick check. Your free guide, Build a Bigger Engine, landed in your inbox yesterday.
If it slipped past you, here it is again: [Download the guide]({{pdf_url}}).

If you only read one thing, read the interval section. The formula most of the newest
research keeps landing on is simple:

- 3 to 5 minute reps, long enough to climb high and hold it
- Roughly equal work and rest
- Spend real time above 90 percent. That is where the engine grows.

That is it. Do that once or twice a week and you are already ahead of most people.

Train smart,
The HybridX Team

---

## Email 2 — Day 2 — "The mistake almost everyone makes"

**Subject:** Easy means easy
**Preview:** Why your easy days are probably too hard.

Hi {{first_name}},

Here is the mistake almost everyone makes. They run their easy days too fast and their
hard days too soft, then live in a grey zone that builds neither.

The best endurance athletes go about 80 percent genuinely easy and 20 percent genuinely
hard. Easy should feel almost annoyingly gentle. Hard should feel hard.

Sharpen those two ends and the middle takes care of itself. This is baked into every
HybridX plan, so you never have to guess which day is which.

Train smart,
The HybridX Team

---

## Email 3 — Day 4 — "Strength won't kill your engine"

**Subject:** Lifting will not kill your engine
**Preview:** Done right, they build each other.

Hi {{first_name}},

A myth worth killing: that lifting ruins your running, or that running ruins your
lifting. Done right, strength and endurance build each other.

The rules are simple. Keep hard runs and hard lifts apart. Use intervals for the engine.
Heavy lifting makes your running more economical, which means faster splits and faster
recovery between every station.

That balance is exactly what HybridX hybrid programming is built to manage for you.
[See how it works]({{app_url}}).

Train smart,
The HybridX Team

---

## Email 4 — Day 6 — "What a good training week actually looks like"

**Subject:** A week you could start Monday
**Preview:** The done-for-you version is even easier.

Hi {{first_name}},

People always ask what a good week actually looks like. Here is a simple one you could
start on Monday:

- One VO2max session. Warm up, then 5 by 3 minutes hard at 3k to 5k effort, 3 minutes
  easy between. That is 15 minutes of real quality.
- Two or three genuinely easy aerobic sessions.
- Two strength sessions, kept away from your hard run.
- One full rest or mobility day.

Want this built around your schedule, your race, and your level instead of a generic
template? That is exactly what the HybridX app does. [Start a free trial]({{app_url}}).

Train smart,
The HybridX Team

---

## Email 5 — Day 9 — "Want this built around you?"

**Subject:** Want this built around you?
**Preview:** Your engine, your plan.

Hi {{first_name}},

You have the science now. The guide covers the what and the why. The last piece is the
how, applied to you.

That is what HybridX is. Your plan, built around your race date, your level, and your
week, adjusting as you go. The easy days kept easy, the hard days kept hard, strength and
engine balanced so they build each other instead of fighting.

If you are ready to stop guessing, this is the easiest yes you will make all season.

[Build my plan]({{app_url}})

And if now is not the time, no problem at all. Stay on the list and keep the training
emails coming.

Train smart,
The HybridX Team

---

### Merge fields to configure in your ESP
- `{{first_name}}` — subscriber first name (optional; the copy reads fine without it)
- `{{pdf_url}}` — `https://hybridx.club/build-a-bigger-engine/HybridX-Build-A-Bigger-Engine-VO2max-Guide.pdf`
- `{{app_url}}` — `https://app.hybridx.club`
