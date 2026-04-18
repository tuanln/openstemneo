# Phase 2 MVP — Issue Log & Lessons Learned

> **Mục đích**: Ghi lại mọi vấn đề, surprise, decision thay đổi trong quá trình thực thi Phase 2 để:
> (a) anh Tuấn review sau và rút kinh nghiệm cho Phase 3+,
> (b) subagent tương lai đọc để tránh lỗi tương tự,
> (c) debug sự cố nhanh (có context gốc).
>
> **Quy tắc log**: Mỗi task nếu gặp issue thực chất → ghi 1 entry. Task trơn tru không cần log.
>
> **Format entry**: task number → status → issue → fix → lesson.

---

## Template entry

```
### Task N — [Tên task]
**Status**: DONE | DONE_WITH_CONCERNS | BLOCKED-THEN-FIXED
**Date**: YYYY-MM-DD
**Model**: (sonnet/haiku/opus)

**Issue**:
(Mô tả vấn đề cụ thể)

**Root cause**:
(Lý do gốc — không chỉ triệu chứng)

**Fix**:
(Em đã làm gì để giải quyết; commit SHA nếu có)

**Lesson learned**:
(Rút kinh nghiệm — cái này áp dụng cho Phase 3+ hoặc subagent khác thế nào)
```

---

## Entries

### Task P2-B12/13 — Next.js 16 rename middleware → proxy
**Status**: DONE (spec adjustment)
**Date**: 2026-04-18

**Issue**:
Plan spec §B13 bảo tạo `middleware.ts` ở root. Nhưng Next.js 16 đã **rename** `middleware.ts` → `proxy.ts` (Node.js runtime mặc định). Post-hook validation báo khi em write `lib/supabase/middleware.ts` (utility).

**Fix**:
- Giữ `lib/supabase/middleware.ts` nguyên (là utility module, tên file không ràng buộc Next.js convention).
- Root file sẽ là `proxy.ts` (không `middleware.ts`) khi tới Task B13.

**Lesson learned**:
- Mỗi major version Next.js có breaking changes về file conventions — **luôn check docs hiện tại** khi plan viết trước 6+ tháng.
- Trigger post-hook pattern validator hữu ích — bắt sai sớm trong quá trình viết.

---

### Task P2-A11 — Seed activities từ MDX
**Status**: DONE (fixed lần 2)
**Date**: 2026-04-18
**Model**: controller inline (không subagent)

**Issue**:
Lần chạy đầu fail 488 lessons với 2 lỗi:
1. `invalid input syntax for type integer: "50 phút"` — 488 errors
2. `No course for grade-K, skipping` — mất toàn bộ lớp K (30 lessons)

**Root cause**:
1. Frontmatter MDX của nhiều lesson dùng `estimatedMinutes: "50 phút"` (string có chữ "phút") thay vì số 50. Direct cast → Postgres fail vì column là INT.
2. Folder tên `grade-K` (chữ K hoa) nhưng seed SQL tạo course với slug `grade-k` (chữ k thường). `eq('slug', 'grade-K')` → không match.

**Fix**:
1. Thêm hàm `parseMinutes(val)` regex lấy chuỗi số đầu tiên, fallback 45.
2. Lowercase grade slug trước khi query: `.eq('slug', gradeSlug.toLowerCase())`.
Commit SHA: (sẽ điền khi commit).
Kết quả lần 2: 518 activities, 0 errors.

**Lesson learned**:
- **Type coercion explicit hơn implicit**: khi migrate từ frontmatter (loose schema) sang DB (strict schema), viết parser riêng cho mỗi field có thể là string/number. Đừng tin `fm.field ?? default` — có thể fail nếu type sai.
- **Case normalization sớm**: quy tắc chung trong migration — lowercase slugs khi insert/query. Filesystem có thể case-sensitive (Linux) hoặc không (macOS) nên folder tên hoa/thường không đáng tin.
- **Để plan quy định verification query sau migration**: phát hiện sớm hơn "0 rows migrated" thay vì để end-of-script.
