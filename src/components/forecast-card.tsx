import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { type DailyForecast } from "@/lib/api/types";
import { type TemperatureUnit } from "@/hooks/use-temperature-unit";
import { Temperature } from "@/lib/temperature";

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
      className="
        relative
        w-32
        overflow-hidden
        rounded-2xl
        border
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {isFetching && (
        <span className="absolute right-3 top-3 text-[10px] text-muted-foreground">
          Оновлення...
        </span>
      )}

      <CardContent className="flex flex-col items-center gap-2 p-5">
        <p className="text-sm font-semibold tracking-wide text-muted-foreground">
          {forecast.dayName}
        </p>
        <img
          src={`https://openweathermap.org/img/wn/${forecast.icon}@2x.png`}
          alt={forecast.description}
          className="h-16 w-16"
        />
        <p className="text-xs capitalize text-muted-foreground text-center min-h-8">
          {forecast.description}
        </p>
        <div className="flex items-center gap-3 pt-1">
          <span className="text-lg font-bold">
            {Temperature(forecast.tempMax, unit)}°
          </span>
          <span className="text-sm text-muted-foreground">
            {Temperature(forecast.tempMin, unit)}°
          </span>
        </div>
      </CardContent>
    </Card>
  );
}