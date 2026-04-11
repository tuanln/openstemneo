# OpenSciEd Teacher Editions — Tài liệu nguồn

> Đây là **tài liệu nguồn** dùng làm cơ sở để việt hóa thành MDX trong `content/curriculum/`.
> Tất cả PDF được tải từ S3 công khai của OpenSciEd, license **CC BY 4.0**.
> **PDF đã được dời sang `docs/source-pdfs/`** (vẫn gitignored — binary ~649 MB). Chạy `bash docs/source-pdfs/download_all.sh` để tải về local.
> Thư mục `content/source/` chỉ giữ INDEX + TRANSLATION_WORKFLOW + SUMMARY.md (các file text theo dõi tiến độ).

> 📋 **Quy trình việt hóa**: xem [`TRANSLATION_WORKFLOW.md`](./TRANSLATION_WORKFLOW.md) — cứ sau **5 bài** đã dịch, BẮT BUỘC checkpoint: cập nhật INDEX + SUMMARY + commit.

## Cấu trúc thư mục

```
content/source/                    ← text metadata (committed)
├── INDEX.md                       ← file này
├── TRANSLATION_WORKFLOW.md        ← quy trình việt hóa (5 bài/checkpoint)
└── grade-{6,7,8}/
    └── unit-{X-Y}/
        └── SUMMARY.md             ← tóm tắt unit + danh sách bài + tiến độ việt hóa

docs/source-pdfs/                  ← binary PDFs (gitignored ~649 MB)
├── download_all.sh                ← script tự động tải 18 PDF
├── DOWNLOAD_GUIDE.md              ← hướng dẫn download chi tiết
└── grade-{6,7,8}/
    └── unit-{X-Y}/
        ├── teacher-edition.pdf    ← bản gốc tiếng Anh
        └── lesson-XX.pdf          ← (tùy chọn) các handout PDF lẻ
```

## 18 Teacher Editions — Bảng tổng quan

### THCS Lớp 6 (6 đơn vị · 1.328 trang · 81 MB)

