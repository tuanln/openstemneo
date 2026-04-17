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

---

## 3. Chiều 1 — DCI ↔ YCCĐ về nội dung

### 3.1 Cấu trúc DCI của NGSS

NGSS chia DCI thành **4 domain** lớn:

| Code | Domain | Tiếng Việt | Số sub-idea |
|---|---|---|---|
| **PS** | Physical Science | Khoa học Vật lí | 4 (PS1, PS2, PS3, PS4) |
| **LS** | Life Science | Khoa học Sự sống | 4 (LS1, LS2, LS3, LS4) |
| **ESS** | Earth and Space Science | Khoa học Trái Đất và Vũ trụ | 3 (ESS1, ESS2, ESS3) |
| **ETS** | Engineering, Technology, and Applications of Science | Kĩ thuật, Công nghệ, Ứng dụng khoa học | 2 (ETS1, ETS2) |

Mỗi sub-idea chia tiếp thành A/B/C/D. Ví dụ:
- **PS1.A** Structure and Properties of Matter
- **PS1.B** Chemical Reactions
- **PS1.C** Nuclear Processes

**Progression K-12**: với mỗi DCI, NGSS định nghĩa "bản sâu dần" theo 4 grade band:
- K-2 (Kindergarten - Grade 2)
- 3-5 (Grade 3-5)
- 6-8 (Middle School)
- 9-12 (High School)

Ví dụ PS1.A về "cấu trúc và tính chất của chất":
- **K-2**: Vật chất tồn tại dưới các dạng mà ta có thể quan sát (rắn/lỏng/khí); vật khác nhau có tính chất khác nhau.
- **3-5**: Vật chất cấu tạo từ các hạt quá nhỏ để thấy. Lượng vật chất được bảo toàn khi trộn, chia nhỏ, hoặc thay đổi trạng thái.
- **6-8**: Tất cả vật chất cấu tạo từ nguyên tử; nguyên tử cấu tạo từ hạt nhân và electron; phân tử là tập hợp nguyên tử.
- **9-12**: Bảng tuần hoàn biểu hiện nguyên tắc sắp xếp; liên kết cộng hoá trị/ion; cấu hình electron xác định tính chất.

Tư tưởng "progression": mỗi cấp lớp không học khái niệm **mới hoàn toàn** mà học **bản sâu hơn của cùng khái niệm** — đây là lý do NGSS rất gắn với tư duy "learning progression" hơn là "topics list".

**Tỉ lệ PE theo domain** (ước lượng ở K-8):
- Physical Science: ~30% PE
- Life Science: ~30% PE
- Earth & Space: ~25% PE
- Engineering: ~15% PE (đan xen các bài trong 3 domain kia)

### 3.2 Cấu trúc YCCĐ nội dung của GDPT 2018

#### 3.2.1 Cấp Tiểu học

> ⚠️ **Disclaimer**: Phần 3.2.1 viết dựa trên hiểu biết chung về Thông tư 32/2018 môn Tự nhiên và Xã hội (TN&XH 1-3) và môn Khoa học (4-5). Chưa tra cứu văn bản gốc. Cần đối chiếu trước khi phát hành chính thức.

**Môn Tự nhiên và Xã hội (lớp 1-3)** chia theo 6 chủ đề lặp lại qua ba lớp:
1. Gia đình
2. Trường học
3. Cộng đồng địa phương
4. Thực vật và động vật
5. Con người và sức khoẻ
6. Trái Đất và bầu trời

Môn này lai giữa Khoa học tự nhiên và Khoa học xã hội — các chủ đề 1, 2, 3 về con người/xã hội, các chủ đề 4, 5, 6 gần với DCI của NGSS.

**Môn Khoa học (lớp 4-5)** tập trung hơn vào khoa học tự nhiên, chia theo các mạch:
1. Chất (tính chất nước, không khí, ánh sáng, âm thanh, nhiệt)
2. Năng lượng
3. Thực vật và động vật
4. Nấm, vi khuẩn, virus
5. Con người và sức khoẻ
6. Sinh vật và môi trường
7. Trái Đất và bầu trời

YCCĐ ở tiểu học thường ngắn, bắt đầu bằng động từ cấp thấp trong thang Bloom: "nêu được", "kể được", "nhận ra", "mô tả được".

#### 3.2.2 Cấp THCS — Môn Khoa học tự nhiên

Môn KHTN THCS được xây trên **4 mạch nội dung chính** đan xen qua bốn năm (lớp 6, 7, 8, 9):

| Mạch | Chiếm % thời lượng | Tương ứng NGSS |
|---|---|---|
| **Chất và sự biến đổi của chất** | ~28% | PS1 (Matter) + một phần PS3 |
| **Năng lượng và sự biến đổi** | ~25% | PS2 (Motion/Forces), PS3 (Energy), PS4 (Waves) |
| **Vật sống** | ~30% | LS1-LS4 |
| **Trái Đất và bầu trời** | ~17% | ESS1-ESS3 |

Ngoài 4 mạch nội dung, có **chủ đề chung** xuyên suốt: **Mở đầu** (phương pháp học, an toàn phòng thực hành, dụng cụ đo). Và các **chuyên đề học tập** tự chọn (không bắt buộc).

**YCCĐ mẫu — Lớp 6, mạch "Chất và sự biến đổi của chất", chủ đề "Các thể (trạng thái) của chất"**:

> – Nêu được sự đa dạng của chất (chất có ở xung quanh chúng ta, trong các vật thể tự nhiên, vật thể nhân tạo, vật vô sinh, vật hữu sinh).
> – Trình bày được một số đặc điểm cơ bản ba thể (rắn; lỏng; khí) thông qua quan sát.
> – Nêu được khái niệm về sự nóng chảy; sự sôi; sự bay hơi; sự ngưng tụ, đông đặc.
> – Tiến hành được thí nghiệm về sự chuyển thể (trạng thái) của chất.

**(Trích Thông tư 32/2018, mục V.2, Lớp 6)**

Các động từ trong YCCĐ THCS leo thang theo Bloom: "nêu được" (knowledge) → "trình bày được" (comprehension) → "giải thích được" (analysis) → "tiến hành được"/"thiết kế được" (application/synthesis).

#### 3.2.3 So sánh cấu trúc nội dung

| Đặc điểm | NGSS | GDPT 2018 KHTN |
|---|---|---|
| Số lớp học liên quan | K-12 (13 năm) | 1-9 (9 năm ở môn TN&XH + Khoa học + KHTN) |
| Cách chia lĩnh vực | 4 domain (PS, LS, ESS, ETS) | 4 mạch (Chất, Năng lượng, Vật sống, Trái Đất) |
| Engineering | ETS là domain riêng | Không có mạch riêng (tích hợp trong "Vận dụng") |
| Progression | Explicit K-2 / 3-5 / 6-8 / 9-12 | Implicit theo từng lớp |
| YCCĐ/PE format | PE 3 chiều đan xen | YCCĐ 1 chiều nội dung, năng lực tách riêng |
| Thời lượng cả cấp | Tuỳ bang (~1-2 tiết/tuần TH, 3-5 THCS) | TH 2 tiết, THCS KHTN 4 tiết/tuần |

### 3.3 Bảng đối chiếu domain × mạch theo grade band

#### 3.3.1 Grade band K-2 (Lớp 1-2 VN)

| NGSS DCI | Sub-idea | GDPT 2018 (TN&XH 1-2) | Ghi chú |
|---|---|---|---|
| PS1 Matter | K-PS1-1 quan sát tính chất vật | Chủ đề 4 — thực vật và động vật (vật liệu trong đồ dùng) | Khớp một phần |
| PS2 Motion | K-PS2-1 push/pull | Không có tương đương trực tiếp | Có thể bù qua môn Đạo đức (đồ chơi) |
| LS1 Structure | K-LS1-1 quan sát nhu cầu sinh vật | Chủ đề 4 — nhu cầu cây cối, động vật nuôi | Khớp |
| ESS2 Weather | K-ESS2-1 thời tiết ảnh hưởng | Chủ đề 6 — Trái Đất và bầu trời (mưa/nắng) | Khớp |
| ETS1 Engineering | K-2-ETS1 define problem | Không có trong TN&XH (có ở môn Công nghệ từ lớp 3) | Bù bằng bài tích hợp |

> ⚠️ Bảng này sơ lược. Xem disclaimer §3.2.1.

#### 3.3.2 Grade band 3-5 (Lớp 3-5 VN)

