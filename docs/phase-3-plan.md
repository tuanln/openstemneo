# Phase 3 — Tương tác & Theo dõi học tập

> **Trạng thái**: Kế hoạch (pre-implementation). Có thể bắt đầu khi MVP đã có người dùng thực sự hoặc khi Cowork có đủ Teacher Edition cho 3-4 unit đầu.

---

## Mục tiêu Phase 3

Biến OpenStemNeo từ một thư viện nội dung tĩnh thành một **nền tảng học tập tương tác**:

1. **Vở điều tra cá nhân** — Học sinh ghi lại quan sát, bằng chứng, suy nghĩ của mình trong mỗi bài học
2. **Theo dõi tiến độ** — App biết học sinh đã đọc bài nào, dành bao lâu, hoàn thành ở đâu
3. **Lịch sử học tập** — Học sinh xem lại những gì mình đã ghi, quay lại bài cũ để cập nhật hiểu biết
4. **Nộp bài tập** — Học sinh gửi câu trả lời cho những câu hỏi quan trọng cuối lesson (chuẩn bị cho Phase 4 mentor)

## Điều kiện tiên quyết — đã có từ Phase 2

- Loader curriculum hoạt động: `lib/curriculum/loader.ts`
- MDX lesson viewer render được custom components (`<Evidence>`, `<Question>`, ...)
- 18 unit metadata + Unit 6.1 nội dung đầy đủ để test
- Component `<Evidence>` hiện có placeholder text "Khi có vở điều tra cá nhân, em sẽ có thể ghi ý kiến tại đây" — sẽ thay bằng textarea thực tế ở Phase 3

## Điểm quyết định lớn: **Có dùng auth + DB không?**

Phase 1 và 2 đã defer auth. Phase 3 tương tác cần lưu data của từng học sinh. Có 3 lựa chọn:

### Lựa chọn A: **Anonymous + localStorage** (đề xuất cho bước đầu)

Không cần đăng ký tài khoản. Tất cả dữ liệu (vở điều tra, tiến độ) lưu trong `localStorage` của trình duyệt.

**Ưu điểm**
- Không cần backend → không cần Prisma, không cần database, không cần NextAuth
- Deploy vẫn là static — tiếp tục free trên Vercel
- Mọi học sinh có thể dùng ngay, không rào cản đăng ký
- Phù hợp với tinh thần "Mở · Miễn phí · OER"
- Giữ nguyên mô hình Phase 1-2

**Nhược điểm**
- Dữ liệu chỉ ở một máy, một trình duyệt → dọn cache = mất hết
- Không thể dùng máy khác → mất dữ liệu khi đổi điện thoại
- Không share được với mentor (cần Phase 4 mới có)
- Không có lớp học, không có enrollment
- Không tổng hợp được progress cho cả lớp

**Kỹ thuật**
- `useLocalStorage` hook
- Shape dữ liệu: `{ notebook: { [lessonId]: string }, progress: { [lessonId]: { status, startedAt, completedAt } } }`
- Có thể thêm **export JSON** để học sinh lưu file backup
- Có thể thêm **import JSON** để khôi phục ở máy mới

### Lựa chọn B: **Auth + DB đầy đủ** (theo spec gốc)

Đăng ký/đăng nhập với NextAuth v5 + Prisma + PostgreSQL (Neon) như `OPENSCINEO_SPEC.md` mô tả.

**Ưu điểm**
- Dữ liệu bền, đa thiết bị
- Sẵn sàng cho Phase 4 mentor dashboard
- Có enrollment lớp, có submission flow

**Nhược điểm**
- Rào cản đăng ký — học sinh THCS Việt Nam chưa chắc có email
- Cần backend infra (DB hosting, backup, migration)
- Phức tạp hơn nhiều — cần thêm 2-3 tuần cho Phase 3
- Không còn "vào học ngay" như Phase 1 landing page quảng bá

### Lựa chọn C: **Hybrid — localStorage mặc định, optional account** (đề xuất cho production)

Mặc định dùng localStorage. Khi học sinh muốn đồng bộ nhiều máy hoặc khi mentor muốn xem tiến độ lớp, **mới** yêu cầu đăng nhập. Lúc đó, dữ liệu localStorage được upload lên server và tiếp tục sync.

**Ưu điểm**
- "Vào học ngay" không rào cản
- Người dùng nâng cao có thể upgrade lên account
- Tương thích với Phase 4 mentor
- Phù hợp với pattern của các ứng dụng edu hiện đại (Khan Academy, Duolingo)

**Nhược điểm**
- Phức tạp nhất — cần cả client state machine + server sync
- Có thể để Phase 5 mới làm

---

### 💡 Khuyến nghị cho Phase 3

**Bắt đầu với lựa chọn A (anonymous + localStorage)**. Lý do:

1. Giữ momentum — không cần dừng lại setup auth/DB
2. Test với người dùng thật trước khi đầu tư vào backend
3. Nếu sau 1-2 tháng có nhu cầu đa thiết bị, chuyển sang C dễ dàng
4. Lựa chọn B (full auth) chỉ nên làm khi đã chắc chắn có lớp học thật cần dùng

