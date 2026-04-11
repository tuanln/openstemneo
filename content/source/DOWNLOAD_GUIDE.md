# Hướng dẫn Download Tài liệu OpenSciEd

## Cách làm (5 phút)

### Bước 1 — Paste script vào Chrome Console

1. Mở Chrome, đăng nhập openscied.org (đã đăng nhập rồi ✓)
2. Nhấn **F12** (hoặc Cmd+Option+J trên Mac) để mở DevTools
3. Chuyển sang tab **Console**
4. Paste đoạn script bên dưới vào Console và nhấn **Enter**

Script sẽ tự động mở tất cả 18 trang download trong tab mới và in ra danh sách link PDF.

---

## Script — Paste vào Chrome Console

```javascript
// OpenSciNEO — Batch PDF Link Collector
// Paste vào Chrome Console khi đang đăng nhập openscied.org

const DOWNLOAD_PAGES = [
  // GRADE 6
  { id: '6-1', url: 'https://openscied.org/curriculum/middle-school/6-1-light-amp-matter-unit-download/' },
  { id: '6-2', url: 'https://openscied.org/curriculum/middle-school/6-2-thermal-energy-unit-download/' },
  { id: '6-3', url: 'https://openscied.org/curriculum/middle-school/6-3-weather-climate-water-cycling-unit-download/' },
  { id: '6-4', url: 'https://openscied.org/curriculum/middle-school/6-4-plate-tectonics-rock-cycling-unit-download/' },
  { id: '6-5', url: 'https://openscied.org/curriculum/middle-school/6-5-natural-hazards-unit-download/' },
  { id: '6-6', url: 'https://openscied.org/curriculum/middle-school/6-6-cells-systems-unit-download/' },
  // GRADE 7
  { id: '7-1', url: 'https://openscied.org/curriculum/middle-school/7-1-chemical-reactions-matter-unit-download/' },
  { id: '7-2', url: 'https://openscied.org/curriculum/middle-school/7-2-chemical-reactions-energy-unit-download/' },
  { id: '7-3', url: 'https://openscied.org/curriculum/middle-school/7-3-metabolic-reactions-unit-download/' },
  { id: '7-4', url: 'https://openscied.org/curriculum/middle-school/7-4-matter-cycling-photosynthesis-unit-download/' },
  { id: '7-5', url: 'https://openscied.org/curriculum/middle-school/7-5-ecosystem-dynamics-unit-download/' },
  { id: '7-6', url: 'https://openscied.org/curriculum/middle-school/7-6-earths-resources-human-impact-unit-download/' },
  // GRADE 8
  { id: '8-1', url: 'https://openscied.org/curriculum/middle-school/8-1-contact-forces-unit-download/' },
  { id: '8-2', url: 'https://openscied.org/curriculum/middle-school/8-2-sound-waves-unit-download/' },
  { id: '8-3', url: 'https://openscied.org/curriculum/middle-school/8-3-forces-at-a-distance-unit-download/' },
  { id: '8-4', url: 'https://openscied.org/curriculum/middle-school/8-4-earth-in-space-unit-download/' },
  { id: '8-5', url: 'https://openscied.org/curriculum/middle-school/8-5-genetics-unit-download/' },
  { id: '8-6', url: 'https://openscied.org/curriculum/middle-school/8-6-natural-selection-common-ancestry-unit-download/' },
];

// Fetch links từ mỗi trang
async function getLinksFromPage(unit) {
  try {
    const res = await fetch(unit.url);
    const html = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const links = Array.from(doc.querySelectorAll('a'))
      .filter(a => a.href && (
        a.href.includes('.pdf') ||
        a.href.includes('drive.google.com') ||
        a.href.includes('s3.amazonaws.com') ||
        a.textContent.toLowerCase().includes('teacher') ||
        a.textContent.toLowerCase().includes('student') ||
        a.textContent.toLowerCase().includes('slide')
      ))
      .map(a => ({ text: a.textContent.trim().replace(/\s+/g,' '), href: a.href }))
      .filter(l => l.text.length > 2);
    return { id: unit.id, links };
  } catch(e) {
    return { id: unit.id, error: e.message };
  }
}

console.log('🔍 Đang thu thập link từ 18 unit...');
const results = await Promise.all(DOWNLOAD_PAGES.map(getLinksFromPage));

// In kết quả
results.forEach(r => {
  if (r.error) {
    console.warn(`❌ ${r.id}: ${r.error}`);
  } else {
    console.group(`✅ Unit ${r.id} (${r.links.length} links)`);
    r.links.forEach(l => console.log(`  [${l.text}] → ${l.href}`));
    console.groupEnd();
  }
});

// Copy JSON vào clipboard
const json = JSON.stringify(results, null, 2);
copy(json);
console.log('\n✅ Đã copy JSON vào clipboard! Paste vào file links.json.');
```

