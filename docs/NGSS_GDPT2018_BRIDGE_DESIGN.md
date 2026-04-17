# Design Spec — NGSS ↔ GDPT 2018: Khung đối chiếu khoa học K-8 Việt Nam

> **Tài liệu này** là **thiết kế (design spec)** cho tài liệu phân tích chính sẽ được viết ở bước tiếp theo. Đây chưa phải nội dung phân tích — đây là đề cương thống nhất phạm vi, cấu trúc, nguồn, độ sâu trước khi bắt tay viết.
>
> Ngày tạo: 2026-04-17
> Trạng thái: Chờ review

---

## 1. Mục tiêu

Viết tài liệu **đối chiếu cấu trúc chuẩn** giữa:
- **NGSS** (Next Generation Science Standards, Hoa Kỳ) — khung mà OpenSciEd (nguồn của OpenSciedNEO) bám theo.
- **GDPT 2018** (Chương trình Giáo dục phổ thông 2018, Việt Nam, ban hành kèm Thông tư 32/2018/TT-BGDĐT) — khung áp dụng trong trường học VN.

Mục đích: Cho đội ngũ biên soạn, giáo viên triển khai, và cán bộ quản lý hiểu rõ **mỗi thành phần NGSS ánh xạ sang thành phần GDPT 2018 nào**, điểm tương đồng và khác biệt, hàm ý khi dạy OpenSciedNEO trong trường VN.

**KHÔNG** làm trong tài liệu này:
- Không map từng unit/lesson cụ thể của OpenSciedNEO (đó là tài liệu khác).
- Không gap analysis nội dung khoa học.
- Không hướng dẫn triển khai lớp học cụ thể.

## 2. Phạm vi

| Cấp | NGSS grade band | GDPT 2018 môn tương ứng | Độ chi tiết |
|---|---|---|---|
| Tiểu học | K-2, 3-5 | Tự nhiên và Xã hội (1-3), Khoa học (4-5) | **Sơ lược** (có disclaimer — chưa có bản PDF gốc) |
| THCS | 6-8 | Khoa học tự nhiên (6-8) | **Đầy đủ** (có Thông tư 32/2018 gốc) |

Không cover: lớp 9 (GDPT 2018 có nhưng OpenSciedNEO dừng ở lớp 8), NGSS high school (9-12).

## 3. Cấu trúc tài liệu

Xương sống theo **3 chiều NGSS**, mỗi chiều đối chiếu với thành phần tương ứng trong GDPT 2018:

```
NGSS Three Dimensions          ↔      GDPT 2018 Components
────────────────────────              ──────────────────────
1. DCI — Disciplinary Core Ideas  ↔  YCCĐ về nội dung (theo mạch: Chất, Năng lượng, Vật sống, Trái Đất)
2. SEP — Science & Engineering     ↔  Năng lực đặc thù KHTN:
   Practices                          - Nhận thức KHTN
                                      - Tìm hiểu tự nhiên
                                      - Vận dụng kiến thức, kĩ năng
3. CCC — Crosscutting Concepts     ↔  (Không có tương đương trực tiếp) —
                                      gần nhất: Năng lực chung (tư duy phản biện,
                                      giải quyết vấn đề) + mạch tích hợp liên môn
```

Kèm 2 thành phần bổ sung:
- **Phẩm chất chủ yếu** (GDPT 2018) — không có tương đương NGSS, đối chiếu với giá trị giáo dục ngầm định của OpenSciEd (equity, agency, sensemaking).
- **Năng lực chung** (GDPT 2018) — đối chiếu với NGSS 21st Century Skills framework kèm theo.

### Outline chính

```
1. Tóm lược lãnh đạo (Executive Summary) — 1-2 trang
2. Bối cảnh ban hành & triết lý
   2.1 NGSS (A Framework for K-12 Science Education, NRC 2012 → NGSS 2013)
   2.2 GDPT 2018 (Nghị quyết 88/2014, Thông tư 32/2018)
3. Chiều 1 — DCI ↔ YCCĐ về nội dung       [~12-15 trang]
   3.1 DCI: 4 domain × progression K-12
   3.2 GDPT 2018: Mạch nội dung KHTN + Khoa học TH
   3.3 Bảng đối chiếu domain × mạch (K-2, 3-5, 6-8)
   3.4 Ví dụ: DCI PS1.A vs mạch "Chất và sự biến đổi của chất"
4. Chiều 2 — SEP ↔ Năng lực đặc thù KHTN  [~10-12 trang]
   4.1 8 SEP (Asking questions → Communicating information)
   4.2 3 thành phần năng lực đặc thù KHTN
   4.3 Bảng đối chiếu 8 SEP ↔ biểu hiện năng lực (theo Thông tư 32)
   4.4 Ví dụ cụ thể từ OpenSciedNEO lesson
5. Chiều 3 — CCC ↔ tích hợp + năng lực chung  [~6-8 trang]
   5.1 7 CCC (Patterns, Cause and Effect, ..., Structure and Function)
   5.2 Gap: GDPT 2018 thiếu tầng CCC rõ rệt — giải pháp
   5.3 Đối chiếu gần với năng lực chung (tự chủ, giao tiếp, giải quyết VĐ)
6. Phẩm chất chủ yếu & giáo dục STEM      [~3-4 trang]
   6.1 5 phẩm chất GDPT 2018 (yêu nước, nhân ái, chăm chỉ, trung thực, trách nhiệm)
   6.2 Đối chiếu với equity/sensemaking culture của OpenSciEd
7. Đánh giá — Assessment                  [~4-5 trang]
   7.1 NGSS 3D performance expectations
   7.2 GDPT 2018: đánh giá năng lực (Thông tư 22/2021 + Thông tư 26/2020)
   7.3 Tương thích, xung đột
8. Hàm ý triển khai OpenSciedNEO          [~3-4 trang]
   8.1 Giáo viên cần bổ sung gì từ GDPT 2018
   8.2 Hiệu trưởng/Sở GD cần biết gì để phê duyệt
   8.3 Rủi ro & khuyến nghị
9. Phụ lục
   A. Glossary thuật ngữ NGSS ↔ GDPT 2018
   B. Trích YCCĐ đầy đủ Lớp 6/7/8 KHTN (từ Thông tư 32/2018)
   C. NGSS PE code reference (K-PS, 6-8.LS, ...)
   D. Tham khảo
```

