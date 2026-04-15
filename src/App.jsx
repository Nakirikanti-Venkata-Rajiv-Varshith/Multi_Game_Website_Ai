import "./styles/global.css";
import "./styles/animations.css";

import Background from "./components/Background";
import { usePuzzle } from "./hooks/usePuzzle";

import GameSelector from "./components/GameSelector";
import LevelSelector from "./components/LevelSelector";
import PuzzleGrid from "./components/PuzzleGrid";
import ControlPanel from "./components/ControlPanel";
import OXOBoard from "./components/OXOBoard";

export default function App() {
  const p = usePuzzle();

  return (
    <>
      <Background />

      <div className="app">
        <h1  style={{
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(18px)",
  border: "1px solid rgba(255,255,255,0.15)",
  fontSize: "3rem",
  padding: "10px 200px",
  borderRadius: "22px",
  boxShadow: "0 10px 40px rgba(0,0,0,0.4)",

}}>AI Puzzle Solver</h1>

        <div  className="main-layout">

          {/* LEFT PANEL → GAME SELECTOR */}
          <GameSelector 
            game={p.game}
            setGame={p.setGame}
            oxoSize={p.oxoSize}
            setOxoSize={p.setOxoSize}
            mode={p.mode}
            setMode={p.setMode}
          />

          {/* CENTER → GAME AREA */}
          <div  className="left-panel">

            {p.game === "puzzle" && (
              <>
                < LevelSelector changeLevel={p.changeLevel} />
                <PuzzleGrid
                  tiles={p.tiles}
                  size={p.size}
                  moveTile={p.moveTile}
                  nextMove={p.nextMove}
                />
              </>
            )}

            {p.game === "oxo" && (
              <OXOBoard
                key={p.oxoSize}
                board={p.board}
                size={p.oxoSize}
                handleClick={p.handleOxoClick}
                winningLine={p.winningLine}
              />
            )}

          </div>

          {/* RIGHT PANEL → CONTROLS */}
          <div className="right-panel">

            {p.game === "puzzle" && (
              <ControlPanel
                shuffleTiles={p.shuffleTiles}
                autoSolve={p.autoSolve}
                solving={p.solving}
                moves={p.moves}
              />
            )}

            {p.game === "oxo" && (
              <div className="card control-panel">

                <div className="moves">
                  Turn: {p.turn}
                </div>

                <div className="score">
                  X: {p.score.X} | O: {p.score.O}
                </div>

                {p.winner && (
                  <div className="winner">
                    Winner: {p.winner}
                  </div>
                )}

                {!p.winner && p.isDraw && (
                  <div className="winner">
                    Draw!
                  </div>
                )}

                <button onClick={p.resetOxo}>
                  🔄 Restart
                </button>

              </div>
            )}

          </div>

        </div>
      </div>
    </>
  );
}