| NGSS DCI | Sub-idea | GDPT 2018 (TN&XH 3 + Khoa học 4-5) | Ghi chú |
|---|---|---|---|
| PS1 Matter | 5-PS1 (chất, phản ứng đơn giản) | Khoa học 4 — mạch Chất (nước, không khí) | Khớp |
| PS3 Energy | 4-PS3 (chuyển hoá năng lượng) | Khoa học 5 — Năng lượng | Khớp |
| PS4 Waves | 4-PS4 (ánh sáng, âm thanh) | Khoa học 4 — Ánh sáng, Âm thanh | Khớp tốt |
| LS1-4 | 3-LS / 5-LS (chu trình sống, sinh sản, tiến hoá) | Khoa học 4-5 — Thực vật, Động vật, Con người | Khớp tốt |
| ESS1 Space | 5-ESS1 (hệ Mặt Trời, sao) | Khoa học 5 — Trái Đất và bầu trời | Khớp |
| ESS2-3 Earth | 5-ESS2-3 (hệ thống Trái Đất, tài nguyên) | Khoa học 5 — Sinh vật và môi trường | Khớp một phần |
| ETS1 Engineering | 3-5-ETS1 (design thinking) | Bù qua môn Tin học & Công nghệ (lớp 3-5) | Engineering tách môn |

#### 3.3.3 Grade band 6-8 (Lớp 6-8 VN — KHTN)

Đây là band có dữ liệu đầy đủ nhất (Thông tư 32/2018 có văn bản gốc). Chia theo 4 domain NGSS.

##### a. Physical Science (PS) ↔ Mạch Chất + Năng lượng

| NGSS DCI | Nội dung chính | KHTN GDPT 2018 | Lớp VN |
|---|---|---|---|
| PS1.A Structure of matter | Nguyên tử, phân tử, liên kết | Chủ đề "Chất và sự biến đổi của chất — nguyên tử, phân tử, liên kết" | 7 + 8 |
| PS1.B Chemical reactions | Phản ứng, bảo toàn khối lượng | Chủ đề "Phản ứng hoá học" | 8 |
| PS2.A Forces and Motion | Lực, vận tốc, gia tốc | Chủ đề "Lực trong đời sống" + "Chuyển động" | 6 + 7 |
| PS2.B Types of interactions | Lực hút Trái Đất, tĩnh điện, từ | Chủ đề "Trái Đất và bầu trời" (trọng lực) + "Điện và từ" | 7, 8 |
| PS3.A Definitions of energy | Các dạng năng lượng | Chủ đề "Năng lượng và sự biến đổi" | 6 + 8 |
| PS3.B Conservation | Bảo toàn năng lượng | Chủ đề "Năng lượng" | 8 + 9 |
| PS3.C Relationship of energy to forces | Công, công suất | Chủ đề "Công, công suất" | 8 |
| PS4.A Wave properties | Sóng, dao động | Chủ đề "Âm thanh" + "Ánh sáng" | 7 |
| PS4.B Electromagnetic radiation | Sóng điện từ, ánh sáng | Chủ đề "Ánh sáng" | 7 + 9 |
| PS4.C Information technologies | Truyền thông số | Không có trong KHTN (có trong Tin học) | — |

**Lệch đáng chú ý**: PS4.C (công nghệ thông tin) ở NGSS thuộc Physical Science, nhưng GDPT 2018 đặt ở môn Tin học riêng. Giáo viên KHTN không cần dạy mảng này.

##### b. Life Science (LS) ↔ Mạch Vật sống

| NGSS DCI | Nội dung chính | KHTN GDPT 2018 | Lớp VN |
|---|---|---|---|
| LS1.A Structure and function | Tế bào, cơ quan | Chủ đề "Tế bào" + "Cơ thể sinh vật" | 6 + 7 |
| LS1.B Growth and development | Vòng đời, sinh sản | Chủ đề "Sinh sản ở sinh vật" | 7 + 8 |
| LS1.C Matter and energy in organisms | Quang hợp, hô hấp | Chủ đề "Trao đổi chất và chuyển hoá năng lượng" | 7 |
| LS1.D Information processing | Giác quan, não | Chủ đề "Hệ thần kinh" | 8 |
| LS2.A Interdependent relationships | Chuỗi thức ăn, cạnh tranh | Chủ đề "Sinh vật và môi trường" | 7 + 9 |
| LS2.B Cycles of matter and energy | Chu trình sinh-địa-hoá | Chủ đề "Trao đổi chất trong hệ sinh thái" | 7 + 9 |
| LS2.C Ecosystem dynamics | Biến động hệ sinh thái | Chủ đề "Sinh vật và môi trường" | 9 |
| LS3.A Inheritance | Di truyền Mendel | Chủ đề "Di truyền và biến dị" | 9 |
| LS3.B Variation of traits | Biến dị | Chủ đề "Di truyền và biến dị" | 9 |
| LS4.A Evidence of evolution | Bằng chứng tiến hoá | Chủ đề "Tiến hoá" | 9 |
| LS4.B-D Natural selection | Chọn lọc tự nhiên, thích nghi | Chủ đề "Tiến hoá" | 9 |

**Lệch đáng chú ý**: LS3 (Di truyền) và LS4 (Tiến hoá) ở NGSS xuất hiện từ grade 7-8; GDPT 2018 dồn toàn bộ vào **lớp 9**. OpenSciedNEO Grade 7 và Grade 8 có các unit di truyền sẽ "nặng" so với lớp VN tương ứng — cần dạy như mở rộng.

##### c. Earth and Space Science (ESS) ↔ Mạch Trái Đất và bầu trời

| NGSS DCI | Nội dung chính | KHTN GDPT 2018 | Lớp VN |
|---|---|---|---|
| ESS1.A The universe | Sao, thiên hà | Chủ đề "Trái Đất và bầu trời" (sơ lược) | 6 |
| ESS1.B Earth and the solar system | Chuyển động Trái Đất-Mặt Trăng-Mặt Trời | Chủ đề "Trái Đất và bầu trời" | 6 |
| ESS1.C History of planet Earth | Địa chất, hoá thạch | Sơ lược trong chủ đề "Tiến hoá" | 9 |
| ESS2.A Earth materials and systems | Thạch quyển, thuỷ quyển | Môn Địa lí (không thuộc KHTN) | — |
| ESS2.B Plate tectonics | Kiến tạo mảng | Môn Địa lí | — |
| ESS2.C Roles of water | Chu trình nước | Chủ đề "Trao đổi chất trong hệ sinh thái" (một phần) | 7 |
| ESS2.D Weather and climate | Thời tiết, khí hậu | Môn Địa lí | — |
| ESS3.A Natural resources | Tài nguyên | Môn Địa lí + KHTN chủ đề "Sinh vật và môi trường" | 9 |
| ESS3.B Natural hazards | Thiên tai | Môn Địa lí | — |
| ESS3.C Human impacts | Tác động con người | Chủ đề "Bảo vệ môi trường" | 9 |
| ESS3.D Global climate change | Biến đổi khí hậu | Chủ đề "Bảo vệ môi trường" + Địa lí | 9 |

