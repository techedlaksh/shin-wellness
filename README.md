# Shin Wellness

A responsive Next.js landing page with external checkout links and a private Google Sheets email list. Fonts and SVG artwork are served locally; no third-party image or font requests are needed.

## Local development

Requires Node.js 20.9 or newer.

```sh
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. The page renders without integration credentials. Unconfigured purchase buttons display a booking availability message, and unconfigured signups return an honest unavailable response. No emails are stored locally or treated as collected.

## Checkout setup

Set `CHECKOUT_SINGLE_URL` to the $60 single-session checkout and `CHECKOUT_PACK_URL` to the $350 seven-session checkout. Both must be complete HTTPS URLs. Restart the development server, or rebuild the production application, after changing them. The buttons open checkout in a new tab without requiring newsletter signup. Configure the payment provider to handle payment, session focus, and scheduling; this app does not process payment or confirm bookings.

## Google Sheets setup

1. Create a Google Cloud project and enable the Google Sheets API.
2. Create a service account and a JSON service-account key. Keep the key out of the repository and browser.
3. Create a private spreadsheet with a worksheet named **Signups**. Add these headers to A1:D1: `Timestamp`, `Email`, `Interest`, `Location`.
4. Share only this spreadsheet with the service account's `client_email` as an **Editor**. The spreadsheet does not need to be public. Domain-wide delegation is not needed.
5. Copy the spreadsheet ID from its URL into `GOOGLE_SHEETS_ID`. Copy the key's `client_email` into `GOOGLE_SERVICE_ACCOUNT_EMAIL` and its `private_key` into `GOOGLE_PRIVATE_KEY`. In `.env.local`, wrap the key in double quotes and preserve its escaped `\n` newlines.
6. Restart the server. Submit a test email and verify its timestamp, interest, and location appear as a new row. Delete your test row when finished.

`POST /api/subscribe` accepts `{ email, interest, location, website }`. `website` is an empty honeypot. Supported interests: `updates`, `playlist`, `wallpapers`, `routine`, `checkins`, `coaching`, `retreats`, `recommendations`. Locations: `footer`, `offering-dialog`.

The endpoint validates input, rejects foreign browser origins, writes with `valueInputOption=RAW`, and returns success only after Google acknowledges the write. Automatic write retries are disabled to avoid duplicate rows. Repeated clicks during one submission are blocked in the browser; intentional later signups are appended as separate interest events. Google credentials never enter client props or public environment variables. Storage errors return generic messages without provider details or submitted email addresses.

This is a signup list, not an email-sending system. No welcome messages are sent automatically. Before sending a newsletter, connect an email provider and its unsubscribe handling.

## Checks

```sh
npm test
npx playwright install chromium
npm run test:e2e
npm run typecheck
npm run build
npm start
```

Tests cover every interest, validation, honeypot, cross-origin rejection, malformed input, storage completion, missing settings, provider failure, and safe checkout configuration. Browser tests cover desktop/tablet/mobile layouts, keyboard dialog behavior, submission and retry states, duplicate click prevention, reduced motion, and automated accessibility checks. They launch an isolated server on port 3100 with dummy checkout links and empty Google settings; stop your local dev server first because Next.js uses one development lock per project. Check real Google Sheets writes and both real payment destinations after adding credentials and URLs.

## Deployment

Deploy to a Node-compatible Next.js host; the signup API requires a server and cannot use static export. Add the same five environment variables in the host's secret settings, then build and start. Deployment is intentionally not included in this initial build.

## Content and assets

Prices are USD. Resource downloads, coaching, retreats, and referrals are coming-soon previews. There are no invented testimonials or practitioner credentials. Local fonts are DM Sans and Lora, distributed under the SIL Open Font License; see `public/fonts/OFL-*.txt`.
