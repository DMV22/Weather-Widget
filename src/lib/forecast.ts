import type { DailyForecast, ForecastData } from "@/lib/api/types";

export function transformForecastToDaily(data: ForecastData): DailyForecast[] {
  const grouped = new Map<string, ForecastData["list"]>();

  data.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    const existing = grouped.get(date) ?? [];
    existing.push(item);
    grouped.set(date, existing);
  });

  return Array.from(grouped.entries())
    .slice(0, 5)
    .map(([date, items]) => {
      const temps = items.map((item) => item.main.temp);
      const minTemps = items.map((item) => item.main.temp_min);
      const maxTemps = items.map((item) => item.main.temp_max);

      const middleItem = items[Math.floor(items.length / 2)];
      const dayName = new Date(date).toLocaleDateString("uk-UA", {
        weekday: "short",
      });

      return {
        date,
        dayName: dayName.toUpperCase(),
        temp:
          temps.reduce((sum, value) => sum + value, 0) / temps.length,
        tempMin: Math.min(...minTemps),
        tempMax: Math.max(...maxTemps),
        icon: middleItem.weather[0]?.icon ?? "01d",
        description: middleItem.weather[0]?.description ?? "",
      };
    });
}