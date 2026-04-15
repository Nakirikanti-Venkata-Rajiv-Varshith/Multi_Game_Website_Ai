import { useState, useEffect } from "react";
import { getGoalState, shuffle, aStar } from "../utils/puzzleUtils";

export const usePuzzle = () => {


  const [size, setSize] = useState(3);
  const [tiles, setTiles] = useState(getGoalState(3));
  const [solving, setSolving] = useState(false);
  const [moves, setMoves] = useState(0);
  const [nextMove, setNextMove] = useState(null);

  
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [isDraw, setIsDraw] = useState(false); 


  const [game, setGame] = useState("puzzle");

  const [oxoSize, setOxoSize] = useState(3);
  const [mode, setMode] = useState("pvp");
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState("X");

  const resetOxo = () => {
    setBoard(Array(oxoSize * oxoSize).fill(null));
    setTurn("X");
    setWinner(null);
    setWinningLine([]);
    setIsDraw(false); 
  };


  const changeLevel = (n) => {
    setSize(n);
    setTiles(getGoalState(n));
    setMoves(0);
  };

  const shuffleTiles = () => {
    setTiles((prev) => shuffle(prev, size, size * 20));
    setMoves(0);
  };

  const moveTile = (index) => {
    if (solving) return;

    const zeroIndex = tiles.indexOf(0);

    const x1 = Math.floor(index / size);
    const y1 = index % size;
    const x2 = Math.floor(zeroIndex / size);
    const y2 = zeroIndex % size;

    if (Math.abs(x1 - x2) + Math.abs(y1 - y2) !== 1) return;

    const newTiles = [...tiles];
    [newTiles[index], newTiles[zeroIndex]] =
      [newTiles[zeroIndex], newTiles[index]];

    setTiles(newTiles);
    setMoves((m) => m + 1);
  };

  const checkWinner = (board, size) => {
    const winLength = 3;

    const directions = [
      [0, 1],
      [1, 0],
      [1, 1],
      [1, -1],
    ];

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const start = row * size + col;
        const player = board[start];
        if (!player) continue;

        for (let [dx, dy] of directions) {
          let line = [start];

          for (let k = 1; k < winLength; k++) {
            const r = row + dx * k;
            const c = col + dy * k;

            if (r < 0 || r >= size || c < 0 || c >= size) break;

            const idx = r * size + c;
            if (board[idx] !== player) break;

            line.push(idx);
          }

          if (line.length === winLength) {
            return { winner: player, line };
          }
        }
      }
    }

    return null;
  };

  const minimax = (board, isMaximizing) => {
    const result = checkWinner(board, 3);

    if (result?.winner === "O") return 10;
    if (result?.winner === "X") return -10;
    if (!board.includes(null)) return 0;

    if (isMaximizing) {
      let best = -Infinity;

      for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
          board[i] = "O";
          let score = minimax(board, false);
          board[i] = null;
          best = Math.max(best, score);
        }
      }
      return best;
    } else {
      let best = Infinity;

      for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
          board[i] = "X";
          let score = minimax(board, true);
          board[i] = null;
          best = Math.min(best, score);
        }
      }
      return best;
    }
  };

  const getBestMove = (board) => {
    let bestScore = -Infinity;
    let move = null;

    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = "O";
        let score = minimax(board, false);
        board[i] = null;

        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }

    return move;
  };

  const autoSolve = async () => {
    setSolving(true);
    const path = aStar(tiles, size);

    if (!path) {
      setSolving(false);
      return;
    }

    for (let step of path) {
      setNextMove(step);
      await new Promise((r) => setTimeout(r, 120));
      setTiles(step);
    }

    setNextMove(null);
    setSolving(false);
  };

  const handleOxoClick = (i) => {
    if (board[i] || winner) return;

    const newBoard = [...board];
    newBoard[i] = turn;

    const result = checkWinner(newBoard, oxoSize);

    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
      setScore(prev => ({
        ...prev,
        [result.winner]: prev[result.winner] + 1
      }));
      setBoard(newBoard);
      return;
    }

    if (!newBoard.includes(null)) {
      setBoard(newBoard);
      setIsDraw(true);
      return;
    }

    setBoard(newBoard);

    if (mode === "pvp") {
      setTurn(t => (t === "X" ? "O" : "X"));
      return;
    }
    setTurn("O");

    setTimeout(() => {
      let aiMove;

      if (oxoSize === 3) {
        aiMove = getBestMove([...newBoard]);
      } else {
        const empty = newBoard
          .map((v, i) => (v === null ? i : null))
          .filter(v => v !== null);

        aiMove = empty[Math.floor(Math.random() * empty.length)];
      }

      if (aiMove !== null) {
        newBoard[aiMove] = "O";

        const aiResult = checkWinner(newBoard, oxoSize);

        if (aiResult) {
          setWinner(aiResult.winner);
          setWinningLine(aiResult.line);
          setScore(prev => ({
            ...prev,
            [aiResult.winner]: prev[aiResult.winner] + 1
          }));
        } else if (!newBoard.includes(null)) {
          setIsDraw(true);
        }

        setBoard([...newBoard]);

        if (!aiResult) {
          setTurn("X");
        }
      }
    }, 400);
  };

  useEffect(() => {
    resetOxo();
  }, [oxoSize, game]);

  return {
    tiles,
    size,
    changeLevel,
    shuffleTiles,
    moveTile,
    autoSolve,
    solving,
    moves,
    nextMove,
    game,
    setGame,
    oxoSize,
    setOxoSize,
    mode,
    setMode,
    board,
    turn,
    handleOxoClick,
    winner,
    winningLine,
    score,
    isDraw, 
    resetOxo,
  };
};