## 4. Nguồn tham chiếu

### Có sẵn (đã tải)
- ✅ **Thông tư 32/2018 — Môn Khoa học tự nhiên (THCS 6-9)**: `/tmp/ctkhtn.txt` (81 trang, 2245 dòng) — extract từ PDF `filethcs.hcm.shieldixcloud.com/.../11_ctkhoa_hoc_tu_nhien_26320197.pdf`.
- ✅ **OpenSciEd_CTGDPT2018_Microworld_Mapping.xlsx**: `/Users/tuanln/Downloads/` — tham khảo cách map đã có.
- ✅ **20_cau_hoi_openscied_gdpt2018.docx**: `/Users/tuanln/Downloads/` — ví dụ hiện tượng.

### Dùng kiến thức chung + disclaimer
- ⚠️ **Thông tư 32/2018 — Môn TN&XH (lớp 1-3)**: chưa có bản cứng, viết dựa trên hiểu biết chung, đánh dấu `[NEEDS-VERIFICATION]`.
- ⚠️ **Thông tư 32/2018 — Môn Khoa học (lớp 4-5)**: chưa có bản cứng, tương tự.

### Nguồn NGSS công khai
- NGSS Lead States (2013). *Next Generation Science Standards: For States, By States*. nextgenscience.org
- NRC (2012). *A Framework for K-12 Science Education: Practices, Crosscutting Concepts, and Core Ideas*.
- OpenSciEd Scope & Sequence (openscied.org).

## 5. Độ sâu & định dạng

- **Độ sâu**: mức C đã chọn — đầy đủ, trích dẫn YCCĐ gốc từ Thông tư 32/2018 (KHTN 6-9), ví dụ cụ thể từ 2-3 unit OpenSciedNEO cho mỗi chiều.
- **Format**: Markdown, bảng nhiều cột, hộp callout cho disclaimer, mục lục có anchor link.
- **Ước tính**: 45-55 trang khi render (~18,000-22,000 từ tiếng Việt).
- **Thời gian viết dự kiến**: 3-5 phiên làm việc, có thể dùng subagent để viết song song các chiều độc lập (SEP / CCC / DCI).

## 6. Kế hoạch thực thi (gợi ý, sẽ được writing-plans detail hoá)

1. Parse toàn bộ YCCĐ từ `/tmp/ctkhtn.txt` → structured data (mạch → chủ đề → YCCĐ item).
2. Viết chương 2 (bối cảnh) + chương 1 (tóm lược) — dài ít, cần cho toàn bộ.
3. Chương 3 (DCI ↔ YCCĐ nội dung) — dài nhất, viết trước.
4. Song song: chương 4 (SEP) + chương 5 (CCC).
5. Chương 6, 7, 8, 9 cuối cùng.
6. QA: cross-check bảng đối chiếu, kiểm tra disclaimer, anchor link.

## 7. Assumption & rủi ro

- **AS-1**: Thông tư 32/2018 môn KHTN (6-9) em đã có là **bản gốc chính thức**. Rủi ro: bản trên hosting trường THCS Lam Sơn Q6 có thể đã bị chỉnh sửa — cần so với cổng MOET. *Giảm thiểu*: ghi rõ nguồn trong phụ lục, đánh dấu chỗ nghi ngờ.
- **AS-2**: Phần TH (lớp 1-5) viết từ kiến thức chung → **có thể sai chi tiết**. *Giảm thiểu*: disclaimer rõ ràng, liệt kê các claim cần verify.
- **AS-3**: CCC không có tương đương GDPT 2018 trực tiếp → cần viết đoạn giải thích lý do + đề xuất hướng bù đắp. *Rủi ro*: độc giả VN có thể không hiểu vì sao "lấy NGSS làm chuẩn".
- **AS-4**: Người đọc VN có nền KHTN cơ bản nhưng không quen thuật ngữ NGSS (DCI, SEP, CCC, PE). *Giảm thiểu*: glossary + dịch thuật ngữ ngay lần đầu xuất hiện.

## 8. Quyết định đã chốt

- **D-1**: Output chỉ **Markdown** (không cần PDF).
- **D-2**: Lưu tại `docs/NGSS_GDPT2018_BRIDGE.md` — cùng cấp với `PHASE_1_REPORT.md`, không tạo subfolder.
- **D-3**: Chỉ viết **tiếng Việt**, không bản tiếng Anh song song.
- **D-4**: **Chỉ nhắc tên** Thông tư 22/2021 trong chương 7, không phân tích chi tiết.

---

## Kết cấu kiểm tra (checklist trước khi bắt đầu viết)

- [x] User review design spec này — ✅ 2026-04-17
- [x] Chốt các quyết định ở §8 — ✅ 2026-04-17
- [ ] Copy `/tmp/ctkhtn.txt` vào `docs/source-pdfs/gdpt-2018/ctkhtn-6-9.txt` (gitignored)
- [ ] Viết writing-plans spec chi tiết

---

*Spec này sẽ được convert thành implementation plan qua skill `writing-plans` sau khi user approve.*
