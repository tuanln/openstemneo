export type GradeLevel = 3 | 6 | 7 | 8;

export type LessonType =
  | "phenomenon"
  | "investigation"
  | "analysis"
  | "making-meaning"
  | "application"
  | "assessment";

export interface CurriculumUnit {
  id: string;
  gradeLevel: GradeLevel;
  subjectArea: string;
  title: string;
  titleEn: string;
  drivingQuestion: string;
  phenomenon: string;
  standards: string[];
  totalLessons: number;
  estimatedWeeks: number;
  icon: string;
  color: UnitColor;
  sourceUrl: string;
}

export type UnitColor =
  | "amber"
  | "orange"
  | "sky"
  | "stone"
  | "red"
  | "green"
  | "purple"
  | "cyan"
  | "lime"
  | "emerald"
  | "teal"
  | "slate"
  | "violet"
  | "indigo"
  | "rose"
  | "zinc";

export interface LessonFrontmatter {
  id: string;
  order: number;
  title: string;
  type: LessonType;
  duration?: string;
  standards?: string[];
  available?: boolean;
  sourceHandoutUrl?: string;
  summary?: string;
}

export interface Lesson extends LessonFrontmatter {
  unitId: string;
  available: boolean;
}

export interface LessonContent {
  frontmatter: LessonFrontmatter;
  source: string;
}
