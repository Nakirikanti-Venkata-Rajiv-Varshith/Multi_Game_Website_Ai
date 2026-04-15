export default function GameSelector({
  game,
  setGame,
  oxoSize,
  setOxoSize,
  mode,
  setMode
}) {
  return (
    <div style={{background: "rgba(255, 255, 255, 0.03)"}} className="card game-panel">

      <h3>Game</h3>

      <div className="options">
        <button onClick={() => setGame("puzzle")}>
          Puzzle
        </button>

        <button onClick={() => setGame("oxo")}>
          OXO
        </button>
      </div>

      {game === "oxo" && (
        <>
          <h4>Grid</h4>
          <div className="options">
            {[3,4,5].map(s => (
              <button key={s} onClick={() => setOxoSize(s)}>
                {s}x{s}
              </button>
            ))}
          </div>

          <h4>Mode</h4>
          <div className="options">
            <button onClick={() => setMode("pvp")}>
              PvP
            </button>
            <button onClick={() => setMode("ai")}>
              vs AI
            </button>
          </div>
        </>
      )}

    </div>
  );
}