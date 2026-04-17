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
