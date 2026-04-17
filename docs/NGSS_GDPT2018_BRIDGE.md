# NGSS ↔ GDPT 2018: Khung đối chiếu khoa học K-8 Việt Nam

> **Tài liệu dùng nội bộ** cho đội ngũ biên soạn, giáo viên, và cán bộ quản lý triển khai chương trình OpenSciedNEO trong trường phổ thông Việt Nam.
>
> **Phiên bản**: 0.1 (draft) · **Ngày**: 2026-04-17 · **Ngôn ngữ**: Tiếng Việt
>
> **Design spec**: [NGSS_GDPT2018_BRIDGE_DESIGN.md](./NGSS_GDPT2018_BRIDGE_DESIGN.md)

---

## Mục lục

1. [Tóm lược](#1-tóm-lược)
2. [Bối cảnh ban hành và triết lý](#2-bối-cảnh-ban-hành-và-triết-lý)
   - 2.1 [NGSS — nguồn gốc và ba chiều](#21-ngss--nguồn-gốc-và-ba-chiều)
   - 2.2 [GDPT 2018 — Thông tư 32/2018](#22-gdpt-2018--thông-tư-322018)
3. [Chiều 1 — DCI ↔ YCCĐ về nội dung](#3-chiều-1--dci--yccđ-về-nội-dung)
4. [Chiều 2 — SEP ↔ Năng lực đặc thù KHTN](#4-chiều-2--sep--năng-lực-đặc-thù-khtn)
5. [Chiều 3 — CCC ↔ Tích hợp liên môn và năng lực chung](#5-chiều-3--ccc--tích-hợp-liên-môn-và-năng-lực-chung)
6. [Phẩm chất chủ yếu và văn hoá lớp học STEM](#6-phẩm-chất-chủ-yếu-và-văn-hoá-lớp-học-stem)
7. [Đánh giá — Assessment](#7-đánh-giá--assessment)
8. [Hàm ý triển khai OpenSciedNEO](#8-hàm-ý-triển-khai-openscienneo)
9. [Phụ lục](#9-phụ-lục)
   - 9.A [Glossary thuật ngữ NGSS ↔ GDPT 2018](#9a-glossary-thuật-ngữ)
   - 9.B [Trích YCCĐ đầy đủ lớp 6, 7, 8 môn KHTN](#9b-trích-yccđ)
   - 9.C [NGSS Performance Expectation code reference](#9c-ngss-pe-code-reference)
   - 9.D [Tài liệu tham khảo](#9d-tham-khảo)

---

<!-- chương 1: sẽ viết sau cùng -->
## 1. Tóm lược

*(Viết sau cùng khi đã có toàn bộ chương 2-9)*

---

## 2. Bối cảnh ban hành và triết lý

### 2.1 NGSS — nguồn gốc và ba chiều

NGSS (Next Generation Science Standards) được Hoa Kỳ công bố **4/2013** bởi liên minh **26 bang**, dựa trên tài liệu khung **A Framework for K-12 Science Education** của **National Research Council (NRC)** xuất bản 2012. NGSS thay thế bộ **National Science Education Standards (1996)** vốn chỉ mô tả kiến thức, chưa mô tả cách học và cách vận dụng.

Triết lý cốt lõi: **học sinh phải làm khoa học — không chỉ học về khoa học**. Mỗi chuẩn NGSS gọi là **Performance Expectation (PE)** — một câu mô tả hành vi quan sát được mà học sinh thực hiện để chứng tỏ đã học, không phải mô tả kiến thức họ nhớ.

Mỗi PE đan xen **ba chiều** (Three Dimensions) — đây là đặc điểm định hình của NGSS:

| Chiều | Tên đầy đủ | Ý nghĩa | Số lượng |
|---|---|---|---|
| **DCI** | Disciplinary Core Ideas | Các ý tưởng cốt lõi của bốn lĩnh vực: Vật lí (PS), Sinh học (LS), Trái Đất & Vũ trụ (ESS), Kĩ thuật (ETS) | 44 DCI (chia tiếp thành sub-idea A/B/C/D) |
| **SEP** | Science and Engineering Practices | Các hoạt động học sinh thực hiện để làm khoa học | 8 practices |
| **CCC** | Crosscutting Concepts | Các lăng kính tư duy xuyên lĩnh vực (Patterns, Cause & Effect, ...) | 7 concepts |

Một PE được viết dưới dạng ba chiều đan xen. Ví dụ:

> **MS-PS1-4**: *Develop a model that predicts and describes changes in particle motion, temperature, and state of a pure substance when thermal energy is added or removed.*
> - **SEP**: Developing and Using Models
> - **DCI**: PS1.A Structure and Properties of Matter; PS3.A Definitions of Energy
> - **CCC**: Cause and Effect

Nhà giáo không được chọn "chỉ dạy DCI" hay "chỉ rèn SEP" — cả ba chiều phải cùng xuất hiện trong mỗi bài học.

### 2.2 GDPT 2018 — Thông tư 32/2018

Chương trình Giáo dục phổ thông 2018 (gọi tắt **GDPT 2018**, **CT GDPT 2018**, hoặc **Chương trình giáo dục phổ thông tổng thể 2018**) được **Bộ Giáo dục và Đào tạo** ban hành kèm **Thông tư số 32/2018/TT-BGDĐT** ngày **26/12/2018**. Đây là văn bản pháp quy cao nhất về nội dung dạy-học phổ thông ở Việt Nam hiện hành, thay thế Chương trình 2006.

Điểm chuyển hướng của GDPT 2018 so với chương trình 2006: **chuyển từ "định hướng nội dung" sang "định hướng năng lực"**. Nghĩa là văn bản không liệt kê "học sinh phải biết", thay vào đó mô tả **Yêu cầu cần đạt (YCCĐ)** — những hành vi/sản phẩm quan sát được mà học sinh phải thực hiện.

GDPT 2018 phân loại mục tiêu thành:

| Thành phần | Mô tả | Đối tượng |
|---|---|---|
| **5 phẩm chất chủ yếu** | Yêu nước · Nhân ái · Chăm chỉ · Trung thực · Trách nhiệm | Toàn bộ học sinh, mọi môn |
| **10 năng lực (3 chung + 7 chuyên biệt/đặc thù)** | Tự chủ & tự học · Giao tiếp & hợp tác · Giải quyết VĐ & sáng tạo + 7 năng lực môn | Theo môn học |
| **Năng lực đặc thù KHTN** | Nhận thức KHTN · Tìm hiểu tự nhiên · Vận dụng kiến thức, kĩ năng | Môn Khoa học TH + KHTN THCS |

Các môn liên quan đến khoa học trong GDPT 2018:

| Cấp | Môn | Lớp | Số tiết/tuần |
|---|---|---|---|
| Tiểu học | Tự nhiên và Xã hội (TN&XH) | 1, 2, 3 | 2 tiết |
| Tiểu học | Khoa học | 4, 5 | 2 tiết |
| THCS | Khoa học tự nhiên (KHTN) | 6, 7, 8, 9 | 4 tiết (140 tiết/năm) |
| THPT | Vật lí / Hoá học / Sinh học | 10, 11, 12 | (phân môn, chọn) |

**Cách đọc tài liệu này**: từ đây trở đi khi nhắc "GDPT 2018" hiểu là Thông tư 32/2018; khi nhắc "Chương trình KHTN" hiểu là phụ lục về môn Khoa học tự nhiên THCS 6-9 trong Thông tư đó.

### 2.3 So sánh triết lý — điểm chung và điểm khác

**Điểm chung đáng chú ý:**

- Cả hai khung **lấy năng lực làm trung tâm** — đánh giá hành vi quan sát được, không đánh giá trí nhớ kiến thức rời rạc.
- Cả hai **tích hợp thực hành** vào mọi bài học — NGSS qua SEP, GDPT 2018 qua thành phần "Tìm hiểu tự nhiên".
- Cả hai **đề cao liên hệ thực tiễn** — OpenSciEd có "anchor phenomena" (hiện tượng neo), GDPT 2018 có YCCĐ "vận dụng kiến thức, kĩ năng đã học".
- Cả hai **chia theo mạch nội dung chứ không chia theo môn Vật/Hoá/Sinh rời rạc** ở cấp tiểu học và THCS — NGSS có 4 domain (PS, LS, ESS, ETS), KHTN có 4 mạch (Chất, Năng lượng, Vật sống, Trái Đất và bầu trời).

**Điểm khác đáng chú ý:**

| Khía cạnh | NGSS | GDPT 2018 |
|---|---|---|
| Tầng Crosscutting (CCC) | Có 7 CCC xuyên suốt | Không có tầng tương đương. Gần nhất là năng lực chung + mạch tích hợp liên môn. |
| Số lượng chuẩn | ~200 PE từ K-12 | ~700-800 YCCĐ KHTN lớp 6-9 (khoảng 180-200 mỗi lớp) |
| Độ cụ thể của chuẩn | PE ngắn gọn (1 câu), bao hàm 3 chiều trong một đơn vị | YCCĐ thường ngắn hơn, tách biệt theo nội dung và năng lực |
| Phân hoá theo bang | Bang không bắt buộc áp dụng | Toàn quốc bắt buộc |
| Tầng phẩm chất | Không quy định phẩm chất riêng (có 21st Century Skills rời) | Có 5 phẩm chất chủ yếu ngang hàng với năng lực |
| Kĩ thuật (Engineering) | Có ETS domain riêng, 4 PE K-2 → 5 PE 9-12 | Tích hợp trong "Vận dụng kiến thức, kĩ năng" và môn Công nghệ (không thuộc KHTN) |

**Hàm ý:** Khi dùng OpenSciedNEO (bám NGSS) trong trường VN (bám GDPT 2018), giáo viên cần ý thức 3 điểm:
1. **Thêm tầng phẩm chất** vào mỗi bài — OpenSciEd không nhắc, nhưng VN bắt buộc.
2. **Diễn giải CCC** như năng lực chung + tư duy hệ thống — không có đối một-một.
3. **Kĩ thuật (ETS)** trong OpenSciEd có thể không được tính vào môn KHTN — có thể quy sang môn Công nghệ hoặc giữ trong KHTN như phần mở rộng.

Các chương 3-8 phân tích chi tiết từng chiều và thành phần.
