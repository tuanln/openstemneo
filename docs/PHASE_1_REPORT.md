# OpenStemNeo — Báo cáo Giai đoạn 1

**Ngày**: 12/04/2026
**Dự án**: OpenStemNeo — Việt hóa chương trình khoa học K-12 từ OpenSciEd
**Repository**: github.com/tuanln/openstemneo
**Production**: openstemneo.vercel.app
**License**: MIT (code) + CC BY 4.0 (nội dung, theo OpenSciEd)

---

## 1. Tổng quan kết quả

### 1.1 Nội dung đã hoàn thành

| Cấp | Lớp | Đơn vị | Bài học | Trạng thái |
|---|---|---|---|---|
| **Cấp 1 (Tiểu học)** | Lớp 3 | 4 | 53 | ✅ 100% |
| **Cấp 2 (THCS)** | Lớp 6 | 6 | 86 | ✅ 100% |
| **Cấp 2 (THCS)** | Lớp 7 | 6 | 91 | ✅ 100% |
| **Cấp 2 (THCS)** | Lớp 8 | 6 | 91 | ✅ 100% |
| **Tổng** | | **22 đơn vị** | **321 bài** | **✅ 100%** |

### 1.2 Hạ tầng kỹ thuật

| Thành phần | Chi tiết |
|---|---|
| **Framework** | Next.js 16 + React 19 + Tailwind CSS v4 |
| **Rendering** | Static Site Generation (SSG) via generateStaticParams |
| **MDX** | next-mdx-remote/rsc, 6 custom components |
| **Deploy** | Vercel auto-deploy on push, Analytics enabled |
| **Static pages** | ~350 pages (units + lessons + landing + shells) |
| **Build time** | ~15 giây |

### 1.3 Custom MDX Components

| Component | Chức năng |
|---|---|
| `<Investigation>` | Khung hoạt động điều tra (xanh dương) |
| `<Question>` | Câu hỏi quan trọng (vàng) |
| `<Evidence>` | Ô ghi bằng chứng (xanh lá) |
| `<Callout>` | Hộp gợi ý: think/note/tip/warning |
| `<Figure>` | Ảnh minh họa với Next/Image + caption + credit |
| `<Diagram>` | Wrapper cho SVG diagrams |

### 1.4 Minh họa

- **Grade 3**: 53 ảnh từ storyline PDFs + **28 figures** embedded
- **Grade 6-8**: 18 ảnh từ Teacher Edition PDFs + **18 figures** embedded
- **Tổng**: 71 ảnh, 46 figures trong bài học

---

## 2. Kiểm tra chất lượng (QA)

### 2.1 QA agent-translated units (96 lessons / 6 units)

| Tiêu chí | Kết quả |
|---|---|
| Frontmatter chính xác | ✅ 96/96 |
| MDX an toàn (không có `<digit/lowercase`) | ✅ 96/96 |
| Tiếng Việt (dùng "em", thuật ngữ khoa học) | ✅ 96/96 |
| Custom components (2+ per lesson) | ✅ 96/96 |
| Mạch logic (phenomenon → assessment) | ✅ 96/96 |
| SUMMARY.md cập nhật | ✅ 6/6 |

**Lỗi nghiêm trọng**: 0
**Lưu ý nhỏ**:
- Unit 8.4 (Earth in Space): một số bài ngắn hơn trung bình (76-110 dòng vs 100-180 dòng ở các unit khác)
- Unit 8.5 lesson-10: 66 dòng — ngắn nhất, có thể bổ sung thêm

### 2.2 QA main-translated units (225 lessons / 16 units)

Đã được kiểm tra MDX pattern (`<[0-9a-z]`) liên tục tại mỗi checkpoint. Không phát hiện lỗi.

### 2.3 Build verification

```
npm run build → ✅ ~350 static pages, 0 errors
npm run lint  → ✅ clean
```

---

## 3. Đánh giá nội dung CÒN CHƯA HOÀN THIỆN

### 3.1 CẤP 1 — Tiểu học (OpenSciEd Elementary K-5)

