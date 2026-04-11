# Hướng dẫn Download Tài liệu OpenSciEd
## Cập nhật: 2026-04-11 — Đã xác nhận toàn bộ 18 Teacher Edition URLs

---

## ✅ Tất cả 18 Teacher Edition — Link S3 trực tiếp (public, không cần login)

Base URL: `https://openscied-uploads-production.s3.amazonaws.com/`

### GRADE 6

| Unit | Tiêu đề | Direct S3 URL |
|------|---------|---------------|
| 6.1 | Ánh sáng & Vật chất | [6.1 Teacher Edition.pdf](https://openscied-uploads-production.s3.amazonaws.com/G6_UTH/lowres/6.1%20Teacher%20Edition.pdf) |
| 6.2 | Nhiệt năng | [6.2 Teacher Edition.pdf](https://openscied-uploads-production.s3.amazonaws.com/G6_UTH/lowres/6.2%20Teacher%20Edition.pdf) |
| 6.3 | Thời tiết, Khí hậu & Nước | [6.3 Teacher Edition.pdf](https://openscied-uploads-production.s3.amazonaws.com/G6_UWC/lowres/6.3%20Teacher%20Edition.pdf) |
| 6.4 | Kiến tạo mảng & Đá | [6.4 Teacher Edition.pdf](https://openscied-uploads-production.s3.amazonaws.com/G6_UPT/lowres/6.4%20Teacher%20Edition.pdf) |
| 6.5 | Thiên tai | [6.5 Teacher Edition.pdf](https://openscied-uploads-production.s3.amazonaws.com/G6_UNH/lowres/6.5%20Teacher%20Edition.pdf) |
| 6.6 | Tế bào & Hệ thống | [6.6 Teacher Edition.pdf](https://openscied-uploads-production.s3.amazonaws.com/G6_UCL/lowres/6.6%20Teacher%20Edition.pdf) |

### GRADE 7

| Unit | Tiêu đề | Direct S3 URL |
|------|---------|---------------|
| 7.1 | Phản ứng hóa học & Vật chất | [7.1 Teacher Edition.pdf](https://openscied-uploads-production.s3.amazonaws.com/G7_UCA/hires/7.1%20Chemical%20Reactions%20%26%20Matter%20Teacher%20Edition.pdf) |
| 7.2 | Phản ứng hóa học & Năng lượng | [7.2 Teacher Edition.pdf](https://openscied-uploads-production.s3.amazonaws.com/G7_UCB/hires/7.2%20Chemical%20Reactions%20%26%20Energy%20Teacher%20Edition.pdf) |
| 7.3 | Phản ứng trao đổi chất | [7.3 Teacher Edition.pdf](https://openscied-uploads-production.s3.amazonaws.com/G7_UMR/hires/7.3%20Metabolic%20Reactions%20Teacher%20Edition.pdf) |
| 7.4 | Chu trình vật chất & Quang hợp | [7.4 Teacher Edition.pdf](https://openscied-uploads-production.s3.amazonaws.com/G7_UMC/hires/7.4%20Matter%20Cycling%20and%20Photosynthesis%20Teacher%20Edition.pdf) |
| 7.5 | Động lực học hệ sinh thái | [7.5 Teacher Edition.pdf](https://openscied-uploads-production.s3.amazonaws.com/G7_UEC/hires/7.5%20Teacher%20Edition.pdf) |
| 7.6 | Tài nguyên Trái đất & Tác động | [7.6 Teacher Edition.pdf](https://openscied-uploads-production.s3.amazonaws.com/G7_UER/hires/7.6%20Earth%27s%20Resources%20%26%20Human%20Impact%20Teacher%20Edition.pdf) |

### GRADE 8

| Unit | Tiêu đề | Direct S3 URL |
|------|---------|---------------|
| 8.1 | Lực tiếp xúc | [8.1 Teacher Edition.pdf](https://openscied-uploads-production.s3.amazonaws.com/G8_UCF/lowres/8.1%20Contact%20Forces%20Teacher%20Edition.pdf) |
| 8.2 | Sóng âm | [8.2 Teacher Edition.pdf](https://openscied-uploads-production.s3.amazonaws.com/G8_USO/lowres/8.2%20Sound%20Waves%20Teacher%20Edition.pdf) |
| 8.3 | Lực tác dụng từ xa | [8.3 Teacher Edition.pdf](https://openscied-uploads-production.s3.amazonaws.com/G8_UDF/hires/8.3%20Forces%20at%20a%20Distance%20Teacher%20Edition.pdf) |
| 8.4 | Trái đất trong vũ trụ | [8.4 Teacher Edition.pdf](https://openscied-uploads-production.s3.amazonaws.com/G8_USS/hires/8.4%20Earth%20in%20Space%20Teacher%20Edition.pdf) |
| 8.5 | Di truyền học | [8.5 Teacher Edition.pdf](https://openscied-uploads-production.s3.amazonaws.com/G8_UGE/hires/8.5%20Genetics%20Teacher%20Edition.pdf) |
| 8.6 | Chọn lọc tự nhiên & Tổ tiên chung | [8.6 Teacher Edition.pdf](https://openscied-uploads-production.s3.amazonaws.com/G8_UNS/lowres/8.6%20Natural%20Selection%20%26%20Common%20Ancestry%20Teacher%20Edition.pdf) |

---

## 🚀 Script tự động — Chạy trong Terminal

Lưu script sau vào `download_all.sh` trong folder `OpenSciedNEO`, rồi chạy:

```bash
cd /path/to/OpenSciedNEO
bash content/source/download_all.sh
```

---

## 📁 Cấu trúc thư mục sau khi download

```
content/source/
├── grade-6/
│   ├── unit-6-1/teacher-edition.pdf
│   ├── unit-6-2/teacher-edition.pdf
│   ├── unit-6-3/teacher-edition.pdf
│   ├── unit-6-4/teacher-edition.pdf
│   ├── unit-6-5/teacher-edition.pdf
│   └── unit-6-6/teacher-edition.pdf
├── grade-7/
│   ├── unit-7-1/teacher-edition.pdf
│   ├── unit-7-2/teacher-edition.pdf
│   ├── unit-7-3/teacher-edition.pdf
│   ├── unit-7-4/teacher-edition.pdf
│   ├── unit-7-5/teacher-edition.pdf
│   └── unit-7-6/teacher-edition.pdf
└── grade-8/
    ├── unit-8-1/teacher-edition.pdf
    ├── unit-8-2/teacher-edition.pdf
    ├── unit-8-3/teacher-edition.pdf
    ├── unit-8-4/teacher-edition.pdf
    ├── unit-8-5/teacher-edition.pdf
    └── unit-8-6/teacher-edition.pdf
```

---

## 🗃️ S3 Folder Code Reference

| Grade | Unit | S3 Folder | Resolution |
|-------|------|-----------|------------|
| 6 | 6.1 & 6.2 | G6_UTH | lowres |
| 6 | 6.3 | G6_UWC | lowres |
| 6 | 6.4 | G6_UPT | lowres |
| 6 | 6.5 | G6_UNH | lowres |
| 6 | 6.6 | G6_UCL | lowres |
| 7 | 7.1 | G7_UCA | hires |
| 7 | 7.2 | G7_UCB | hires |
| 7 | 7.3 | G7_UMR | hires |
| 7 | 7.4 | G7_UMC | hires |
| 7 | 7.5 | G7_UEC | hires |
| 7 | 7.6 | G7_UER | hires |
| 8 | 8.1 | G8_UCF | lowres |
| 8 | 8.2 | G8_USO | lowres |
| 8 | 8.3 | G8_UDF | hires |
| 8 | 8.4 | G8_USS | hires |
| 8 | 8.5 | G8_UGE | hires |
| 8 | 8.6 | G8_UNS | lowres |

---

## 📄 Trang download thủ công (openscied.org — cần đăng nhập)

Dùng các trang này để download Student Editions, Slide Decks, và các tài liệu khác:

| Unit | Trang Download |
|------|---------------|
| 6.1 Light & Matter | https://openscied.org/curriculum/middle-school/6-1-light-amp-matter-unit-download/ |
| 6.2 Thermal Energy | https://openscied.org/curriculum/middle-school/6-2-thermal-energy-unit-download/ |
| 6.3 Weather & Climate | https://openscied.org/curriculum/middle-school/6-3-weather-climate-water-cycling-unit-download/ |
| 6.4 Plate Tectonics | https://openscied.org/curriculum/middle-school/6-4-plate-tectonics-rock-cycling-unit-download/ |
| 6.5 Natural Hazards | https://openscied.org/curriculum/middle-school/6-5-natural-hazards-unit-download/ |
| 6.6 Cells & Systems | https://openscied.org/curriculum/middle-school/6-6-cells-systems-unit-download/ |
| 7.1 Chemical Reactions & Matter | https://openscied.org/curriculum/middle-school/7-1-chemical-reactions-matter-unit-download/ |
| 7.2 Chemical Reactions & Energy | https://openscied.org/curriculum/middle-school/7-2-chemical-reactions-energy-unit-download/ |
| 7.3 Metabolic Reactions | https://openscied.org/curriculum/middle-school/7-3-metabolic-reactions-unit-download/ |
| 7.4 Matter Cycling & Photosynthesis | https://openscied.org/curriculum/middle-school/7-4-matter-cycling-photosynthesis-unit-download/ |
| 7.5 Ecosystem Dynamics | https://openscied.org/curriculum/middle-school/7-5-ecosystem-dynamics-unit-download/ |
| 7.6 Earth's Resources | https://openscied.org/curriculum/middle-school/7-6-earths-resources-human-impact-unit-download/ |
| 8.1 Contact Forces | https://openscied.org/curriculum/middle-school/8-1-contact-forces-unit-download/ |
| 8.2 Sound Waves | https://openscied.org/curriculum/middle-school/8-2-sound-waves-unit-download/ |
| 8.3 Forces at a Distance | https://openscied.org/curriculum/middle-school/8-3-forces-at-a-distance-unit-download/ |
| 8.4 Earth in Space | https://openscied.org/curriculum/middle-school/8-4-earth-in-space-unit-download/ |
| 8.5 Genetics | https://openscied.org/curriculum/middle-school/8-5-genetics-unit-download/ |
| 8.6 Natural Selection | https://openscied.org/curriculum/middle-school/8-6-natural-selection-common-ancestry-unit-download/ |

---

## Bước tiếp theo sau khi download

Sau khi download xong (hoặc một phần), nói:
> "Đã download unit 6.1 và 6.2 vào content/source"

Claude sẽ đọc PDF, Việt hóa và format thành MDX cho từng bài học.
