export default function OXOBoard({ board, size, handleClick, winningLine }) {
  return (
    <div
      className="grid card"
      style={{ gridTemplateColumns: `repeat(${size}, 90px)`, background: "rgba(255, 255, 255, 0.16)" }}
    >
      {board.map((cell, i) => (
        <div
          key={i}
          className={`tile ${winningLine.includes(i) ? "win" : ""}`}
          onClick={() => handleClick(i)}
        >
          {cell}
        </div>
      ))}
    </div>
  );
}