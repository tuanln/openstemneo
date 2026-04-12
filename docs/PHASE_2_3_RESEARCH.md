# OpenStemNeo — Nghiên cứu Phương án Phase 2 & 3

**Ngày**: 12/04/2026
**Mục đích**: Phân tích chi tiết các phương án kỹ thuật + UX cho Phase 2 (Hành trình Học sinh) và Phase 3 (Tương tác Giáo viên). Tài liệu này phục vụ cho việc ra quyết định trước khi triển khai.

---

## MỤC LỤC

1. [Bối cảnh & Mục tiêu](#1-bối-cảnh--mục-tiêu)
2. [Phase 2 — Hành trình Học sinh](#2-phase-2--hành-trình-học-sinh)
   - 2.1 Phương án Auth
   - 2.2 Phương án Database
   - 2.3 Progress Tracking
   - 2.4 Student Responses & Quiz
   - 2.5 Personalized Learning Path
3. [Phase 3 — Tương tác Giáo viên](#3-phase-3--tương-tác-giáo-viên)
   - 3.1 Mentor Dashboard
   - 3.2 Đánh giá & Phản hồi
   - 3.3 Class Management
   - 3.4 Analytics & Reporting
4. [So sánh Phương án Kỹ thuật](#4-so-sánh-phương-án-kỹ-thuật)
5. [Wireframes & User Flows](#5-wireframes--user-flows)
6. [Ước tính Chi phí & Timeline](#6-ước-tính-chi-phí--timeline)
7. [Rủi ro & Mitigation](#7-rủi-ro--mitigation)
8. [Đề xuất Phương án Tối ưu](#8-đề-xuất-phương-án-tối-ưu)

---

## 1. Bối cảnh & Mục tiêu

### 1.1 Hiện trạng Phase 1

| Metric | Giá trị |
|---|---|
| Tổng lessons | ~398 |
| Tổng units | 31 (K → Lớp 8) |
| Tech stack | Next.js 16 + MDX + Vercel (SSG) |
| Auth | ❌ Chưa có |
| Database | ❌ Chưa có |
| User tracking | ❌ Chưa có |
| Interaction | ❌ Chưa có (chỉ đọc) |

### 1.2 Mục tiêu Phase 2+3

**Phase 2**: Học sinh có thể **đăng nhập**, **theo dõi tiến độ**, **viết câu trả lời**, và nhận **lộ trình cá nhân hóa**.

**Phase 3**: Giáo viên có thể **quản lý lớp**, **theo dõi học sinh**, **đánh giá bài làm**, và **phân tích dữ liệu** học tập.

### 1.3 Nguyên tắc thiết kế

1. **Đơn giản trước** — MVP trước, nâng cao sau
2. **Mobile-first** — 80% HS Việt Nam dùng điện thoại
3. **Offline-ready** — nhiều vùng nông thôn mạng yếu
4. **Chi phí thấp** — ưu tiên free tier / open source
5. **Privacy** — HS dưới 18 tuổi cần consent phụ huynh

---

## 2. Phase 2 — Hành trình Học sinh

### 2.1 Phương án Auth (Xác thực)

#### Phương án A — Supabase Auth

| Ưu | Nhược |
|---|---|
| Free tier 50.000 MAU | Lock-in vào Supabase ecosystem |
| Google/GitHub OAuth built-in | UI đăng nhập cần custom |
| Session management tự động | Thêm dependency ngoài Vercel |
| Row Level Security (RLS) | |
| React hooks (`@supabase/ssr`) | |

**Chi phí**: $0 (free tier) → $25/tháng (Pro khi vượt 50K MAU)

#### Phương án B — NextAuth.js (Auth.js v5)

| Ưu | Nhược |
|---|---|
| Không phụ thuộc dịch vụ ngoài | Phải tự quản lý session/DB |
| Nhiều provider (Google, Facebook, GitHub) | Phức tạp hơn setup |
| Cộng đồng lớn | Cần adapter cho DB |
| Hoàn toàn open source | |

**Chi phí**: $0 (open source) + chi phí DB riêng

#### Phương án C — Clerk

| Ưu | Nhược |
|---|---|
| UI đăng nhập đẹp sẵn | Free chỉ 10.000 MAU |
| Drop-in components | $25/tháng từ 10K MAU |
| Webhook cho user events | Vendor lock-in |
| Multi-tenant support | |

**Chi phí**: $0 (dưới 10K) → $25+/tháng

#### ⭐ Đề xuất: **Phương án A (Supabase Auth)**
- Lý do: free tier lớn, tích hợp tốt với DB (cùng Supabase), RLS bảo mật tốt cho HS dưới 18.

---

### 2.2 Phương án Database

#### Phương án A — Supabase (PostgreSQL hosted)

| Ưu | Nhược |
|---|---|
| Free: 500MB DB, 1GB storage | Limited connections trên free |
| Real-time subscriptions | Phụ thuộc Supabase uptime |
| Auto-generated API (REST + GraphQL) | |
| Row Level Security | |
| Edge Functions | |

**Chi phí**: $0 → $25/tháng (Pro)

#### Phương án B — Vercel Postgres (Neon)

| Ưu | Nhược |
|---|---|
| Tích hợp native với Vercel | Free chỉ 256MB |
| Serverless, auto-scale | Ít features hơn Supabase |
| Không cần quản lý | Không có real-time |

**Chi phí**: $0 → usage-based

#### Phương án C — PlanetScale (MySQL)

| Ưu | Nhược |
|---|---|
| Branching (giống git cho DB) | MySQL thay vì PostgreSQL |
| Generous free tier | Không có RLS built-in |
| Serverless | Ít phổ biến trong Next.js ecosystem |

**Chi phí**: $0 → $29/tháng

#### ⭐ Đề xuất: **Phương án A (Supabase)**
- Lý do: Auth + DB + Storage + Real-time trong 1 platform, free tier đủ cho pilot, RLS bảo vệ dữ liệu HS.

---

### 2.3 Progress Tracking

#### Data Model

```sql
-- Bảng tiến độ lesson
CREATE TABLE lesson_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,           -- "6-1-L3"
  unit_id TEXT NOT NULL,             -- "6-1"
  grade_level INT NOT NULL,          -- 6
  status TEXT DEFAULT 'not_started', -- not_started | in_progress | completed
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  time_spent_seconds INT DEFAULT 0,
  last_position INT DEFAULT 0,      -- scroll position (resume reading)
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

-- Bảng streak (liên tục học)
CREATE TABLE learning_streaks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  lessons_completed INT DEFAULT 0,
  time_spent_seconds INT DEFAULT 0,
  UNIQUE(user_id, date)
);

-- Bảng achievements (huy hiệu)
CREATE TABLE achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_type TEXT NOT NULL, -- 'first_lesson' | 'unit_complete' | 'streak_7' | 'streak_30'
  achieved_at TIMESTAMPTZ DEFAULT now(),
  metadata JSONB DEFAULT '{}'
);

-- RLS: học sinh chỉ xem được dữ liệu của mình
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own progress"
  ON lesson_progress FOR SELECT
  USING (auth.uid() = user_id);
CREATE POLICY "Users can update own progress"
  ON lesson_progress FOR ALL
  USING (auth.uid() = user_id);
```

#### UI Components cần xây

| Component | Chức năng |
|---|---|
| `<ProgressBar>` | Thanh tiến độ unit (X/N bài) |
| `<LessonStatus>` | Icon trạng thái mỗi bài (⬜ 🔵 ✅) |
| `<ContinueLearning>` | Card "Tiếp tục từ bài em dừng" |
| `<StreakCounter>` | Đếm ngày liên tục + flame icon 🔥 |
| `<AchievementBadge>` | Huy hiệu khi đạt milestone |
| `<ReadingTimer>` | Đếm thời gian đọc (background) |

#### Cách hoạt động

```
Học sinh mở bài → API: upsert(status='in_progress', started_at=now)
                → Timer chạy background (mỗi 30s ghi time_spent)
                → Scroll → ghi last_position
Học sinh cuộn đến cuối → Nút "Hoàn thành bài"
                → API: update(status='completed', completed_at=now)
                → Check streak → Update achievements
                → Redirect: "Bài tiếp theo →"
```

---

### 2.4 Student Responses & Quiz

#### Phương án Response

```sql
CREATE TABLE student_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,
  prompt_id TEXT NOT NULL,           -- "evidence-1", "quiz-1"
  response_type TEXT NOT NULL,       -- 'text' | 'drawing' | 'multiple_choice' | 'self_assessment'
  content TEXT,                      -- Text response hoặc JSON
  drawing_url TEXT,                  -- URL ảnh vẽ (Supabase Storage)
  score INT,                         -- Điểm quiz (nếu có)
  max_score INT,
  submitted_at TIMESTAMPTZ DEFAULT now(),
  reviewed BOOLEAN DEFAULT false,    -- Giáo viên đã xem?
  reviewer_id UUID,
  reviewer_comment TEXT,
  reviewer_score TEXT,               -- 'excellent' | 'good' | 'needs_improvement'
  UNIQUE(user_id, lesson_id, prompt_id)
);
```

#### Cải tiến MDX Components

**Hiện tại** — `<Evidence>` chỉ hiển thị prompt:
```mdx
<Evidence>
Em viết: "Ánh sáng đi từ ________."
</Evidence>
```

**Phase 2** — `<Evidence>` có ô nhập + lưu:
```tsx
// components/curriculum/mdx/evidence-interactive.tsx
"use client";

export function EvidenceInteractive({ lessonId, promptId, prompt, children }) {
  const [response, setResponse] = useState("");
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    await saveResponse({ lessonId, promptId, type: "text", content: response });
    setSaved(true);
  }

  return (
    <div className="my-5 rounded-xl border-2 border-green-200 bg-green-50 p-5">
      <div className="mb-3 text-sm font-semibold text-green-900">
        📝 Ghi bằng chứng
      </div>
      <div className="mb-3 text-sm">{children}</div>
      <textarea
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        placeholder="Em viết câu trả lời ở đây..."
        className="w-full rounded-lg border p-3 text-sm"
        rows={4}
      />
      <div className="mt-2 flex items-center gap-2">
        <button onClick={handleSave} className="btn-primary">
          {saved ? "✅ Đã lưu" : "💾 Lưu"}
        </button>
        {saved && <span className="text-xs text-green-700">Cô giáo sẽ xem câu trả lời của em</span>}
      </div>
    </div>
  );
}
```

#### Quiz Component

```tsx
// components/curriculum/mdx/quiz.tsx
"use client";

export function Quiz({ lessonId, questions }) {
  // questions = [{ id, question, options: ["A", "B", "C", "D"], correct: 1 }]
  return (
    <div className="quiz-container">
      {questions.map((q) => (
        <div key={q.id}>
          <p className="font-semibold">{q.question}</p>
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(q.id, i)}
              className={cn("quiz-option", selected === i && "selected")}
            >
              {opt}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
```

#### Drawing Canvas

```tsx
// components/curriculum/mdx/drawing-canvas.tsx
"use client";

// Dùng thư viện excalidraw hoặc tldraw (open source)
// Hoặc đơn giản hơn: react-sketch-canvas
import { ReactSketchCanvas } from "react-sketch-canvas";

export function DrawingCanvas({ lessonId, promptId }) {
  const canvasRef = useRef(null);

  async function handleSave() {
    const dataUrl = await canvasRef.current.exportImage("png");
    // Upload to Supabase Storage
    const url = await uploadDrawing(dataUrl, `${lessonId}/${promptId}`);
    await saveResponse({ lessonId, promptId, type: "drawing", drawingUrl: url });
  }

  return (
    <div className="drawing-container">
      <ReactSketchCanvas ref={canvasRef} width="100%" height="300px" />
      <button onClick={handleSave}>💾 Lưu bản vẽ</button>
    </div>
  );
}
```

---

### 2.5 Personalized Learning Path

#### Prerequisite Map

```json
{
  "7-3": { "requires": ["7-1"], "reason": "Cần hiểu phản ứng hóa học trước khi học chuyển hóa" },
  "7-4": { "requires": ["7-1", "7-3"], "reason": "Quang hợp dựa trên phản ứng hóa học + năng lượng" },
  "7-6": { "requires": ["7-4"], "reason": "Biến đổi khí hậu liên kết với chu trình carbon" },
  "8-5": { "requires": ["6-6"], "reason": "Di truyền dựa trên kiến thức về tế bào" },
  "8-6": { "requires": ["8-5"], "reason": "Tiến hóa dựa trên di truyền + đột biến" }
}
```

#### Recommendation Algorithm

```
Input: user_id, current_progress
1. Lấy tất cả units hoàn thành
2. Lấy tất cả units chưa bắt đầu
3. Lọc: units có prerequisite đã hoàn thành
4. Sắp xếp theo: grade_level ASC, unit_order ASC
5. Return top 3 gợi ý
```

#### Review Prompts

Khi HS bắt đầu unit mới có prerequisite, hiển thị:
```
💡 Trước khi bắt đầu Unit 7.4 (Quang hợp), em đã học:
- ✅ Unit 7.1: Phản ứng hóa học — nguyên tử sắp xếp lại
- ✅ Unit 7.3: Chuyển hóa — glucose cung cấp năng lượng

Kiến thức này sẽ giúp em hiểu cách CÂY tạo glucose từ CO₂ + nước.
[Bắt đầu Unit 7.4 →]
```

---

## 3. Phase 3 — Tương tác Giáo viên

### 3.1 Mentor Dashboard

#### Data Model — Class Management

```sql
CREATE TABLE classes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,              -- "Lớp 7A"
  mentor_id UUID REFERENCES auth.users(id),
  invite_code TEXT UNIQUE,         -- "ABC123" (6 ký tự)
  grade_level INT,
  school_name TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE class_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'student',     -- 'student' | 'co-mentor'
  joined_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(class_id, user_id)
);

CREATE TABLE assignments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  mentor_id UUID REFERENCES auth.users(id),
  unit_id TEXT NOT NULL,
  lesson_ids TEXT[],               -- Null = toàn bộ unit
  due_date TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### Dashboard Layout

```
┌─────────────────────────────────────────────────────┐
│  OPENSTEMNEO — Mentor Dashboard                      │
│  Xin chào, cô Lan 👋                                │
├───────────┬─────────────────────────────────────────┤
│           │                                         │
│  📊 Tổng quan │  ┌─── Lớp 7A (25 HS) ──────────┐   │
│           │  │                                │   │
│  👥 Lớp học  │  │  Unit 7.4 Quang hợp          │   │
│           │  │  ████████████░░░░ 75%          │   │
│  📝 Bài làm │  │                                │   │
│           │  │  🟢 Hoàn thành: 18 HS           │   │
│  📈 Phân tích│  │  🟡 Đang học: 4 HS            │   │
│           │  │  🔴 Chưa bắt đầu: 3 HS         │   │
│  ⚙️ Cài đặt │  │                                │   │
│           │  │  [Xem chi tiết] [Giao bài mới] │   │
│           │  └────────────────────────────────┘   │
│           │                                         │
│           │  ┌─── Câu trả lời gần đây ─────────┐   │
│           │  │  L11 Evidence: 18 nộp, 3 chưa    │   │
│           │  │  → "Dalton nói nguyên tử..."     │   │
│           │  │  [Xem tất cả] [Đánh giá]        │   │
│           │  └──────────────────────────────────┘   │
└───────────┴─────────────────────────────────────────┘
```

### 3.2 Đánh giá & Phản hồi

#### Rubric System

```sql
CREATE TABLE rubric_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,            -- "Rubric Evidence đơn giản"
  levels JSONB NOT NULL          -- [{"label":"Xuất sắc","score":3,"description":"..."},
                                 --  {"label":"Đạt","score":2,"description":"..."},
                                 --  {"label":"Cần cải thiện","score":1,"description":"..."}]
);

-- Default rubric cho Evidence responses
INSERT INTO rubric_templates (name, levels) VALUES (
  'Rubric Evidence cơ bản',
  '[
    {"label": "Xuất sắc 🌟", "score": 3, "description": "Sử dụng bằng chứng từ bài học, giải thích rõ ràng, có ví dụ"},
    {"label": "Đạt ✅", "score": 2, "description": "Có đề cập đến ý chính, nhưng chưa đủ chi tiết"},
    {"label": "Cần bổ sung 📝", "score": 1, "description": "Chưa trả lời đúng trọng tâm, cần xem lại bài"}
  ]'
);
```

#### Feedback Flow

```
GV mở "Câu trả lời" → Xem danh sách HS + response
→ Click vào 1 HS → Đọc response
→ Chọn rubric level (Xuất sắc / Đạt / Cần bổ sung)
→ Viết comment (tùy chọn): "Em giải thích tốt phần quang hợp,
   nhưng chưa đề cập đến vai trò của diệp lục."
→ Lưu → HS nhận notification "Cô đã đánh giá bài em"
→ HS mở → thấy rubric + comment → sửa nếu muốn
```

#### Batch Grading (đánh giá nhanh)

```
GV chọn 1 lesson Evidence → Xem TẤT CẢ responses
→ Sắp xếp theo: dài/ngắn, có từ khóa, chưa đánh giá
→ GV đánh nhanh: swipe left = "Cần bổ sung", right = "Đạt"
→ Double-tap = "Xuất sắc"
→ Ghi comment chung cho cả lớp (tùy chọn)
→ Lưu tất cả → HS nhận notification
```

### 3.3 Class Management

#### Invite Flow

```
GV tạo lớp → Hệ thống tạo invite code "ABC123"
→ GV chia sẻ code cho HS (qua bảng, nhóm chat, giấy)
→ HS đăng nhập → Nhập code → Tham gia lớp
→ GV thấy HS trong danh sách → Chấp nhận/Từ chối
```

#### Phụ huynh Consent (cho HS dưới 16 tuổi)

```
HS đăng ký → Nhập tuổi → Dưới 16 → Yêu cầu email phụ huynh
→ Gửi email phụ huynh: "Con bạn muốn đăng ký OpenStemNeo..."
→ Phụ huynh click link xác nhận → Tài khoản HS được kích hoạt
→ Phụ huynh có thể đăng nhập xem tiến độ con (vai trò Parent)
```

### 3.4 Analytics & Reporting

#### Metrics Dashboard cho GV

| Metric | Tính toán | Ý nghĩa |
|---|---|---|
| **Completion Rate** | completed / total × 100% | % HS hoàn thành mỗi bài |
| **Avg Time/Lesson** | avg(time_spent) | Bài nào HS đọc lâu (khó?) |
| **Drop-off Rate** | started but not completed / started | Bài nào HS bỏ dở |
| **Quiz Accuracy** | correct / total_questions | Concept nào HS hiểu/chưa hiểu |
| **Response Rate** | submitted / assigned | Bao nhiêu HS nộp Evidence |
| **Engagement Score** | (completion × 0.4 + response × 0.3 + streak × 0.3) | Điểm tổng hợp |

#### Export

- **CSV**: xuất dữ liệu cho từng lớp
- **PDF Report**: báo cáo tiến độ gửi phụ huynh (cuối tháng/học kỳ)
- **Chart**: biểu đồ tiến độ lớp qua thời gian

---

## 4. So sánh Phương án Kỹ thuật

### 4.1 Auth

| Tiêu chí | Supabase Auth | NextAuth.js | Clerk |
|---|---|---|---|
| **Chi phí (10K users)** | $0 | $0 + DB cost | $25/tháng |
| **Setup** | Nhanh (SDK) | Trung bình | Rất nhanh |
| **OAuth** | ✅ | ✅ | ✅ |
| **RLS tích hợp** | ✅ | ❌ | ❌ |
| **Phụ huynh consent** | Custom | Custom | Custom |
| **Vendor lock-in** | Trung bình | Thấp | Cao |
| **⭐ Đề xuất** | **✅** | Backup | ❌ |

### 4.2 Database

| Tiêu chí | Supabase | Vercel Postgres | PlanetScale |
|---|---|---|---|
| **Free tier** | 500MB | 256MB | 5GB |
| **Real-time** | ✅ | ❌ | ❌ |
| **RLS** | ✅ | ❌ | ❌ |
| **Auto API** | ✅ (REST) | ❌ | ❌ |
| **Tích hợp Auth** | ✅ | ❌ | ❌ |
| **⭐ Đề xuất** | **✅** | Backup | ❌ |

### 4.3 Drawing Tool

| Tiêu chí | react-sketch-canvas | Excalidraw | tldraw |
|---|---|---|---|
| **Bundle size** | ~50KB | ~500KB | ~200KB |
| **Mobile support** | ✅ | ⚠️ | ✅ |
| **Export PNG** | ✅ | ✅ | ✅ |
| **Complexity** | Đơn giản | Phức tạp | Trung bình |
| **⭐ Đề xuất** | **✅ (MVP)** | Phase sau | ❌ |

### 4.4 Real-time Notifications

| Tiêu chí | Supabase Realtime | Pusher | Firebase FCM |
|---|---|---|---|
| **Chi phí** | $0 (included) | $0 → $49+ | $0 |
| **Web push** | ❌ (cần thêm) | ✅ | ✅ |
| **In-app** | ✅ | ✅ | ❌ |
| **Tích hợp DB** | ✅ | ❌ | ❌ |
| **⭐ Đề xuất** | **✅** + Web Push API | | |

---

## 5. Wireframes & User Flows

### 5.1 Flow: Học sinh lần đầu

```
Landing page → [Đăng ký] → Nhập tên + lớp + email
→ (Nếu dưới 16: gửi email phụ huynh → PH xác nhận)
→ Onboarding: "Em đang học lớp mấy?" → Chọn lớp
→ Gợi ý 3 units phù hợp
→ Click unit → Bài 1 (phenomenon) → Bắt đầu học!
→ Đọc xong → "Hoàn thành ✅" → Streak +1 🔥
→ "Bài tiếp theo →" → Tiếp tục...
```

### 5.2 Flow: Học sinh quay lại

```
Đăng nhập → Dashboard:
  "Chào em, Minh Anh! 🔥 Streak: 5 ngày"
  "Tiếp tục: Unit 7.4 Bài 8 — Cây lấy thức ăn từ đâu?"
  [Vào học →]
→ Lesson viewer (cuộn đến last_position)
→ Evidence box → Viết + Lưu
→ "Hoàn thành ✅" → Achievement: "🌿 Xong 50% Unit 7.4!"
```

### 5.3 Flow: Giáo viên

```
Đăng nhập (mentor) → Mentor Dashboard
→ [Tạo lớp mới] → "Lớp 7A" → Mã mời: "XYZ789"
→ Chia sẻ mã cho HS
→ HS tham gia → GV thấy danh sách
→ [Giao bài] → Chọn Unit 7.4 → Deadline: 20/04
→ Đợi HS làm bài...
→ [Xem responses] → Đọc Evidence → Đánh giá (rubric + comment)
→ [Phân tích] → Biểu đồ completion, quiz accuracy
→ [Xuất report PDF] → Gửi phụ huynh
```

### 5.4 Flow: Phụ huynh

```
Nhận email consent → Click xác nhận → Tạo tài khoản Parent
→ Dashboard: "Con của bạn: Minh Anh (Lớp 7A)"
→ Xem tiến độ: 75% Unit 7.4
→ Xem streak: 5 ngày liên tục 🔥
→ Xem đánh giá GV: "Xuất sắc — giải thích tốt về quang hợp"
→ (Không xem nội dung response — chỉ rubric + comment)
```

---

## 6. Ước tính Chi phí & Timeline

### 6.1 Chi phí vận hành (monthly)

| Service | Free tier | Dự kiến 1000 users | Dự kiến 10K users |
|---|---|---|---|
| **Vercel** (hosting) | $0 | $0 | $20/tháng |
| **Supabase** (DB+Auth+Storage) | $0 | $0 | $25/tháng |
| **Resend** (email) | $0 (100/ngày) | $0 | $20/tháng |
| **Vercel Analytics** | $0 | $0 | $0 |
| **Domain** (custom) | $0 (vercel.app) | ~$12/năm | ~$12/năm |
| **Tổng** | **$0** | **~$1/tháng** | **~$66/tháng** |

→ **Cực kỳ rẻ** — hoàn toàn free cho pilot.

### 6.2 Timeline chi tiết

#### Phase 2 (~10 tuần)

| Tuần | Task | Output |
|---|---|---|
| 1-2 | Supabase setup + Auth + User model | Đăng nhập/đăng ký hoạt động |
| 3-4 | Progress tracking + DB + API | Lesson status, continue learning |
| 5-6 | Evidence interactive + text response | HS viết + lưu câu trả lời |
| 7 | Drawing canvas + Quiz component | HS vẽ + làm quiz |
| 8-9 | Personalized path + Prereqs + Streaks | Gợi ý unit, huy hiệu |
| 10 | Mobile testing + Bug fixes + Deploy | Production-ready |

#### Phase 3 (~14 tuần)

| Tuần | Task | Output |
|---|---|---|
| 1-2 | Mentor role + Class creation + Invite | GV tạo lớp, HS tham gia |
| 3-4 | Mentor dashboard (progress view) | GV xem tiến độ lớp |
| 5-6 | Response viewer + Rubric | GV đọc + đánh giá bài |
| 7-8 | Comment + Batch grading | GV phản hồi nhanh |
| 9-10 | Assignment + Scheduling | GV giao bài + deadline |
| 11-12 | Analytics dashboard + Charts | Biểu đồ + metrics |
| 13 | Parent consent + Parent view | Phụ huynh xem tiến độ |
| 14 | Testing + Documentation + Deploy | Production-ready |

---

## 7. Rủi ro & Mitigation

| Rủi ro | Xác suất | Tác động | Mitigation |
|---|---|---|---|
| Supabase downtime | Thấp | Cao | Fallback: offline-first mode (read-only) |
| HS dưới 16 privacy | Trung bình | Cao | Consent flow + RLS + không lưu data cá nhân nhạy cảm |
| GV không biết dùng tech | Cao | Trung bình | Video hướng dẫn + UI cực đơn giản |
| Scale vượt free tier | Thấp (pilot) | Thấp | Upgrade Supabase Pro ($25/tháng) |
| Content bị copy | Trung bình | Thấp | CC BY 4.0 cho phép, chỉ yêu cầu attribution |
| Mobile UX kém | Trung bình | Cao | Mobile-first design, test trên nhiều thiết bị |
| Offline areas | Trung bình | Cao | Service Worker + cache bài đã load |

---

## 8. Đề xuất Phương án Tối ưu

### Stack đề xuất

```
Frontend:     Next.js 16 (hiện có) + React 19
Auth:         Supabase Auth (Google OAuth + email)
Database:     Supabase PostgreSQL (free tier)
Storage:      Supabase Storage (drawings, avatars)
Real-time:    Supabase Realtime (notifications)
Email:        Resend (nhắc nhở, report)
Analytics:    Vercel Analytics + custom dashboard
Hosting:      Vercel (hiện có)
Drawing:      react-sketch-canvas (MVP)
Quiz:         Custom component (đơn giản)
```

### Thứ tự ưu tiên

1. **Auth + Progress** (tuần 1-4) — HS đăng nhập + theo dõi tiến độ
2. **Evidence interactive** (tuần 5-7) — HS viết câu trả lời
3. **Mentor basic** (tuần 8-12) — GV tạo lớp + xem tiến độ
4. **Feedback** (tuần 13-16) — GV đánh giá + comment
5. **Analytics** (tuần 17-20) — Biểu đồ + report
6. **Advanced** (tuần 21-24) — Quiz, Drawing, Personalization, Parent

### MVP tối thiểu (4 tuần)

Nếu muốn ship **nhanh nhất**, chỉ cần:
1. ✅ Supabase Auth (đăng nhập Google)
2. ✅ Lesson progress (completed / not completed)
3. ✅ Continue learning ("Tiếp tục bài em dừng")
4. ✅ Text response cho Evidence

→ **4 tuần** là có MVP tương tác cơ bản.

---

*Nghiên cứu phương án Phase 2+3 — OpenStemNeo — 12/04/2026*
*Tạo bởi Claude Code*