**Đã hoàn thành**: Lớp 3 (4 units, 53 lessons) ✅

**Chưa hoàn thành** (5 lớp):

| Lớp | Số units | Ước tính lessons | Nguồn PDF | Khó khăn |
|---|---|---|---|---|
| **K (Mẫu giáo lớn)** | 4 | ~40 | Storyline only (TE gated) | Ngôn ngữ cực đơn giản, cần nhiều hình |
| **Lớp 1** | 4 | ~40 | Storyline only | Tone rất nhỏ tuổi |
| **Lớp 2** | 4 | ~40 | Storyline only | Tương tự Lớp 1 |
| **Lớp 4** | 4 | ~50 | Storyline only | Gần Lớp 3 về tone |
| **Lớp 5** | 4 | ~50 | Storyline only | Gần THCS, chuyển tiếp |
| **Tổng thiếu** | **20 units** | **~220 lessons** | | |

**Thách thức chính**:
1. **Teacher Edition không public** — chỉ có Storyline PDF (~5 trang/unit). Bài dịch phải "bổ sung" nội dung dựa trên storyline + pedagogy hiểu từ THCS. Chất lượng kém hơn so với có TE đầy đủ.
2. **Ngôn ngữ cho trẻ nhỏ** — K-2 cần câu rất ngắn, nhiều hình, ít text. Khác hẳn Lớp 3+.
3. **Ảnh minh họa** — Storyline PDFs có ít ảnh hơn TE. Cần tìm nguồn ảnh bổ sung hoặc tạo illustration.

**Đề xuất ưu tiên**: Lớp 4 → Lớp 5 → Lớp 2 → Lớp 1 → K. Lý do: Lớp 4-5 gần Lớp 3 nhất (tone tương tự, dễ adapt), K-2 cần phương pháp khác.

### 3.2 CẤP 3 — THPT (OpenSciEd High School)

**Đã hoàn thành**: 0

**Tình trạng OpenSciEd High School**:

| Thông tin | Chi tiết |
|---|---|
| **Trạng thái** | Đang phát triển, chưa phát hành đầy đủ |
| **Số units dự kiến** | ~12 units (Physics, Chemistry, Biology, Earth Science) |
| **Sẵn có public** | Chỉ có scope & sequence + một số pilot units |
| **Teacher Edition** | Chưa public (đang pilot ở một số trường Mỹ) |
| **License** | Dự kiến CC BY 4.0 (như K-8) |

**Các unit high school đã biết** (từ OpenSciEd scope & sequence):

| Mã | Tên | Lĩnh vực |
|---|---|---|
| P.1 | Energy of Atoms & Molecules | Physics |
| P.2 | Forces & Energy in Electrical Systems | Physics |
| P.3 | Collisions & Momentum | Physics |
| C.1 | Atoms, Elements & Molecules | Chemistry |
| C.2 | Chemical Reactions in Our World | Chemistry |
| C.3 | Electrochemistry & Renewable Energy | Chemistry |
| B.1 | Cells & Organelles | Biology |
| B.2 | Proteins & Genes | Biology |
| B.3 | Ecosystem Stability & Response | Biology |
| E.1 | Earth Systems & Climate | Earth Science |
| E.2 | Earth's Interior & Surface | Earth Science |
| E.3 | The History of Planet Earth | Earth Science |

**Thách thức chính**:
1. **Nội dung chưa public** — không có TE để dịch. Phải đợi OpenSciEd phát hành.
2. **Phức tạp hơn** — kiến thức sâu hơn nhiều (hóa hữu cơ, vật lý lượng tử, di truyền phân tử...).
3. **Không có chuẩn NGSS tường minh** cho HS (NGSS chỉ đến Grade 8; HS dùng DCI).
4. **Khả năng**: có thể dùng nguồn HS khác (CK-12, OpenStax) nếu muốn tiến trước khi OpenSciEd HS sẵn sàng.

