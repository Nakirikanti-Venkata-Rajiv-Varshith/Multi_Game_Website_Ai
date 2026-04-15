export default function LevelSelector({ changeLevel }) {
  const levels = [
    { size: 3, label: "8 Puzzle" },
    { size: 4, label: "15 Puzzle" },
  ];

  return (
    <div style={{background: "rgba(255, 255, 255, 0.03)",}} className="card level-container">
      {levels.map((lvl) => (
        <button
          key={lvl.size}
          onClick={() => changeLevel(lvl.size)}
          className="level-btn"
        >
          {lvl.label}
        </button>
      ))}
    </div>
  );
}