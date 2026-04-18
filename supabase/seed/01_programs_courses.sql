-- Seed 01 — OpenSciedNEO program + 9 courses K-8

INSERT INTO programs (slug, name, provider, description)
VALUES (
  'openscienneo',
  'OpenSciedNEO',
  'OpenSciEd (Việt hoá)',
  'Khoa học tự nhiên K-8, phenomenon-based, Việt hoá từ OpenSciEd (Hoa Kỳ)'
)
ON CONFLICT (slug) DO NOTHING;

-- 9 courses (K, 1, 2, 3, 4, 5, 6, 7, 8)
INSERT INTO courses (program_id, slug, name, grade_level)
SELECT p.id, c.slug, c.name, c.grade_level
FROM programs p, (VALUES
  ('grade-k', 'Mẫu giáo (K)', 0),
  ('grade-1', 'Lớp 1', 1),
  ('grade-2', 'Lớp 2', 2),
  ('grade-3', 'Lớp 3', 3),
  ('grade-4', 'Lớp 4', 4),
  ('grade-5', 'Lớp 5', 5),
  ('grade-6', 'Lớp 6', 6),
  ('grade-7', 'Lớp 7', 7),
  ('grade-8', 'Lớp 8', 8)
) AS c(slug, name, grade_level)
WHERE p.slug = 'openscienneo'
ON CONFLICT (program_id, slug) DO NOTHING;
