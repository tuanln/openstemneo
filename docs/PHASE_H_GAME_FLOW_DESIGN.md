# Design Spec — Phase H: Student Game Flow (NEOSTEM-inspired)

> Ngày tạo: 2026-04-19 · Trạng thái: Chờ review
>
> **Liên quan:** [PHASE_2_MVP_DESIGN.md](./PHASE_2_MVP_DESIGN.md) · [PHASE_2_MVP_PLAN.md](./PHASE_2_MVP_PLAN.md) · NEO_STEM/DOC/DESIGN.md

---

## 1. Mục tiêu

Xây dựng UX học mới cho **học sinh** dạng game flow 7 bước, giải quyết feedback "nhiều chữ quá". Bám theo mô hình NEOSTEM (Duolingo-style) + giữ triết lý OpenSciEd (phenomenon-based, sensemaking).

**Scope MVP**: Full game flow + 1 simulation flagship cho **Grade 6 Unit 1 — One-Way Mirror (9 lessons 6-1-L1 → L9)**. Các lesson khác fallback (ảnh + placeholder quiz).

**Thay đổi Phase 2 MVP**:
- ⏭️ **Skip** D21 Skills UI, D22 Profile (dashboard đủ dùng giai đoạn này)
- ✅ **Giữ** E23-24 Admin, F25-26 Teacher, G27-30 Deploy
- ➕ **Phase H mới**: 9 tasks, ~15-22h effort

## 2. Quyết định đã chốt

- **D-H1** Split theo role qua same URL: student → game flow, teacher/mentor/admin/anonymous → MDX text đầy đủ (như hiện tại).
- **D-H2** Gamification medium: step-by-step card flow + MCQ quiz ở cuối (❤️ × 3, confetti). KHÔNG có XP persist/leaderboard/combo.
- **D-H3** Phenomenon sim: custom code cho ~10 lesson ưu tiên (Grade 6 Unit 1). Các lesson khác fallback ảnh `<Figure>` hiện có.
- **D-H4** Question format: **exploration = free-text**, **quiz cuối = MCQ 4 đáp án** (author viết frontmatter).
- **D-H5** Notebook: free-text textarea (không structured table). + hint system 3 hints/lesson, author viết frontmatter.
- **D-H6** Grade 6 Unit 1 là flagship đầu tiên. 8 sim còn lại cho unit này làm sau (Phase H.2).

## 3. Kiến trúc & flow 7 bước

```
Student vào /student/units/6-1/lessons/6-1-L1
proxy.ts check: role=student → GameFlowLayout (client + server)
                 role=teacher/mentor/admin → MDXLessonView + nút "Xem như HS"
                 anonymous → MDXLessonView + prompt đăng nhập

URL state: ?step=driving|phenom|explore&q=2|ask-own|notebook|quiz&q=1|reveal
```

**7 steps:**

1. **DrivingQuestionStep** — 1 big card với câu hỏi lớn (từ `frontmatter.drivingQuestion`). CTA: "Bắt đầu khám phá →"
2. **PhenomenonStep** — Render sim component (nếu `frontmatter.phenomenonSim` có key match registry) hoặc `<SimFallback>` (ảnh từ `<Figure>` đầu tiên + caption). HS tương tác với sim tự do, khi sẵn sàng → "Tiếp theo →"
3. **ExplorationStep** — 1 câu/màn hình, free-text, progress bar "2/N". Autosave 800ms debounced (reuse `EvidenceInteractive` pattern).
4. **AskYourOwnStep** — "Em muốn hỏi gì về hiện tượng này?" (1 prompt free-text). Log event `question_asked`.
5. **NotebookStep** — "Em hãy ghi lại số liệu/quan sát khi làm thí nghiệm tại nhà" (1 prompt free-text). Log `reflection_written`.
6. **QuizMCQStep** — Duolingo-style: 1 câu/màn, 4 đáp án. Đúng → xanh + confetti + "+10 XP". Sai → đỏ + haptic (web haptic support limited) + -1 ❤️. Hết ❤️ → modal "Nghỉ chút nhé, thử lại sau?" (không block lâu — click "Thử lại" reset về step 1).
7. **KnowledgeRevealStep** — Card tổng kết kiến thức (`frontmatter.knowledgeReveal`). Confetti + "Đã hoàn thành bài học! +50 XP". Button "Bài tiếp theo →" hoặc "Về dashboard".

**Hint system**: Nút 💡 floating top-right mỗi step (trừ step 1, 7). 3 hints/lesson. Click → popover hiển thị hint (từ `frontmatter.hints[idx]`). Không có hint → button disabled.

## 4. Schema & data

### 4.1 MDX frontmatter extension (author manual cho 9 lesson flagship)

```yaml
---
id: "6-1-L1"
title: "Chúng ta thấy gì trong buổi học nhạc?"
# Có sẵn:
drivingQuestion: "Làm sao bạn nhạc công nhìn được mình trong gương mà ta không nhìn qua được?"

# Phase H — mới:
phenomenonSim: "one-way-mirror"   # optional — bỏ → fallback Figure

explorationQuestions:
  - id: "exp-1"
    prompt: "Em mô tả gương một chiều hoạt động thế nào?"
  - id: "exp-2"
    prompt: "Vì sao bên sáng không nhìn qua được nhưng bên tối nhìn qua được?"

quizMCQ:
  - id: "q-1"
    question: "Gương một chiều khác gương thường ở chỗ:"
    options:
      - "Phản xạ 100% ánh sáng"
      - "Phản xạ 1 phần, truyền qua 1 phần"
      - "Hấp thụ toàn bộ ánh sáng"
      - "Phát ra ánh sáng mới"
    correct: 1
    explanation: "Gương một chiều có lớp kim loại rất mỏng, phản xạ ~50% và truyền qua ~50% ánh sáng..."

hints:
  - "Thử hình dung 2 phòng — 1 sáng 1 tối, ngăn nhau bằng gương một chiều."
  - "Newton đã chứng minh ánh sáng trắng là hỗn hợp..."
  - "Chú ý đến tỉ lệ ánh sáng đến/đi từ mỗi bên gương."

knowledgeReveal: |
  **Gương một chiều** (one-way mirror) thực chất là gương hai chiều:
  ánh sáng đi qua cả hai hướng nhưng không bằng nhau...
---
```

