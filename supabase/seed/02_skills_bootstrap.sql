-- Seed 02 — 18 core skills: 8 SEP (NGSS) + 3 NL đặc thù KHTN (GDPT 2018) + 7 CCC (NGSS)

-- 8 SEP — science practices
INSERT INTO skills (slug, name, category, framework_refs) VALUES
  ('sep-1-asking-questions', 'Đặt câu hỏi và xác định vấn đề', 'science-practice',
    '{"ngss_sep": "SEP-1"}'::jsonb),
  ('sep-2-developing-models', 'Xây dựng và sử dụng mô hình', 'science-practice',
    '{"ngss_sep": "SEP-2"}'::jsonb),
  ('sep-3-investigations', 'Lập kế hoạch và tiến hành điều tra', 'science-practice',
    '{"ngss_sep": "SEP-3"}'::jsonb),
  ('sep-4-analyzing-data', 'Phân tích và diễn giải dữ liệu', 'science-practice',
    '{"ngss_sep": "SEP-4"}'::jsonb),
  ('sep-5-math-computational', 'Dùng toán học và tư duy tính toán', 'science-practice',
    '{"ngss_sep": "SEP-5"}'::jsonb),
  ('sep-6-constructing-explanations', 'Kiến tạo giải thích và thiết kế giải pháp', 'science-practice',
    '{"ngss_sep": "SEP-6"}'::jsonb),
  ('sep-7-argument', 'Tham gia lập luận từ bằng chứng', 'science-practice',
    '{"ngss_sep": "SEP-7"}'::jsonb),
  ('sep-8-communicating', 'Thu thập, đánh giá và truyền đạt thông tin', 'science-practice',
    '{"ngss_sep": "SEP-8"}'::jsonb)
ON CONFLICT (slug) DO NOTHING;

-- 3 thành phần NL đặc thù KHTN GDPT 2018
INSERT INTO skills (slug, name, category, framework_refs) VALUES
  ('nl-nhan-thuc-khtn', 'Nhận thức khoa học tự nhiên', 'science-competency',
    '{"gdpt_2018": "NL-nhan-thuc-KHTN"}'::jsonb),
  ('nl-tim-hieu-tu-nhien', 'Tìm hiểu tự nhiên', 'science-competency',
    '{"gdpt_2018": "NL-tim-hieu-tu-nhien"}'::jsonb),
  ('nl-van-dung', 'Vận dụng kiến thức, kĩ năng đã học', 'science-competency',
    '{"gdpt_2018": "NL-van-dung"}'::jsonb)
ON CONFLICT (slug) DO NOTHING;

-- 7 CCC — crosscutting concepts
INSERT INTO skills (slug, name, category, framework_refs) VALUES
  ('ccc-1-patterns', 'Mô thức/Quy luật', 'crosscutting', '{"ngss_ccc": "CCC-1"}'::jsonb),
  ('ccc-2-cause-effect', 'Nguyên nhân - Kết quả', 'crosscutting', '{"ngss_ccc": "CCC-2"}'::jsonb),
  ('ccc-3-scale', 'Tỉ lệ, quy mô, số lượng', 'crosscutting', '{"ngss_ccc": "CCC-3"}'::jsonb),
  ('ccc-4-systems', 'Hệ thống và mô hình hệ thống', 'crosscutting', '{"ngss_ccc": "CCC-4"}'::jsonb),
  ('ccc-5-energy-matter', 'Năng lượng và Vật chất', 'crosscutting', '{"ngss_ccc": "CCC-5"}'::jsonb),
  ('ccc-6-structure-function', 'Cấu trúc và Chức năng', 'crosscutting', '{"ngss_ccc": "CCC-6"}'::jsonb),
  ('ccc-7-stability-change', 'Cân bằng và Biến đổi', 'crosscutting', '{"ngss_ccc": "CCC-7"}'::jsonb)
ON CONFLICT (slug) DO NOTHING;
