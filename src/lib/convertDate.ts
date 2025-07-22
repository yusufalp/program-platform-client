export function dateToLocaleString(dateString: string | undefined | null) {
  if (!dateString) return "";

  // Try to match YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS(.sss)Z or YYYY/MM/DD
  const match = dateString.match(
    /^(\d{4})[-/](\d{2})[-/](\d{2})/
  );

  if (match) {
    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const day = parseInt(match[3], 10);
    const date = new Date(year, month - 1, day);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      year: "numeric",
      day: "2-digit",
    });
  }

  // Fallback: Try native Date parsing (might have timezone issues)
  const fallbackDate = new Date(dateString);
  if (!isNaN(fallbackDate.getTime())) {
    return fallbackDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      year: "numeric",
      day: "2-digit",
    });
  }

  return dateString;
}

export function localStringToDate(dateString: string | undefined | null) {
  if (!dateString) return "";
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
