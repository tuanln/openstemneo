# OpenSciNEO — Kiến trúc Tổng thể
> Việt hóa OpenSciEd.org · Trải nghiệm học K12 · Hai vai: Mentor & Học sinh

---

## 1. Tầm nhìn & Mục tiêu

| Hạng mục | Nội dung |
|---|---|
| **Tên dự án** | OpenSciNEO |
| **Nguồn gốc** | Việt hóa toàn bộ curriculum từ [openscied.org](https://openscied.org) |
| **Ngôn ngữ** | Tiếng Việt (UI + nội dung học liệu) |
| **Đối tượng** | Học sinh K12 Việt Nam + Mentor/Giáo viên hướng dẫn |
| **Mô hình học** | Học qua Hiện tượng (Phenomenon-based learning) |
| **Tech stack** | Next.js 14+ · TypeScript · Tailwind CSS · Vercel |

---

## 2. Cấu trúc Curriculum (dịch từ OpenSciEd)

OpenSciEd tổ chức theo **Cấp học → Khối lớp → Đơn vị (Unit) → Bài học (Lesson)**

```
K12
├── Tiểu học (K–5)          ← Field-test, sẽ bổ sung sau
├── THCS (Lớp 6–8)          ← ƯU TIÊN GIAI ĐOẠN 1
│   ├── Lớp 6  (6 Units)
│   │   ├── 6.1 Ánh sáng & Vật chất
│   │   ├── 6.2 Nhiệt năng
│   │   ├── 6.3 Thời tiết, Khí hậu & Nước
│   │   ├── 6.4 Kiến tạo mảng & Vòng tuần hoàn đá
│   │   ├── 6.5 Thiên tai
│   │   └── 6.6 Tế bào & Hệ thống cơ thể
│   ├── Lớp 7  (5 Units)
│   │   ├── 7.1 Phản ứng hóa học & Vật chất
│   │   ├── 7.2 Phản ứng hóa học & Năng lượng
│   │   ├── 7.3 Phản ứng chuyển hóa
│   │   ├── 7.4 Chu trình vật chất & Quang hợp
│   │   └── 7.5 Động lực hệ sinh thái
│   └── Lớp 8  (6 Units)
│       ├── 8.1 Lực & Chuyển động
│       ├── 8.2 Trái đất trong không gian
│       ├── 8.3 ...
│       └── 8.6 Chọn lọc tự nhiên & Nguồn gốc chung
└── THPT (Lớp 9–12)         ← Giai đoạn 2
    ├── Sinh học (5 Units)
    ├── Hóa học (5 Units)
    └── Vật lý (6 Units)
```

### Cấu trúc mỗi Unit

```
Unit (Đơn vị học)
├── Hiện tượng neo (Anchoring Phenomenon)   ← Câu hỏi kích hoạt
├── Chuỗi bài học (Lesson Sequence)
│   ├── Lesson 1: Quan sát & Đặt câu hỏi
│   ├── Lesson 2: Điều tra (Investigation)
│   ├── Lesson 3: Phân tích bằng chứng
│   └── Lesson N: Kết luận & Mở rộng
├── Tài nguyên (Resources)
│   ├── Video hiện tượng
│   ├── Phiếu học tập (Worksheets)
│   └── Bài đọc bổ sung
└── Đánh giá (Assessment)
    ├── Câu hỏi tự đánh giá
    └── Bài kiểm tra cuối unit
```

---

## 3. Hai Vai người dùng

### 🎓 HỌC SINH (Student)

**Hành trình học:**
1. Chọn lớp / cấp học
2. Xem danh sách Unit có sẵn
3. Vào Unit → xem **Hiện tượng neo** (video/ảnh + câu hỏi kích thích tư duy)
4. Học từng Bài học theo trình tự
5. Làm phiếu điều tra, ghi chú bằng chứng
6. Trả lời câu hỏi đánh giá
7. Xem tiến độ cá nhân (dashboard)

**Tính năng chính:**
- Đọc bài / Xem video bằng tiếng Việt
- Ghi chú điều tra (investigation notebook)
- Nộp bài / Gửi câu trả lời cho Mentor
- Xem phản hồi từ Mentor
- Theo dõi tiến độ hoàn thành

---

### 👨‍🏫 MENTOR (Giáo viên / Hướng dẫn viên)

**Hành trình quản lý:**
1. Tạo lớp học (class)
2. Mời học sinh vào lớp (link hoặc mã)
3. Giao Unit / Lesson cho lớp
4. Theo dõi tiến độ từng học sinh
5. Xem bài nộp, cung cấp phản hồi
6. Xem hướng dẫn Mentor (Teacher Guide) bằng tiếng Việt

**Tính năng chính:**
- Quản lý lớp học (tạo, thêm/xóa học sinh)
- Giao bài & đặt deadline
- Dashboard tiến độ lớp (overview) + từng học sinh (drill-down)
- Nhận xét & phản hồi bài nộp
- Truy cập Teacher Guide (hướng dẫn triển khai bài học)
- Tải phiếu học tập PDF

---

## 4. Kiến trúc Hệ thống (High-level)

```
┌─────────────────────────────────────────────┐
│               OpenSciNEO Web App             │
│           (Next.js 14 App Router)            │
├──────────────┬──────────────────────────────┤
│  Student UI  │        Mentor UI             │
│  /student/*  │        /mentor/*             │
├──────────────┴──────────────────────────────┤
│           Shared Components                  │
│    (Header, Lesson Viewer, Progress, ...)    │
├─────────────────────────────────────────────┤
│              API Layer (Next.js API)         │
│   /api/curriculum · /api/progress · /api/   │
├─────────────────────────────────────────────┤
│             Database (PostgreSQL)            │
│   Users · Classes · Progress · Submissions  │
├─────────────────────────────────────────────┤
│           Content Store                      │
│   Curriculum (MDX/JSON) · Media (S3/CDN)    │
└─────────────────────────────────────────────┘
```

---

## 5. Cấu trúc Thư mục Next.js

```
openscineo/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── student/
│   │   ├── dashboard/          ← Trang chủ học sinh
│   │   ├── units/
│   │   │   └── [unitId]/       ← Trang unit
│   │   │       └── lessons/
│   │   │           └── [lessonId]/   ← Bài học
│   │   └── progress/           ← Tiến độ cá nhân
│   ├── mentor/
│   │   ├── dashboard/          ← Trang chủ mentor
│   │   ├── classes/
│   │   │   └── [classId]/      ← Quản lý lớp học
│   │   ├── curriculum/         ← Xem toàn bộ curriculum
│   │   └── submissions/        ← Xem bài nộp
│   ├── api/
│   │   ├── curriculum/
│   │   ├── progress/
│   │   └── classes/
│   └── layout.tsx
├── components/
│   ├── ui/                     ← Base UI (Button, Card, ...)
│   ├── curriculum/             ← LessonViewer, UnitCard, ...
│   ├── student/                ← Notebook, ProgressBar, ...
│   └── mentor/                 ← ClassTable, SubmissionList, ...
├── content/
│   └── curriculum/
│       ├── grade-6/
│       │   ├── unit-1/
│       │   │   ├── index.json  ← Metadata unit
│       │   │   ├── lesson-1.mdx
│       │   │   └── lesson-2.mdx
│       │   └── unit-2/
│       └── grade-7/
├── lib/
│   ├── db/                     ← Database client
│   ├── auth/                   ← Auth utilities
│   └── curriculum/             ← Content loader
└── public/
    └── images/
```

---

## 6. Lộ trình Phát triển

### Giai đoạn 1 — MVP (Tháng 1–3)
- [ ] Setup dự án Next.js + Tailwind + Auth
- [ ] Việt hóa 2 Unit đầu tiên (Lớp 6: 6.1 + 6.2)
- [ ] Trang học sinh: xem bài, ghi chú cơ bản
- [ ] Trang mentor: quản lý lớp, xem tiến độ
- [ ] Deploy lên Vercel

### Giai đoạn 2 — Mở rộng (Tháng 4–6)
- [ ] Hoàn thiện toàn bộ Lớp 6 (6 Units)
- [ ] Hệ thống nộp bài & phản hồi
- [ ] Dashboard tiến độ nâng cao
- [ ] Lớp 7 & 8

### Giai đoạn 3 — Scale (Tháng 7+)
- [ ] THPT (Biology, Chemistry, Physics)
- [ ] Tiểu học (K–5)
- [ ] Gamification, Huy hiệu (Badges)
- [ ] AI hỗ trợ học sinh

---

## 7. Nguyên tắc Thiết kế

- **Tiếng Việt là trung tâm**: Toàn bộ nội dung, UI, thông báo đều bằng tiếng Việt
- **Đơn giản với học sinh**: Giao diện học sinh tối giản, không phân tâm
- **Giàu thông tin với mentor**: Dashboard mentor có đầy đủ dữ liệu theo dõi
- **Mobile-first**: Học sinh dùng điện thoại là chính
- **Hiện tượng làm trung tâm**: Mỗi unit bắt đầu bằng video/ảnh gây tò mò

---

*Tài liệu này sẽ được cập nhật theo tiến độ dự án.*
