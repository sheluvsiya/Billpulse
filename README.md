# Billpulse

Billpulse is an invoicing SaaS starter for a responsive web dashboard and a planned iOS/Android client. The repository currently contains a dashboard UI preview and a PostgreSQL/Prisma domain schema. The preview's sample data and create-invoice interaction are browser-only and are **not** connected to persistence, authentication, payment gateways, or email. Do not use it to process real customer data or payments.

## Stack and structure

- `app/`: responsive Next.js dashboard preview.
- `prisma/schema.prisma`: PostgreSQL data model for accounts, identity uniqueness, trial claims, invoices, immutable event history, subscriptions, payments, OTP challenges, and idempotent reminder logs.
- `apps/mobile/`: cross-platform mobile client starter notes.
- `next.config.ts`: baseline browser security headers.

## Run the dashboard

Requires Node.js 20+ and npm.

```bash
cp .env.example .env
npm install
npm run dev
```

Open <http://localhost:3000>. The UI includes a searchable invoice list and a local-only invoice form. These actions reset on refresh.

## Database setup

Set `DATABASE_URL` to a PostgreSQL database, then:

```bash
npm run db:generate
npm run db:migrate
```

Review and commit generated migrations before deployment. `TrialIdentity.fingerprint` and identity hashes must be generated server-side using a secret-keyed HMAC over canonicalized identifiers; never store raw government IDs as a deduplication key. The nullable unique registration hash allows businesses without a registration number.

## Production work still required

This repository is a foundation, not a production-ready billing system. Before launch, implement and security-review:

1. Authentication endpoints, secure password hashing and password policy feedback, email verification, mandatory OTP challenges (single-use, expiring, hashed codes), session rotation, MFA recovery, and account lockout/rate limits. The schema stores an OTP hash only; it does not implement delivery or verification.
2. Server-authorized profile, client, invoice, and audit APIs; enforce ownership on every operation. Allocate invoice numbers transactionally (for example, a per-issuer counter row with row locking); never rely on client-side numbering.
3. An append-only audit/event policy enforced by database permissions or triggers, immutable invoice snapshots, and country-aware identity validation and privacy/retention workflows.
4. A durable job queue and idempotent email reminders, trial-ending notices, receipt delivery, and retry/dead-letter handling. Use `NotificationLog.idempotencyKey` in transactional enqueue/delivery logic.
5. Stripe, PayFast, and PayPal subscription/payment adapters with raw-body signature verification, idempotent webhook processing, reconciliation, refunds, and region-specific bank transfer handling. Never trust a browser redirect as proof of payment.
6. Secure client approval links with high-entropy, expiring, revocable tokens; require a rejection reason and record all state transitions.
7. Private object storage with short-lived signed URLs for logos/PDFs; PDF generation and invoice templates; email provider integration.
8. Tests, monitoring, backups, incident response, secrets management, TLS, encryption-at-rest configuration, accessibility review, and legal/tax review for launch countries.

The schema is not a substitute for transactional enforcement. For example, creating a user and claiming a one-time trial identity must happen atomically, and invoice/client ownership must be validated in server code.

## Environment variables

See `.env.example`. Use secret-manager values in production and rotate compromised secrets. Payment credentials and SMTP secrets are intentionally blank; no gateway or email integration is active in this starter.
