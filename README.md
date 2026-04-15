# 🧠 AI Puzzle Solver + OXO Game

A modern, glassmorphic React application combining:

- 🔢 N-Puzzle Solver (8 / 11 / 15)
- ❌⭕ OXO (Tic-Tac-Toe) with AI
- 🤖 A* Search + Minimax Algorithm
- ✨ Aesthetic UI with glassmorphism & smooth interactions

---

## 🚀 Features

### 🔢 N-Puzzle Solver
- Supports **3x3, 4x4, 5x5 puzzles**
- Smart **shuffle with solvability**
- 🤖 **Auto-solve using A\*** algorithm
- Heuristic: **Manhattan Distance**
- Step-by-step animated solving
- Move counter

---

### ❌⭕ OXO Game
- Grid sizes: **3x3, 4x4, 5x5**
- Rule: **3 in a row to win (not N)**
- Modes:
  - 👥 Player vs Player
  - 🤖 Player vs AI

---

### 🤖 AI (Game Logic)

#### Minimax (3x3)
- Optimal play (unbeatable)
- Evaluates all possible states

#### Larger Boards (4x4, 5x5)
- Random AI (for performance)
- Fast and responsive

---

### 🧠 Smart Mechanics
- ✅ Win detection (horizontal, vertical, diagonal)
- 🎯 Winning tiles highlight
- ⚖️ Draw detection
- 🔄 Restart functionality
- 📊 Score tracking (X vs O)

---

## 🎨 UI / UX

- ✨ Glassmorphism design
- 🌈 Gradient accents (#016563, #fd79a8, #6c5ce7)
- 💡 Soft shadows & depth
- 🎯 Responsive layout
- ⚡ Smooth transitions & hover effects

---

## 🛠 Tech Stack

- **React (Vite)**
- **Vanilla CSS**
- **Custom Hooks (usePuzzle)**
- **Algorithms:**
  - A* Search
  - Minimax

---


---

## ⚙️ Installation

```bash
git clone https://github.com/your-username/puzzle-solver.git
cd puzzle-solver
npm install
npm run dev
