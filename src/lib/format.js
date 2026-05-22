const TR_MON = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];
const EN_MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function fmtOne(iso, lang) {
  const d = new Date(iso + "T00:00:00");
  if (!iso || isNaN(d.getTime())) return iso || "";
  const mon = (lang === "tr" ? TR_MON : EN_MON)[d.getMonth()];
  return `${d.getDate()} ${mon}`;
}

// Build a human date range/label from an item's date fields.
export function fmtDate(item, lang = "tr") {
  if (item.startDate && item.endDate) {
    return `${fmtOne(item.startDate, lang)} – ${fmtOne(item.endDate, lang)}`;
  }
  if (item.startDate) return fmtOne(item.startDate, lang);
  return item.date || item.time || "";
}
