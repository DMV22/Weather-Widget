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
  unit
}: ForecastListProps) {
  const dailyForecast = transformForecastToDaily(data);

  return (
    <section className="space-y-5">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight">
          5-Day Forecast
        </h2>
        <p className="text-sm text-muted-foreground">
          {data.city.name}, {data.city.country}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
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