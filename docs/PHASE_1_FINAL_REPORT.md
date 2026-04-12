# OpenStemNeo — Báo cáo Tổng kết Giai đoạn 1 (Final)

**Ngày**: 12/04/2026
**Repository**: github.com/tuanln/openstemneo
**Production**: openstemneo.vercel.app

---

## 1. TỔNG KẾT SẢN PHẨM

### 1.1 Nội dung đã hoàn thành

| Cấp | Lớp | Units | Lessons | Ảnh | Trạng thái |
|---|---|---|---|---|---|
| **Mẫu giáo** | K | 3 | 30 | 30 | ✅ Hoàn thành (K.4 gated) |
| **Tiểu học** | 1 | 1 sample | 1 | 1 | 🚧 Sample |
| **Tiểu học** | 2 | 1 sample | 1 | 0 | 🚧 Sample |
| **Tiểu học** | 3 | 4 | 53 | 53+28 | ✅ Hoàn thành |
| **Tiểu học** | 4 | 1 sample | 1 | 1 | 🚧 Sample |
| **Tiểu học** | 5 | 3 | 44 | 44 | ✅ Hoàn thành (5.4 gated) |
| **THCS** | 6 | 6 | 86 | 32 | ✅ Hoàn thành |
| **THCS** | 7 | 6 | 91 | 3 | ✅ Hoàn thành |
| **THCS** | 8 | 6 | 91 | 1 | ✅ Hoàn thành |
| **Tổng** | | **31 units** | **~398 lessons** | **~193 ảnh** | |

### 1.2 Tỷ lệ hoàn thành theo cấp

| Cấp | Hoàn thành | Tổng mục tiêu | Tỷ lệ |
|---|---|---|---|
| Mẫu giáo (K) | 30 lessons | ~40 (4 units) | 75% |
| Cấp 1 (1-5) | 100 lessons | ~200 (20 units) | 50% |
| Cấp 2 (6-8) | 268 lessons | 268 | **100%** |
| **Tổng** | **~398** | **~508** | **~78%** |

### 1.3 UX — Thông báo "Đang phát triển"

Đã thêm 3 cơ chế UX để tránh nhầm lẫn khi user test:
1. **Unit card badge** — "🚧 Đang phát triển" cho units chưa đủ bài
2. **Unit detail banner** — amber banner ghi rõ X/Y bài đã sẵn sàng
3. **Listing page notice** — banner tổng cho biết lớp nào hoàn thiện

---

## 2. PHÂN TÍCH PHASE 2 — Hành trình Học tập (Learning Journey)

### 2.1 Tầm nhìn Phase 2

**Mục tiêu**: Biến OpenStemNeo từ **kho nội dung tĩnh** thành **hành trình học tập tương tác** — nơi mỗi học sinh có **lộ trình riêng**, **tiến độ được theo dõi**, và **phản hồi tức thì**.

### 2.2 Kiến trúc đề xuất

```
┌─────────────────────────────────────────────┐
│              FRONTEND (Next.js)              │
│                                             │
│  ┌─────────┐  ┌──────────┐  ┌───────────┐  │
│  │ Student  │  │ Lesson   │  │ Progress  │  │
│  │ Dashboard│  │ Viewer   │  │ Tracker   │  │
│  └────┬─────┘  └────┬─────┘  └─────┬─────┘  │
│       │              │              │        │
│  ┌────┴──────────────┴──────────────┴────┐   │
│  │          API Routes / Actions          │   │
│  └────────────────┬──────────────────────┘   │
│                   │                          │
└───────────────────┼──────────────────────────┘
                    │
         ┌──────────┴──────────┐
         │     DATABASE        │
         │  (Supabase/Vercel)  │
         │                     │
         │  • Users            │
         │  • Progress         │
         │  • Responses        │
         │  • Achievements     │
         └─────────────────────┘
```

### 2.3 Tính năng cốt lõi Phase 2

#### A. Hệ thống Đăng nhập + Hồ sơ Học sinh

| Tính năng | Chi tiết |
|---|---|
| **Đăng nhập** | Email/password + Google OAuth (Supabase Auth) |
| **Hồ sơ** | Tên, lớp, avatar, ngôn ngữ ưa thích |
| **Vai trò** | Student / Mentor (phụ huynh/giáo viên) / Admin |
| **Onboarding** | Chọn lớp → gợi ý unit phù hợp |

#### B. Theo dõi Tiến độ (Progress Tracking)

| Tính năng | Chi tiết |
|---|---|
| **Lesson status** | Chưa bắt đầu → Đang học → Hoàn thành |
| **Unit progress bar** | X/N bài hoàn thành, % |
| **Continue learning** | "Tiếp tục từ bài em dừng lại" |
| **Time spent** | Ghi nhận thời gian đọc mỗi bài |
| **Streak** | Liên tục học N ngày → huy hiệu |

