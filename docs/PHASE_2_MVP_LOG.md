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

*(Chưa có — thêm khi có issue.)*
