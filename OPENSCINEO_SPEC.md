# OPENSCINEO — Tài liệu Đặc tả Dự án (Project Spec)
> Đây là tài liệu duy nhất dành cho Claude CLI bắt đầu phát triển.  
> Đọc toàn bộ trước khi viết bất kỳ dòng code nào.

---

## MỤC LỤC

1. [Tổng quan Dự án](#1-tổng-quan-dự-án)
2. [Toàn bộ Dữ liệu Curriculum (Tiếng Việt)](#2-toàn-bộ-dữ-liệu-curriculum)
3. [Kiến trúc Kỹ thuật](#3-kiến-trúc-kỹ-thuật)
4. [Database Schema](#4-database-schema)
5. [TypeScript Types](#5-typescript-types)
6. [API Endpoints](#6-api-endpoints)
7. [Pages & Routing](#7-pages--routing)
8. [Component Architecture](#8-component-architecture)
9. [Auth System](#9-auth-system)
10. [Content System](#10-content-system)
11. [Kế hoạch Phát triển theo Giai đoạn](#11-kế-hoạch-phát-triển-theo-giai-đoạn)
12. [Deployment & Environment](#12-deployment--environment)

---

## 1. TỔNG QUAN DỰ ÁN

| Thuộc tính | Giá trị |
|---|---|
| **Tên** | OpenSciNEO |
| **Nguồn gốc** | Việt hóa toàn bộ từ openscied.org (Open Educational Resource) |
| **Mục tiêu** | Nền tảng học khoa học K12 bằng tiếng Việt theo mô hình phenomenon-based |
| **Hai vai chính** | 🎓 Học sinh (Student) · 👨‍🏫 Mentor (Giáo viên/Hướng dẫn) |
| **Tech Stack** | Next.js 15 (App Router) · TypeScript · Tailwind CSS · PostgreSQL · Prisma · NextAuth.js · Vercel |
| **Phạm vi MVP** | THCS Lớp 6–8 (18 Units), full 2 vai |
| **Phạm vi V2** | THPT Biology + Chemistry + Physics (16 Units) |

### Triết lý thiết kế

- **Phenomenon-based**: Mỗi Unit bắt đầu bằng một hiện tượng thực tế gây tò mò → học sinh tự đặt câu hỏi → điều tra → kết luận
- **Tiếng Việt là trung tâm**: Toàn bộ UI + nội dung bằng tiếng Việt, không phải dịch máy
- **Mobile-first cho học sinh**: Học sinh dùng điện thoại là chính
- **Dashboard-first cho mentor**: Mentor cần dữ liệu, không cần animation
- **Open Education**: Nội dung gốc từ OpenSciEd là OER — tự do sử dụng và chỉnh sửa

---

## 2. TOÀN BỘ DỮ LIỆU CURRICULUM

### Cấu trúc dữ liệu mỗi Unit

```
Unit {
  id: string           // "6-1", "7-3", "B-2", "P-4"...
  gradeLevel: number   // 6, 7, 8, 9(Bio), 10(Chem), 11(Phys)
  subjectArea: string  // "Khoa học tự nhiên" | "Sinh học" | "Hóa học" | "Vật lý"
  title: string        // Tên tiếng Việt
  titleEn: string      // Tên gốc tiếng Anh
  drivingQuestion: string    // Câu hỏi chủ đạo tiếng Việt
  phenomenon: string         // Mô tả hiện tượng neo tiếng Việt
  standards: string[]        // NGSS standards
  totalLessons: number
  estimatedWeeks: number
  icon: string               // emoji
  color: string              // tailwind color class
}
```

---

### 📚 THCS — LỚP 6 (6 Units)

```json
[
  {
    "id": "6-1",
    "gradeLevel": 6,
    "subjectArea": "Khoa học tự nhiên",
    "title": "Ánh sáng & Vật chất",
    "titleEn": "Light and Matter",
    "drivingQuestion": "Gương một chiều hoạt động như thế nào?",
    "phenomenon": "Học sinh quan sát một gương một chiều — từ một phía trông như gương phản chiếu, từ phía kia trông như cửa sổ trong suốt. Điều gì giải thích được hiện tượng này? Học sinh xây dựng mô hình hộp có gương một chiều, thay đổi lượng ánh sáng ở hai bên để tìm câu trả lời.",
    "standards": ["MS-PS4-2", "MS-LS1-8"],
    "totalLessons": 12,
    "estimatedWeeks": 4,
    "icon": "💡",
    "color": "yellow"
  },
  {
    "id": "6-2",
    "gradeLevel": 6,
    "subjectArea": "Khoa học tự nhiên",
    "title": "Nhiệt năng",
    "titleEn": "Thermal Energy",
    "drivingQuestion": "Tại sao ly nhựa đặc biệt có thể giữ đồ uống lạnh lâu hơn?",
    "phenomenon": "Học sinh so sánh hai chiếc ly nhựa trông giống nhau từ bên ngoài — một ly thông thường, một ly có thành đôi. Ly thành đôi giữ đồ uống lạnh lâu hơn đáng kể. Học sinh điều tra nắp ly, sự bay hơi, rồi khám phá ra rằng trong hệ kín, nhiệt vẫn truyền vào thông qua hai con đường: hấp thụ ánh sáng và dẫn nhiệt từ không khí xung quanh.",
    "standards": ["MS-PS3-3", "MS-PS3-4", "MS-PS3-5"],
    "totalLessons": 10,
    "estimatedWeeks": 3,
    "icon": "🌡️",
    "color": "orange"
  },
  {
    "id": "6-3",
    "gradeLevel": 6,
    "subjectArea": "Khoa học tự nhiên",
    "title": "Thời tiết, Khí hậu & Nước",
    "titleEn": "Weather, Climate & Water Cycling",
    "drivingQuestion": "Tại sao mưa đá có thể rơi vào những ngày nhiệt độ trên 0°C?",
    "phenomenon": "Học sinh xem video về các trận mưa đá ở nhiều nơi khác nhau vào những ngày nhiệt độ không khí vẫn trên 0°C. Tại sao băng lại rơi xuống khi không đủ lạnh? Nửa sau của unit học sinh điều tra dự báo một cơn bão tuyết ở vùng Midwest nước Mỹ với lượng tuyết và băng dày.",
    "standards": ["MS-PS1-4", "MS-ESS2-4", "MS-ESS2-5", "MS-ESS2-6"],
    "totalLessons": 14,
    "estimatedWeeks": 5,
    "icon": "🌧️",
    "color": "blue"
  },
  {
    "id": "6-4",
    "gradeLevel": 6,
    "subjectArea": "Khoa học tự nhiên",
    "title": "Kiến tạo mảng & Vòng tuần hoàn đá",
    "titleEn": "Plate Tectonics & Rock Cycling",
    "drivingQuestion": "Tại sao đỉnh Everest ngày càng cao hơn theo thời gian?",
    "phenomenon": "Học sinh đọc về việc đỉnh Everest đang tăng cao theo thời gian, rồi phân tích dữ liệu về 5 ngọn núi khác trên thế giới để tìm bằng chứng về sự thay đổi địa hình. Câu hỏi mở rộng: Những núi này đang tăng hay giảm? Tại sao Trái Đất liên tục thay đổi bề mặt?",
    "standards": ["MS-ESS1-1", "MS-ESS2-1", "MS-ESS2-2", "MS-ESS2-3"],
    "totalLessons": 11,
    "estimatedWeeks": 4,
    "icon": "🌋",
    "color": "stone"
  },
  {
    "id": "6-5",
    "gradeLevel": 6,
    "subjectArea": "Khoa học tự nhiên",
    "title": "Thiên tai",
    "titleEn": "Natural Hazards",
    "drivingQuestion": "Thiên tai xảy ra ở đâu và làm thế nào để chuẩn bị?",
    "phenomenon": "Học sinh trải nghiệm qua văn bản và video về trận động đất Tōhoku 2011 ở Nhật Bản — một trong những trận động đất mạnh nhất lịch sử — và cơn sóng thần sau đó gây thiệt hại lớn về người và tài sản. Học sinh điều tra cách dự đoán, cảnh báo sớm và giảm thiểu tác hại.",
    "standards": ["MS-ESS3-2", "MS-PS4-3", "MS-ETS1-1", "MS-ETS1-2"],
    "totalLessons": 13,
    "estimatedWeeks": 4,
    "icon": "🌊",
    "color": "red"
  },
  {
    "id": "6-6",
    "gradeLevel": 6,
    "subjectArea": "Khoa học tự nhiên",
    "title": "Tế bào & Hệ cơ thể",
    "titleEn": "Cells & Systems",
    "drivingQuestion": "Tại sao xương bị gãy và cơ thể phục hồi như thế nào?",
    "phenomenon": "Một học sinh trung học bị thương trong giờ thể dục khi vật nặng rơi vào chân — kết quả là hai xương gãy. Học sinh điều tra từ quy mô toàn cơ thể → các hệ cơ quan → tế bào để hiểu tại sao va chạm gây gãy xương và cơ thể tự sửa chữa như thế nào.",
    "standards": ["MS-LS1-1", "MS-LS1-2", "MS-LS1-3"],
    "totalLessons": 12,
    "estimatedWeeks": 4,
    "icon": "🦴",
    "color": "green"
  }
]
```

---

### 📚 THCS — LỚP 7 (6 Units)

```json
[
  {
    "id": "7-1",
    "gradeLevel": 7,
    "subjectArea": "Khoa học tự nhiên",
    "title": "Phản ứng hóa học & Vật chất",
    "titleEn": "Chemical Reactions & Matter",
    "drivingQuestion": "Viên muối tắm sủi bọt — chất gì đã được tạo ra?",
    "phenomenon": "Học sinh thả một viên muối tắm mua ở cửa hàng vào nước và quan sát: nó sủi bọt, vỡ ra, đổi màu và tạo mùi. Điều gì đang xảy ra ở cấp độ phân tử? Đây có phải là chất mới không, hay chỉ là sự hòa tan?",
    "standards": ["MS-PS1-1", "MS-PS1-2", "MS-PS1-5", "MS-LS1-8"],
    "totalLessons": 11,
    "estimatedWeeks": 4,
    "icon": "🧪",
    "color": "purple"
  },
  {
    "id": "7-2",
    "gradeLevel": 7,
    "subjectArea": "Khoa học tự nhiên",
    "title": "Phản ứng hóa học & Năng lượng",
    "titleEn": "Chemical Reactions & Energy",
    "drivingQuestion": "Bếp nấu không lửa trong gói đồ ăn quân đội hoạt động như thế nào?",
    "phenomenon": "Học sinh khám phá một gói MRE (Meal Ready-to-Eat) — thức ăn khẩn cấp của quân đội — có thể nấu nóng thức ăn chỉ bằng cách thêm nước vào một túi hóa chất nhỏ, không cần lửa. Làm thế nào phản ứng hóa học tạo ra đủ nhiệt để nấu chín thức ăn?",
    "standards": ["MS-PS1-6", "MS-ETS1-2", "MS-ETS1-3", "MS-ETS1-4"],
    "totalLessons": 13,
    "estimatedWeeks": 4,
    "icon": "🔥",
    "color": "amber"
  },
  {
    "id": "7-3",
    "gradeLevel": 7,
    "subjectArea": "Khoa học tự nhiên",
    "title": "Phản ứng chuyển hóa",
    "titleEn": "Metabolic Reactions",
    "drivingQuestion": "Tại sao cơ thể M'Kenna lại cảm thấy như vậy?",
    "phenomenon": "Học sinh đọc ca bệnh của M'Kenna — một thiếu niên trải qua những thay đổi cơ thể khó hiểu. Thông qua điều tra về các phản ứng chuyển hóa, học sinh khám phá cách tế bào lấy năng lượng từ thức ăn và giải thích các triệu chứng trong ca bệnh.",
    "standards": ["MS-LS1-3", "MS-LS1-5", "MS-LS1-7", "MS-PS1-1", "MS-PS1-2"],
    "totalLessons": 10,
    "estimatedWeeks": 3,
    "icon": "⚡",
    "color": "cyan"
  },
  {
    "id": "7-4",
    "gradeLevel": 7,
    "subjectArea": "Khoa học tự nhiên",
    "title": "Chu trình vật chất & Quang hợp",
    "titleEn": "Matter Cycling & Photosynthesis",
    "drivingQuestion": "Thức ăn sáng của chúng ta đến từ đâu và đi về đâu?",
    "phenomenon": "Học sinh nếm thử nhựa cây phong — một vị ngọt quen thuộc trong bữa sáng. Nhưng nhựa cây đến từ đâu? Cây lấy vật chất từ đâu để tạo ra đường? Học sinh điều tra vòng tuần hoàn vật chất từ không khí → cây → thức ăn → sinh vật tiêu thụ.",
    "standards": ["MS-LS1-6", "MS-LS2-3", "MS-PS1-3", "MS-LS1-2"],
    "totalLessons": 12,
    "estimatedWeeks": 4,
    "icon": "🍁",
    "color": "lime"
  },
  {
    "id": "7-5",
    "gradeLevel": 7,
    "subjectArea": "Khoa học tự nhiên",
    "title": "Động lực Hệ sinh thái",
    "titleEn": "Ecosystem Dynamics",
    "drivingQuestion": "Tại sao quần thể đười ươi đang suy giảm và việc này liên quan đến chúng ta như thế nào?",
    "phenomenon": "Quần thể đười ươi ở Indonesia đang suy giảm nghiêm trọng — và nguyên nhân được liên kết đến dầu cọ, một thành phần có trong hàng trăm sản phẩm thực phẩm và gia dụng mà học sinh dùng hàng ngày. Học sinh điều tra chuỗi nhân quả trong hệ sinh thái.",
    "standards": ["MS-LS2-1", "MS-LS2-2", "MS-LS2-4", "MS-LS2-5", "MS-ESS3-3", "MS-ETS1-1"],
    "totalLessons": 11,
    "estimatedWeeks": 4,
    "icon": "🦧",
    "color": "emerald"
  },
  {
    "id": "7-6",
    "gradeLevel": 7,
    "subjectArea": "Khoa học tự nhiên",
    "title": "Tài nguyên Trái Đất & Tác động của Con người",
    "titleEn": "Earth's Resources & Human Impact",
    "drivingQuestion": "Hạn hán và lũ lụt bất thường đang xảy ra như thế nào và tại sao?",
    "phenomenon": "Học sinh được giới thiệu hai hiện tượng xảy ra cùng một lúc ở hai nơi: hạn hán nghiêm trọng ở California và lũ lụt ở Mississippi. Rồi họ phát hiện đây không phải trường hợp đơn lẻ — cả nước đang chứng kiến nhiều sự kiện khí hậu cực đoan bất thường.",
    "standards": ["MS-ESS3-3", "MS-ESS3-4", "MS-ESS3-5"],
    "totalLessons": 10,
    "estimatedWeeks": 3,
    "icon": "🌍",
    "color": "teal"
  }
]
```

---

### 📚 THCS — LỚP 8 (6 Units)

```json
[
  {
    "id": "8-1",
    "gradeLevel": 8,
    "subjectArea": "Khoa học tự nhiên",
    "title": "Lực tiếp xúc & Va chạm",
    "titleEn": "Contact Forces",
    "drivingQuestion": "Tại sao điện thoại vẫn bị vỡ dù có ốp bảo vệ?",
    "phenomenon": "Học sinh kể lại những lần thấy điện thoại bị vỡ màn hình — có khi không có ốp, có khi có ốp đắt tiền. Điều gì quyết định thiệt hại trong một vụ va chạm? Học sinh thiết kế phương án bảo vệ vật thể qua thử nghiệm va chạm.",
    "standards": ["MS-PS2-1", "MS-PS2-2", "MS-PS3-1", "MS-LS1-8", "MS-ETS1-2", "MS-ETS1-3"],
    "totalLessons": 14,
    "estimatedWeeks": 5,
    "icon": "📱",
    "color": "slate"
  },
  {
    "id": "8-2",
    "gradeLevel": 8,
    "subjectArea": "Khoa học tự nhiên",
    "title": "Sóng âm",
    "titleEn": "Sound Waves",
    "drivingQuestion": "Âm thanh có thể làm cửa kính của tòa nhà rung không?",
    "phenomenon": "Một chiếc xe tải phát nhạc to đang đỗ trong bãi xe. Những cửa sổ kính của tòa nhà ở phía bên kia bãi xe nhìn thấy rõ ràng đang rung theo nhịp nhạc. Làm thế nào âm thanh có thể truyền qua không khí và làm rung một vật ở xa như vậy?",
    "standards": ["MS-PS4-1", "MS-PS4-2"],
    "totalLessons": 10,
    "estimatedWeeks": 3,
    "icon": "🔊",
    "color": "violet"
  },
  {
    "id": "8-3",
    "gradeLevel": 8,
    "subjectArea": "Khoa học tự nhiên",
    "title": "Lực từ xa",
    "titleEn": "Forces at a Distance",
    "drivingQuestion": "Điều gì làm màng loa rung và tạo ra âm thanh?",
    "phenomenon": "Học sinh xem video quay chậm về một chiếc loa đang hoạt động — màng loa rung động rõ ràng nhưng không có vật nào chạm vào nó. Học sinh tháo loa, xây dựng loa tự chế từ ly nhựa, dây đồng và nam châm — và ngạc nhiên khi nghe được âm thanh phát ra từ điện thoại.",
    "standards": ["MS-PS2-2", "MS-PS2-3", "MS-PS2-5", "MS-PS3-1", "MS-PS3-2", "MS-PS3-5"],
    "totalLessons": 12,
    "estimatedWeeks": 4,
    "icon": "🧲",
    "color": "indigo"
  },
  {
    "id": "8-4",
    "gradeLevel": 8,
    "subjectArea": "Khoa học tự nhiên",
    "title": "Trái Đất trong không gian",
    "titleEn": "Earth in Space",
    "drivingQuestion": "Manhattanhenge là gì và tại sao nó xảy ra?",
    "phenomenon": "Manhattanhenge — hiện tượng chỉ xảy ra hai lần mỗi năm khi Mặt Trời lặn thẳng hàng với các đường phố ngang của Manhattan, New York. Học sinh điều tra tại sao có những quy luật như vậy trên bầu trời và những gì khác ở ngoài không gian mà chúng ta không thể nhìn thấy.",
    "standards": ["MS-ESS1-1", "MS-ESS1-2", "MS-ESS1-3", "MS-PS2-4", "MS-PS4-2"],
    "totalLessons": 13,
    "estimatedWeeks": 4,
    "icon": "🌆",
    "color": "sky"
  },
  {
    "id": "8-5",
    "gradeLevel": 8,
    "subjectArea": "Khoa học tự nhiên",
    "title": "Di truyền học",
    "titleEn": "Genetics",
    "drivingQuestion": "Tại sao một số gia súc có cơ bắp phát triển khác thường?",
    "phenomenon": "Học sinh nghiên cứu cách cơ bắp phát triển bình thường do rèn luyện và chế độ ăn (yếu tố môi trường). Rồi họ gặp dữ liệu về một số con gia súc có cơ bắp khổng lồ bất thường — cả khi không luyện tập. Học sinh phân tích phả hệ để tìm yếu tố di truyền.",
    "standards": ["MS-LS3-1", "MS-LS3-2", "MS-LS4-4", "MS-LS4-5"],
    "totalLessons": 11,
    "estimatedWeeks": 4,
    "icon": "🐄",
    "color": "rose"
  },
  {
    "id": "8-6",
    "gradeLevel": 8,
    "subjectArea": "Khoa học tự nhiên",
    "title": "Chọn lọc tự nhiên & Nguồn gốc chung",
    "titleEn": "Natural Selection & Common Ancestry",
    "drivingQuestion": "Chim cánh cụt cổ đại 'Pedro' kết nối với loài ngày nay như thế nào?",
    "phenomenon": "Các nhà nghiên cứu phát hiện một hóa thạch chim cánh cụt cổ đại được đặt tên là 'Pedro' tại Nam Mỹ. Học sinh nghe podcast của các nhà khoa học, phân tích dữ liệu về chim cánh cụt hiện đại và Pedro để xây dựng lý thuyết về sự kết nối giữa các loài qua tiến hóa.",
    "standards": ["MS-LS1-4", "MS-LS4-1", "MS-LS4-2", "MS-LS4-3", "MS-LS4-4", "MS-LS4-6"],
    "totalLessons": 12,
    "estimatedWeeks": 4,
    "icon": "🐧",
    "color": "zinc"
  }
]
```

---

### 📚 THPT — SINH HỌC / Biology (5 Units) — Giai đoạn 2

```json
[
  {
    "id": "B-1",
    "gradeLevel": 10,
    "subjectArea": "Sinh học",
    "title": "Tương tác & Động lực Hệ sinh thái",
    "titleEn": "Ecosystem Interactions & Dynamics",
    "drivingQuestion": "Sáng kiến bảo tồn 30x30 có thực sự bảo vệ được hệ sinh thái không?",
    "phenomenon": "Mỹ đặt mục tiêu bảo tồn 30% đất và vùng nước vào năm 2030 (30x30). Học sinh khám phá liệu việc khoanh vùng bảo tồn có đủ để bảo vệ đa dạng sinh học, hay còn cần những yếu tố khác. Dữ liệu từ các khu bảo tồn thực tế được phân tích.",
    "standards": ["HS-LS2-1", "HS-LS2-2", "HS-LS2-6", "HS-ESS2-2"],
    "totalLessons": 15,
    "estimatedWeeks": 5,
    "icon": "🌿",
    "color": "green"
  },
  {
    "id": "B-2",
    "gradeLevel": 10,
    "subjectArea": "Sinh học",
    "title": "Hệ sinh thái: Vật chất & Năng lượng",
    "titleEn": "Ecosystems: Matter & Energy",
    "drivingQuestion": "Tại sao 'zombie fires' cháy âm ỉ dưới băng tuyết Siberia?",
    "phenomenon": "Các nhà khoa học ở Alaska phát hiện vết cháy từ các đám lửa xuất hiện rất gần nhau và mùa xuân lửa bắt đầu rất sớm. Ở Siberia, khói bốc ra từ dưới tuyết và băng. Lớp băng vĩnh cửu tan chảy, phơi lộ các sinh vật bị đóng băng hàng nghìn năm — và khi chúng phân hủy, lượng CO₂ khổng lồ được giải phóng.",
    "standards": ["HS-LS2-3", "HS-LS2-4", "HS-LS2-5", "HS-ESS2-6"],
    "totalLessons": 14,
    "estimatedWeeks": 5,
    "icon": "🔥",
    "color": "orange"
  },
  {
    "id": "B-3",
    "gradeLevel": 10,
    "subjectArea": "Sinh học",
    "title": "Di truyền & Biến dị Tính trạng",
    "titleEn": "Inheritance & Variation of Traits",
    "drivingQuestion": "Tại sao tỉ lệ ung thư khác nhau giữa các nhóm dân số?",
    "phenomenon": "Học sinh phân tích thống kê ung thư theo loại, theo bang ở Mỹ, và nhận thấy sự khác biệt khó giải thích. Điều tra các yếu tố như tuổi tác, chiều cao, nhóm dân số — học sinh phát hiện rủi ro ung thư chịu ảnh hưởng của cả di truyền lẫn môi trường theo những cách phức tạp.",
    "standards": ["HS-LS3-1", "HS-LS3-2", "HS-LS3-3"],
    "totalLessons": 13,
    "estimatedWeeks": 4,
    "icon": "🧬",
    "color": "pink"
  },
  {
    "id": "B-4",
    "gradeLevel": 10,
    "subjectArea": "Sinh học",
    "title": "Chọn lọc tự nhiên & Tiến hóa Quần thể",
    "titleEn": "Natural Selection & Evolution of Populations",
    "drivingQuestion": "Đô thị hóa đang làm thay đổi tiến hóa của sinh vật như thế nào?",
    "phenomenon": "Thành phố ngày càng phát triển — và các sinh vật sống trong đó đang tiến hóa với tốc độ quan sát được. Học sinh phân tích dữ liệu về sự thay đổi đặc điểm của các loài đô thị (côn trùng, chim, cây cỏ) và xây dựng mô hình giải thích chọn lọc tự nhiên trong môi trường nhân tạo.",
    "standards": ["HS-LS4-2", "HS-LS4-3", "HS-LS4-4", "HS-LS4-5"],
    "totalLessons": 12,
    "estimatedWeeks": 4,
    "icon": "🦋",
    "color": "violet"
  },
  {
    "id": "B-5",
    "gradeLevel": 10,
    "subjectArea": "Sinh học",
    "title": "Nguồn gốc chung & Loài hóa",
    "titleEn": "Common Ancestry & Speciation",
    "drivingQuestion": "Tại sao gấu lai xuất hiện ở Công viên quốc gia Wapusk?",
    "phenomenon": "Tại Công viên quốc gia Wapusk, Canada, xuất hiện những con gấu lai hiếm gặp giữa gấu trắng Bắc Cực và gấu nâu — điều bình thường không xảy ra vì chúng sống trong môi trường hoàn toàn khác nhau. Biến đổi khí hậu đang thay đổi điều đó. Điều này có ý nghĩa gì với tương lai của các loài?",
    "standards": ["HS-LS4-1", "HS-LS4-2", "HS-LS4-5"],
    "totalLessons": 11,
    "estimatedWeeks": 4,
    "icon": "🐻",
    "color": "amber"
  }
]
```

---

### 📚 THPT — HÓA HỌC / Chemistry (5 Units) — Giai đoạn 2

```json
[
  {
    "id": "C-1",
    "gradeLevel": 11,
    "subjectArea": "Hóa học",
    "title": "Nhiệt động lực học trong Hệ Trái Đất",
    "titleEn": "Thermodynamics in Earth's Systems",
    "drivingQuestion": "Làm thế nào để bảo vệ các cộng đồng ven biển khỏi nước biển dâng?",
    "phenomenon": "Các cộng đồng ven biển đang bị đe dọa bởi nước biển dâng — một số đã phải di dời. Học sinh phân tích dữ liệu cho thấy mực nước biển dâng có lịch sử tương quan với băng cực tan và nhiệt độ tăng. Điều tra nguyên nhân: CO₂ dư thừa từ hoạt động con người.",
    "standards": ["HS-PS3-1", "HS-PS3-2", "HS-ESS2-4", "HS-ESS3-5"],
    "totalLessons": 14,
    "estimatedWeeks": 5,
    "icon": "🌊",
    "color": "blue"
  },
  {
    "id": "C-2",
    "gradeLevel": 11,
    "subjectArea": "Hóa học",
    "title": "Cấu trúc & Tính chất Vật chất",
    "titleEn": "Structure & Properties of Matter",
    "drivingQuestion": "Điều gì gây ra sét và tại sao một số nơi an toàn hơn?",
    "phenomenon": "Học sinh xem video quay chậm và phân tích dữ liệu về sét — một trong những hiện tượng điện khí quyển mạnh nhất tự nhiên. Khi sét đánh vào các vật liệu khác nhau, kết quả rất khác nhau. Học sinh xây dựng mô hình về cấu trúc vật chất ở cấp độ nguyên tử để giải thích.",
    "standards": ["HS-PS1-1", "HS-PS1-3", "HS-PS2-6"],
    "totalLessons": 13,
    "estimatedWeeks": 4,
    "icon": "⚡",
    "color": "yellow"
  },
  {
    "id": "C-3",
    "gradeLevel": 11,
    "subjectArea": "Hóa học",
    "title": "Tài nguyên Ngoài Trái Đất",
    "titleEn": "Space Resources",
    "drivingQuestion": "Chúng ta có thể tìm và sử dụng tài nguyên để sống ngoài Trái Đất không?",
    "phenomenon": "Khi con người dự kiến sinh sống trên Mặt Trăng hoặc Sao Hỏa, câu hỏi đặt ra là: nước ở đâu? Oxy từ đâu? Làm thế nào từ các khoáng chất có sẵn để tổng hợp những gì cần thiết? Học sinh áp dụng hóa học để thiết kế giải pháp sinh tồn ngoài Trái Đất.",
    "standards": ["HS-PS1-2", "HS-PS1-7", "HS-ESS1-2"],
    "totalLessons": 12,
    "estimatedWeeks": 4,
    "icon": "🚀",
    "color": "slate"
  },
  {
    "id": "C-4",
    "gradeLevel": 11,
    "subjectArea": "Hóa học",
    "title": "Phản ứng hóa học trong Thế giới của chúng ta",
    "titleEn": "Chemical Reactions in Our World",
    "drivingQuestion": "Tại sao hàu đang chết và hóa học có thể bảo vệ chúng không?",
    "phenomenon": "Giữa thập niên 2000, ấu trùng hàu ở Thái Bình Dương chết hàng loạt qua đêm khi pH đại dương giảm xuống mức thấp kỷ lục. Đây là hiện tượng axit hóa đại dương — và học sinh điều tra các phản ứng hóa học thuận nghịch liên quan, từ CO₂ trong không khí đến pH trong nước biển.",
    "standards": ["HS-PS1-5", "HS-PS1-6", "HS-ESS2-6", "HS-ESS3-6"],
    "totalLessons": 13,
    "estimatedWeeks": 4,
    "icon": "🦪",
    "color": "cyan"
  },
  {
    "id": "C-5",
    "gradeLevel": 11,
    "subjectArea": "Hóa học",
    "title": "Nhiên liệu cho Xe thế hệ tiếp theo",
    "titleEn": "Fuels & Future Vehicles",
    "drivingQuestion": "Chúng ta nên thiết kế xe thế hệ tiếp theo chạy bằng nhiên liệu gì?",
    "phenomenon": "Thế giới đang chuyển đổi sang xe điện, xe hydrogen, xe hybrid — mỗi loại có ưu và nhược điểm khác nhau. Học sinh phân tích thành phần hóa học, mật độ năng lượng, tác động môi trường của từng loại nhiên liệu để đề xuất thiết kế xe tối ưu.",
    "standards": ["HS-PS1-4", "HS-PS3-1", "HS-ESS3-4"],
    "totalLessons": 11,
    "estimatedWeeks": 4,
    "icon": "🚗",
    "color": "green"
  }
]
```

---

### 📚 THPT — VẬT LÝ / Physics (6 Units) — Giai đoạn 2

```json
[
  {
    "id": "P-1",
    "gradeLevel": 12,
    "subjectArea": "Vật lý",
    "title": "Dòng chảy Năng lượng từ Hệ Trái Đất",
    "titleEn": "Energy Flow from Earth's Systems",
    "drivingQuestion": "Năng lượng di chuyển qua hệ thống Trái Đất như thế nào?",
    "phenomenon": "Xây dựng nền tảng về truyền và bảo toàn năng lượng trong bối cảnh vật lý — nền tảng cho toàn bộ khóa học. Học sinh chưa tập trung vào lực, mà vào dòng chảy năng lượng qua các hệ thống tự nhiên.",
    "standards": ["HS-PS3-1", "HS-PS3-2", "HS-PS3-3", "HS-ESS2-1"],
    "totalLessons": 12,
    "estimatedWeeks": 4,
    "icon": "☀️",
    "color": "yellow"
  },
  {
    "id": "P-2",
    "gradeLevel": 12,
    "subjectArea": "Vật lý",
    "title": "Lực bên trong Trái Đất",
    "titleEn": "Earth's Interior & Forces",
    "drivingQuestion": "Những lực nào bên trong Trái Đất quyết định tương lai bề mặt của nó?",
    "phenomenon": "Một vết nứt đột ngột trong vỏ Trái Đất tạo ra nhu cầu giải thích bằng lực. Học sinh mở rộng hiểu biết về lực để mô hình hóa những gì đang xảy ra bên dưới bề mặt Trái Đất và dự đoán những thay đổi trong tương lai.",
    "standards": ["HS-PS2-1", "HS-PS2-2", "HS-ESS2-3"],
    "totalLessons": 11,
    "estimatedWeeks": 4,
    "icon": "🌋",
    "color": "red"
  },
  {
    "id": "P-3",
    "gradeLevel": 12,
    "subjectArea": "Vật lý",
    "title": "Va chạm xe & An toàn giao thông",
    "titleEn": "Vehicle Collisions",
    "drivingQuestion": "Làm thế nào để thiết kế xe an toàn hơn cho tất cả mọi người?",
    "phenomenon": "Học sinh phân tích dữ liệu va chạm xe thực tế, xây dựng hiểu biết về lực dưới dạng vector và sử dụng bảo toàn động lượng để dự đoán kết quả các vụ va chạm. Mục tiêu thực tế: thiết kế phương án tăng an toàn xe.",
    "standards": ["HS-PS2-1", "HS-PS2-2", "HS-PS2-3", "HS-ETS1-2"],
    "totalLessons": 13,
    "estimatedWeeks": 4,
    "icon": "🚗",
    "color": "slate"
  },
  {
    "id": "P-4",
    "gradeLevel": 12,
    "subjectArea": "Vật lý",
    "title": "Thiên thạch, Quỹ đạo & Trọng lực",
    "titleEn": "Meteors, Orbits & Gravity",
    "drivingQuestion": "Quỹ đạo thiên thạch được xác định bởi những lực nào?",
    "phenomenon": "Học sinh điều tra quỹ đạo thiên thạch, hành tinh và vệ tinh nhân tạo — và hiểu trọng lực không phải là lực chỉ kéo xuống mà là lực tác động theo mọi hướng trong không gian.",
    "standards": ["HS-PS2-4", "HS-ESS1-4"],
    "totalLessons": 12,
    "estimatedWeeks": 4,
    "icon": "☄️",
    "color": "indigo"
  },
  {
    "id": "P-5",
    "gradeLevel": 12,
    "subjectArea": "Vật lý",
    "title": "Bức xạ & Lò vi sóng",
    "titleEn": "Microwave Radiation",
    "drivingQuestion": "Bức xạ vi sóng có an toàn với con người không?",
    "phenomenon": "Lò vi sóng là vật dụng phổ biến — nhưng nó dùng bức xạ để nấu chín thức ăn. Điều này có nguy hiểm không? Học sinh sử dụng truyền năng lượng, điện từ, cơ học sóng và lực từ xa để giải thích cách lò vi sóng hoạt động và đánh giá rủi ro an toàn.",
    "standards": ["HS-PS4-1", "HS-PS4-2", "HS-PS4-3", "HS-PS4-4"],
    "totalLessons": 11,
    "estimatedWeeks": 4,
    "icon": "📡",
    "color": "purple"
  },
  {
    "id": "P-6",
    "gradeLevel": 12,
    "subjectArea": "Vật lý",
    "title": "Vũ trụ học & Big Bang",
    "titleEn": "Earth's History & the Big Bang",
    "drivingQuestion": "Vũ trụ bắt đầu như thế nào và Trái Đất đã hình thành ra sao?",
    "phenomenon": "Học sinh khám phá vũ trụ học và Big Bang — áp dụng tất cả kiến thức về lực và năng lượng từ 5 unit trước ở quy mô lớn nhất có thể. Dữ liệu từ kính thiên văn vũ trụ được phân tích để xây dựng bức tranh về lịch sử vũ trụ.",
    "standards": ["HS-ESS1-1", "HS-ESS1-2", "HS-ESS1-3"],
    "totalLessons": 10,
    "estimatedWeeks": 3,
    "icon": "🌌",
    "color": "violet"
  }
]
```

---

## 3. KIẾN TRÚC KỸ THUẬT

### Stack chi tiết

```
Frontend:       Next.js 15 (App Router, Server Components, Server Actions)
Language:       TypeScript 5+
Styling:        Tailwind CSS v4
UI Components:  shadcn/ui (Radix UI primitives)
Icons:          Lucide React
Database:       PostgreSQL (Neon hoặc Supabase — Vercel-native)
ORM:            Prisma 5+
Auth:           NextAuth.js v5 (Auth.js)
Content:        MDX (next-mdx-remote) cho bài học
File Storage:   Vercel Blob (media: video, ảnh)
Deployment:     Vercel (tự động từ GitHub)
Analytics:      Vercel Analytics
```

### Cấu trúc thư mục đầy đủ

```
openscineo/
├── app/
│   ├── layout.tsx                    ← Root layout (font, metadata)
│   ├── page.tsx                      ← Landing page (giới thiệu, đăng nhập/đăng ký)
│   ├── globals.css
│   │
│   ├── (auth)/
│   │   ├── layout.tsx               ← Auth layout (centered card)
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── onboarding/page.tsx      ← Chọn vai: Học sinh / Mentor
│   │
│   ├── student/
│   │   ├── layout.tsx               ← Student shell (sidebar mobile bottom nav)
│   │   ├── dashboard/page.tsx       ← Trang chủ học sinh
│   │   ├── units/
│   │   │   ├── page.tsx             ← Danh sách tất cả units
│   │   │   └── [unitId]/
│   │   │       ├── page.tsx         ← Trang unit (phenomenon + danh sách lessons)
│   │   │       └── lessons/
│   │   │           └── [lessonId]/
│   │   │               └── page.tsx ← Trang bài học (đọc + hoạt động + nộp)
│   │   ├── notebook/page.tsx        ← Vở điều tra cá nhân
│   │   └── progress/page.tsx        ← Tiến độ học tập
│   │
│   ├── mentor/
│   │   ├── layout.tsx               ← Mentor shell (sidebar desktop)
│   │   ├── dashboard/page.tsx       ← Bảng điều khiển tổng quan
│   │   ├── classes/
│   │   │   ├── page.tsx             ← Danh sách lớp học
│   │   │   ├── new/page.tsx         ← Tạo lớp mới
│   │   │   └── [classId]/
│   │   │       ├── page.tsx         ← Tổng quan lớp
│   │   │       ├── students/page.tsx
│   │   │       └── assign/page.tsx  ← Giao unit/lesson
│   │   ├── curriculum/
│   │   │   ├── page.tsx             ← Xem toàn bộ curriculum
│   │   │   └── [unitId]/page.tsx    ← Xem teacher guide của unit
│   │   └── submissions/
│   │       ├── page.tsx             ← Tất cả bài nộp chờ phản hồi
│   │       └── [submissionId]/page.tsx ← Xem + phản hồi bài nộp
│   │
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       ├── curriculum/
│       │   ├── route.ts             ← GET all units
│       │   └── [unitId]/route.ts    ← GET unit + lessons
│       ├── progress/
│       │   ├── route.ts             ← GET/POST progress
│       │   └── [userId]/route.ts
│       ├── classes/
│       │   ├── route.ts             ← GET/POST classes
│       │   └── [classId]/route.ts
│       └── submissions/
│           ├── route.ts             ← POST new submission
│           └── [submissionId]/
│               └── feedback/route.ts ← POST mentor feedback
│
├── components/
│   ├── ui/                          ← shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── progress.tsx
│   │   ├── avatar.tsx
│   │   ├── dialog.tsx
│   │   ├── textarea.tsx
│   │   └── ...
│   │
│   ├── layout/
│   │   ├── student-nav.tsx          ← Bottom nav mobile cho học sinh
│   │   ├── mentor-sidebar.tsx       ← Sidebar desktop cho mentor
│   │   └── header.tsx
│   │
│   ├── curriculum/
│   │   ├── unit-card.tsx            ← Card hiển thị một unit
│   │   ├── lesson-card.tsx          ← Card hiển thị một lesson
│   │   ├── phenomenon-banner.tsx    ← Banner hiện tượng neo (video/ảnh + câu hỏi)
│   │   ├── lesson-viewer.tsx        ← Render MDX content
│   │   ├── lesson-activity.tsx      ← Khung làm hoạt động / điều tra
│   │   └── standards-badge.tsx      ← Hiển thị NGSS standards
│   │
│   ├── student/
│   │   ├── progress-ring.tsx        ← Vòng tròn tiến độ
│   │   ├── notebook-editor.tsx      ← Ghi chú vở điều tra (rich text cơ bản)
│   │   ├── submission-form.tsx      ← Form nộp bài
│   │   └── grade-selector.tsx       ← Chọn lớp / cấp học
│   │
│   └── mentor/
│       ├── class-stats.tsx          ← Thống kê lớp
│       ├── student-progress-row.tsx ← Hàng tiến độ từng học sinh
│       ├── submission-review.tsx    ← Xem + ghi nhận xét bài nộp
│       └── assign-unit-modal.tsx    ← Modal giao unit
│
├── content/
│   └── curriculum/
│       ├── grade-6/
│       │   ├── unit-6-1/
│       │   │   ├── index.json       ← Unit metadata
│       │   │   ├── teacher-guide.mdx
│       │   │   ├── lesson-01.mdx
│       │   │   ├── lesson-02.mdx
│       │   │   └── ...
│       │   ├── unit-6-2/ ...
│       │   └── ...
│       ├── grade-7/ ...
│       └── grade-8/ ...
│
├── lib/
│   ├── db/
│   │   ├── prisma.ts               ← Prisma client singleton
│   │   └── queries/
│   │       ├── user.ts
│   │       ├── class.ts
│   │       ├── progress.ts
│   │       └── submission.ts
│   ├── auth/
│   │   ├── config.ts               ← NextAuth config
│   │   └── session.ts
│   ├── curriculum/
│   │   ├── loader.ts               ← Load MDX + JSON content
│   │   ├── units.ts                ← Unit data (từ JSON files)
│   │   └── mdx.ts                  ← MDX processing
│   └── utils/
│       ├── format.ts
│       └── cn.ts                   ← clsx + tailwind-merge
│
├── prisma/
│   └── schema.prisma
│
└── public/
    ├── images/
    │   └── phenomena/              ← Ảnh hiện tượng neo
    └── icons/
```

---

## 4. DATABASE SCHEMA

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ========================
// AUTH
// ========================

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String
  role          Role      @default(STUDENT)
  avatarUrl     String?
  gradeLevel    Int?      // Chỉ dùng cho Student: 6, 7, 8, 10, 11, 12
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Relations
  studentProfile   StudentProfile?
  mentorProfile    MentorProfile?
  accounts         Account[]
  sessions         Session[]
}

enum Role {
  STUDENT
  MENTOR
  ADMIN
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  access_token      String? @db.Text
  refresh_token     String? @db.Text
  expires_at        Int?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

// ========================
// STUDENT
// ========================

model StudentProfile {
  id          String @id @default(cuid())
  userId      String @unique
  user        User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  gradeLevel  Int    // 6, 7, 8, 10, 11, 12
  schoolName  String?
  city        String?

  progress     LessonProgress[]
  submissions  Submission[]
  classEnrollments ClassEnrollment[]
  notebookEntries  NotebookEntry[]
}

// ========================
// MENTOR
// ========================

model MentorProfile {
  id          String @id @default(cuid())
  userId      String @unique
  user        User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  schoolName  String?
  city        String?
  bio         String?

  classes     Class[]
}

// ========================
// CLASSES
// ========================

model Class {
  id          String   @id @default(cuid())
  name        String                          // e.g. "Lớp 6A - Khoa học"
  code        String   @unique               // Mã mời học sinh, e.g. "ABC123"
  gradeLevel  Int
  mentorId    String
  mentor      MentorProfile @relation(fields: [mentorId], references: [id])
  createdAt   DateTime @default(now())

  enrollments    ClassEnrollment[]
  assignments    UnitAssignment[]
}

model ClassEnrollment {
  id        String   @id @default(cuid())
  classId   String
  studentId String
  joinedAt  DateTime @default(now())

  class     Class          @relation(fields: [classId], references: [id])
  student   StudentProfile @relation(fields: [studentId], references: [id])

  @@unique([classId, studentId])
}

model UnitAssignment {
  id         String    @id @default(cuid())
  classId    String
  unitId     String                          // "6-1", "7-3", etc.
  dueDate    DateTime?
  assignedAt DateTime  @default(now())

  class      Class @relation(fields: [classId], references: [id])
}

// ========================
// LEARNING PROGRESS
// ========================

model LessonProgress {
  id          String   @id @default(cuid())
  studentId   String
  unitId      String   // "6-1"
  lessonId    String   // "6-1-L3"
  status      ProgressStatus @default(NOT_STARTED)
  startedAt   DateTime?
  completedAt DateTime?
  timeSpent   Int?     // seconds

  student     StudentProfile @relation(fields: [studentId], references: [id])

  @@unique([studentId, lessonId])
}

enum ProgressStatus {
  NOT_STARTED
  IN_PROGRESS
  COMPLETED
}

// ========================
// NOTEBOOK (Vở điều tra)
// ========================

model NotebookEntry {
  id        String   @id @default(cuid())
  studentId String
  unitId    String
  lessonId  String
  content   String   @db.Text   // Markdown
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  student   StudentProfile @relation(fields: [studentId], references: [id])
}

// ========================
// SUBMISSIONS (Bài nộp)
// ========================

model Submission {
  id          String   @id @default(cuid())
  studentId   String
  unitId      String
  lessonId    String
  content     String   @db.Text    // Câu trả lời của học sinh
  status      SubmissionStatus @default(PENDING)
  submittedAt DateTime @default(now())

  student     StudentProfile @relation(fields: [studentId], references: [id])
  feedback    MentorFeedback?
}

enum SubmissionStatus {
  PENDING      // Chờ mentor xem
  REVIEWED     // Đã có phản hồi
}

model MentorFeedback {
  id           String   @id @default(cuid())
  submissionId String   @unique
  mentorId     String
  content      String   @db.Text
  createdAt    DateTime @default(now())

  submission   Submission @relation(fields: [submissionId], references: [id])
}
```

---

## 5. TYPESCRIPT TYPES

```typescript
// types/index.ts

export type UnitId = `${6|7|8}-${1|2|3|4|5|6}` | `B-${1|2|3|4|5}` | `C-${1|2|3|4|5}` | `P-${1|2|3|4|5|6}`

export interface CurriculumUnit {
  id: UnitId
  gradeLevel: number
  subjectArea: '科học tự nhiên' | 'Sinh học' | 'Hóa học' | 'Vật lý'
  title: string
  titleEn: string
  drivingQuestion: string
  phenomenon: string
  standards: string[]
  totalLessons: number
  estimatedWeeks: number
  icon: string
  color: TailwindColor
}

export interface Lesson {
  id: string            // "6-1-L1"
  unitId: UnitId
  order: number
  title: string         // Tiếng Việt
  type: LessonType
  duration: string      // "50 phút"
  content?: string      // MDX string (lazy loaded)
}

export type LessonType = 
  | 'phenomenon'        // Hiện tượng / mở đầu
  | 'investigation'     // Điều tra / thí nghiệm
  | 'analysis'          // Phân tích dữ liệu
  | 'making-meaning'    // Xây dựng ý nghĩa / kết luận
  | 'application'       // Áp dụng / mở rộng
  | 'assessment'        // Đánh giá

export interface UserProfile {
  id: string
  email: string
  name: string
  role: 'STUDENT' | 'MENTOR' | 'ADMIN'
  avatarUrl?: string
}

export interface StudentProgress {
  unitId: UnitId
  completedLessons: number
  totalLessons: number
  percentComplete: number
  lastActivityAt?: Date
}

export interface ClassSummary {
  id: string
  name: string
  code: string
  gradeLevel: number
  studentCount: number
  assignedUnits: UnitId[]
  avgProgress: number
}
```

---

## 6. API ENDPOINTS

### Public / Auth
```
POST /api/auth/register          ← Đăng ký (email + password + role)
POST /api/auth/[...nextauth]     ← NextAuth handlers
```

### Student APIs
```
GET  /api/curriculum                      ← Toàn bộ units (có thể filter by grade)
GET  /api/curriculum/[unitId]             ← Chi tiết unit + danh sách lessons
GET  /api/curriculum/[unitId]/[lessonId]  ← Nội dung MDX bài học

GET  /api/progress                        ← Tiến độ học sinh hiện tại
POST /api/progress                        ← Cập nhật tiến độ lesson
     Body: { lessonId, status, timeSpent }

GET  /api/notebook/[unitId]               ← Lấy ghi chú của unit
POST /api/notebook                        ← Lưu ghi chú
     Body: { unitId, lessonId, content }

POST /api/submissions                     ← Nộp bài
     Body: { unitId, lessonId, content }
```

### Mentor APIs
```
GET  /api/classes                         ← Danh sách lớp của mentor
POST /api/classes                         ← Tạo lớp mới
     Body: { name, gradeLevel }

GET  /api/classes/[classId]               ← Chi tiết lớp + học sinh
POST /api/classes/[classId]/enroll        ← Học sinh tự join bằng code
     Body: { code }
DELETE /api/classes/[classId]/students/[studentId]

POST /api/classes/[classId]/assignments   ← Giao unit cho lớp
     Body: { unitId, dueDate? }

GET  /api/submissions?classId=&status=    ← Danh sách bài nộp
GET  /api/submissions/[id]               ← Chi tiết bài nộp
POST /api/submissions/[id]/feedback       ← Gửi phản hồi
     Body: { content }

GET  /api/students/[studentId]/progress   ← Tiến độ từng học sinh (cho mentor)
```

---

## 7. PAGES & ROUTING

### Landing Page `/`
- Hero: "Học khoa học như một nhà khoa học thực thụ"
- CTA: Đăng ký học sinh / Đăng ký mentor
- Preview 3 hiện tượng nổi bật
- Giới thiệu mô hình học phenomenon-based
- Danh sách grades/subjects

### Auth Flow
```
/login           ← Email + password hoặc Google OAuth
/register        ← Đăng ký (chọn Học sinh / Mentor)
/onboarding      ← Học sinh: chọn lớp | Mentor: thông tin trường
```

### Student Flow
```
/student/dashboard           ← Home với "tiếp tục học" + danh sách units
/student/units               ← Tất cả units theo lớp
/student/units/[unitId]      ← Trang unit: phenomenon + lesson list
/student/units/[unitId]/lessons/[lessonId]  ← Bài học
/student/notebook            ← Vở điều tra tổng hợp
/student/progress            ← Tiến độ visual (rings, streaks)
```

### Mentor Flow
```
/mentor/dashboard            ← Overview stats + danh sách lớp + bài nộp
/mentor/classes              ← Quản lý lớp
/mentor/classes/new          ← Tạo lớp
/mentor/classes/[id]         ← Chi tiết lớp: học sinh + tiến độ
/mentor/classes/[id]/assign  ← Giao unit/lesson
/mentor/curriculum           ← Xem toàn bộ curriculum + teacher guides
/mentor/submissions          ← Tất cả bài nộp chờ
/mentor/submissions/[id]     ← Xem + phản hồi
```

---

## 8. COMPONENT ARCHITECTURE

### `PhenomenonBanner` — Trái tim của mỗi Unit
```tsx
interface PhenomenonBannerProps {
  unit: CurriculumUnit
  variant: 'hero' | 'compact'  // hero: trang unit, compact: trong dashboard
}
// Hiển thị: ảnh/video hiện tượng + câu hỏi chủ đạo + icon + gradient màu của unit
```

### `LessonViewer` — Render bài học MDX
```tsx
// Server Component
// - Render MDX với custom components (Callout, Investigation, DataTable)
// - Sidebar: mục lục bài học, tiến độ
// - Bottom: nút "Tiếp theo" + form nộp bài
```

### `NotebookEditor` — Vở điều tra
```tsx
// Client Component
// - Textarea với auto-save (debounce 2s)
// - Hỗ trợ markdown cơ bản
// - Lưu theo từng lesson
```

### Custom MDX Components (dùng trong content/*.mdx)
```tsx
<Investigation>...</Investigation>   // Khung điều tra có màu nền xanh
<Question>...</Question>             // Câu hỏi in đậm
<DataTable data={...} />             // Bảng dữ liệu
<Callout type="think">...</Callout>  // Hộp gợi ý suy nghĩ
<Evidence>...</Evidence>             // Khung ghi bằng chứng
```

---

## 9. AUTH SYSTEM

### Providers
- **Email/Password** — Credentials provider (hash bcrypt)
- **Google OAuth** — Cho tiện lợi

### Roles & Middleware
```typescript
// middleware.ts
// /student/* → chỉ STUDENT
// /mentor/*  → chỉ MENTOR
// /api/*     → kiểm tra session + role
```

### Onboarding Flow
1. Đăng ký → chọn role (Học sinh / Mentor)
2. Học sinh → chọn lớp (6, 7, 8, THPT) → vào dashboard
3. Mentor → điền tên trường, thành phố → tạo lớp đầu tiên

---

## 10. CONTENT SYSTEM

### MDX Lesson Format

```mdx
---
id: "6-1-L1"
title: "Chúng ta thấy gì và tại sao?"
type: "phenomenon"
duration: "50 phút"
standards: ["MS-PS4-2"]
---

# Bài 1: Chúng ta thấy gì và tại sao?

<Investigation>
## Quan sát (15 phút)
Nhìn vào các vật xung quanh em trong lớp học.
...
</Investigation>

<Question>
Khi đèn tắt, điều gì thay đổi? Tại sao?
</Question>

<Evidence>
Ghi chú bằng chứng của em vào ô bên dưới.
</Evidence>

## Câu hỏi điều tra tiếp theo
...
```

### Unit Index Format (index.json)
```json
{
  "id": "6-1",
  "title": "Ánh sáng & Vật chất",
  "lessons": [
    { "id": "6-1-L1", "order": 1, "title": "...", "type": "phenomenon", "file": "lesson-01.mdx" },
    ...
  ]
}
```

---

## 11. KẾ HOẠCH PHÁT TRIỂN THEO GIAI ĐOẠN

### 🏁 GIAI ĐOẠN 1 — Foundation (Tuần 1–2)

**Mục tiêu**: App chạy được, auth hoạt động, routing đúng.

```
[ ] Setup Next.js 15 + TypeScript + Tailwind + shadcn/ui
[ ] Prisma schema + migrate (User, StudentProfile, MentorProfile)
[ ] NextAuth.js v5: Credentials + Google
[ ] Middleware: route protection by role
[ ] Landing page (static, không cần data)
[ ] Auth pages: /login, /register, /onboarding
[ ] Student layout (mobile bottom nav)
[ ] Mentor layout (desktop sidebar)
```

### 🏁 GIAI ĐOẠN 2 — Curriculum Display (Tuần 3–4)

**Mục tiêu**: Học sinh xem được bài học.

```
[ ] Nhập dữ liệu 18 Units THCS vào JSON files
[ ] Viết nội dung MDX cho Unit 6.1 (12 lessons tiếng Việt)
[ ] Viết nội dung MDX cho Unit 6.2 (10 lessons tiếng Việt)
[ ] API: GET /curriculum + GET /curriculum/[unitId]
[ ] Page: /student/units — danh sách units theo lớp
[ ] Page: /student/units/[unitId] — PhenomenonBanner + lesson list
[ ] Page: /student/units/[unitId]/lessons/[id] — LessonViewer (MDX)
[ ] Student Dashboard: "Tiếp tục học" + quick access units
```

### 🏁 GIAI ĐOẠN 3 — Interactivity (Tuần 5–6)

**Mục tiêu**: Học sinh tương tác được với bài học.

```
[ ] Prisma schema: LessonProgress, NotebookEntry, Submission
[ ] Progress tracking: cập nhật khi học sinh hoàn thành lesson
[ ] NotebookEditor: ghi chú auto-save
[ ] SubmissionForm: nộp bài cuối lesson
[ ] Page: /student/notebook — xem tất cả ghi chú
[ ] Page: /student/progress — visualization tiến độ (rings)
[ ] API: /api/progress, /api/notebook, /api/submissions
```

### 🏁 GIAI ĐOẠN 4 — Mentor Portal (Tuần 7–8)

**Mục tiêu**: Mentor quản lý được lớp và phản hồi bài nộp.

```
[ ] Prisma schema: Class, ClassEnrollment, UnitAssignment, MentorFeedback
[ ] Page: /mentor/dashboard — stats + danh sách lớp + bài nộp
[ ] Page: /mentor/classes — CRUD lớp học
[ ] Page: /mentor/classes/[id] — xem học sinh + tiến độ từng em
[ ] Join class flow: học sinh nhập code → vào lớp
[ ] Page: /mentor/submissions — queue bài nộp
[ ] Page: /mentor/submissions/[id] — xem + phản hồi
[ ] API: /api/classes, /api/submissions/[id]/feedback
[ ] Notifications: (simple, in-app chỉ) báo có bài nộp mới
```

### 🏁 GIAI ĐOẠN 5 — Content Expansion & Polish (Tuần 9–12)

**Mục tiêu**: Đủ nội dung MVP, UX hoàn thiện, deploy production.

```
[ ] Hoàn thiện nội dung MDX: Unit 6.3 → 6.6 (THCS Lớp 6)
[ ] Nội dung MDX: Unit 7.1 → 7.6 (THCS Lớp 7) — tóm tắt, đủ để dùng
[ ] Nội dung MDX: Unit 8.1 → 8.6 (THCS Lớp 8) — tóm tắt, đủ để dùng
[ ] Teacher Guide MDX cho từng Unit (dành cho /mentor/curriculum)
[ ] Mobile responsive hoàn chỉnh (test trên iPhone + Android)
[ ] Loading states, error states, empty states
[ ] SEO: metadata, og tags, sitemap
[ ] Vercel Analytics
[ ] Deploy production + domain openscineo.vn (hoặc tương đương)
[ ] Beta test với 2–3 lớp thật
```

### 🔮 GIAI ĐOẠN 6 — V2 (Sau MVP)

```
[ ] THPT: Biology (B.1–B.5), Chemistry (C.1–C.5), Physics (P.1–P.6)
[ ] Gamification: Huy hiệu (Badges), điểm kinh nghiệm
[ ] AI Tutor: học sinh hỏi câu hỏi → AI gợi ý (không trả lời thẳng)
[ ] Export: mentor xuất báo cáo tiến độ PDF
[ ] Tiểu học K–5 (nếu OpenSciEd hoàn thiện)
```

---

## 12. DEPLOYMENT & ENVIRONMENT

### Environment Variables

```env
# .env.local

# Database (Neon PostgreSQL — free tier trên Vercel)
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"

# Google OAuth (tạo tại console.cloud.google.com)
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Vercel Blob (để upload media sau)
BLOB_READ_WRITE_TOKEN="..."
```

### Deploy lên Vercel

```bash
# 1. Push code lên GitHub
git init && git add . && git commit -m "init OpenSciNEO"
git remote add origin https://github.com/[user]/openscineo
git push -u origin main

# 2. Import project tại vercel.com/new
# 3. Set environment variables trong Vercel Dashboard
# 4. Add Neon Database integration từ Vercel Marketplace
# 5. Run: npx prisma db push (qua Vercel CLI hoặc local với prod DB_URL)
```

### Neon Database Setup (Free tier, Vercel-native)
1. Vào vercel.com/[project]/storage → Add Neon
2. Copy `DATABASE_URL` vào env vars
3. `npx prisma db push` để migrate schema

---

## NOTES CHO CLAUDE CLI

1. **Đọc `node_modules/next/dist/docs/` trước** — Next.js version trong project có thể có breaking changes so với training data
2. **Server Components mặc định** — Chỉ dùng `'use client'` khi thực sự cần (interactive, hooks, browser APIs)
3. **Server Actions cho forms** — Dùng `action=` thay vì `onSubmit` + fetch
4. **Prisma singleton** — Tạo `lib/db/prisma.ts` với pattern singleton để tránh too many connections
5. **shadcn/ui** — Cài theo từng component cần, không cài toàn bộ: `npx shadcn@latest add button card badge`
6. **Tailwind v4** — API có thể khác v3, kiểm tra docs trong node_modules trước
7. **NextAuth v5** — API khác v4, dùng `auth()` function thay vì `getSession()`
8. **Content loading** — MDX files đọc bằng `fs` trên server, không expose API cho content (dùng Server Components)
9. **Mobile-first CSS** — Học sinh = mobile; Mentor = desktop. Viết breakpoints từ nhỏ lên lớn.
10. **Tiếng Việt** — Tất cả text trong JSX phải tiếng Việt. Không dùng placeholder text tiếng Anh.

---

*Tài liệu cập nhật lần cuối: 2026-04-11 | Nguồn dữ liệu curriculum: openscied.org (OER)*
