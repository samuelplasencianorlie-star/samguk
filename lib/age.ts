const CANARY_TIME_ZONE = "Atlantic/Canary";

function currentCanaryDateParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    timeZone: CANARY_TIME_ZONE,
    year: "numeric"
  }).formatToParts(date);

  return Object.fromEntries(
    parts
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, Number(part.value)])
  ) as Record<"day" | "month" | "year", number>;
}

export function calculateAge(
  birthDate: string,
  referenceDate = new Date()
): number | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(birthDate.trim());

  if (!match) {
    return null;
  }

  const birthYear = Number(match[1]);
  const birthMonth = Number(match[2]);
  const birthDay = Number(match[3]);
  const parsedDate = new Date(Date.UTC(birthYear, birthMonth - 1, birthDay));

  if (
    parsedDate.getUTCFullYear() !== birthYear ||
    parsedDate.getUTCMonth() + 1 !== birthMonth ||
    parsedDate.getUTCDate() !== birthDay
  ) {
    return null;
  }

  const today = currentCanaryDateParts(referenceDate);
  let age = today.year - birthYear;

  if (
    today.month < birthMonth ||
    (today.month === birthMonth && today.day < birthDay)
  ) {
    age -= 1;
  }

  return age >= 0 && age <= 120 ? age : null;
}

export function formatAge(age: number, birthDate: string) {
  return birthDate ? `${age} años` : "Sin fecha de nacimiento";
}
