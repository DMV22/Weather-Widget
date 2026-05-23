import type { TemperatureUnit } from "@/hooks/use-temperature-unit";

export function Temperature(value: number, unit: TemperatureUnit) {
  if (unit === "fahrenheit") {
    return Math.round((value * 9) / 5 + 32);
  }

  return Math.round(value);
}