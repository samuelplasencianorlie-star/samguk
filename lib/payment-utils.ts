export const PAYMENT_TIME_ZONE = "Atlantic/Canary";

export function getPaymentMonthKey(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en", {
    month: "2-digit",
    timeZone: PAYMENT_TIME_ZONE,
    year: "numeric"
  }).formatToParts(date);
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;

  return `${year}-${month}`;
}

export function paymentMonthKeyToDate(monthKey: string) {
  return `${monthKey}-01`;
}

export function formatPaymentMonth(monthKey: string) {
  const [year, month] = monthKey.split("-").map(Number);

  if (!year || !month) {
    return monthKey;
  }

  return new Intl.DateTimeFormat("es-ES", {
    month: "long",
    timeZone: PAYMENT_TIME_ZONE,
    year: "numeric"
  }).format(new Date(Date.UTC(year, month - 1, 1)));
}
