import type { Deal, DealType, Provider, Spare, SpareType, Worker } from "./types";

export const MONTH_LABELS = [
  "янв.",
  "февр.",
  "мар.",
  "апр.",
  "мая",
  "июн.",
  "июл.",
  "авг.",
  "сент.",
  "окт.",
  "нояб.",
  "дек.",
];

export function pad(value: string | number, length = 2): string {
  return String(value).padStart(length, "0");
}

/** Symfony renders the datetime widget as `dd.mm.yyyy HH:MM`. */
export function formatDealDate(deal: Pick<Deal, "day" | "month" | "year" | "hour" | "minute">): string {
  return `${pad(deal.day)}.${pad(deal.month)}.${deal.year} ${pad(deal.hour)}:${pad(deal.minute)}`;
}

export function dealYearRange(): number[] {
  const current = new Date().getFullYear();
  const years: number[] = [];
  for (let year = current - 5; year <= current + 5; year += 1) years.push(year);
  return years;
}

export function workerFullName(worker: Pick<Worker, "surname" | "name" | "middleName">): string {
  return `${worker.surname} ${worker.name} ${worker.middleName}`;
}

export function findById<T extends { id: number }>(rows: T[], id: string | number | null | undefined): T | undefined {
  if (id === null || id === undefined || id === "") return undefined;
  return rows.find((row) => String(row.id) === String(id));
}

export function spareTypeName(types: SpareType[], id: string): string {
  return findById(types, id)?.name ?? "";
}

export function dealTypeName(types: DealType[], id: string): string {
  return findById(types, id)?.name ?? "";
}

export function providerName(providers: Provider[], id: string): string {
  return findById(providers, id)?.name ?? "";
}

export function spareName(spares: Spare[], id: string): string {
  return findById(spares, id)?.name ?? "";
}

export interface DateParts {
  day: string;
  month: string;
  year: string;
  hour: string;
  minute: string;
}

export function nowParts(): DateParts {
  const now = new Date();
  return {
    day: String(now.getDate()),
    month: String(now.getMonth() + 1),
    year: String(now.getFullYear()),
    hour: String(now.getHours()),
    minute: String(now.getMinutes()),
  };
}

/** Parses `dd.mm.yyyy HH:MM` back into the parts used by the form widget. */
export function parseDateParts(value: string): DateParts {
  const match = /^\s*(\d{1,2})\.(\d{1,2})\.(\d{4})\s+(\d{1,2}):(\d{1,2})\s*$/.exec(value);
  if (!match) return nowParts();
  const [, day, month, year, hour, minute] = match;
  return {
    day: String(Number(day)),
    month: String(Number(month)),
    year,
    hour: String(Number(hour)),
    minute: String(Number(minute)),
  };
}

export function formatDateParts(parts: DateParts): string {
  return `${pad(parts.day)}.${pad(parts.month)}.${parts.year} ${pad(parts.hour)}:${pad(parts.minute)}`;
}
