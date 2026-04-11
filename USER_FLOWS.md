# OpenSciNEO — User Flows

## 🎓 LUỒNG HỌC SINH

```
[Đăng ký / Đăng nhập]
         │
         ▼
[Dashboard Học sinh]
  ├── Xem Unit đang học (tiếp tục)
  ├── Danh sách tất cả Units
  └── Tiến độ cá nhân
         │
         ▼
[Trang Unit] (e.g. 6.1 Ánh sáng & Vật chất)
  ├── 🎬 Video Hiện tượng neo
  ├── Câu hỏi kích thích tò mò
  ├── Danh sách bài học
  └── Tóm tắt tiến độ Unit
         │
         ▼
[Trang Bài học]
  ├── Đọc nội dung (MDX → tiếng Việt)
  ├── Xem video hướng dẫn
  ├── Làm hoạt động / điều tra
  │     └── Ghi chú vào "Vở điều tra" (Notebook)
  ├── Trả lời câu hỏi cuối bài
  └── Nộp bài cho Mentor
         │
         ▼
[Nhận phản hồi từ Mentor]
  └── Xem nhận xét → Tiếp tục bài tiếp theo
```

---

## 👨‍🏫 LUỒNG MENTOR

```
[Đăng ký / Đăng nhập]
         │
         ▼
[Dashboard Mentor]
  ├── Overview: tổng số lớp, học sinh, % hoàn thành
  ├── Danh sách lớp học
  └── Bài nộp đang chờ phản hồi
         │
    ┌────┴────┐
    ▼         ▼
[Quản lý   [Xem bài
 lớp học]   nộp]
    │              │
    ├── Tạo lớp    ├── Xem bài học sinh nộp
    ├── Mời HS     ├── Viết nhận xét
    ├── Giao Unit  └── Gửi phản hồi
    └── Xem từng HS
              │
              ▼
      [Trang học sinh]
       (Xem góc nhìn HS)
         ├── Tiến độ từng bài
         ├── Ghi chú của HS
         └── Lịch sử nộp bài
```

---

## 🔄 LUỒNG TƯƠNG TÁC MENTOR ↔ HỌC SINH

```
Học sinh nộp bài
       │
       ▼ (thông báo)
Mentor nhận được thông báo
       │
       ▼
Mentor xem & viết phản hồi
       │
       ▼ (thông báo)
Học sinh nhận phản hồi
       │
       ▼
Học sinh tiếp tục bài học tiếp theo
```

---

## 📱 NGUYÊN TẮC UI

| Học sinh | Mentor |
|---|---|
| Mobile-first | Desktop-first |
| Tối giản, ít nút | Nhiều thông tin, bảng biểu |
| Màu sắc vui tươi | Chuyên nghiệp, trung tính |
| Tiến độ gamified | Dashboard analytics |
| Ít text, nhiều visual | Chi tiết, có thể lọc/sắp xếp |
