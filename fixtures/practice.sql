-- Synthetic input only. Does not define the finished product schema.
BEGIN;
CREATE SCHEMA IF NOT EXISTS practice;

CREATE TABLE IF NOT EXISTS practice.merchants (
  id text PRIMARY KEY,
  name text NOT NULL
);
CREATE TABLE IF NOT EXISTS practice.events (
  id integer PRIMARY KEY,
  merchant_id text NOT NULL REFERENCES practice.merchants(id),
  provider_event_id text NOT NULL,
  event_type text NOT NULL,
  amount_minor integer NOT NULL CHECK (amount_minor > 0),
  currency text NOT NULL CHECK (currency = 'INR'),
  occurred_at timestamptz NOT NULL
);
INSERT INTO practice.merchants (id, name) VALUES
  ('merchant-one', 'Synthetic Shop One'),
  ('merchant-two', 'Synthetic Shop Two')
ON CONFLICT (id) DO NOTHING;

INSERT INTO practice.events
  (id, merchant_id, provider_event_id, event_type, amount_minor, currency, occurred_at)
VALUES
  (1, 'merchant-one', 'sandbox_1', 'payment.captured', 15000, 'INR', '2026-01-01T10:00:00.000Z'),
  (2, 'merchant-one', 'sandbox_2', 'payment.failed', 22000, 'INR', '2026-01-02T10:00:00.000Z'),
  (3, 'merchant-one', 'sandbox_3', 'refund.processed', 5000, 'INR', '2026-01-03T10:00:00.000Z'),
  (4, 'merchant-two', 'sandbox_4', 'payment.captured', 12000, 'INR', '2026-01-04T10:00:00.000Z'),
  (5, 'merchant-two', 'sandbox_5', 'payment.failed', 45000, 'INR', '2026-01-05T10:00:00.000Z'),
  (6, 'merchant-two', 'sandbox_6', 'refund.processed', 7000, 'INR', '2026-01-06T10:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
COMMIT;