Tài liệu dưới đây sẽ viết theo giả định A. Khi nào có nhu cầu, có thể thay thế bằng B/C không cần đập bỏ UI.

---

## Thiết kế chức năng (theo lựa chọn A)

### 1. Vở điều tra cá nhân (`NotebookEditor`)

**UX**
- Trong mỗi lesson, component `<Evidence>` cũ (placeholder) sẽ được thay bằng **textarea thực tế** với auto-save
- Textarea lưu theo `lessonId + evidenceBlockIndex` vào localStorage
- Hiển thị indicator "Đã lưu" / "Đang lưu..." khi gõ
- Debounce 1.5 giây để không ghi quá nhiều
- Hỗ trợ markdown cơ bản (bold, italic, list) — dùng textarea đơn giản, không cần rich text editor

**Page mới: `/student/notebook`**
- Danh sách tất cả entries theo unit, lesson
- Có thể filter theo unit, theo ngày
- Click vào entry → về bài học gốc để tiếp tục chỉnh sửa

**Component mới**
- `components/student/notebook-editor.tsx` — client component, replaces `<Evidence>` placeholder inside MDX
- `components/student/notebook-entry-card.tsx` — card trong list view
- `lib/student/notebook.ts` — hooks `useNotebook(lessonId)` + persist helpers

**Localstorage shape**
```ts
type NotebookStore = {
  version: 1;
  entries: Record<
    string, // key: "lessonId::blockIndex"
    {
      lessonId: string;
      unitId: string;
      blockIndex: number;
      content: string;
      createdAt: number;
      updatedAt: number;
    }
  >;
};
```

### 2. Progress tracking

**UX**
- Khi học sinh vào một lesson → auto mark `startedAt`
- Khi học sinh scroll xuống tới cuối lesson + bấm "Bài tiếp theo" → auto mark `completedAt` với % = 100
- Unit detail page hiện progress per lesson (ticks / circles)
- Dashboard hiện "Tiếp tục học" dựa trên lesson đang IN_PROGRESS gần nhất
- Progress bar ở UnitCard bật lên (hiện tại hardcoded 0)

**Localstorage shape**
```ts
type ProgressStore = {
  version: 1;
  lessons: Record<
    string, // lessonId
    {
      status: "not-started" | "in-progress" | "completed";
      startedAt?: number;
      completedAt?: number;
      timeSpent?: number; // milliseconds, accumulated across visits
      scrollPercentMax?: number;
    }
  >;
};
```

**Page mới: `/student/progress`**
- Visualization tổng thể: có bao nhiêu unit đã động tới, bao nhiêu lesson đã xong
- Progress ring theo từng unit
- "Chuỗi ngày học" (streak) — đơn giản, đếm ngày liên tiếp có activity
- Không gamify quá — mục đích là phản hồi, không phải ép buộc

### 3. Lesson submission (preview cho Phase 4)

Phase 3 vẫn chỉ lưu local — nhưng mở đường cho Phase 4 (mentor nhận submission):

**Hiện tại**
- Học sinh có thể "đánh dấu hoàn thành" một lesson
- Nội dung vở điều tra được snapshot tại thời điểm đánh dấu

**Phase 4 (sau)**
- Khi có auth + DB, sẽ có nút "Nộp cho mentor"
- Snapshot từ localStorage được upload lên server
- Mentor review và phản hồi

Phase 3 **không** triển khai upload — chỉ đảm bảo data shape có thể serialize được.

---

## Files sẽ tạo hoặc sửa

### Tạo mới
```
lib/student/notebook.ts             # useNotebook hook + store manager
lib/student/progress.ts             # useProgress hook + auto-tracking
lib/student/storage.ts              # localStorage wrapper với versioning
components/student/notebook-editor.tsx
components/student/notebook-entry-card.tsx
components/student/progress-ring.tsx
components/student/notebook-save-indicator.tsx
app/student/notebook/page.tsx
app/student/progress/page.tsx
app/student/settings/page.tsx       # Export/import backup JSON
```

### Sửa
```
components/curriculum/mdx/evidence.tsx        # Thay placeholder bằng NotebookEditor
components/curriculum/unit-card.tsx           # Wire progress thực từ useProgress
app/student/units/[unitId]/lessons/[lessonId]/page.tsx
  # Auto-track startedAt/completedAt khi student visit
app/student/page.tsx                           # "Tiếp tục học" dựa trên progress thực
components/layout/student-nav.tsx              # /notebook và /progress giờ có content thật
```

### Không chạm
- Curriculum loader — không đổi
- MDX content — không cần update per-lesson
- App router convention — không đổi

---

## Các thách thức kỹ thuật đã biết

### 1. localStorage không chạy khi SSR
- Component có `useLocalStorage` phải là client component (`"use client"`)
- Cần hydration-safe pattern: hiển thị skeleton trước, sau đó render data từ localStorage
- Tránh hydration mismatch bằng cách render conditionally sau `useEffect`

