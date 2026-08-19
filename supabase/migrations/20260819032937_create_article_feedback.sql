/*
# Create article_feedback table

1. New Tables
- `article_feedback`
  - `id` (uuid, primary key)
  - `page_slug` (text, not null) — identifies which documentation page the feedback is for
  - `page_type` (text, not null) — 'docs', 'feature', 'safety', 'use-case'
  - `helpful` (boolean, not null) — true = helpful, false = not helpful
  - `comment` (text, nullable) — optional user comment
  - `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `article_feedback`.
- Allow anon + authenticated INSERT only (no reads, no updates, no deletes) — visitors can submit feedback but cannot read or modify it.
- Add index on page_slug for aggregation queries.
*/

CREATE TABLE IF NOT EXISTS article_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug text NOT NULL,
  page_type text NOT NULL DEFAULT 'docs',
  helpful boolean NOT NULL,
  comment text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE article_feedback ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_feedback" ON article_feedback;
CREATE POLICY "anon_insert_feedback"
ON article_feedback FOR INSERT
TO anon, authenticated WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_article_feedback_page_slug ON article_feedback(page_slug);
