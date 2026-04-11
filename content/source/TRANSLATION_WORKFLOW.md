# Quy trình Việt hóa OpenSciEd → OpenStemNeo

> Quy ước làm việc khi dịch Teacher Edition sang MDX tiếng Việt.
> **Quy tắc cốt lõi**: cứ sau **5 bài** đã việt hóa, dừng lại để cập nhật INDEX + SUMMARY.

## Vì sao cần quy tắc 5 bài?

Khi việt hóa hàng trăm bài học, rất dễ:
- Quên tiến độ — đã làm bài nào, còn bài nào?
- INDEX.md nhanh chóng lệch khỏi thực tế
- Frontmatter lesson `available: false` không được flip thành `true` khi xong
- Quên đánh dấu trạng thái trong SUMMARY.md

Quy tắc 5 bài tạo **một checkpoint thường xuyên**, đảm bảo tài liệu luôn đồng bộ với code.

## Vòng lặp việt hóa (Translation Loop)

```
┌──────────────────────────────────────────────────┐
│  CHỌN UNIT TIẾP THEO (theo ưu tiên)              │
└──────────────────────────────────────────────────┘
                       ↓
┌──────────────────────────────────────────────────┐
│  ĐỌC TEACHER EDITION                              │
│  - pdfinfo để biết số trang                       │
│  - grep "Lesson N:" để tìm vị trí mỗi bài         │
│  - pdftotext -f X -l Y để đọc từng bài            │
└──────────────────────────────────────────────────┘
                       ↓
┌──────────────────────────────────────────────────┐
│  DỊCH 5 BÀI (1 batch)                             │
│  - Viết MDX với frontmatter đầy đủ                │
│  - available: true                                │
│  - sourceHandoutUrl: URL S3                       │
│  - Dùng custom components (Investigation,         │
│    Question, Evidence, Callout)                   │
│  - Tone: dùng "em", thân thiện, narrative         │
└──────────────────────────────────────────────────┘
                       ↓
┌──────────────────────────────────────────────────┐
│  🔁 CHECKPOINT (BẮT BUỘC)                          │
│  ┌──────────────────────────────────────────┐    │
│  │ 1. Cập nhật SUMMARY.md của unit          │    │
│  │    - Đánh dấu ✅ cho 5 bài vừa dịch       │    │
│  │    - Cập nhật "Tiến độ việt hóa: X/N"    │    │
│  │                                           │    │
│  │ 2. Cập nhật INDEX.md (top-level)         │    │
│  │    - Cập nhật cột "Việt hóa" của unit    │    │
│  │    - Cập nhật bảng tổng tiến độ          │    │
│  │                                           │    │
│  │ 3. npm run build (smoke test)            │    │
│  │    - Verify lessons SSG generate đủ      │    │
│  │    - Lint sạch                           │    │
│  │                                           │    │
│  │ 4. git commit + push                     │    │
│  │    - Commit msg: "Unit X.Y lessons 1-5   │    │
│  │      translated"                          │    │
│  │    - Mỗi checkpoint = 1 commit            │    │
│  │                                           │    │
│  │ 5. (Tùy chọn) Verify production deploy   │    │
│  │    - curl các route mới sau khi Vercel   │    │
│  │      build xong                           │    │
│  └──────────────────────────────────────────┘    │
└──────────────────────────────────────────────────┘
                       ↓
                 Còn bài chưa dịch?
                  ┌────┴────┐
                YES         NO
                 ↓           ↓
            Quay lại     Sang unit mới
            "DỊCH 5 BÀI"  hoặc nghỉ
```

## Trường hợp đặc biệt

### Unit có ít hơn 5 bài còn lại
Nếu unit chỉ còn 3-4 bài, **vẫn checkpoint sau khi xong** (đừng đợi đủ 5 từ unit khác).

### Unit nhỏ hơn 5 bài tổng
Một unit chỉ 4 bài (chưa thấy ở MVP) → checkpoint khi xong toàn bộ unit.

### Bài quá dài hoặc phức tạp
Nếu một bài cần 30+ phút context window để dịch (vd: lesson PDF 20+ trang), có thể **checkpoint sau 3 bài** thay vì 5. Mục đích của quy tắc là giữ checkpoint thường xuyên — số 5 là hướng dẫn, không phải bất biến.

### Phát hiện sai sót trong unit đã "xong"
Nếu sau này thấy lỗi trong bài đã dịch:
- Sửa MDX
- Cập nhật ngày trong SUMMARY.md (thêm dòng "Sửa lần cuối: YYYY-MM-DD")
- Commit riêng với prefix `fix:` hoặc `polish:`

## Mẫu commit message

```
Unit X.Y lessons N-M translated (checkpoint)

- lesson-NN: Tóm tắt nội dung bài (1 dòng)
- lesson-NN+1: ...
- ...

Tiến độ Unit X.Y: X/N lessons (Y%)
Tổng tiến độ MVP: A/268 lessons (Z%)
```

## Mẫu cập nhật INDEX.md

Tìm hàng tương ứng trong bảng và sửa cột "Việt hóa":

```diff
- | **6.2** | Nhiệt năng | 347 | 8.3 MB | 18 | ⏳ 3/18 | [G6_UTH](...) |
+ | **6.2** | Nhiệt năng | 347 | 8.3 MB | 18 | ⏳ 8/18 | [G6_UTH](...) |
```

Và cập nhật phần "Tiến độ việt hóa" cuối INDEX.md với % mới.

## Mẫu cập nhật SUMMARY.md

Trong bảng "Danh sách bài học", sửa cột trạng thái:

```diff
- | 4 | Cái nắp ảnh hưởng đến chất lỏng trong ly thế nào? | ... | 79 | ⏳ |
+ | 4 | Cái nắp ảnh hưởng đến chất lỏng trong ly thế nào? | ... | 79 | ✅ |
```

Và cập nhật dòng "Tiến độ việt hóa: X/N (Y%)".

## Trạng thái icons

| Icon | Ý nghĩa |
|---|---|
| ✅ | Đã việt hóa, available: true, đã deploy |
| ⏳ | Chưa việt hóa nhưng có placeholder MDX (available: false) |
| ⬜ | Chưa có gì cả — cần tạo file MDX |
| 🔧 | Đã việt hóa nhưng cần review/sửa |
| ❌ | Có lỗi — cần xử lý gấp |

## Ưu tiên thứ tự việt hóa

Theo plan hiện tại:

1. ✅ **Unit 6.1** — Hoàn thành (validation pass)
2. ⏳ **Unit 6.2** — Đang làm (3/18)
3. ⬜ **Unit 6.3 → 6.6** — Hoàn tất Lớp 6 trước
4. ⬜ **Unit 7.x → 8.x** — Lớp 7 và 8 sau, theo thứ tự số

Nếu user muốn thay đổi ưu tiên (vd: dịch lesson 1 + lesson cuối của tất cả unit để demo rộng), update file này trước.

## Tài liệu liên quan

- `content/source/INDEX.md` — bảng tổng 18 PDFs + tiến độ
- `content/source/grade-X/unit-X-Y/SUMMARY.md` — chi tiết từng unit
- `content/source/DOWNLOAD_GUIDE.md` — hướng dẫn tải PDF từ S3
- `content/source/download_all.sh` — script bash tải 18 PDF
- `OPENSCINEO_SPEC.md` — đặc tả dự án ban đầu
- `docs/phase-3-plan.md` — kế hoạch Phase 3 (notebook + progress)
