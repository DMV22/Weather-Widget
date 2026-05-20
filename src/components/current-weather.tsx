import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import type { WeatherData } from "@/lib/api/types";

interface CurrentWeatherProps {
  data: WeatherData;
  isFetching?: boolean;
}

export default function CurrentWeather({
  data,
  isFetching = false,
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
          {Math.round(data.main.temp)}°C
        </p>

        <div className="space-y-1 text-sm text-muted-foreground">
          <p>Вологість: {data.main.humidity}%</p>
          <p>Вітер: {data.wind.speed} м/с</p>
          <p>Відчувається як: {Math.round(data.main.feels_like)}°C</p>
        </div>
      </CardContent>
    </Card>
  );
}