# DebugQuest v1.0

DebugQuest is an adaptive Parsons puzzle platform for learning Python debugging.

## Prerequisites

- Node.js 20+
- Python 3.11 (for code execution)
- MongoDB (optional, if you want to persist data beyond mocks)

## Getting Started

### 1. Setup Backend

```bash
cd backend
npm install
node server.js
```
The backend will run on `http://localhost:3001`.

### 2. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```
The frontend will run on `http://localhost:5173`.

## Features

- **Practice Space**: Drag and drop code pieces, use `Tab` to indent, and `Run Code` to see output.
- **Placement Assessment**: Adaptive quiz to determine your initial level.
- **Analytics**: Track your XP, streaks, and concept mastery.
- **AI Hints**: Get smart hints when you're stuck (mocked for v1.0).

## Navigation

- Dashboard: `/home`
- Practice: `/practice`
- Analytics: `/analytics`
- Assessment: `/assessment`