### 2. NotebookEditor phải hoạt động **bên trong MDX**
- Hiện `<Evidence>` là server component. Cần chuyển sang client hoặc split:
  - `<Evidence>` vẫn là server wrapper (style khung xanh)
  - Bên trong truyền `<NotebookEditor lessonId={lessonId} blockIndex={N} />` là client
- `lessonId` không có sẵn trong MDX context → cần pass vào qua component props hoặc React Context
- Giải pháp: wrap toàn bộ lesson trong một `LessonContextProvider` ở route page, `NotebookEditor` đọc từ context

### 3. Auto-save không làm mất focus
- Debounce 1.5s để không save quá thường xuyên
- Không re-render parent khi save (dùng ref cho debounce timer)
- Indicator "Đang lưu..." tách biệt khỏi textarea state

### 4. Export/import JSON để user không mất data
- Settings page cho phép download `openstemneo-backup.json`
- Import cho phép merge hoặc overwrite
- Version field để migrate schema nếu cần sau này

### 5. Rõ ràng về privacy
- Banner nhỏ ở notebook page: "Dữ liệu của em được lưu trên chính trình duyệt này — không gửi về máy chủ. Hãy nhớ export backup để khôi phục khi chuyển máy."
- Tương thích GDPR / luật Việt Nam: không collect PII, không cookie tracking ngoài Analytics

---

## Verification plan cho Phase 3

Khi triển khai xong:

```bash
# 1. Unit tests cho storage layer (không có trong Phase 1-2, có thể thêm)
npm test lib/student/

# 2. Manual test flow
npm run dev
# Trong browser:
# - Vào /student/units/6-1/lessons/6-1-L1
# - Gõ vào Evidence textarea, đợi 2s, verify "Đã lưu"
# - Refresh page, verify text vẫn còn
# - Open devtools → Application → LocalStorage → verify shape đúng
# - Đóng browser, mở lại, verify data còn
# - Vào /student/notebook, verify entry xuất hiện
# - Vào /student/progress, verify lesson 6-1-L1 = completed (nếu đã bấm "Bài tiếp theo")
# - Clear localStorage → verify mọi thứ reset về 0

# 3. Accessibility
# - Textarea có label ẩn ("Ghi chú bằng chứng cho bài X")
# - Progress ring có aria-label
# - Navigation giữa notebook ↔ lesson hoạt động bằng keyboard

# 4. Mobile
# - Textarea responsive, không bị cắt bởi keyboard
# - Auto-save indicator không che content
```

---

## Lộ trình cụ thể (ước tính)

| Bước | Mô tả | Thời gian |
|---|---|---|
| G3.1 | Storage layer + hooks (useNotebook, useProgress) | 0.5 ngày |
| G3.2 | NotebookEditor component + wire vào `<Evidence>` | 0.5 ngày |
| G3.3 | Auto-track progress từ lesson viewer | 0.5 ngày |
| G3.4 | `/student/notebook` list page | 0.5 ngày |
| G3.5 | `/student/progress` visualization | 0.5 ngày |
| G3.6 | `/student/settings` export/import | 0.5 ngày |
| G3.7 | Wire UnitCard + dashboard với real progress | 0.25 ngày |
| G3.8 | Mobile polish + a11y + smoke test | 0.5 ngày |
| G3.9 | Deploy + monitor | 0.25 ngày |
| **Total** | | **~4 ngày** |

---

## Điểm chuyển tiếp sang Phase 4 (Mentor)

Khi Phase 3 chạy ổn + có request từ giáo viên muốn xem lớp học, mới triển khai Phase 4 với:
- NextAuth v5 + Credentials + Google
- Prisma + Neon PostgreSQL (từ marketplace Vercel)
- Migration từ localStorage: học sinh sẽ được hỏi "Em có muốn đồng bộ vở điều tra lên tài khoản không?"
- Mentor dashboard + class management + submission review

Phase 4 chi tiết sẽ viết trong `docs/phase-4-plan.md` sau khi Phase 3 đã deploy.

---

## Rủi ro & mitigation

| Rủi ro | Mitigation |
|---|---|
| Học sinh mất data do clear cache | Banner nhắc export JSON định kỳ; version số để migrate schema |
| Textarea trong MDX phá layout mobile | Test trên iPhone + Android trước khi ship; có fallback full-width |
| Progress tracking sai (vd: count lesson đã completed nhưng chưa thực sự đọc) | Chỉ mark completed khi scroll tới cuối HOẶC bấm "Bài tiếp theo" — không auto-timeout |
| Export JSON không chạy trên iOS Safari | Thay bằng copy-to-clipboard fallback |
| Có xung đột giữa nhiều tab | Dùng `storage` event listener để sync across tabs |

---

*Tài liệu này sẽ được refactor khi Phase 3 thật sự bắt đầu. Hiện tại đây là plan để tham khảo.*
