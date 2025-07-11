export default function RequiredFieldsNote({
  note = "required fields",
  color = "red",
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <span style={{ color }}>* {note}</span>
    </div>
  );
}