**Database schema**:
```sql
CREATE TABLE lesson_progress (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  lesson_id TEXT NOT NULL,        -- "6-1-L3"
  unit_id TEXT NOT NULL,          -- "6-1"
  status TEXT DEFAULT 'not_started', -- not_started | in_progress | completed
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  time_spent_seconds INT DEFAULT 0,
  UNIQUE(user_id, lesson_id)
);
```

#### C. Phản hồi Học sinh (Student Responses)

Hiện tại mỗi bài có `<Evidence>` yêu cầu học sinh viết. Phase 2 sẽ:

| Tính năng | Chi tiết |
|---|---|
| **Text response** | Ô viết câu trả lời (lưu vào DB) |
| **Drawing** | Canvas vẽ mô hình (lưu ảnh) |
| **Multiple choice** | Quiz nhỏ cuối mỗi lesson set |
| **Self-assessment** | "Em hiểu bài này: 😕 🙂 😄" |
| **Peer sharing** | Xem câu trả lời ẩn danh của bạn (opt-in) |

**Cải tiến `<Evidence>` component**:
```tsx
// Hiện tại: chỉ hiển thị prompt
<Evidence>Em viết: "..."</Evidence>

// Phase 2: có ô nhập + lưu
<Evidence lessonId="6-1-L3" prompt="Ánh sáng đi từ...">
  <ResponseBox type="text" />
  <DrawingCanvas />
</Evidence>
```

#### D. Hành trình Học tập Cá nhân hóa

| Tính năng | Chi tiết |
|---|---|
| **Gợi ý unit** | Dựa trên lớp + tiến độ → gợi ý unit tiếp theo |
| **Prerequisite map** | Unit 7.4 cần xong 7.1 trước (quang hợp cần hiểu phản ứng) |
| **Review prompts** | "Em đã học về tế bào ở Unit 6.6. Nhớ lại trước khi vào Unit 7.3!" |
| **Cross-reference** | Link giữa các unit liên quan (ví dụ: L7 bài 13 Unit 7.1 nói "em đã học về tế bào thần kinh ở Lớp 6") |
| **Adaptive difficulty** | Nếu quiz sai nhiều → gợi ý ôn lại bài trước |

### 2.4 Lộ trình Phase 2

| Giai đoạn | Thời gian | Deliverable |
|---|---|---|
| **2.1** | 2 tuần | Auth (Supabase) + User model + Login/Register |
| **2.2** | 2 tuần | Progress tracking (lesson status, continue learning) |
| **2.3** | 3 tuần | Student response (text + drawing + quiz) |
| **2.4** | 2 tuần | Personalized journey (prereqs, suggestions) |
| **2.5** | 1 tuần | Mobile optimization + testing |
| **Tổng** | **~10 tuần** | |

---

## 3. PHÂN TÍCH PHASE 3 — Tương tác Giáo viên/Mentor

### 3.1 Tầm nhìn Phase 3

**Mục tiêu**: Giáo viên và phụ huynh (mentors) có thể **theo dõi**, **hỗ trợ**, và **đánh giá** học sinh qua dashboard riêng. Tạo **vòng lặp phản hồi** giữa HS ↔ GV.

### 3.2 Tính năng Mentor Dashboard

#### A. Quản lý Lớp học

| Tính năng | Chi tiết |
|---|---|
| **Tạo lớp** | Mentor tạo lớp, mời HS bằng mã code |
| **Danh sách HS** | Xem tất cả HS trong lớp + avatar + lớp |
| **Phân nhóm** | Nhóm HS để giao bài khác nhau |
| **Thông báo** | Gửi tin nhắn cho cả lớp hoặc từng HS |

#### B. Dashboard Tiến độ Lớp

```
┌──────────────────────────────────────────┐
│  LỚP 7A — Cô Nguyễn Thị Lan             │
│  25 học sinh · Unit 7.4 Quang hợp        │
│                                          │
│  📊 TIẾN ĐỘ LỚP                         │
│  ████████████░░░░  75% (L1-11 done)      │
│                                          │
│  🏆 TOP 5 HỌC SINH                       │
│  1. Minh Anh — 100% (15/15)             │
│  2. Hoàng Nam — 93% (14/15)             │
│  3. Thùy Linh — 87% (13/15)             │
│                                          │
│  ⚠️ CẦN HỖ TRỢ                          │
│  • Đức Huy — 40% (dừng ở L6)            │
│  • Thu Hà — 47% (quiz L5 sai 3/5)       │
│                                          │
│  📝 CÂU TRẢ LỜI GẦN ĐÂY                │
│  L11: "Dalton nói nguyên tử không..."    │
│  → 18 HS trả lời, 3 chưa nộp           │
└──────────────────────────────────────────┘
```

#### C. Đánh giá + Phản hồi

| Tính năng | Chi tiết |
|---|---|
| **Xem responses** | Đọc câu trả lời Evidence của từng HS |
| **Rubric** | Rubric đơn giản (đạt/cần cải thiện/xuất sắc) |
| **Comment** | Viết nhận xét cho từng HS |
| **Batch grading** | Đánh giá hàng loạt bằng template |
| **AI-assisted** | Gợi ý đánh giá dựa trên từ khóa trong response (future) |

