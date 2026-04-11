# Source PDFs — OpenSciEd Teacher Editions

18 Teacher Edition PDFs gốc tiếng Anh (CC BY 4.0) dùng làm nguồn để việt hóa.

**Không commit binary** (~649 MB) — chạy script để tải về local:

```bash
bash docs/source-pdfs/download_all.sh
```

## Cấu trúc

```
docs/source-pdfs/
├── README.md              ← file này
├── download_all.sh        ← tải 18 Teacher Editions từ S3
├── DOWNLOAD_GUIDE.md      ← hướng dẫn chi tiết
└── grade-{6,7,8}/unit-{X-Y}/teacher-edition.pdf
```

## Tracking tiến độ việt hóa

Xem `content/source/INDEX.md` cho bảng tổng quan 18 unit + tiến độ hiện tại.
Mỗi unit có `content/source/grade-N/unit-N-M/SUMMARY.md` riêng.

## License & Attribution

Tất cả Teacher Editions thuộc sở hữu OpenSciEd.org, phát hành theo **Creative Commons Attribution 4.0 International (CC BY 4.0)**.
