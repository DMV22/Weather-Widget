import { Card, CardContent } from "@/components/ui/card";
import { type WeatherData } from "@/lib/api/types";
import { type TemperatureUnit } from "@/hooks/use-temperature-unit";
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
    <Card className="overflow-hidden rounded-[24px] border-white/15 bg-white/12 text-white shadow-none backdrop-blur-sm">
      <CardContent className="relative p-6 sm:p-7">
        {isFetching && (
          <span className="absolute right-5 top-5 text-xs text-white/60">
            Оновлення...
          </span>
        )}

        <div className="flex flex-col items-center text-center">
          <p className="text-base font-semibold tracking-[0.01em] text-white">
            {data.name}, {data.sys.country}
          </p>

          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={data.weather[0].description}
            className="h-24 w-24"
          />

          <p className="text-[clamp(3.25rem,8vw,4.75rem)] font-bold leading-none tracking-[-0.04em] text-white">
            {Temperature(data.main.temp, unit)}°
          </p>

          <p className="mt-2 text-base capitalize text-white/75">
            {data.weather[0].description}
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/6 p-4 text-left">
            <p className="text-xs uppercase tracking-[0.18em] text-white/45">
              Відчувається як
            </p>
            <p className="mt-1 text-base font-semibold text-white">
              {Temperature(data.main.feels_like, unit)}°
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/6 p-4 text-left">
            <p className="text-xs uppercase tracking-[0.18em] text-white/45">
              Вологість
            </p>
            <p className="mt-1 text-base font-semibold text-white">
              {data.main.humidity}%
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/6 p-4 text-left">
            <p className="text-xs uppercase tracking-[0.18em] text-white/45">
              Вітер
            </p>
            <p className="mt-1 text-base font-semibold text-white">
              {data.wind.speed} m/s
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}