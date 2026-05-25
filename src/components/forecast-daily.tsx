import { type TemperatureUnit } from "@/hooks/use-temperature-unit";
import { type ForecastData } from "@/lib/api/types";
import { Card, CardContent } from "@/components/ui/card";
import { Temperature } from "@/lib/temperature";
import { cn } from "@/lib/utils";

interface ForecastDailyProps {
  data: ForecastData;
  isFetching?: boolean;
  unit: TemperatureUnit;
}

export default function ForecastDaily({
  data,
  isFetching = false,
  unit,
}: ForecastDailyProps) {
  const hourlyForecast = data.list.slice(0, 8);

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);

    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-white">
          24-Hour Forecast
        </h2>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="flex gap-3">
          {hourlyForecast.map((forecast) => (
            <Card
              key={forecast.dt}
              className={cn(
                "relative min-w-30 overflow-hidden rounded-[20px]",
                "border-white/15 bg-white/10 text-white shadow-none backdrop-blur-sm",
                "transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white/14"
              )}
            >
              {isFetching && (
                <span className="absolute right-3 top-3 text-[10px] text-white/50">
                  ...
                </span>
              )}

              <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
                  {formatTime(forecast.dt)}
                </p>

                <img
                  src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                  alt={forecast.weather[0].description}
                  className="h-14 w-14"
                />

                <p className="min-h-8 text-[11px] leading-4 capitalize text-white/55">
                  {forecast.weather[0].description}
                </p>

                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-lg font-bold text-white">
                    {Temperature(forecast.main.temp, unit)}°
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}