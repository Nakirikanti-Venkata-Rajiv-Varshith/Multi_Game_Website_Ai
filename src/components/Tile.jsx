export default function Tile({ value, onClick, highlight }) {
  return (
    <div 
      className={`tile ${value === 0 ? "empty" : ""} ${highlight ? "highlight" : ""}`}
      onClick={onClick}
    >
      {value !== 0 && value}
    </div>
  );
}