### 4.2 Migration mới — 0010_phase_h_events.sql

Thêm 2 event types vào `learning_events.event_type` CHECK constraint:
- `quiz_attempted` — payload `{question_id, selected, correct, hearts_remaining}`
- `hint_used` — payload `{step, hint_index}`

### 4.3 Derived stats (chưa persist)

- Hearts: client state (React `useState`), không lưu DB
- XP: derive từ SUM events: (`quiz_attempted` WHERE `correct=true`) × 10 + (`completed`) × 50
- Hints remaining: count `hint_used` events cho activity đó, trừ từ 3

## 5. Components (mới)

```
components/phase2/game-flow/
├── GameFlowLayout.tsx              # orchestrator, đọc URL step, route step component
├── StepProgressBar.tsx              # header: Exit × | progress bar | ❤️❤️❤️ | 💡(2)
├── steps/
│   ├── driving-question-step.tsx
│   ├── phenomenon-step.tsx
│   ├── exploration-step.tsx        # reuse EvidenceInteractive
│   ├── ask-your-own-step.tsx
│   ├── notebook-step.tsx
│   ├── quiz-mcq-step.tsx
│   └── knowledge-reveal-step.tsx
├── hint-system/
│   ├── hint-button.tsx
│   └── hint-popover.tsx
├── sims/
│   ├── registry.ts                 # export const sims: Record<string, ComponentType<SimProps>>
│   ├── sim-fallback.tsx            # img + "Tương tác ở đây — sắp có"
│   └── one-way-mirror-sim.tsx      # flagship sim đầu tiên
└── confetti.tsx                    # simple canvas confetti, no external dep
```

**Sim interface**:
```ts
export interface SimProps {
  onInteraction?: (event: string, data?: unknown) => void;
}
```

## 6. Tasks breakdown

| # | Task | Files | Effort |
|---|---|---|---|
| H31 | Migration 0010 thêm event types | `supabase/migrations/0010_phase_h_events.sql` | 30m |
| H32 | Server actions game flow | `actions/game-flow.ts` | 1-2h |
| H33 | GameFlowLayout + URL step router | `components/phase2/game-flow/game-flow-layout.tsx`, `step-progress-bar.tsx` | 2h |
| H34 | 7 step components | `components/phase2/game-flow/steps/*.tsx` | 4-6h |
| H35 | Hint system | `hint-system/*.tsx` | 1h |
| H36 | Sim registry + fallback + role gating trong lesson page | `sims/registry.ts`, `sim-fallback.tsx`, edit `app/.../[lessonId]/page.tsx` | 1h |
| H37 | OneWayMirrorSim (flagship sim) | `sims/one-way-mirror-sim.tsx` | 2-3h |
| H38 | Author frontmatter 9 lessons Grade 6 Unit 1 | `content/curriculum/grade-6/unit-6-1/lesson-*.mdx` | 3-4h |
| H39 | Teacher "Xem như HS" toggle + confetti + E2E test | `app/.../[lessonId]/page.tsx`, `confetti.tsx` | 1-2h |

**Total**: ~15-22h, ship trong 2-3 tuần part-time.

## 7. Out of scope (Phase H.2+)

- Sims cho 8 lesson còn lại Grade 6 Unit 1
- Sims cho 509 lesson khác (tính sau)
- Custom quiz engine nâng cao (drag-match, multi-select)
- XP leaderboard + streak combo
- Hearts persist qua session
- Haptic (iOS/Android) — web API chưa đủ
- Offline / PWA
- AI-generated sims (Vercel Sandbox experiment)

## 8. Assumptions & rủi ro

- **AS-H1** 9 lesson Grade 6 Unit 1 hiện đã có `drivingQuestion` trong frontmatter. Nếu thiếu, task H38 cũng author lại.
- **AS-H2** Author sim thủ công cho lesson 6-1-L1 — các lesson khác cùng Unit 6-1 sẽ fallback ảnh, không vấn đề ship MVP.
- **AS-H3** Feedback từ HS pilot (1-2 em) trong 1-2 tuần sau ship H sẽ dùng để quyết có build 8 sim còn lại hay pivot khác.
- **Rủi ro H1**: Sim interactive khó build đẹp cho mobile (canvas + touch) — giải: test sớm trên điện thoại thật ngay từ sim đầu tiên.
- **Rủi ro H2**: MCQ author tốn thời gian — nếu < 5 quiz/lesson × 9 lesson = 45 câu, OK. Nếu 10+ câu/lesson sẽ là 90+ câu thì chậm.

## 9. Checklist trước khi viết plan

- [x] User chốt scope (7 questions + detail flow)
- [x] User chọn Grade 6 Unit 1 làm flagship
- [ ] User review spec này
- [ ] Viết implementation plan (writing-plans)
