# OpenStemNeo

> Nền tảng học khoa học K12 tiếng Việt theo mô hình **học qua hiện tượng** (phenomenon-based learning). Việt hóa từ [OpenSciEd](https://openscied.org) — mở, miễn phí, dành cho học sinh và giáo viên.

![Status](https://img.shields.io/badge/status-MVP-blue) ![License](https://img.shields.io/badge/code-MIT-green) ![Content](https://img.shields.io/badge/content-CC--BY--4.0-orange)

## Tầm nhìn

Mỗi đơn vị học trong OpenStemNeo bắt đầu từ một **hiện tượng có thật** — gương một chiều, mưa đá ngày ấm, loa tự chế… Học sinh quan sát, đặt câu hỏi, thiết kế thí nghiệm, thu thập bằng chứng và tự xây dựng mô hình giải thích, giống hệt cách các nhà khoa học làm việc.

Hai vai:
- 🎓 **Học sinh** — học qua điện thoại, ghi chú vở điều tra, nộp bài
- 👨‍🏫 **Mentor (giáo viên)** — tạo lớp, giao đơn vị học, theo dõi tiến độ, phản hồi bài nộp

## Phạm vi

| Giai đoạn | Nội dung |
|---|---|
| **MVP** | THCS Lớp 6–8 (18 đơn vị học) |
| **V2** | THPT: Sinh học, Hóa học, Vật lý (16 đơn vị học) |
| **Sau này** | Tiểu học K–5, AI Tutor, Gamification |

## Công nghệ

- **Next.js 16** (App Router, Turbopack, Server Components)
- **React 19** · **TypeScript 5**
- **Tailwind CSS v4** · **shadcn/ui** · **Radix UI** · **Lucide icons**
- **PostgreSQL** + **Prisma** + **NextAuth v5** _(thêm sau MVP)_
- **MDX** cho nội dung bài học
- Deploy trên **Vercel**

## Bắt đầu

```bash
# Cài dependencies
npm install

# Chạy dev server
npm run dev

# Build production
npm run build

# Kiểm tra lint
npm run lint
```

Mở [http://localhost:3000](http://localhost:3000) để xem app.

### Biến môi trường

Copy `.env.example` thành `.env.local`. MVP hiện tại **chưa cần** bất kỳ biến nào — các biến trong file mẫu dành cho các giai đoạn sau (auth, database).

## Cấu trúc dự án

```
openstemneo/
├── app/                      # Next.js App Router
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout + metadata
│   ├── student/              # Phía học sinh (mobile-first)
│   └── mentor/               # Phía mentor (desktop dashboard)
├── components/
│   ├── ui/                   # shadcn/ui primitives
│   └── layout/               # Student nav, mentor sidebar
├── content/
│   └── curriculum/           # MDX + JSON cho các đơn vị học
├── lib/
│   └── utils/                # cn helper
├── OPENSCINEO_SPEC.md         # Đặc tả đầy đủ dự án
├── ARCHITECTURE.md            # Kiến trúc tổng thể
└── USER_FLOWS.md              # Luồng người dùng
```

## Lộ trình

- [x] **Giai đoạn 1 — Nền tảng**: Next.js + Tailwind + shadcn, landing page, student/mentor shell
- [ ] **Giai đoạn 2 — Hiển thị curriculum**: 18 đơn vị học THCS, MDX lesson viewer
- [ ] **Giai đoạn 3 — Tương tác**: vở điều tra, nộp bài, tiến độ
- [ ] **Giai đoạn 4 — Mentor portal**: quản lý lớp, phản hồi bài nộp (yêu cầu auth + DB)
- [ ] **Giai đoạn 5 — Hoàn thiện nội dung + deploy production**
- [ ] **Giai đoạn 6 — V2**: THPT + tính năng nâng cao

Chi tiết xem [`OPENSCINEO_SPEC.md`](./OPENSCINEO_SPEC.md).

## License

- **Mã nguồn**: [MIT](./LICENSE) — tự do sử dụng, sửa đổi, phân phối
- **Nội dung học liệu** (`content/`): [CC BY 4.0](./content/LICENSE) — ghi nguồn khi dùng lại

Nội dung gốc OpenSciEd cũng phát hành theo CC BY 4.0 — xem [openscied.org](https://openscied.org).

## Đóng góp

Dự án đang ở giai đoạn đầu. Issues và PRs hoan nghênh. Xem [`ARCHITECTURE.md`](./ARCHITECTURE.md) và [`OPENSCINEO_SPEC.md`](./OPENSCINEO_SPEC.md) để hiểu bối cảnh trước khi đóng góp.

---

*Việt hóa từ [OpenSciEd.org](https://openscied.org) — một dự án giáo dục mở.*