| Đơn vị | Tên Việt | Trang | Kích thước | Bài học | Việt hóa | Nguồn |
|---|---|---|---|---|---|---|
| **6.1** | Ánh sáng & Vật chất | 250 | 9.8 MB | 8 | ✅ 8/8 | [G6_ULT](https://openscied-uploads-production.s3.amazonaws.com/G6_ULT/lowres/6.1%20Teacher%20Edition.pdf) |
| **6.2** | Nhiệt năng | 347 | 8.3 MB | 18 | ✅ 18/18 | [G6_UTH](https://openscied-uploads-production.s3.amazonaws.com/G6_UTH/lowres/6.2%20Teacher%20Edition.pdf) |
| **6.3** | Thời tiết, Khí hậu & Chu trình Nước | 429 | 29.2 MB | 22 | ✅ 22/22 | [G6_UWC](https://openscied-uploads-production.s3.amazonaws.com/G6_UWC/lowres/6.3%20Teacher%20Edition.pdf) |
| **6.4** | Kiến tạo mảng & Vòng tuần hoàn đá | 354 | 12.8 MB | 14 | ✅ 14/14 | [G6_UPT](https://openscied-uploads-production.s3.amazonaws.com/G6_UPT/lowres/6.4%20Teacher%20Edition.pdf) |
| **6.5** | Thiên tai | 247 | 10.1 MB | 10 | ✅ 10/10 | [G6_UNH](https://openscied-uploads-production.s3.amazonaws.com/G6_UNH/lowres/6.5%20Teacher%20Edition.pdf) |
| **6.6** | Tế bào & Hệ cơ thể | 368 | 11.1 MB | 14 | ✅ 14/14 | [G6_UCL](https://openscied-uploads-production.s3.amazonaws.com/G6_UCL/lowres/6.6%20Teacher%20Edition.pdf) |

### THCS Lớp 7 (6 đơn vị · 2.204 trang · 384 MB)

| Đơn vị | Tên Việt | Trang | Kích thước | Bài học | Việt hóa | Nguồn |
|---|---|---|---|---|---|---|
| **7.1** | Phản ứng hóa học & Vật chất | 334 | 54.1 MB | 14 | ⬜ 0/14 | [G7_UCA](https://openscied-uploads-production.s3.amazonaws.com/G7_UCA/hires/7.1%20Chemical%20Reactions%20%26%20Matter%20Teacher%20Edition.pdf) |
| **7.2** | Phản ứng hóa học & Năng lượng | 337 | 91.7 MB | 10 | ⬜ 0/10 | [G7_UCB](https://openscied-uploads-production.s3.amazonaws.com/G7_UCB/hires/7.2%20Chemical%20Reactions%20%26%20Energy%20Teacher%20Edition.pdf) |
| **7.3** | Phản ứng chuyển hóa | 351 | 36.1 MB | 15 | ⬜ 0/15 | [G7_UMR](https://openscied-uploads-production.s3.amazonaws.com/G7_UMR/hires/7.3%20Metabolic%20Reactions%20Teacher%20Edition.pdf) |
| **7.4** | Chu trình vật chất & Quang hợp | 327 | 54.0 MB | 15 | ⬜ 0/15 | [G7_UMC](https://openscied-uploads-production.s3.amazonaws.com/G7_UMC/hires/7.4%20Matter%20Cycling%20and%20Photosynthesis%20Teacher%20Edition.pdf) |
| **7.5** | Động lực Hệ sinh thái | 445 | 63.4 MB | 19 | ⬜ 0/19 | [G7_UEC](https://openscied-uploads-production.s3.amazonaws.com/G7_UEC/hires/7.5%20Teacher%20Edition.pdf) |
| **7.6** | Tài nguyên Trái Đất & Tác động Con người | 410 | 84.9 MB | 18 | ⬜ 0/18 | [G7_UER](https://openscied-uploads-production.s3.amazonaws.com/G7_UER/hires/7.6%20Earth%27s%20Resources%20%26%20Human%20Impact%20Teacher%20Edition.pdf) |

### THCS Lớp 8 (6 đơn vị · 2.122 trang · 184 MB)

| Đơn vị | Tên Việt | Trang | Kích thước | Bài học | Việt hóa | Nguồn |
|---|---|---|---|---|---|---|
| **8.1** | Lực tiếp xúc & Va chạm | 374 | 8.0 MB | 16 | ⬜ 0/16 | [G8_UCF](https://openscied-uploads-production.s3.amazonaws.com/G8_UCF/lowres/8.1%20Contact%20Forces%20Teacher%20Edition.pdf) |
| **8.2** | Sóng âm | 289 | 6.0 MB | 14 | ⬜ 0/14 | [G8_USO](https://openscied-uploads-production.s3.amazonaws.com/G8_USO/lowres/8.2%20Sound%20Waves%20Teacher%20Edition.pdf) |
| **8.3** | Lực từ xa | 265 | 40.5 MB | 12 | ⬜ 0/12 | [G8_UDF](https://openscied-uploads-production.s3.amazonaws.com/G8_UDF/hires/8.3%20Forces%20at%20a%20Distance%20Teacher%20Edition.pdf) |
| **8.4** | Trái Đất trong Không gian | 376 | 61.0 MB | 17 | ⬜ 0/17 | [G8_USS](https://openscied-uploads-production.s3.amazonaws.com/G8_USS/hires/8.4%20Earth%20in%20Space%20Teacher%20Edition.pdf) |
| **8.5** | Di truyền học | 405 | 56.1 MB | 17 | ⬜ 0/17 | [G8_UGE](https://openscied-uploads-production.s3.amazonaws.com/G8_UGE/hires/8.5%20Genetics%20Teacher%20Edition.pdf) |
| **8.6** | Chọn lọc tự nhiên & Nguồn gốc chung | 413 | 11.9 MB | 15 | ⬜ 0/15 | [G8_UNS](https://openscied-uploads-production.s3.amazonaws.com/G8_UNS/lowres/8.6%20Natural%20Selection%20%26%20Common%20Ancestry%20Teacher%20Edition.pdf) |

## Tổng quan

| | Đơn vị | Bài học | Trang | Dung lượng |
|---|---|---|---|---|
| **Lớp 6** | 6 | 86 | 1.995 | 81 MB |
| **Lớp 7** | 6 | 91 | 2.204 | 384 MB |
| **Lớp 8** | 6 | 91 | 2.122 | 184 MB |
| **Tổng** | **18** | **268** | **6.321** | **649 MB** |

## Tiến độ việt hóa

```
Đã xong:    Unit 6.1 (8/8 lessons)        ~3.0% tổng nội dung
            Unit 6.2 (18/18 lessons)      ~6.7% tổng nội dung
            Unit 6.3 (22/22 lessons)      ~8.2% tổng nội dung
            Unit 6.4 (14/14 lessons)      ~5.2% tổng nội dung
            Unit 6.5 (10/10 lessons)      ~3.7% tổng nội dung
            Unit 6.6 (14/14 lessons)      ~5.2% tổng nội dung  ← FINAL GRADE 6 ✅
Còn lại:    12 unit (6 Lớp 7, 6 Lớp 8)

Tổng: 86/268 lessons (32.1%)
Đơn vị hoàn thành: 6/18 (33%)
🎓 LỚP 6: 86/86 (100%) — HOÀN TẤT
```

## Quy ước file

### Frontmatter MDX cho mỗi lesson việt hóa
```yaml
---
id: "6-1-L1"           # mã bài: gradeUnit-LXX
order: 1               # số thứ tự (1..N)
title: "..."           # tiêu đề tiếng Việt
type: "phenomenon"     # phenomenon|investigation|analysis|making-meaning|application|assessment
duration: "50 phút"
standards: ["MS-PS4-2"]
available: true        # false = placeholder chờ Teacher Edition
sourceHandoutUrl: "..."
summary: "..."
---
```

### Custom MDX components có sẵn
- `<Investigation title="...">...</Investigation>` — khung điều tra (xanh dương)
- `<Question>...</Question>` — câu hỏi quan trọng (vàng)
- `<Evidence>...</Evidence>` — ô ghi bằng chứng (xanh lá)
- `<Callout type="think|note|tip|warning" title="...">...</Callout>` — hộp gợi ý

## License & Attribution

Tất cả Teacher Editions thuộc sở hữu OpenSciEd.org, phát hành theo **Creative Commons Attribution 4.0 International (CC BY 4.0)**. Khi việt hóa hoặc trích dẫn:

- **Phải** ghi nguồn: *"Việt hóa từ OpenSciEd Unit X.Y, openscied.org"*
- **Phải** giữ link nguồn (sourceHandoutUrl trong frontmatter)
- **Không được** dùng tên hoặc logo OpenSciEd cho mục đích thương mại
- **Có thể** chỉnh sửa, dịch, phối hợp với chương trình GDPT 2018 Việt Nam

Xem chi tiết tại `content/LICENSE`.
