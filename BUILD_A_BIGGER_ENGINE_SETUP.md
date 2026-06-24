# Build a Bigger Engine — Funnel Setup Guide

The "Build a Bigger Engine" VO2max lead funnel lives at **`/build-a-bigger-engine`**.

It is built to run on the infrastructure you already have (Next.js on Firebase App
Hosting + nodemailer SMTP + your Google Apps Script), so there is very little to stand
up. This doc lists exactly what is already wired and the few things you need to do on
your side.

---

## TL;DR — what you need to do

1. **Confirm SMTP secrets are set** on the App Hosting backend (you already use these for
   the Hyrox plan emails). Nothing new to add. See section 1.
2. **Update your Google Apps Script** to save the new lead shape into a sheet/tab. Copy
   the snippet in section 2. (Optional but recommended so you capture every email.)
3. **Connect your ESP** (ConvertKit / MailerLite / Resend / Mailchimp) to the
   `vo2max-guide` tag and load the 5 nurture emails. See section 3.
4. **Mark `generate_lead` as a conversion** in GA4. See section 4.
5. (Optional) Add reCAPTCHA/Turnstile and a real Terms page. See sections 5 and 7.

Everything else (the page, the form, instant PDF delivery email, PDF hosting, analytics
events, SEO/OG, sitemap) is done and live in this branch.

---

## 1. Email delivery (already wired)

The instant "here is your guide" email is sent by the server action
`src/app/build-a-bigger-engine/actions.ts` using the existing nodemailer service
(`src/lib/email/service.ts`). The template is `src/lib/email/send-engine-guide.ts`.

It reuses the SMTP secrets already configured in `apphosting.yaml`:

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_FROM` (plain env, already set)
- `SMTP_USER`, `SMTP_PASSWORD` (Secret Manager, already set)

**Action:** none required if your Hyrox plan emails currently send. To verify, submit the
form on the live page and confirm the email arrives.

> Deliverability tip: Gmail SMTP works but is rate limited and can land in spam at volume.
> For a marketing funnel, consider switching `SMTP_*` to a transactional provider
> (Resend, SendGrid, Mailgun, Postmark) and authenticating your domain with SPF + DKIM.
> No code change needed, just swap the secret values.

**The PDF** is served from `public/build-a-bigger-engine/HybridX-Build-A-Bigger-Engine-VO2max-Guide.pdf`
so the email link works with zero extra setup. If you would rather gate it behind double
opt-in, see section 6.

---

## 2. Lead storage (one small change)

On submit, the action POSTs the lead to your existing Apps Script URL
(`NEXT_PUBLIC_HYROX_SCRIPT_URL`, already in `apphosting.yaml`). This is **best effort**:
if it fails, the user still gets their guide. The payload shape is:

```json
{
  "type": "lead",
  "magnet": "build-a-bigger-engine",
  "tag": "vo2max-guide",
  "email": "athlete@example.com",
  "firstName": "",
  "source": "ig-carousel",
  "utm": { "source": "...", "medium": "...", "campaign": "...", "content": "...", "term": "..." },
  "userAgent": "...",
  "createdAt": "2026-06-24T10:00:00.000Z"
}
```

**Action:** in your Apps Script `doPost`, branch on `type === "lead"` (or `magnet`) and
append to a dedicated sheet/tab. Example:

```js
function doPost(e) {
  const data = JSON.parse(e.postData.contents);

  if (data.type === 'lead' && data.magnet === 'build-a-bigger-engine') {
    const sheet = SpreadsheetApp
      .openById('YOUR_SHEET_ID')
      .getSheetByName('VO2max Leads'); // create this tab once
    sheet.appendRow([
      new Date(data.createdAt),
      data.email,
      data.firstName,
      data.source,
      data.utm.source, data.utm.medium, data.utm.campaign, data.utm.content, data.utm.term,
      data.tag,
    ]);

    // Optional: forward to your ESP here (see section 3).
    return ContentService.createTextOutput('ok');
  }

  // ... your existing Hyrox plan handling stays unchanged ...
}
```

Re-deploy the Apps Script as a Web App after editing.

---

## 3. ESP / nurture sequence

The funnel tags every lead with **`vo2max-guide`**. Wire that tag to the 5-email nurture
sequence. The ready-to-paste copy is in
`marketing/email-templates/vo2max-nurture-emails.md`.

Pick one integration path:

- **Simplest:** in the Apps Script above, after `appendRow`, call your ESP's HTTP API with
  `UrlFetchApp.fetch(...)` to upsert the subscriber and apply the `vo2max-guide` tag. Keep
  the API key in Apps Script Script Properties.
- **Or in-app:** add an ESP adapter call inside `actions.ts` (look for the `storeLead`
  step). Keep the provider behind one function so it stays swappable, and store the key as
  a Firebase secret (`ESP_API_KEY`).

Then build the automation in your ESP: trigger = tag added `vo2max-guide`, steps = the 5
emails spaced over 8 to 10 days. Set the merge fields listed at the bottom of the nurture
file.

---

## 4. Analytics (already firing)

The form fires GA4 events to your existing tag (`G-XKH1WYE7CQ`):

| Event | When |
|---|---|
| `view_lead_form` | a form scrolls into view |
| `lead_form_start` | user focuses the email field |
| `lead_submit_attempt` | submit clicked |
| `generate_lead` | server confirms success (key conversion) |
| `lead_submit_error` | validation or network error |
| `pdf_download_click` | direct download tapped on the success state |
| `cta_app_click` | post-conversion click through to the app |

`src` and all `utm_*` params are captured from the URL and saved on the lead.

**Action:** in GA4, mark **`generate_lead`** as a conversion (Admin → Events → toggle
"Mark as conversion"). If you run Meta ads, add the Pixel and map `generate_lead` to the
standard `Lead` event.

Share links with tracking, for example:
`https://hybridx.club/build-a-bigger-engine?src=ig-carousel&utm_source=instagram&utm_medium=social&utm_campaign=vo2max-guide`

