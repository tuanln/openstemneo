/**
 * Split MDX source by H2 headings for card-flow rendering.
 * Also extracts per-section hero image (first <Figure src="..."> in section)
 * and auto-maps emoji based on section title keywords.
 */

export interface LessonSection {
  title: string;
  source: string;
  heroImage?: string;
  heroAlt?: string;
  emoji: string;
}

const TITLE_EMOJI_MAP: Array<{ keywords: string[]; emoji: string }> = [
  { keywords: ['khởi động', 'mở đầu', 'bắt đầu'], emoji: '🚀' },
  { keywords: ['hoạt động', 'thực hành', 'làm thử'], emoji: '🎯' },
  { keywords: ['vẽ sơ đồ', 'mô hình', 'sơ đồ'], emoji: '✏️' },
  { keywords: ['thảo luận', 'chia sẻ', 'nói'], emoji: '💬' },
  { keywords: ['quan sát', 'nhìn', 'xem'], emoji: '👀' },
  { keywords: ['câu hỏi', 'thắc mắc', 'hỏi'], emoji: '❓' },
  { keywords: ['thí nghiệm', 'kiểm tra', 'thử nghiệm'], emoji: '🔬' },
  { keywords: ['đo', 'ghi', 'dữ liệu', 'số liệu'], emoji: '📊' },
  { keywords: ['điều ta biết', 'kiến thức', 'hiểu'], emoji: '💭' },
  { keywords: ['kết luận', 'tổng kết', 'ôn tập'], emoji: '✅' },
  { keywords: ['phản ánh', 'suy ngẫm', 'nghĩ'], emoji: '🧠' },
  { keywords: ['áp dụng', 'vận dụng', 'thực tế'], emoji: '🛠️' },
  { keywords: ['nhà', 'về nhà'], emoji: '🏠' },
];

function matchEmoji(title: string): string {
  const lower = title.toLowerCase();
  for (const { keywords, emoji } of TITLE_EMOJI_MAP) {
    if (keywords.some((k) => lower.includes(k))) return emoji;
  }
  return '📖';
}

function extractFirstFigure(source: string): { src?: string; alt?: string } {
  // Match <Figure src="..." alt="..." /> or <Figure src="..." alt="..." ... />
  const match = source.match(/<Figure[^>]*\s+src=["']([^"']+)["'][^>]*>/);
  if (!match) return {};
  const src = match[1];
  const altMatch = source.match(/<Figure[^>]*\s+alt=["']([^"']+)["'][^>]*>/);
  return { src, alt: altMatch?.[1] };
}

export function splitBySections(source: string): LessonSection[] {
  const lines = source.split('\n');
  const sections: LessonSection[] = [];
  let currentTitle = 'Mở đầu';
  let buffer: string[] = [];

  function flushSection() {
    if (buffer.length === 0) return;
    const body = buffer.join('\n').trim();
    if (body.length === 0) return;
    const { src, alt } = extractFirstFigure(body);
    sections.push({
      title: currentTitle,
      source: body,
      heroImage: src,
      heroAlt: alt,
      emoji: matchEmoji(currentTitle),
    });
  }

  for (const line of lines) {
    const h2Match = line.match(/^##\s+(.+)$/);
    if (h2Match) {
      flushSection();
      currentTitle = h2Match[1].trim();
      buffer = [line];
    } else {
      buffer.push(line);
    }
  }
  flushSection();
  return sections;
}
