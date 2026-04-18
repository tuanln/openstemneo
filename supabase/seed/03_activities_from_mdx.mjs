#!/usr/bin/env node
// Migrate content/curriculum/grade-*/unit-*/lesson-*.mdx → activities table
// Usage: node --env-file=.env.local supabase/seed/03_activities_from_mdx.mjs

import { createClient } from '@supabase/supabase-js';
import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import matter from 'gray-matter';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const REPO = process.cwd();
const CURRICULUM = join(REPO, 'content/curriculum');

async function getCourseId(gradeSlug) {
  const { data } = await supabase
    .from('courses')
    .select('id')
    .eq('slug', gradeSlug.toLowerCase())
    .single();
  return data?.id;
}

function parseMinutes(val) {
  if (typeof val === 'number') return val;
  if (typeof val === 'string') {
    const m = val.match(/(\d+)/);
    if (m) return parseInt(m[1], 10);
  }
  return 45;
}

async function migrate() {
  const grades = await readdir(CURRICULUM, { withFileTypes: true });
  let total = 0;
  let errors = 0;

  for (const grade of grades) {
    if (!grade.isDirectory() || !grade.name.startsWith('grade-')) continue;

    const courseId = await getCourseId(grade.name);
    if (!courseId) {
      console.warn(`⚠ No course for ${grade.name}, skipping`);
      continue;
    }

    const gradeCount = { before: total, after: 0 };
    const units = await readdir(join(CURRICULUM, grade.name), { withFileTypes: true });
    for (const unit of units) {
      if (!unit.isDirectory() || !unit.name.startsWith('unit-')) continue;

      const unitPath = join(CURRICULUM, grade.name, unit.name);
      const files = await readdir(unitPath);
      for (const file of files) {
        const match = file.match(/^lesson-(\d+)\.mdx$/);
        if (!match) continue;

        const fullPath = join(unitPath, file);
        let content;
        try {
          content = await readFile(fullPath, 'utf-8');
        } catch (e) {
          console.error(`✗ read ${fullPath}: ${e.message}`);
          errors++;
          continue;
        }

        const { data: fm } = matter(content);
        const unitSlug = unit.name.replace('unit-', '');
        const lessonNum = parseInt(match[1], 10);
        const slug = `${unitSlug}-L${lessonNum}`;

        const { error } = await supabase.from('activities').upsert({
          course_id: courseId,
          slug,
          name: fm.title || `Lesson ${lessonNum}`,
          activity_type: 'lesson',
          source_ref: `content/curriculum/${grade.name}/${unit.name}/${file}`,
          estimated_minutes: parseMinutes(fm.estimatedMinutes ?? fm.duration ?? fm.thoiLuong),
          sequence_order: lessonNum,
          metadata: {
            unit_slug: unitSlug,
            unit_name: fm.unitName || fm.unit,
            driving_question: fm.drivingQuestion,
            phenomenon: fm.phenomenon,
          },
        }, { onConflict: 'course_id,slug' });

        if (error) {
          console.error(`✗ ${slug}: ${error.message}`);
          errors++;
        } else {
          total++;
          if (total % 50 === 0) console.log(`  ... ${total} migrated`);
        }
      }
    }
    gradeCount.after = total - gradeCount.before;
    console.log(`✓ ${grade.name}: ${gradeCount.after} activities`);
  }

  console.log(`\nTotal: ${total} activities migrated, ${errors} errors`);
  process.exit(errors > 0 ? 1 : 0);
}

migrate().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