**Đề xuất**: CHƯA bắt đầu cấp 3. Đợi OpenSciEd phát hành HS units (dự kiến 2026-2027). Trong khi đó, tập trung hoàn thiện cấp 1 (K, 1, 2, 4, 5).

---

## 4. Kiến trúc dữ liệu hiện tại

```
content/
├── curriculum/
│   ├── units.json              ← 22 unit metadata (Grade 3 + 6 + 7 + 8)
│   ├── grade-3/unit-3-{1..4}/  ← 53 MDX files
│   ├── grade-6/unit-6-{1..6}/  ← 86 MDX files
│   ├── grade-7/unit-7-{1..6}/  ← 91 MDX files
│   └── grade-8/unit-8-{1..6}/  ← 91 MDX files
├── source/
│   ├── INDEX.md                ← Master index + progress tracking
│   ├── TRANSLATION_WORKFLOW.md
│   ├── ELEMENTARY_K5_RESEARCH.md
│   └── grade-{3,6,7,8}/unit-*/SUMMARY.md
docs/
├── source-pdfs/               ← 18 TE PDFs + 4 storylines (gitignored ~660 MB)
├── PHASE_1_REPORT.md          ← File này
public/
└── curriculum/grade-3/        ← 53 ảnh minh họa
    grade-6/                   ← 14 ảnh
    grade-7/                   ← 3 ảnh
    grade-8/                   ← 1 ảnh
```

---

## 5. Thống kê kỹ thuật

| Metric | Giá trị |
|---|---|
| **Tổng commits** | ~80 |
| **Tổng MDX files** | 321 |
| **Tổng dòng MDX** | ~45.000 |
| **Tổng ảnh** | 71 files (~12 MB) |
| **Build time** | ~15 giây |
| **Static pages** | ~350 |
| **Deploy** | Auto via Vercel webhook |
| **Uptime** | 99.9% (Vercel SLA) |

---

## 6. Đề xuất Giai đoạn 2

### 6.1 Ưu tiên cao

1. **Hoàn thiện Cấp 1**: Lớp 4 + Lớp 5 (10 units, ~100 lessons)
2. **Bổ sung ảnh**: thêm figures cho Lớp 6-8 (hiện chỉ 18 ảnh cho 268 lessons)
3. **INDEX.md cập nhật**: progress block phản ánh đúng 321 lessons hiện tại

### 6.2 Ưu tiên trung bình

4. **Hoàn thiện Cấp 1 phần còn lại**: K + Lớp 1 + Lớp 2 (12 units, ~120 lessons)
5. **Student progress tracking**: database (Vercel Postgres hoặc Supabase) để lưu tiến độ học sinh
6. **Mentor dashboard**: cho giáo viên/phụ huynh theo dõi
7. **Mobile optimization**: kiểm tra trải nghiệm trên điện thoại

### 6.3 Ưu tiên thấp (chờ nguồn)

8. **Cấp 3 (THPT)**: chờ OpenSciEd phát hành (2026-2027)
9. **Đa ngôn ngữ**: Anh-Việt song song cho học sinh quốc tế
10. **Assessment engine**: bài kiểm tra tương tác (quiz, drag-drop)

---

## 7. Kết luận

Giai đoạn 1 đã hoàn thành **100% mục tiêu** cho chương trình THCS (Lớp 6-8, 268 lessons) và mở rộng thêm **Lớp 3 Tiểu học** (53 lessons) — tổng **321 bài học** tiếng Việt.

Platform hoạt động ổn định trên Vercel, build sạch, có minh họa ảnh, và sẵn sàng cho người dùng thử nghiệm.

**Nội dung chưa hoàn thiện** tập trung ở:
- **Cấp 1**: 5 lớp còn lại (K, 1, 2, 4, 5) — ~220 lessons
- **Cấp 3**: toàn bộ — đợi OpenSciEd phát hành

Đề xuất Giai đoạn 2 tập trung vào hoàn thiện **Lớp 4 + 5** trước (gần nhất với nội dung đã làm), sau đó là features cho student/mentor.

---

*Báo cáo được tạo tự động bởi Claude Code — 12/04/2026*