**Lệch lớn nhất**: Nhiều phần ESS của NGSS (ESS2.A, B, D; ESS3.B) được VN xếp vào **môn Địa lí** trong tổ hợp **Lịch sử và Địa lí THCS**, KHÔNG thuộc môn KHTN. Giáo viên KHTN triển khai OpenSciedNEO các unit Earth science (ví dụ Grade 6.3 Weather/Climate, Grade 8.5 Earth's Resources) cần **liên hệ giáo viên Địa lí** để tránh trùng lặp hoặc để phối hợp dạy tích hợp.

##### d. Engineering (ETS) ↔ "Vận dụng kiến thức, kĩ năng"

NGSS có ETS1 (Engineering Design) và ETS2 (Links among Engineering, Technology, Science, Society). Ở K-8:
- **ETS1.A** Defining problems
- **ETS1.B** Developing solutions
- **ETS1.C** Optimizing solutions

GDPT 2018 KHTN không có mạch kĩ thuật riêng. Các hoạt động thiết kế/kĩ thuật trong OpenSciEd (xây mô hình, cải tiến giải pháp) ánh xạ sang **năng lực "Vận dụng kiến thức, kĩ năng đã học"** — một trong 3 thành phần năng lực đặc thù KHTN. Tuy nhiên kĩ thuật "thuần" (thiết kế sản phẩm, kiểm định chất lượng) thuộc môn **Công nghệ** từ lớp 3 trở lên.

**Khuyến nghị**: các lesson OpenSciedNEO có "Engineering Design Challenge" (ví dụ 8.3.L12 thiết kế tàu) — giáo viên KHTN dạy dưới góc độ **ứng dụng khoa học**, không đánh giá theo chuẩn Công nghệ.

### 3.4 Ví dụ đối sánh chi tiết: Lớp 6 chủ đề "Thể của chất"

Ví dụ này minh hoạ cách đọc bảng đối chiếu ở §3.3 ở mức YCCĐ cụ thể.

**OpenSciedNEO / NGSS MS-PS1-4 (Grade 6, Unit 6.2 Thermal Energy, Lesson 5-7):**

> Develop a model that predicts and describes changes in particle motion, temperature, and state of a pure substance when thermal energy is added or removed.

Ba chiều tham gia PE:
- **SEP**: Developing and Using Models — học sinh vẽ mô hình hạt.
- **DCI**: PS1.A (cấu trúc chất, hạt) + PS3.A (năng lượng nhiệt).
- **CCC**: Cause and Effect — thêm/bớt nhiệt → thay đổi chuyển động hạt.

**GDPT 2018 / KHTN Lớp 6, mạch "Chất và sự biến đổi của chất", chủ đề "Các thể (trạng thái) của chất":**

YCCĐ liên quan (trích Thông tư 32/2018):

> – Nêu được khái niệm về sự nóng chảy; sự sôi; sự bay hơi; sự ngưng tụ, đông đặc.
> – Tiến hành được thí nghiệm về sự chuyển thể (trạng thái) của chất.
> – Trình bày được quá trình diễn ra sự chuyển thể (trạng thái): nóng chảy, đông đặc; bay hơi, ngưng tụ; sôi.

**Đối sánh:**

| Khía cạnh | NGSS MS-PS1-4 | KHTN Lớp 6 |
|---|---|---|
| Nội dung | Mô hình hạt + trạng thái + năng lượng nhiệt | Chuyển thể (5 loại) + thí nghiệm |
| Hành vi chính | **Develop a model** (xây mô hình) | **Trình bày** + **tiến hành thí nghiệm** |
| Yêu cầu về mô hình hạt | Bắt buộc (core của PE) | Không yêu cầu vẽ mô hình hạt cụ thể |
| Nhiệt-hạt liên kết | Bắt buộc | Chỉ "trình bày quá trình", không yêu cầu giải thích ở mức hạt |
| Thí nghiệm chuyển thể | Không phải trọng tâm | Bắt buộc |

**Khi dạy OpenSciedNEO Unit 6.2 Lessons 5-7 trong trường VN:**
- **Giữ**: tất cả hoạt động xây mô hình hạt (bám SEP của NGSS) — vượt YCCĐ VN nhưng phù hợp Năng lực "Tìm hiểu tự nhiên" → không xung đột.
- **Thêm**: thí nghiệm chuyển thể rõ ràng (đun nước/làm lạnh) — bắt buộc theo YCCĐ VN "tiến hành được thí nghiệm".
- **Lưu ý đánh giá**: đề kiểm tra trên lớp VN nên hỏi cả "trình bày quá trình" (YCCĐ) và "vẽ mô hình hạt" (NGSS); HS đạt "vẽ mô hình hạt" coi như đạt mức cao của YCCĐ "giải thích".

Chương 4 sẽ phân tích sâu hơn về đan xen SEP với năng lực đặc thù KHTN.

---

## 4. Chiều 2 — SEP ↔ Năng lực đặc thù KHTN

### 4.1 Science and Engineering Practices (SEP) — 8 practices NGSS

NGSS định nghĩa 8 practices học sinh thực hiện trong mọi bài học. Đây là thứ "học sinh **làm**" — khác với DCI là thứ học sinh **biết**.

| # | Tên tiếng Anh | Tiếng Việt đề xuất | Mô tả ngắn |
|---|---|---|---|
| 1 | Asking Questions and Defining Problems | Đặt câu hỏi và xác định vấn đề | Hỏi câu hỏi có thể trả lời bằng khoa học; xác định phạm vi bài toán kĩ thuật. |
| 2 | Developing and Using Models | Xây dựng và sử dụng mô hình | Vẽ sơ đồ, xây mô hình vật lí/toán để giải thích hiện tượng. |
| 3 | Planning and Carrying Out Investigations | Lập kế hoạch và tiến hành điều tra | Thiết kế thí nghiệm, thu dữ liệu trong điều kiện kiểm soát. |
| 4 | Analyzing and Interpreting Data | Phân tích và diễn giải dữ liệu | Lập bảng, vẽ biểu đồ, tìm xu hướng, đánh giá sai số. |
| 5 | Using Mathematics and Computational Thinking | Dùng toán học và tư duy tính toán | Biểu diễn bằng công thức, tính toán, lập trình đơn giản. |
| 6 | Constructing Explanations and Designing Solutions | Kiến tạo giải thích và thiết kế giải pháp | Viết lời giải thích có bằng chứng; thiết kế sản phẩm kĩ thuật. |
| 7 | Engaging in Argument from Evidence | Tham gia lập luận từ bằng chứng | Tranh luận dựa trên dữ liệu; phản biện ý kiến của bạn. |
| 8 | Obtaining, Evaluating, and Communicating Information | Thu thập, đánh giá và truyền đạt thông tin | Đọc tài liệu khoa học; viết báo cáo; trình bày cho bạn học. |

**Đặc điểm SEP quan trọng:**
1. **Gradient K-12**: mỗi practice có "progression" theo grade band. Ví dụ practice 2 (Models):
   - K-2: vẽ tranh diễn tả hiện tượng.
   - 3-5: xây mô hình 2D/3D, so sánh với hiện tượng thật.
   - 6-8: xây mô hình giải thích cơ chế ở mức vi mô/vĩ mô.
   - 9-12: mô hình toán học có khả năng dự đoán định lượng.
2. **Không phải rời rạc**: một bài học OpenSciEd thường dùng 3-4 practices đồng thời.
3. **Practice 1 và 7** là core của văn hoá lớp học sensemaking — học sinh đặt câu hỏi thật và tranh luận thật, không chỉ trả lời câu hỏi giáo viên đã có đáp án.

### 4.2 Ba thành phần năng lực đặc thù KHTN (GDPT 2018)

GDPT 2018 mô tả năng lực KHTN gồm **3 thành phần**, mỗi thành phần có danh sách **biểu hiện cụ thể** (trích Thông tư 32/2018 mục IV.2):

#### 4.2.1 Nhận thức khoa học tự nhiên

Biểu hiện cốt lõi (trích nguyên văn, rút gọn):
- Nhận biết và nêu được tên các sự vật, hiện tượng, khái niệm, quy luật, quá trình của tự nhiên.
- Trình bày được các sự vật, hiện tượng; vai trò của các sự vật, hiện tượng và các quá trình tự nhiên bằng các hình thức biểu đạt như ngôn ngữ nói, viết, công thức, sơ đồ, biểu đồ,….
- So sánh, phân loại, lựa chọn được các sự vật, hiện tượng, quá trình tự nhiên theo các tiêu chí khác nhau.
- Phân tích được các đặc điểm của một sự vật, hiện tượng, quá trình của tự nhiên theo logic nhất định.
- Giải thích được mối quan hệ giữa các sự vật và hiện tượng (quan hệ nguyên nhân - kết quả, cấu tạo - chức năng, ...).

**Đây là thành phần gần nhất với "hiểu biết về DCI" của NGSS.**

#### 4.2.2 Tìm hiểu tự nhiên

Biểu hiện có cấu trúc 5 bước rõ ràng (trích Thông tư 32/2018):

1. **Đề xuất vấn đề, đặt câu hỏi cho vấn đề**
2. **Đưa ra phán đoán và xây dựng giả thuyết**
3. **Lập kế hoạch thực hiện**
4. **Thực hiện kế hoạch** (thu thập, xử lí dữ liệu, so sánh với giả thuyết)
5. **Viết, trình bày báo cáo và thảo luận**
6. **Ra quyết định và đề xuất ý kiến**

**Đây là thành phần gần nhất với SEP của NGSS** — quy trình tìm hiểu khoa học.

#### 4.2.3 Vận dụng kiến thức, kĩ năng đã học

Biểu hiện cốt lõi:
- Nhận ra, giải thích được vấn đề thực tiễn dựa trên kiến thức khoa học tự nhiên.
- Dựa trên hiểu biết và các cứ liệu điều tra, nêu được các giải pháp và thực hiện được một số giải pháp để bảo vệ tự nhiên; thích ứng với biến đổi khí hậu; có hành vi, thái độ phù hợp với yêu cầu phát triển bền vững.

**Đây là thành phần gần nhất với ETS (Engineering) + CCC (Cause & Effect) trong bối cảnh xã hội** — vận dụng khoa học giải quyết vấn đề đời sống.

### 4.3 Bảng đối chiếu 8 SEP ↔ 3 thành phần năng lực đặc thù KHTN

Mỗi SEP được map về một hoặc nhiều biểu hiện cụ thể của năng lực KHTN. Không có ánh xạ một-một; nhiều SEP lan sang 2-3 thành phần.

| SEP (NGSS) | Thành phần NL KHTN chính | Biểu hiện khớp nhất (trích Thông tư 32/2018) |
|---|---|---|
| **1. Asking Questions / Defining Problems** | Tìm hiểu tự nhiên | "Đề xuất vấn đề, đặt câu hỏi cho vấn đề" — Nhận ra và đặt được câu hỏi liên quan đến vấn đề. |
| **2. Developing and Using Models** | Nhận thức KHTN + Tìm hiểu tự nhiên | "Trình bày được các sự vật, hiện tượng… bằng các hình thức biểu đạt như ngôn ngữ nói, viết, công thức, sơ đồ, biểu đồ,…" + "Sử dụng được ngôn ngữ, hình vẽ, sơ đồ, biểu bảng để biểu đạt quá trình và kết quả tìm hiểu". |
| **3. Planning and Carrying Out Investigations** | Tìm hiểu tự nhiên | "Lập kế hoạch thực hiện" + "Thực hiện kế hoạch" — Xây dựng khung logic, lựa chọn phương pháp, thu thập dữ liệu. |
| **4. Analyzing and Interpreting Data** | Tìm hiểu tự nhiên | "Đánh giá được kết quả dựa trên phân tích, xử lí các dữ liệu bằng các tham số thống kê đơn giản". |
| **5. Using Mathematics and Computational Thinking** | Nhận thức KHTN + Tìm hiểu tự nhiên | "Trình bày được… công thức" + "Đánh giá được kết quả dựa trên… các tham số thống kê đơn giản". |
| **6. Constructing Explanations / Designing Solutions** | Nhận thức KHTN + Vận dụng | "Giải thích được mối quan hệ giữa các sự vật và hiện tượng" + "Dựa trên hiểu biết và các cứ liệu điều tra, nêu được các giải pháp… để bảo vệ tự nhiên". |
| **7. Engaging in Argument from Evidence** | Tìm hiểu tự nhiên | "Hợp tác được với đối tác bằng thái độ lắng nghe tích cực và tôn trọng quan điểm, ý kiến đánh giá do người khác đưa ra để tiếp thu tích cực và giải trình, phản biện, bảo vệ kết quả tìm hiểu một cách thuyết phục". |
| **8. Obtaining, Evaluating, Communicating Information** | Tìm hiểu tự nhiên | "Viết được báo cáo sau quá trình tìm hiểu" + "Tìm được từ khoá, sử dụng được thuật ngữ khoa học, kết nối được thông tin theo logic có ý nghĩa". |

**Quan sát quan trọng:**

1. **7/8 SEP map chính yếu sang "Tìm hiểu tự nhiên"** — thành phần này rộng hơn hẳn hai thành phần còn lại. Một giáo viên dạy theo GDPT 2018 cần hiểu "Tìm hiểu tự nhiên" không chỉ là "thí nghiệm" mà là **toàn bộ quy trình tìm hiểu có cấu trúc**.
2. **SEP 2 (Models)** là điểm GDPT 2018 có thể "nhẹ" hơn NGSS. Biểu hiện GDPT 2018 chỉ nói đến "biểu đạt bằng sơ đồ, hình vẽ", không yêu cầu "mô hình có khả năng dự đoán". OpenSciedNEO đòi hỏi mô hình dự đoán — đây là "giá trị cộng thêm" so với chuẩn VN.
3. **SEP 7 (Argument)** map sang đoạn ngắn "phản biện, bảo vệ kết quả tìm hiểu" trong GDPT 2018 — biểu hiện này yếu hơn rõ so với NGSS. OpenSciedNEO có hoạt động "Scientists Circle" đặc trưng để học sinh tranh luận; khi dạy ở VN nên giữ vì rèn được năng lực hiếm được quy định đầy đủ.
4. **SEP 5 (Math/Computing)** chỉ được GDPT 2018 nhắc qua "tham số thống kê đơn giản" và "công thức". Khi OpenSciEd dùng mô hình toán phức (hồi quy tuyến tính, đồ thị hàm) giáo viên có thể giảm độ phức tạp mà không vi phạm chuẩn.

### 4.4 Ví dụ cụ thể: Lesson "Vì sao khinh khí cầu bay?" (Grade 6 Unit 1 Lesson 3)

Đây là lesson thực của OpenSciedNEO Grade 6 Unit 1 (One-Way Mirror) — phân tích SEP sử dụng và map sang biểu hiện năng lực KHTN.

**Tóm tắt lesson**:
Học sinh xem video khinh khí cầu bay lên khi đốt lửa bên dưới. Giáo viên đặt câu hỏi neo: "Điều gì xảy ra với không khí trong quả bóng khi đốt lửa?"

**Các hoạt động và SEP tương ứng:**

| Hoạt động | SEP | Biểu hiện NL KHTN đạt được |
|---|---|---|
| HS đặt câu hỏi về hiện tượng (nhóm) | SEP 1 Asking Questions | "Nhận ra và đặt được câu hỏi liên quan đến vấn đề" (Tìm hiểu tự nhiên bước 1) |
| HS vẽ sơ đồ hạt bên trong bóng trước/sau khi đốt | SEP 2 Models | "Trình bày được… bằng hình vẽ, sơ đồ" (Nhận thức KHTN) |
| HS thảo luận nhóm: mô hình của ai giải thích tốt hơn? | SEP 7 Argument | "Lắng nghe tích cực và tôn trọng quan điểm" + "phản biện, bảo vệ kết quả" (Tìm hiểu tự nhiên bước 6) |
| HS đề xuất thí nghiệm kiểm chứng | SEP 1 + 3 | "Đề xuất vấn đề" + "Lập kế hoạch thực hiện" (Tìm hiểu tự nhiên bước 1, 3) |
| Cả lớp đồng thuận câu hỏi nghiên cứu: "Nhiệt làm thay đổi gì trong chuyển động hạt?" | SEP 6 Constructing Explanations | "Xây dựng và phát biểu được giả thuyết cần tìm hiểu" (Tìm hiểu tự nhiên bước 2) |

**Đối sánh YCCĐ cụ thể lớp 6**:

Lesson này không map 1-1 với YCCĐ nào của KHTN lớp 6 (vì chủ đề "khí áp, khí động học" không có trong Chương trình 6), nhưng phù hợp với:
- Mạch "Chất và sự biến đổi của chất" — YCCĐ "Nêu được khái niệm về sự bay hơi, ngưng tụ" (khi mở rộng giải thích khí nóng giãn nở).
- Mạch "Năng lượng và sự biến đổi" — YCCĐ "Nêu được sự truyền năng lượng từ vật nóng sang vật lạnh".

**Hướng dẫn giáo viên**:
- Lesson này **vượt chuẩn KHTN 6** ở chỗ yêu cầu "mô hình hạt" (thuộc Lớp 7 VN).
- **Cách xử lý**: dùng lesson ở mức "hoạt động khám phá" đầu năm lớp 6, mô hình hạt dạy ở mức định tính (hạt chuyển động nhanh hơn khi nóng) — không yêu cầu định lượng.
- Khi học sinh lên Lớp 7 học chủ đề "Nguyên tử, phân tử" có thể quay lại hiện tượng này làm ví dụ minh hoạ.

Phân tích tương tự có thể áp dụng cho mọi lesson OpenSciedNEO. Tóm lại:
- **Biên soạn bám SEP của OpenSciEd**: cho tiết học nào cần đặc biệt rèn SEP nào → viết rõ trong hướng dẫn giáo viên.
- **Đánh giá theo thành phần năng lực KHTN**: giáo viên VN đánh giá học sinh theo Thông tư 22/2021 (đánh giá THCS), lập cột đánh giá theo 3 thành phần (Nhận thức / Tìm hiểu / Vận dụng). Các hoạt động SEP ở đâu sẽ đổ vào cột nào → bảng §4.3 chỉ rõ.

## 5. Chiều 3 — CCC ↔ Tích hợp liên môn và năng lực chung

### 5.1 Crosscutting Concepts (CCC) — 7 lăng kính tư duy của NGSS

CCC là chiều khó "dịch" nhất vì GDPT 2018 không có tương đương trực tiếp. CCC là **7 lăng kính tư duy** mà học sinh dùng để nhìn hiện tượng — nó xuyên qua mọi lĩnh vực khoa học.

| # | Tên | Tiếng Việt | Câu hỏi lăng kính |
|---|---|---|---|
| 1 | Patterns | Mô thức/Quy luật | "Ta thấy mô thức nào lặp lại?" |
| 2 | Cause and Effect | Nguyên nhân - Kết quả | "Điều gì gây ra điều gì?" |
| 3 | Scale, Proportion, and Quantity | Tỉ lệ, quy mô, số lượng | "Ở quy mô nào hiện tượng này quan trọng?" |
| 4 | Systems and System Models | Hệ thống và mô hình hệ thống | "Thành phần nào, tương tác nào, ranh giới ở đâu?" |
| 5 | Energy and Matter | Năng lượng và Vật chất | "Năng lượng và vật chất đi đâu trong hệ?" |
| 6 | Structure and Function | Cấu trúc và Chức năng | "Cấu trúc này làm được gì? Vì sao?" |
| 7 | Stability and Change | Cân bằng và Biến đổi | "Cái gì ổn định? Cái gì thay đổi? Vì sao?" |

**Điểm đặc trưng của CCC:**
- CCC không dạy như bài riêng — nó là **lăng kính học sinh đeo suốt năm học**.
- Mỗi PE của NGSS gắn với 1-2 CCC. Ví dụ MS-PS1-4 có CCC Cause and Effect.
- CCC tạo **tính nhất quán tư duy** giữa các lĩnh vực — khi học Sinh học nói "cấu trúc quyết định chức năng" thì khi sang Vật lí nói "cấu trúc hạt quyết định tính chất vĩ mô" học sinh nhận ra đây là cùng lăng kính.

### 5.2 Khoảng trống CCC trong GDPT 2018 — và cách bù đắp

GDPT 2018 **không có tầng CCC tương đương**. Đây là khác biệt cấu trúc lớn nhất giữa hai khung.

**Thứ gần nhất trong GDPT 2018**:

#### 5.2.1 Năng lực chung (cho mọi môn)

GDPT 2018 quy định 3 năng lực chung áp dụng cho mọi môn học:

| Năng lực chung | Gần với CCC nào | Ghi chú |
|---|---|---|
| **Tự chủ và tự học** | Không gần CCC nào rõ | Là năng lực học tập, không phải lăng kính khoa học |
| **Giao tiếp và hợp tác** | Không gần CCC nào | Năng lực xã hội |
| **Giải quyết vấn đề và sáng tạo** | CCC 2 (Cause & Effect) + CCC 7 (Stability & Change) | Bao gồm xác định vấn đề, phân tích nguyên nhân, đề xuất giải pháp |

Năng lực chung rộng hơn CCC (bao cả giao tiếp, hợp tác) nhưng cũng "nông" hơn ở khía cạnh tư duy khoa học.

#### 5.2.2 Biểu hiện "Nhận thức KHTN" có hơi hướm CCC

Một số biểu hiện thuộc thành phần "Nhận thức KHTN" (§4.2.1) gần với CCC:

| Biểu hiện (trích Thông tư 32/2018) | CCC tương ứng |
|---|---|
| "Giải thích được mối quan hệ giữa các sự vật và hiện tượng (quan hệ nguyên nhân - kết quả, cấu tạo - chức năng, ...)" | CCC 2 Cause & Effect + CCC 6 Structure & Function |
| "So sánh, phân loại, lựa chọn được các sự vật, hiện tượng, quá trình tự nhiên theo các tiêu chí khác nhau" | CCC 1 Patterns (phần nào) |
| "Phân tích được các đặc điểm của một sự vật, hiện tượng, quá trình của tự nhiên theo logic nhất định" | CCC 4 Systems (phần nào) |

Nhưng **không có biểu hiện đề cập trực tiếp**: CCC 3 (Scale), CCC 5 (Energy & Matter), CCC 7 (Stability & Change).

#### 5.2.3 Bù đắp khi triển khai OpenSciedNEO

**Khuyến nghị thực tiễn**:

1. **Không ép CCC vào YCCĐ**: CCC là tư duy, không phải chuẩn đánh giá. Không cần ra đề "trình bày mô thức của...". Thay vào đó, **dùng câu hỏi CCC trong quá trình dạy** ("Em thấy có mô thức nào lặp lại?", "Cái gì gây ra cái gì?").

2. **Gán CCC vào mạch tích hợp**: GDPT 2018 đặt nặng "tích hợp liên môn". CCC là công cụ tự nhiên để tích hợp:
   - **CCC 4 Systems** → tích hợp KHTN - Địa lí (hệ sinh thái - hệ Trái Đất).
   - **CCC 5 Energy and Matter** → tích hợp Vật lí - Hoá - Sinh (năng lượng đi qua chuỗi thức ăn).
   - **CCC 1 Patterns** → tích hợp KHTN - Toán (biểu đồ, hàm số).

3. **Viết vào kế hoạch bài dạy của giáo viên**: khi biên soạn tài liệu giáo viên VN cho OpenSciedNEO, mỗi lesson nên có dòng "**Lăng kính tư duy nổi bật**: CCC X" để giáo viên ý thức.

### 5.3 Bảng đối chiếu 7 CCC ↔ tương ứng GDPT 2018

| CCC | Tương ứng gần nhất trong GDPT 2018 | Mức độ | Cách bù đắp trong OpenSciedNEO-VN |
|---|---|---|---|
| **1. Patterns** | "So sánh, phân loại, lựa chọn" (biểu hiện NT KHTN) | Trung bình | Dùng câu hỏi "Em thấy gì lặp lại?" trong mọi lesson. |
| **2. Cause and Effect** | "Giải thích được mối quan hệ nguyên nhân - kết quả" (biểu hiện NT KHTN) | Mạnh | GDPT 2018 đã nhắc rõ. Dạy như bình thường. |
| **3. Scale, Proportion, Quantity** | (Không có biểu hiện riêng) | Yếu | Liên hệ môn Toán. Trong KHTN lớp 6-9 không bắt buộc. Giáo viên khuyến khích khi dạy hạt (nm), vũ trụ (năm ánh sáng). |
| **4. Systems and System Models** | "Phân tích được đặc điểm theo logic nhất định" + mạch tích hợp | Trung bình | Dạy tường minh khi lesson nói về hệ sinh thái, hệ tuần hoàn. Vẽ sơ đồ hệ thống là SEP 2 + CCC 4. |
| **5. Energy and Matter** | Mạch "Năng lượng" + "Chất và sự biến đổi của chất" (nội dung) | Mạnh ở cấp nội dung, không có ở cấp tư duy | Khi học chuỗi thức ăn, quang hợp — chỉ rõ cho học sinh đây là "theo dõi năng lượng và vật chất đi qua hệ". |
| **6. Structure and Function** | "Giải thích được mối quan hệ cấu tạo - chức năng" (biểu hiện NT KHTN) | Mạnh | GDPT 2018 đã nhắc. Dạy bình thường. |
| **7. Stability and Change** | (Không có biểu hiện riêng) | Yếu | Đặc biệt quan trọng cho lesson khí hậu, hệ sinh thái. Giáo viên cần thêm câu hỏi "Cái gì giữ ổn định? Cái gì thay đổi?". |

**Quan sát**:
- **3 CCC mạnh** (Cause & Effect, Structure & Function, Energy & Matter) — GDPT 2018 đã đề cập đủ để dạy.
- **2 CCC trung bình** (Patterns, Systems) — có nhắc nhưng không làm trọng tâm, cần giáo viên tự nhấn.
- **2 CCC yếu** (Scale, Stability & Change) — GDPT 2018 hầu như không đề cập. Nếu biên soạn tài liệu VN cho OpenSciedNEO, **ưu tiên viết rõ về 2 CCC này trong hướng dẫn giáo viên**.

Tổng quan: CCC là vùng "giá trị cộng thêm" rõ ràng nhất khi dùng OpenSciedNEO so với giáo án KHTN thuần VN — học sinh rèn tư duy xuyên lĩnh vực hiếm được quy định cụ thể trong chuẩn VN.

## 6. Phẩm chất chủ yếu và văn hoá lớp học STEM

### 6.1 5 phẩm chất chủ yếu GDPT 2018

GDPT 2018 quy định **5 phẩm chất chủ yếu** hình thành qua mọi môn học:

| Phẩm chất | Biểu hiện trong môn KHTN |
|---|---|
| **Yêu nước** | Quan tâm đến thiên nhiên quê hương, bảo vệ môi trường bản địa, tự hào về khoa học công nghệ VN. |
| **Nhân ái** | Tôn trọng sự sống, đa dạng sinh học, lắng nghe quan điểm của bạn trong tranh luận khoa học. |
| **Chăm chỉ** | Kiên trì thí nghiệm, đọc tài liệu khoa học, ghi chép cẩn thận. |
| **Trung thực** | Báo cáo dữ liệu thí nghiệm đúng như đã thu (kể cả khi kết quả không như mong đợi); không sao chép. |
| **Trách nhiệm** | Tuân thủ an toàn phòng thực hành; hoàn thành phần việc trong nhóm; bảo vệ tài sản chung. |

Phẩm chất được đánh giá định tính trong sổ đánh giá định kỳ, KHÔNG cho điểm số trực tiếp.

### 6.2 NGSS và văn hoá lớp học — tương đương không chính thức

NGSS **không quy định phẩm chất** tương đương. Tuy nhiên OpenSciEd (một implementation của NGSS) xây dựng chương trình trên **văn hoá lớp học sensemaking** với các nguyên tắc ngầm:

| Nguyên tắc OpenSciEd | Phẩm chất GDPT 2018 tương ứng |
|---|---|
| **Equity & Access** — mọi học sinh được lên tiếng, ý kiến bình đẳng | Nhân ái (tôn trọng) + Trách nhiệm |
| **Student Agency** — học sinh chủ động đặt câu hỏi, dẫn dắt điều tra | Chăm chỉ + Trách nhiệm |
| **Sensemaking** — học sinh xây dựng hiểu biết từ bằng chứng, không "chờ" giáo viên cho câu trả lời | Trung thực (với dữ liệu) |
| **Collaboration** — làm việc nhóm, Scientists Circles | Nhân ái + Trách nhiệm |
| **Real-world relevance** — neo vào hiện tượng học sinh quan tâm | Yêu nước (khi phenomena địa phương) |

**Quan sát**: văn hoá lớp học OpenSciEd phủ gần đủ 5 phẩm chất, trừ **Yêu nước** — cần giáo viên VN **địa phương hoá hiện tượng** (ví dụ: thay "Storms on the ocean" bằng "Bão sông Hồng") thì mới đạt.

### 6.3 Hàm ý biên soạn

Khi viết tài liệu giáo viên VN cho OpenSciedNEO, mỗi unit nên có mục:

> **Phẩm chất hình thành qua Unit X.Y**:
> - **Trung thực**: Lesson N có hoạt động ghi dữ liệu thí nghiệm — nhấn mạnh ghi đúng, kể cả khi khác dự đoán.
> - **Trách nhiệm**: Lesson M có Scientists Circle — phân vai facilitator/recorder/timekeeper.
> - **Yêu nước**: địa phương hoá phenomena từ "Yellowstone" sang "Vườn quốc gia Cát Tiên".

Cách này:
1. Giúp giáo viên check box "đã giáo dục phẩm chất" khi làm sổ đánh giá.
2. Không thay đổi nội dung khoa học của OpenSciEd.
3. Tạo phiên bản OpenSciedNEO thực sự "Việt hoá" chứ không chỉ dịch.

## 7. Đánh giá — Assessment

### 7.1 NGSS 3D Performance Expectations

NGSS yêu cầu đánh giá **3 chiều đan xen trong một nhiệm vụ**. Một câu hỏi kiểm tra chuẩn NGSS sẽ yêu cầu học sinh:
- **Dùng kiến thức DCI** (biết)
- **Thực hiện SEP** (làm)
- **Dùng lăng kính CCC** (nhìn)

Ví dụ nhiệm vụ đánh giá MS-PS1-4:
> Cho dữ liệu nhiệt độ và trạng thái của nước trong thí nghiệm đun. Hãy:
> 1. Vẽ mô hình hạt của nước trước, trong, và sau khi đun. (SEP 2 + DCI PS1.A)
> 2. Giải thích nguyên nhân thay đổi trạng thái dựa trên mô hình hạt. (SEP 6 + CCC Cause & Effect + DCI PS3.A)

Học sinh đạt khi làm được cả 2 yêu cầu (không tách điểm DCI/SEP/CCC).

**Hình thức đánh giá phổ biến trong NGSS**:
- **Performance task** (nhiệm vụ thực hành) — 30-60 phút, kéo dài qua nhiều lesson.
- **Embedded assessment** — gắn vào hoạt động lesson thường ngày.
- **Portfolio** — thu thập bằng chứng qua nhiều bài.

Ít dùng: trắc nghiệm thuần (vì khó đo SEP và CCC trong 1 câu trắc nghiệm).

### 7.2 Đánh giá năng lực theo GDPT 2018

GDPT 2018 quy định đánh giá theo năng lực, không theo nội dung. Cấu trúc chung:

| Hình thức | Thời điểm | Kết quả |
|---|---|---|
| **Đánh giá thường xuyên** | Trong quá trình học | Định tính: nhận xét; hoặc định lượng: điểm |
| **Đánh giá định kỳ** | Giữa kỳ, cuối kỳ | Điểm số (thang 10) |
| **Đánh giá phẩm chất** | Cả năm | Mức đánh giá: Tốt / Đạt / Cần cố gắng |

Các văn bản liên quan ngoài Thông tư 32/2018:
- **Thông tư 26/2020/TT-BGDĐT** — sửa đổi Quy chế đánh giá học sinh THCS, THPT.
- **Thông tư 22/2021/TT-BGDĐT** — Quy định đánh giá học sinh THCS, THPT (hiện hành).
- **Thông tư 27/2020/TT-BGDĐT** — Quy định đánh giá học sinh tiểu học.

Ghi chú: hai Thông tư 22 và 27 **chỉ được nhắc tên** trong tài liệu này, không phân tích sâu (xem design §D-4).

**Đặc điểm Đánh giá THCS môn KHTN theo Thông tư 22/2021**:
- Môn KHTN thuộc nhóm **đánh giá bằng nhận xét kết hợp điểm số**.
- Cột điểm thường có:
  - Đánh giá thường xuyên: ít nhất 4 cột (bài quiz, bài thuyết trình, báo cáo thí nghiệm, phiếu học tập).
  - Đánh giá định kỳ: 2 bài (giữa kỳ + cuối kỳ) mỗi học kỳ.
- Bài kiểm tra định kỳ: kết hợp trắc nghiệm + tự luận, thời gian 45-90 phút.

### 7.3 Tương thích và xung đột khi đánh giá OpenSciedNEO theo chuẩn VN

**Tương thích mạnh:**
- Bài **Performance task** của OpenSciedNEO (vẽ mô hình, viết giải thích) → dùng làm "Báo cáo thí nghiệm" hoặc "Phiếu học tập" — một cột đánh giá thường xuyên.
- **Embedded assessment** tự nhiên ăn vào lớp — giáo viên quan sát, ghi nhận xét, phù hợp "đánh giá thường xuyên bằng nhận xét".

**Xung đột tiềm tàng:**

| Vấn đề | Nguyên nhân | Giải pháp |
|---|---|---|
| Bài kiểm tra định kỳ 45' theo VN khó đánh giá đầy đủ 3D của NGSS | Thời gian ngắn, format cố định | Tách: ở định kỳ đánh giá Nhận thức KHTN (DCI); ở thường xuyên đánh giá Tìm hiểu tự nhiên (SEP). Đề định kỳ có 1 câu tự luận "Vẽ mô hình + giải thích". |
| Portfolio NGSS không dễ ghi vào sổ điểm VN | Sổ điểm yêu cầu số cột cụ thể | Gộp portfolio vào 1 cột đánh giá thường xuyên, giáo viên tự ghi rubric nội bộ. |
| Trắc nghiệm VN không đo SEP/CCC | Format trắc nghiệm chọn đáp án | Tăng tỉ lệ tự luận lên ≥50% bài định kỳ; thiết kế câu hỏi yêu cầu vẽ sơ đồ/giải thích. |
| "Không cho điểm phẩm chất" VN vs văn hoá OpenSciEd | GDPT 2018 đánh giá phẩm chất định tính | OK — dùng sổ nhận xét phẩm chất bình thường. Văn hoá OpenSciEd không cần điểm. |

**Khuyến nghị**: biên soạn tài liệu phụ đạo giáo viên VN cho OpenSciedNEO — có **ngân hàng đề định kỳ** tham khảo, mỗi bài giữ 3D NGSS nhưng format theo chuẩn VN (tỉ lệ TN/TL, thang điểm 10).

## 8. Hàm ý triển khai OpenSciedNEO

Chương này đúc kết các hàm ý từ chương 3-7 thành hành động cụ thể cho 3 nhóm đối tượng.

### 8.1 Giáo viên KHTN

**Cần bổ sung từ GDPT 2018 vào mỗi lesson OpenSciedNEO:**

1. **Đánh giá phẩm chất** — viết một dòng nhận xét vào sổ: "Em X trung thực khi báo cáo dữ liệu", "Em Y chăm chỉ hoàn thành thí nghiệm". (Không tốn nhiều thời gian nếu làm quen.)
2. **Địa phương hoá hiện tượng** — khi lesson dùng phenomena Mỹ (bão Yellowstone, chim finch Galapagos...), **đổi sang** phenomena VN tương đương (bão sông Hồng, chim yến Khánh Hoà). Điều này giúp đạt phẩm chất "Yêu nước" và tăng engagement.
3. **Ghi rõ YCCĐ khớp** — trong kế hoạch bài dạy (giáo án), cột "YCCĐ đạt được" điền từ Thông tư 32/2018 (phụ lục §9.B dưới đây). Tránh để "mơ" không khớp chuẩn VN.
4. **Bổ sung thí nghiệm bắt buộc VN** — một số chủ đề KHTN có YCCĐ "Tiến hành được thí nghiệm…". Nếu OpenSciedNEO không có thí nghiệm tương ứng, thêm vào (thường 10-15 phút).

**Cái KHÔNG cần thay đổi:**
- Giữ nguyên cấu trúc 3 chiều đan xen của OpenSciedNEO (DCI + SEP + CCC).
- Giữ văn hoá Scientists Circle, peer critique, consensus model.
- Giữ hoạt động vẽ mô hình hạt (vượt chuẩn — coi như phần mở rộng).

### 8.2 Tổ trưởng chuyên môn / Cán bộ quản lý

**Cần làm khi phê duyệt dùng OpenSciedNEO:**

1. **Check mapping 4 mạch KHTN** — đối chiếu scope & sequence OpenSciedNEO với 4 mạch Chất/Năng lượng/Vật sống/Trái Đất của KHTN VN. Xem bảng §3.3.3.
2. **Phê duyệt sổ điểm** — OpenSciedNEO dùng performance task thay trắc nghiệm nhiều; cần duyệt format sổ điểm phù hợp Thông tư 22/2021 (số cột, tỉ lệ).
3. **Phối hợp liên môn** — nhiều phần Earth Science (ESS2.A-D) ở OpenSciedNEO thuộc môn Địa lí ở VN. Tổ KHTN và tổ Lịch sử-Địa lí cần hợp đồng trước năm học để tránh trùng hoặc bỏ.
4. **Đào tạo SEP và CCC** — giáo viên KHTN VN không quen thuật ngữ SEP/CCC. Tập huấn 1-2 buổi trước khi triển khai.

### 8.3 Rủi ro và khuyến nghị

**Rủi ro cấp hệ thống (cần lưu ý ở cấp Sở, Bộ):**

| Rủi ro | Mô tả | Giảm thiểu |
|---|---|---|
| Thanh tra không hiểu format OpenSciedNEO | Giáo án không giống mẫu VN → bị phê | Tổ chức tập huấn thanh tra; kèm tài liệu đối chiếu này |
| Thi THCS/THPT không theo 3D | Đề thi vẫn nặng trắc nghiệm kiến thức | Học sinh vẫn phải ôn format đề thi VN song song; OpenSciedNEO cho hiểu sâu, ôn thi riêng |
| Lớp 9 không cover | OpenSciedNEO dừng ở Grade 8; KHTN VN có lớp 9 | Trường tự chọn tài liệu KHTN 9 (có thể OpenSciedNEO HS hoặc SGK VN) |
| Đầu tư vật tư thí nghiệm | OpenSciedNEO dùng nhiều dụng cụ (đèn, cảm biến...) | Cân nhắc gói đầu tư trung bình/năm; ưu tiên vật tư tái sử dụng |

**Khuyến nghị chiến lược:**
1. Triển khai **thí điểm 1 năm** với 1-2 lớp; thu feedback từ giáo viên, học sinh, phụ huynh.
2. **Không thay thế** SGK KHTN chính thống — OpenSciedNEO làm **tài liệu bổ trợ** trong năm thí điểm.
3. Sau 1 năm, nếu tốt, mới tính chuyển thành tài liệu chính (cần được Sở GD&ĐT phê duyệt).
4. Xây **ngân hàng đề định kỳ VN-compatible** từ nguồn OpenSciedNEO — ưu tiên cao.

## 9. Phụ lục

### 9.A Glossary thuật ngữ NGSS ↔ GDPT 2018

| Tiếng Anh (NGSS) | Tiếng Việt đề xuất | Thuật ngữ GDPT 2018 tương ứng (nếu có) | Ghi chú |
|---|---|---|---|
| Performance Expectation (PE) | Yêu cầu hiệu năng (PE) | Yêu cầu cần đạt (YCCĐ) | Không hoàn toàn tương đương: PE đan 3 chiều, YCCĐ 1 chiều |
| Three Dimensions | Ba chiều | — | Khái niệm thuần NGSS |
| Disciplinary Core Ideas (DCI) | Ý tưởng cốt lõi theo lĩnh vực | YCCĐ về nội dung (theo mạch) | Đối sánh nội dung |
| Science and Engineering Practices (SEP) | Hoạt động khoa học và kĩ thuật | Năng lực đặc thù KHTN — thành phần "Tìm hiểu tự nhiên" | Đối sánh quy trình |
| Crosscutting Concepts (CCC) | Khái niệm xuyên ngành | Không có tương đương | Khoảng trống; xem §5.2 |
| Anchor Phenomenon | Hiện tượng neo | Tình huống thực tiễn mở đầu | Triết lý chung, VN không có từ chính thức |
| Sensemaking | Kiến tạo ý nghĩa | — | Thuật ngữ văn hoá lớp học, không có trong GDPT 2018 |
| Scientists Circle | Vòng tròn nhà khoa học | Thảo luận nhóm / Hội thảo lớp | Practice riêng của OpenSciEd |
| Consensus Model | Mô hình đồng thuận | Mô hình cả lớp xây dựng | — |
| Learning Progression | Tiến trình học tập | Mạch nội dung (một phần) | — |
| Engineering Design | Thiết kế kĩ thuật | Năng lực "Vận dụng kiến thức, kĩ năng" + môn Công nghệ | Phân vùng khác nhau giữa 2 khung |
| Next Generation Science Standards | Chuẩn khoa học thế hệ mới | — | Tên riêng |
| OpenSciEd | OpenSciEd (giữ nguyên) | — | Tên riêng |
| GDPT 2018 | Chương trình GDPT 2018 | Tên đầy đủ: Chương trình giáo dục phổ thông 2018 | Ban hành kèm TT 32/2018 |
| KHTN | Khoa học tự nhiên | Môn học THCS 6-9 | — |
| Năng lực chung | General competencies | 21st century skills (gần nhất) | 3 NL chung GDPT 2018 |
| Năng lực đặc thù | Subject-specific competencies | — | Chỉ có khái niệm này ở GDPT 2018 |
| Phẩm chất | Character virtues / Qualities | — | 5 phẩm chất GDPT 2018 |

### 9.B Trích YCCĐ đầy đủ lớp 6, 7, 8 môn KHTN

> Nguồn: Thông tư 32/2018/TT-BGDĐT, Phụ lục môn Khoa học tự nhiên, mục V. Nội dung giáo dục.

Dưới đây liệt kê chủ đề và YCCĐ chính của 3 lớp 6-7-8. **Không trích lớp 9** (ngoài scope OpenSciedNEO).

#### Lớp 6

**Chủ đề mở đầu:**
- Giới thiệu về KHTN; Một số dụng cụ đo; Quy định an toàn trong phòng thực hành.

**Mạch "Chất và sự biến đổi của chất":**
- Các thể (trạng thái) của chất.
- Oxygen (oxi) và không khí.
- Một số vật liệu thông dụng.
- Một số nguyên liệu, nhiên liệu, lương thực - thực phẩm.
- Hỗn hợp, tách chất ra khỏi hỗn hợp.

**Mạch "Vật sống":**
- Tế bào — đơn vị cơ sở của sự sống.
- Từ tế bào đến cơ thể.
- Đa dạng thế giới sống (virus, vi khuẩn, nguyên sinh vật, nấm, thực vật, động vật).

**Mạch "Năng lượng và sự biến đổi":**
- Lực.
- Năng lượng.

**Mạch "Trái Đất và bầu trời":**
- Chuyển động nhìn thấy của Mặt Trời, Mặt Trăng; hệ Mặt Trời và Ngân Hà.

*(Liệt kê đầy đủ YCCĐ cho từng chủ đề — xem source `docs/source-pdfs/gdpt-2018/ctkhtn-6-9.txt` dòng ~400-700 hoặc `yccd-parsed.json` key "6".)*

#### Lớp 7

**Mạch "Chất và sự biến đổi của chất":**
- Nguyên tử; Nguyên tố hoá học.
- Sơ lược về bảng tuần hoàn các nguyên tố hoá học.
- Phân tử; Đơn chất; Hợp chất.
- Liên kết hoá học.
- Hoá trị; Công thức hoá học.

**Mạch "Năng lượng và sự biến đổi":**
- Tốc độ.
- Âm thanh.
- Ánh sáng.
- Từ.

**Mạch "Vật sống":**
- Trao đổi chất và chuyển hoá năng lượng ở sinh vật.
- Cảm ứng ở sinh vật và tập tính ở động vật.
- Sinh trưởng và phát triển ở sinh vật.
- Sinh sản ở sinh vật.
- Cơ thể sinh vật là một thể thống nhất.

**Mạch "Trái Đất và bầu trời":** (không có chủ đề riêng ở lớp 7 — đã học ở lớp 6, quay lại ở lớp 9)

#### Lớp 8

**Mạch "Chất và sự biến đổi của chất":**
- Phản ứng hoá học.
- Mol và tỉ khối chất khí.
- Tốc độ phản ứng và chất xúc tác.
- Acid, Base, Oxide, Muối.
- Phân bón hoá học.

**Mạch "Năng lượng và sự biến đổi":**
- Khối lượng riêng, áp suất.
- Mômen lực.
- Điện.
- Nhiệt.

**Mạch "Vật sống":**
- Sinh học cơ thể người (hệ vận động, hệ tuần hoàn, hệ hô hấp, hệ bài tiết, hệ tiêu hoá, nội tiết, thần kinh, sinh sản).
- Môi trường và các nhân tố sinh thái.
- Hệ sinh thái.

**Mạch "Trái Đất và bầu trời":**
- (Không có chủ đề riêng ở lớp 8.)

*(Liệt kê đầy đủ YCCĐ cho từng chủ đề — xem source PDF.)*

> **Ghi chú**: phụ lục này chỉ liệt kê **danh mục chủ đề**. Để xem YCCĐ đầy đủ từng chủ đề (ví dụ "Tiến hành được thí nghiệm..."), tra cứu trực tiếp Thông tư 32/2018 văn bản gốc — file đã lưu tại `docs/source-pdfs/gdpt-2018/ctkhtn-6-9.txt`.

### 9.C NGSS Performance Expectation code reference

NGSS mã hoá PE theo format:

    <Grade>-<Domain><DCI number>-<PE number>

Ví dụ:
- **K-PS2-1**: Kindergarten, Physical Science, DCI PS2, PE số 1.
- **MS-LS1-5**: Middle School (grade 6-8), Life Science, DCI LS1, PE số 5.
- **HS-ESS3-4**: High School (grade 9-12), Earth & Space, DCI ESS3, PE số 4.

**Grade codes:**
| Code | Ý nghĩa |
|---|---|
| K, 1, 2 | Grade band K-2 |
| 3, 4, 5 | Grade band 3-5 |
| MS | Middle School (grade 6-8) |
| HS | High School (grade 9-12) |

**Domain codes:**
| Code | Domain |
|---|---|
| PS | Physical Science |
| LS | Life Science |
| ESS | Earth & Space Science |
| ETS | Engineering, Technology, Applications of Science |

**DCI number trong mỗi domain:**
- PS1 Matter, PS2 Motion/Forces, PS3 Energy, PS4 Waves
- LS1 Structure/Function, LS2 Ecosystems, LS3 Heredity, LS4 Evolution
- ESS1 Universe/Solar System, ESS2 Earth Systems, ESS3 Earth & Human Activity
- ETS1 Engineering Design, ETS2 (K-12 only, links to science)

**Tra cứu PE đầy đủ**: nextgenscience.org/overview-dci

Bảng đối chiếu nhanh code ↔ chủ đề (trích):
| Code | Chủ đề | GDPT 2018 tương ứng |
|---|---|---|
| MS-PS1-1 | Atoms/molecules model | Lớp 7 — Nguyên tử |
| MS-PS1-2 | Chemical reactions | Lớp 8 — Phản ứng hoá học |
| MS-PS2-1 | Newton's Third Law | Lớp 7 — Lực |
| MS-PS3-1 | Kinetic energy | Lớp 6 — Năng lượng |
| MS-PS4-1 | Wave properties | Lớp 7 — Âm thanh |
| MS-LS1-1 | Cells | Lớp 6 — Tế bào |
| MS-LS2-3 | Cycling of matter | Lớp 7 — Trao đổi chất |
| MS-LS3-1 | Heredity | Lớp 9 (ngoài scope) |
| MS-LS4-1 | Evolution evidence | Lớp 9 (ngoài scope) |
| MS-ESS1-1 | Earth-Moon-Sun system | Lớp 6 — Mặt Trời, Mặt Trăng |
| MS-ESS2-3 | Plate tectonics | Môn Địa lí |
| MS-ESS3-3 | Human impacts | Lớp 9 (KHTN) + Địa lí |

### 9.D Tài liệu tham khảo

**GDPT 2018 và văn bản liên quan:**
1. **Thông tư số 32/2018/TT-BGDĐT** ngày 26/12/2018 của Bộ trưởng Bộ GD&ĐT ban hành Chương trình giáo dục phổ thông (gồm Phụ lục môn Khoa học tự nhiên 6-9). Nguồn sử dụng: `filethcs.hcm.shieldixcloud.com/data/hcmedu/thcslamsonq6/2019_3/11_ctkhoa_hoc_tu_nhien_26320197.pdf` (lưu trữ tại `docs/source-pdfs/gdpt-2018/ctkhtn-6-9.txt`).
2. **Thông tư số 22/2021/TT-BGDĐT** — Quy định về đánh giá học sinh trung học cơ sở và trung học phổ thông (chỉ nhắc tên, không phân tích).
3. **Thông tư số 26/2020/TT-BGDĐT** — Sửa đổi, bổ sung một số điều của Quy chế đánh giá, xếp loại học sinh THCS và THPT (chỉ nhắc tên).
4. **Thông tư số 27/2020/TT-BGDĐT** — Quy định đánh giá học sinh tiểu học (chỉ nhắc tên).
5. **Nghị quyết số 88/2014/QH13** ngày 28/11/2014 của Quốc hội về đổi mới chương trình, sách giáo khoa giáo dục phổ thông (cơ sở chính trị của GDPT 2018).

**NGSS và nguồn gốc:**
6. **NGSS Lead States (2013)**. *Next Generation Science Standards: For States, By States*. Washington, DC: The National Academies Press. nextgenscience.org
7. **National Research Council (2012)**. *A Framework for K-12 Science Education: Practices, Crosscutting Concepts, and Core Ideas*. Washington, DC: The National Academies Press.

**OpenSciEd:**
8. **openscied.org** — trang chính thức OpenSciEd.
9. **OpenSciEd Scope & Sequence** — lộ trình đầy đủ K-12 (chưa tất cả cấp được phát hành).

**Tài liệu nội bộ OpenSciedNEO:**
10. `docs/PHASE_1_FINAL_REPORT.md` — báo cáo Phase 1 bản dịch VN.
11. `content/source/ELEMENTARY_K5_RESEARCH.md` — nghiên cứu OpenSciEd Elementary K-5.
12. `docs/NGSS_GDPT2018_BRIDGE_DESIGN.md` — thiết kế tài liệu này.

---

*Hết tài liệu.*
