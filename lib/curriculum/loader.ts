import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type {
  CurriculumUnit,
  GradeLevel,
  Lesson,
  LessonContent,
  LessonFrontmatter,
} from "./types";

const CONTENT_ROOT = path.join(process.cwd(), "content", "curriculum");

let unitsCache: CurriculumUnit[] | null = null;

export async function getAllUnits(): Promise<CurriculumUnit[]> {
  if (unitsCache) return unitsCache;
  const raw = await fs.readFile(
    path.join(CONTENT_ROOT, "units.json"),
    "utf-8",
  );
  unitsCache = JSON.parse(raw) as CurriculumUnit[];
  return unitsCache;
}

export async function getUnitById(
  id: string,
): Promise<CurriculumUnit | null> {
  const units = await getAllUnits();
  return units.find((u) => u.id === id) ?? null;
}

export async function getUnitsByGrade(
  grade: GradeLevel,
): Promise<CurriculumUnit[]> {
  const units = await getAllUnits();
  return units.filter((u) => u.gradeLevel === grade);
}

function unitDir(unit: CurriculumUnit): string {
  return path.join(
    CONTENT_ROOT,
    `grade-${unit.gradeLevel}`,
    `unit-${unit.id}`,
  );
}

export async function getLessonsForUnit(unitId: string): Promise<Lesson[]> {
  const unit = await getUnitById(unitId);
  if (!unit) return [];

  const dir = unitDir(unit);
  let entries: string[];
  try {
    entries = await fs.readdir(dir);
  } catch {
    return [];
  }

  const mdxFiles = entries.filter((f) => f.endsWith(".mdx")).sort();
  const lessons: Lesson[] = [];

  for (const file of mdxFiles) {
    const raw = await fs.readFile(path.join(dir, file), "utf-8");
    const { data } = matter(raw);
    const fm = data as LessonFrontmatter;
    lessons.push({
      ...fm,
      unitId,
      available: fm.available ?? true,
    });
  }

  return lessons.sort((a, b) => a.order - b.order);
}

export async function getLessonContent(
  unitId: string,
  lessonId: string,
): Promise<LessonContent | null> {
  const unit = await getUnitById(unitId);
  if (!unit) return null;

  const dir = unitDir(unit);
  let entries: string[];
  try {
    entries = await fs.readdir(dir);
  } catch {
    return null;
  }

  for (const file of entries.filter((f) => f.endsWith(".mdx"))) {
    const raw = await fs.readFile(path.join(dir, file), "utf-8");
    const parsed = matter(raw);
    const fm = parsed.data as LessonFrontmatter;
    if (fm.id === lessonId) {
      return { frontmatter: fm, source: parsed.content };
    }
  }
  return null;
}

export async function getAllLessonParams(): Promise<
  { unitId: string; lessonId: string }[]
> {
  const units = await getAllUnits();
  const params: { unitId: string; lessonId: string }[] = [];
  for (const unit of units) {
    const lessons = await getLessonsForUnit(unit.id);
    for (const lesson of lessons) {
      params.push({ unitId: unit.id, lessonId: lesson.id });
    }
  }
  return params;
}

export interface UnitAvailability {
  totalLessonFiles: number;
  availableLessonFiles: number;
  hasAnyAvailable: boolean;
}

export async function getUnitAvailability(
  unitId: string,
): Promise<UnitAvailability> {
  const lessons = await getLessonsForUnit(unitId);
  const available = lessons.filter((l) => l.available).length;
  return {
    totalLessonFiles: lessons.length,
    availableLessonFiles: available,
    hasAnyAvailable: available > 0,
  };
}

export async function getUnitsWithAvailability(): Promise<
  (CurriculumUnit & { availability: UnitAvailability })[]
> {
  const units = await getAllUnits();
  return Promise.all(
    units.map(async (unit) => ({
      ...unit,
      availability: await getUnitAvailability(unit.id),
    })),
  );
}
