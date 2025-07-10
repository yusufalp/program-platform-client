export function formatDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  
  const localDate = new Date(year, month - 1, day);
  return localDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    year: "numeric",
    day: "2-digit",
  });
}