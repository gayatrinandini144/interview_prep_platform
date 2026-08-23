# PrepRing — AI-Powered Interview Preparation Platform

A full-stack MERN app for Software Developer (fresher) interview prep: technical,
HR, coding, and MCQ questions, instant scored feedback, mock interviews with a
timer, voice input, interview history, a performance dashboard, and weak-topic
detection — all running on plain MERN, no paid AI API required.

## Stack

- **M**ongoDB (Mongoose) — questions, users, sessions
- **E**xpress — REST API, JWT auth, rule-based answer evaluation engine
- **R**eact (Vite + Tailwind + Recharts) — UI, charts, Web Speech API voice input
- **N**ode.js — server runtime

## How answers are scored (no external AI API)

`backend/utils/evaluate.js` scores every answer entirely in Node.js:

- **MCQ** — exact match against the stored correct option.
- **Technical / Coding / HR** — a weighted blend of keyword coverage against
  each question's tagged concepts, answer depth (length/substance), and
  structure signals (e.g. STAR-method cues for HR, complexity/example cues for
  coding). Produces a 0–100 score, written feedback, and improvement
  suggestions.

If you later want LLM-based evaluation instead, swap the body of
`evaluateAnswer()` for a call to an LLM API — the rest of the app (routes,
schema, UI) doesn't need to change.

## Project structure

```
interview-prep-platform/
├── backend/
│   ├── config/db.js          MongoDB connection
│   ├── models/                User, Question, Session
│   ├── middleware/auth.js     JWT auth guard
│   ├── utils/evaluate.js      Rule-based scoring engine
│   ├── routes/                auth, questions, sessions
│   ├── seed/                  Question bank + seed script
│   └── server.js
└── frontend/
    └── src/
        ├── pages/              Login, Register, Setup, Interview, Results, History, Dashboard
        ├── components/         QuestionCard, ConfidenceRing, Timer, VoiceInput, Navbar
        ├── context/AuthContext.jsx
        └── api/client.js
```

## Roles and technologies

Setup now offers more roles, each paired with relevant tech stacks:

| Role | Technologies |
|---|---|
| Software Developer | MERN, MEAN, Java Full Stack, Python Full Stack |
| Frontend Developer | MERN, MEAN |
| Backend Developer | MERN, MEAN, Java Full Stack, Python Full Stack |
| Full Stack Developer | MERN, MEAN, Java Full Stack, Python Full Stack |
| AI/ML Engineer | AI/ML |
| Data Scientist | Data Science, AI/ML |

Technical/coding/MCQ questions are matched by **technology** (that's what actually
determines what gets asked); HR/behavioral questions are shared across every
role and technology. If you add a brand-new technology, just tag new questions
in `seed/questions.js` with that `technology` value and re-run `npm run seed` —
no other code changes needed.

## Prerequisites

- **Node.js** 18+ and npm — https://nodejs.org
- **MongoDB** — either:
  - Local install (Windows: https://www.mongodb.com/try/download/community), or
  - A free **MongoDB Atlas** cluster (https://www.mongodb.com/cloud/atlas) — easier if you don't want to install MongoDB locally. Copy its connection string for `MONGO_URI`.

## Setup — backend

Open Command Prompt in `backend/`:

```
cd interview-prep-platform\backend
npm install
copy .env.example .env
```

Edit `.env` and set:
- `MONGO_URI` — your local or Atlas connection string
- `JWT_SECRET` — any long random string

Seed the question bank (run once):

```
npm run seed
```

Start the API server:

```
npm run dev
```

The API runs at `http://localhost:5000`. Check `http://localhost:5000/api/health` to confirm it's up.

## Setup — frontend

Open a **second** Command Prompt in `frontend/`:

```
cd interview-prep-platform\frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173`. Open it in **Chrome** (voice input uses
the Web Speech API, which Chrome supports best).

## Using the app

1. Register an account.
2. On **Setup**, pick Role / Technology / Experience and **Practice** or **Mock**
   mode, then start.
3. Answer each question by typing or tapping **Speak answer**; MCQs are tap-to-select.
4. Each answer is scored instantly with feedback and suggestions.
5. At the end, see your **Results** page, then check **History** and the
   **Dashboard** (score trend, category breakdown, weak-topic detection) any time.

## Notes for submission / demo

- All scoring logic is your own code (`evaluate.js`) — no external AI service
  dependency, so it works fully offline once MongoDB is running locally.
- To add more questions, edit `backend/seed/questions.js` and re-run `npm run seed`.
- To deploy: host the backend (Render/Railway) with an Atlas `MONGO_URI`, and the
  frontend (Vercel/Netlify) with `VITE_API_URL` pointing at the deployed backend.