---

## Bước 2 — Lưu kết quả

Sau khi script chạy xong, mở Terminal và paste nội dung clipboard vào:

```bash
# Trong folder OpenSciedNEO/content/source/
pbpaste > links.json
```

---

## Bước 3 — Download PDF thủ công (ưu tiên các file này)

### Teacher Edition (quan trọng nhất)
Cho mỗi unit, tìm và download:
- `[Unit X.X] Teacher Edition` — PDF hoặc Google Doc
- `[Unit X.X] Student Edition` — PDF hoặc Google Doc  
- `[Unit X.X] Slide Decks` — nếu có

### Cấu trúc thư mục lưu vào
```
content/source/
├── grade-6/
│   ├── unit-6-1/
│   │   ├── teacher-edition.pdf
│   │   ├── student-edition.pdf
│   │   └── slides/
│   ├── unit-6-2/ ...
│   └── ...
├── grade-7/ ...
└── grade-8/ ...
```

---

## Bước 4 — Nói với tôi khi xong

Sau khi download xong (hoặc một phần), nói:
> "Đã download unit 6.1 và 6.2 vào content/source"

Tôi sẽ đọc PDF, Việt hóa và format thành MDX cho từng bài học.

---

## Link trang download trực tiếp (click thủ công nếu cần)

| Unit | Trang Download |
|---|---|
| 6.1 Light & Matter | https://openscied.org/curriculum/middle-school/6-1-light-amp-matter-unit-download/ |
| 6.2 Thermal Energy | https://openscied.org/curriculum/middle-school/6-2-thermal-energy-unit-download/ |
| 6.3 Weather & Climate | https://openscied.org/curriculum/middle-school/6-3-weather-climate-water-cycling-unit-download/ |
| 6.4 Plate Tectonics | https://openscied.org/curriculum/middle-school/6-4-plate-tectonics-rock-cycling-unit-download/ |
| 6.5 Natural Hazards | https://openscied.org/curriculum/middle-school/6-5-natural-hazards-unit-download/ |
| 6.6 Cells & Systems | https://openscied.org/curriculum/middle-school/6-6-cells-systems-unit-download/ |
| 7.1 Chemical Reactions & Matter | https://openscied.org/curriculum/middle-school/7-1-chemical-reactions-matter-unit-download/ |
| 7.2 Chemical Reactions & Energy | https://openscied.org/curriculum/middle-school/7-2-chemical-reactions-energy-unit-download/ |
| 7.3 Metabolic Reactions | https://openscied.org/curriculum/middle-school/7-3-metabolic-reactions-unit-download/ |
| 7.4 Matter Cycling & Photosynthesis | https://openscied.org/curriculum/middle-school/7-4-matter-cycling-photosynthesis-unit-download/ |
| 7.5 Ecosystem Dynamics | https://openscied.org/curriculum/middle-school/7-5-ecosystem-dynamics-unit-download/ |
| 7.6 Earth's Resources | https://openscied.org/curriculum/middle-school/7-6-earths-resources-human-impact-unit-download/ |
| 8.1 Contact Forces | https://openscied.org/curriculum/middle-school/8-1-contact-forces-unit-download/ |
| 8.2 Sound Waves | https://openscied.org/curriculum/middle-school/8-2-sound-waves-unit-download/ |
| 8.3 Forces at a Distance | https://openscied.org/curriculum/middle-school/8-3-forces-at-a-distance-unit-download/ |
| 8.4 Earth in Space | https://openscied.org/curriculum/middle-school/8-4-earth-in-space-unit-download/ |
| 8.5 Genetics | https://openscied.org/curriculum/middle-school/8-5-genetics-unit-download/ |
| 8.6 Natural Selection | https://openscied.org/curriculum/middle-school/8-6-natural-selection-common-ancestry-unit-download/ |