---

## 5. Spam protection

Shipped now: a **honeypot** field (`company`) and a simple **per-IP rate limit** (8/hour)
in the server action. Bots that fill the honeypot are silently dropped.

**Optional hardening** (recommended once it gets traffic): add reCAPTCHA v3 or Cloudflare
Turnstile. To do this, drop the widget on the form, send the token with the submit, and
verify it at the top of `submitEngineLead` with a `RECAPTCHA_SECRET` Firebase secret
before doing any work. This is a clean add-on and does not change the rest of the flow.

---

## 6. Double opt-in (optional, off by default)

We shipped **single opt-in** for speed and conversion: submit → instant guide. The lead
schema and email are structured so you can upgrade later without a rebuild:

- Add a `status: "pending" | "confirmed"` field when you persist the lead.
- Change the delivery email to a "Confirm and unlock your guide" button linking to
  `/confirm?token=...`.
- Only push to the ESP nurture on confirm.

Recommended only if deliverability becomes an issue. Single opt-in is fine to launch.

---

## 7. Legal

The footer links **Privacy Policy** (live at `/privacy-policy`), **Terms**, and a
**Contact** mailto. Terms currently points at `/privacy-policy#terms`.

**Action:** add a proper Terms page (or a `#terms` section in the privacy policy) and a
real contact address if `hello@hybridx.club` is not monitored. The consent line under the
form ("Free. No spam. Unsubscribe anytime.") covers basic marketing consent.

---

## Where everything lives

```
src/app/build-a-bigger-engine/
  page.tsx          # the landing page (all sections, SEO, OG, schema)
  actions.ts        # submitEngineLead server action (validate, store, email, rate limit)
src/components/engine/
  EngineLeadForm.tsx # reusable email capture form + states + analytics
  EngineLogo.tsx     # X mark + HYBRIDX wordmark (recolourable SVG)
  Heartbeat.tsx      # ECG motif divider
  Rise.tsx           # scroll-reveal wrapper
  StickyCta.tsx      # mobile sticky bottom bar
src/lib/email/send-engine-guide.ts  # the instant delivery email (Email 0)
public/build-a-bigger-engine/       # PDF, guide cover, OG image
marketing/email-templates/vo2max-nurture-emails.md  # the 5 nurture emails
```

## Quick test checklist

1. Open `/build-a-bigger-engine` on a 390px mobile viewport. The email field is above the
   fold and the page alternates dark/light sections.
2. Submit a real email. You see the success state, and the guide email arrives with a
   working **Download your guide** button.
3. Submit again with the same email. You still get a friendly success (no error).
4. Submit an invalid email. You get a clear inline error and keep what you typed.
5. Check GA4 Realtime for `generate_lead`.
6. Paste the URL into a Slack/iMessage/Twitter box and confirm the OG image renders.
