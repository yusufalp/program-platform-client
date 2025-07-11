export default function Required({ symbol = "*", color = "red" }) {
  return (
    <span
      style={{ color, marginLeft: 2 }}
      aria-label="required"
      title="Required"
    >
      {symbol}
    </span>
  );
}
