import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import type { WeatherData } from "@/lib/api/types";
import type { TemperatureUnit } from "@/hooks/use-temperature-unit";
import { Temperature } from "@/lib/temperature";

interface CurrentWeatherProps {
  data: WeatherData;
  isFetching?: boolean;
  unit: TemperatureUnit;
}

export default function CurrentWeather({
  data,
  isFetching = false,
  unit
}: CurrentWeatherProps) {
  return (
    <Card className="relative">
      {isFetching && (
        <span className="absolute top-3 right-4 text-xs text-muted-foreground">
          Оновлення...
        </span>
      )}

      <CardHeader>
        <CardTitle>
          {data.name}, {data.sys.country}
        </CardTitle>
        <CardDescription className="capitalize">
          {data.weather[0]?.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-2">
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
          alt={data.weather[0].description}
          className="w-16 h-16"
        />

        <p className="text-4xl font-semibold tracking-tight">
          {Temperature(data.main.temp, unit)}°{unit === "celsius" ? "C" : "F"}
        </p>

        <div className="space-y-1 text-sm text-muted-foreground">
          <p>Вологість: {data.main.humidity}%</p>
          <p>Вітер: {data.wind.speed} м/с</p>
          <p>Відчувається як: {Temperature(data.main.feels_like, unit)}°{unit === "celsius" ? "C" : "F"}</p>
        </div>
      </CardContent>
    </Card>
  );
}