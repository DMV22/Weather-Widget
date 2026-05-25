import ForecastCard from "./forecast-card";
import { type ForecastData } from "@/lib/api/types";
import { transformForecastToDaily } from "@/lib/forecast";
import { type TemperatureUnit } from "@/hooks/use-temperature-unit";

export interface ForecastListProps {
  data: ForecastData;
  isFetching?: boolean;
  unit: TemperatureUnit;
}

export default function ForecastList({
  data,
  isFetching = false,
  unit,
}: ForecastListProps) {
  const dailyForecast = transformForecastToDaily(data);

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-white">5-Day Forecast</h2>
        <p className="text-sm text-white/60">
          {data.city.name}, {data.city.country}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {dailyForecast.map((forecast) => (
          <ForecastCard
            key={forecast.date}
            forecast={forecast}
            isFetching={isFetching}
            unit={unit}
          />
        ))}
      </div>
    </section>
  );
}