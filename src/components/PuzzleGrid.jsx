import Tile from "./Tile";

export default function PuzzleGrid({ tiles, size, moveTile, nextMove }) {
  return (
    <div
      className="grid card"
      style={{ gridTemplateColumns: `repeat(${size}, 100px)` , background: "rgba(255, 255, 255, 0.21)"}}
    >
      {tiles.map((val, i) => {
        const highlight =
          nextMove && nextMove[i] !== val;

        return (
          <Tile
            key={i}
            value={val}
            highlight={highlight}
            onClick={() => moveTile(i)}
          />
        );
      })}
    </div>
  );
}