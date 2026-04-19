/**
 * Split MDX source by H2 headings for card-flow rendering.
 * Output: array of section sources with first = intro (before first ##), rest = each ## section (including heading).
 */
export function splitBySections(source: string): Array<{ title: string; source: string }> {
  const lines = source.split('\n');
  const sections: Array<{ title: string; source: string }> = [];
  let currentTitle = 'Mở đầu';
  let buffer: string[] = [];

  for (const line of lines) {
    const h2Match = line.match(/^##\s+(.+)$/);
    if (h2Match) {
      if (buffer.length > 0) {
        sections.push({ title: currentTitle, source: buffer.join('\n').trim() });
      }
      currentTitle = h2Match[1].trim();
      buffer = [line];
    } else {
      buffer.push(line);
    }
  }
  if (buffer.length > 0) {
    sections.push({ title: currentTitle, source: buffer.join('\n').trim() });
  }
  return sections.filter((s) => s.source.length > 0);
}
