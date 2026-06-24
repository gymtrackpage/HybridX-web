# Email Deliverability — Resend Setup & Trust Checklist

This project now sends all email through a single function, `sendEmail()` in
`src/lib/email/service.ts`. It **prefers Resend** (when `RESEND_API_KEY` is set) and
**falls back to Gmail SMTP** otherwise, so nothing breaks while you switch over.

Switching the *provider* is only half the job. Inbox placement at Gmail is mostly about
**domain authentication and sender reputation**, not which API you call. This doc covers
both: the code is done, here is what you do on your side.

---

## 1. Switch sending to Resend (do this first)

1. **Create a Resend account** at resend.com and add your domain.
   - Use **`hybridx.club`** (or a subdomain like `mail.hybridx.club` — a subdomain keeps
     marketing reputation separate from your normal Google Workspace mail, which is the
     recommended setup).
2. **Add the DNS records Resend gives you** at your domain registrar / DNS host. Resend
   will show you three things to add:
   - **SPF** (a `TXT` record, or an MX/`include` depending on subdomain)
   - **DKIM** (usually `CNAME` records — this is the signature that proves the mail is
     really from you)
   - **Return-Path / bounce** (a `CNAME` or `MX` for the custom return path)
3. Wait for Resend to show the domain as **Verified** (DNS can take minutes to a few hours).
4. **Create an API key** in Resend (Sending access is enough).
5. **Store it as a secret** on App Hosting:
   ```bash
   firebase apphosting:secrets:set RESEND_API_KEY
   ```
   The variable is already declared in `apphosting.yaml`. For local dev, add
   `RESEND_API_KEY=...` to your `.env`.
6. **Deploy.** From then on, every email (`Build a Bigger Engine` guide + Hyrox training
   plan) goes through Resend automatically. No code change needed.

> If `RESEND_API_KEY` is unset, the app keeps using Gmail SMTP, so you can flip back
> instantly by removing the secret.

---

## 2. Authenticate your domain (the real deliverability lever)

Gmail and Yahoo now **require** authentication for anything that looks like bulk/marketing
mail. Get all three green and you have solved most spam-folder problems:

| Record | What it does | Where |
|---|---|---|
| **SPF** | Authorises Resend's servers to send as your domain | Resend gives you the value |
| **DKIM** | Cryptographically signs each email so receivers can verify it | Resend gives you the CNAMEs |
| **DMARC** | Tells Gmail what to do with mail that fails the above, and gives you reports | You add this one |

**DMARC** is not created by Resend — add it yourself. Start gentle, then tighten:

```
Type: TXT
Host: _dmarc.hybridx.club
Value: v=DMARC1; p=none; rua=mailto:dmarc@hybridx.club; fo=1
```

Once you have run for a week or two with no failures in the reports, raise enforcement to
`p=quarantine` and eventually `p=reject`. That progression is what builds trust.

---

## 3. From / Reply-To identity (already fixed in code)

The previous setup sent **From `noreply@hybridx.com`** while the site is **hybridx.club**.
That domain mismatch alone is a major spam trigger — you cannot authenticate a domain you
do not send from.

Now centralised and corrected:

- **From:** `"HybridX" <hello@hybridx.club>` (override with `EMAIL_FROM`)
- **Reply-To:** `hello@hybridx.club` (override with `EMAIL_REPLY_TO`)

Two trust wins baked in:
- The From domain now **matches the authenticated domain**.
- We send from a **real, monitored mailbox** (`hello@`) rather than `noreply@`. Replies and
  engagement are positive reputation signals; make sure that inbox is actually watched.

**Action:** make sure `hello@hybridx.club` (and `unsubscribe@hybridx.club`, see below)
exist and are monitored. If you prefer different addresses, set `EMAIL_FROM` /
`EMAIL_REPLY_TO` in `apphosting.yaml`.

---

## 4. What else the code now does for trust

- **Plain-text alternative on every email.** HTML-only mail is a classic spam signal; both
  the guide email and the training-plan email now ship a text part too.
- **`List-Unsubscribe` header** on the marketing guide email
  (`<mailto:unsubscribe@hybridx.club>`). A working, easy opt-out is a strong positive
  signal and is part of Gmail's bulk-sender rules.
  - **Upgrade path (recommended):** add a real HTTPS unsubscribe route, then pass
    `oneClickUnsubscribe: true` to `sendEmail()` with a `List-Unsubscribe` value that
    includes the HTTPS URL. That unlocks Gmail/Yahoo **one-click unsubscribe**, which they
    increasingly expect from list senders. If your nurture sequence runs in an ESP
    (ConvertKit / MailerLite / Resend Audiences), the ESP handles this for you on those
    emails automatically.
- **Consistent branding and domain** across all templates (fixed the stray
  `www.hybridx.com` link in the training-plan email).

---

## 5. Ongoing reputation hygiene

- **Warm up gradually.** Do not blast thousands on day one from a brand-new domain. Volume
  should ramp over days/weeks.
- **Keep your list clean.** Only mail people who opted in. Remove hard bounces and
  long-term non-openers. High bounce/complaint rates wreck reputation fast.
- **Separate streams.** Keep transactional mail (the instant guide, the plan) and bulk
  marketing (the nurture sequence) ideally on different subdomains so a marketing dip does
  not drag down transactional delivery.
- **Monitor.** Watch the Resend dashboard for bounces/complaints and your DMARC reports.
  Test placement with mail-tester.com and Google Postmaster Tools (add hybridx.club there).
- **Avoid spammy content.** No all-caps subject lines, minimal link shorteners, balanced
  text-to-image ratio. The current templates are already clean on this front.

---

## Quick verification

1. Set `RESEND_API_KEY` locally, run the funnel form, confirm the guide arrives **in the
   Gmail inbox** (not spam/Promotions if possible).
2. In Gmail, open the message → **Show original** → confirm **SPF: PASS**, **DKIM: PASS**,
   **DMARC: PASS**.
3. Run the same email through **mail-tester.com** and aim for 9–10/10.