#### D. Giao bài + Lịch học

| Tính năng | Chi tiết |
|---|---|
| **Assign** | Giao unit/lesson cụ thể cho lớp hoặc nhóm |
| **Due date** | Đặt deadline cho bài hoặc unit |
| **Schedule** | Lịch học tuần (thứ 2 = L1-2, thứ 4 = L3-4...) |
| **Remind** | Nhắc nhở HS chưa hoàn thành qua notification |

#### E. Phân tích Dữ liệu Lớp (Analytics)

| Metric | Chi tiết |
|---|---|
| **Lesson completion rate** | % HS hoàn thành mỗi bài |
| **Time per lesson** | Thời gian trung bình đọc mỗi bài |
| **Quiz accuracy** | % đúng trung bình mỗi câu |
| **Drop-off points** | Bài nào HS bỏ dở nhiều nhất? |
| **Engagement** | HS nào hoạt động thường xuyên nhất? |
| **Knowledge gaps** | Concept nào nhiều HS sai nhất? |

### 3.3 Vòng lặp Phản hồi HS ↔ GV

```
    ┌────── HỌC SINH ──────┐
    │                       │
    │  1. Đọc bài          │
    │  2. Viết Evidence     │──── Response ────→ ┌── GIÁO VIÊN ──┐
    │  3. Làm quiz          │                    │                │
    │  4. Tự đánh giá       │                    │ 5. Xem response│
    │                       │                    │ 6. Đánh giá    │
    │  8. Nhận phản hồi     │←── Feedback ──────│ 7. Viết comment│
    │  9. Sửa/bổ sung       │                    │                │
    │ 10. Tiếp tục bài sau  │                    └────────────────┘
    └───────────────────────┘
```

### 3.4 Lộ trình Phase 3

| Giai đoạn | Thời gian | Deliverable |
|---|---|---|
| **3.1** | 2 tuần | Mentor role + Class creation + Invite code |
| **3.2** | 3 tuần | Mentor dashboard (progress view, student list) |
| **3.3** | 3 tuần | Response viewer + Rubric + Comment system |
| **3.4** | 2 tuần | Assignment + Scheduling + Notifications |
| **3.5** | 2 tuần | Analytics dashboard + Reports |
| **3.6** | 2 tuần | Testing + Polish + Documentation |
| **Tổng** | **~14 tuần** | |

---

## 4. TỔNG QUAN 3 PHASES

| Phase | Trọng tâm | Thời gian | Output chính |
|---|---|---|---|
| **Phase 1** ✅ | Nội dung | ~4 tuần | 398 lessons, 31 units, K-8 |
| **Phase 2** | Hành trình HS | ~10 tuần | Auth, Progress, Responses, Quiz |
| **Phase 3** | Tương tác GV | ~14 tuần | Mentor Dashboard, Analytics, Feedback |

**Tổng**: ~28 tuần (7 tháng) cho toàn bộ MVP

### Công nghệ đề xuất Phase 2+3

| Layer | Lựa chọn | Lý do |
|---|---|---|
| **Auth** | Supabase Auth | Free, Google OAuth, session management |
| **Database** | Supabase (PostgreSQL) | Free tier đủ, real-time, RLS |
| **Storage** | Supabase Storage | Lưu drawings, avatars |
| **API** | Next.js Server Actions | Không cần API route riêng, type-safe |
| **Real-time** | Supabase Realtime | Notifications, live progress |
| **Analytics** | Vercel Analytics + custom | Performance + learning analytics |
| **Email** | Resend | Thông báo, nhắc nhở |

---

## 5. RỦI RO + ĐỀ XUẤT

### 5.1 Rủi ro

| Rủi ro | Mức độ | Mitigation |
|---|---|---|
| OpenSciEd thay đổi license | Thấp | CC BY 4.0 là irrevocable |
| Nội dung quá "Mỹ" cho HS Việt | Trung bình | Đã adapt context VN (ví dụ: Hà Nội, Mekong, VinFast) |
| User adoption | Cao | Cần marketing + pilot ở 1-2 trường trước |
| Scale performance | Thấp | SSG + CDN (Vercel) → fast globally |
| GDPR/privacy (HS dưới 18) | Trung bình | Cần consent flow cho phụ huynh ở Phase 2 |

### 5.2 Đề xuất tiếp theo

1. **Pilot test** Phase 1 với 1-2 lớp thật (GV tình nguyện)
2. **Collect feedback** từ HS + GV trước khi bắt đầu Phase 2
3. **Content gap** — hoàn thiện K.4, 5.4 (đợi OpenSciEd public)
4. **Cấp 3 (THPT)** — theo dõi OpenSciEd High School release (2026-2027)

---

*Báo cáo Phase 1 Final — OpenStemNeo — 12/04/2026*
*Tạo bởi Claude Code*
