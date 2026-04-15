import StatsBar from "./StatsBar";

export default function ControlPanel({
  shuffleTiles,
  autoSolve,
  solving,
  moves
}) {
  return (
    <div style={{background: "rgba(255, 255, 255, 0.17)"}} className="card control-panel">

      <div className="moves">
        Moves: {moves}
      </div>

      <div className="controls">
        <button onClick={shuffleTiles}>
          🔀 Shuffle
        </button>

        <button onClick={autoSolve} disabled={solving}>
          🤖 Auto Solve
        </button>
      </div>

    </div>
  );
}