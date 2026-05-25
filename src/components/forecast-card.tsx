import { Card, CardContent } from "@/components/ui/card";
import { type DailyForecast } from "@/lib/api/types";
import { type TemperatureUnit } from "@/hooks/use-temperature-unit";
import { Temperature } from "@/lib/temperature";
import { cn } from "@/lib/utils";

interface ForecastCardProps {
  forecast: DailyForecast;
  isFetching?: boolean;
  unit: TemperatureUnit;
}

export default function ForecastCard({
  forecast,
  isFetching = false,
  unit
}: ForecastCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden rounded-[20px]",
        "border-white/15 bg-white/10 text-white shadow-none backdrop-blur-sm",
        "transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white/14",
      )}
    >
      {isFetching && (
        <span className="absolute right-3 top-3 text-[10px] text-white/50">
          ...
        </span>
      )}

      <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
          {forecast.dayName}
        </p>

        <img
          src={`https://openweathermap.org/img/wn/${forecast.icon}@2x.png`}
          alt={forecast.description}
          className="h-14 w-14"
        />

        <p className="min-h-8 text-[11px] leading-4 capitalize text-white/55">
          {forecast.description}
        </p>

        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-lg font-bold text-white">
            {Temperature(forecast.tempMax, unit)}°
          </span>
          <span className="text-sm text-white/60">
            {Temperature(forecast.tempMin, unit)}°
          </span>
        </div>
      </CardContent>
    </Card>
  );
}