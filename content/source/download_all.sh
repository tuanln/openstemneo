#!/bin/bash
# OpenSciNEO — Download tất cả 18 Teacher Editions
# Chạy từ thư mục OpenSciedNEO:
#   bash content/source/download_all.sh

set -e

BASE="https://openscied-uploads-production.s3.amazonaws.com"
OUT="content/source"

echo "📥 Bắt đầu download 18 Teacher Editions từ OpenSciEd S3..."
echo ""

# ─── GRADE 6 ──────────────────────────────────────────────
mkdir -p "$OUT/grade-6/unit-6-1" "$OUT/grade-6/unit-6-2" \
         "$OUT/grade-6/unit-6-3" "$OUT/grade-6/unit-6-4" \
         "$OUT/grade-6/unit-6-5" "$OUT/grade-6/unit-6-6"

echo "📗 Grade 6..."

curl -L -o "$OUT/grade-6/unit-6-1/teacher-edition.pdf" \
  "$BASE/G6_ULT/lowres/6.1%20Teacher%20Edition.pdf" && echo "  ✅ 6.1"

curl -L -o "$OUT/grade-6/unit-6-2/teacher-edition.pdf" \
  "$BASE/G6_UTH/lowres/6.2%20Teacher%20Edition.pdf" && echo "  ✅ 6.2"

curl -L -o "$OUT/grade-6/unit-6-3/teacher-edition.pdf" \
  "$BASE/G6_UWC/lowres/6.3%20Teacher%20Edition.pdf" && echo "  ✅ 6.3"

curl -L -o "$OUT/grade-6/unit-6-4/teacher-edition.pdf" \
  "$BASE/G6_UPT/lowres/6.4%20Teacher%20Edition.pdf" && echo "  ✅ 6.4"

curl -L -o "$OUT/grade-6/unit-6-5/teacher-edition.pdf" \
  "$BASE/G6_UNH/lowres/6.5%20Teacher%20Edition.pdf" && echo "  ✅ 6.5"

curl -L -o "$OUT/grade-6/unit-6-6/teacher-edition.pdf" \
  "$BASE/G6_UCL/lowres/6.6%20Teacher%20Edition.pdf" && echo "  ✅ 6.6"

# ─── GRADE 7 ──────────────────────────────────────────────
mkdir -p "$OUT/grade-7/unit-7-1" "$OUT/grade-7/unit-7-2" \
         "$OUT/grade-7/unit-7-3" "$OUT/grade-7/unit-7-4" \
         "$OUT/grade-7/unit-7-5" "$OUT/grade-7/unit-7-6"

echo ""
echo "📘 Grade 7..."

curl -L -o "$OUT/grade-7/unit-7-1/teacher-edition.pdf" \
  "$BASE/G7_UCA/hires/7.1%20Chemical%20Reactions%20%26%20Matter%20Teacher%20Edition.pdf" && echo "  ✅ 7.1"

curl -L -o "$OUT/grade-7/unit-7-2/teacher-edition.pdf" \
  "$BASE/G7_UCB/hires/7.2%20Chemical%20Reactions%20%26%20Energy%20Teacher%20Edition.pdf" && echo "  ✅ 7.2"

curl -L -o "$OUT/grade-7/unit-7-3/teacher-edition.pdf" \
  "$BASE/G7_UMR/hires/7.3%20Metabolic%20Reactions%20Teacher%20Edition.pdf" && echo "  ✅ 7.3"

curl -L -o "$OUT/grade-7/unit-7-4/teacher-edition.pdf" \
  "$BASE/G7_UMC/hires/7.4%20Matter%20Cycling%20and%20Photosynthesis%20Teacher%20Edition.pdf" && echo "  ✅ 7.4"

curl -L -o "$OUT/grade-7/unit-7-5/teacher-edition.pdf" \
  "$BASE/G7_UEC/hires/7.5%20Teacher%20Edition.pdf" && echo "  ✅ 7.5"

curl -L -o "$OUT/grade-7/unit-7-6/teacher-edition.pdf" \
  "$BASE/G7_UER/hires/7.6%20Earth%27s%20Resources%20%26%20Human%20Impact%20Teacher%20Edition.pdf" && echo "  ✅ 7.6"

# ─── GRADE 8 ──────────────────────────────────────────────
mkdir -p "$OUT/grade-8/unit-8-1" "$OUT/grade-8/unit-8-2" \
         "$OUT/grade-8/unit-8-3" "$OUT/grade-8/unit-8-4" \
         "$OUT/grade-8/unit-8-5" "$OUT/grade-8/unit-8-6"

echo ""
echo "📙 Grade 8..."

curl -L -o "$OUT/grade-8/unit-8-1/teacher-edition.pdf" \
  "$BASE/G8_UCF/lowres/8.1%20Contact%20Forces%20Teacher%20Edition.pdf" && echo "  ✅ 8.1"

curl -L -o "$OUT/grade-8/unit-8-2/teacher-edition.pdf" \
  "$BASE/G8_USO/lowres/8.2%20Sound%20Waves%20Teacher%20Edition.pdf" && echo "  ✅ 8.2"

curl -L -o "$OUT/grade-8/unit-8-3/teacher-edition.pdf" \
  "$BASE/G8_UDF/hires/8.3%20Forces%20at%20a%20Distance%20Teacher%20Edition.pdf" && echo "  ✅ 8.3"

curl -L -o "$OUT/grade-8/unit-8-4/teacher-edition.pdf" \
  "$BASE/G8_USS/hires/8.4%20Earth%20in%20Space%20Teacher%20Edition.pdf" && echo "  ✅ 8.4"

curl -L -o "$OUT/grade-8/unit-8-5/teacher-edition.pdf" \
  "$BASE/G8_UGE/hires/8.5%20Genetics%20Teacher%20Edition.pdf" && echo "  ✅ 8.5"

curl -L -o "$OUT/grade-8/unit-8-6/teacher-edition.pdf" \
  "$BASE/G8_UNS/lowres/8.6%20Natural%20Selection%20%26%20Common%20Ancestry%20Teacher%20Edition.pdf" && echo "  ✅ 8.6"

echo ""
echo "🎉 Xong! 18 Teacher Editions đã được lưu vào $OUT/"
echo ""
echo "Kiểm tra:"
find "$OUT" -name "teacher-edition.pdf" | sort
