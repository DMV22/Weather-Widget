import { useEffect, useMemo, useRef, useState } from 'react';
import { type WeatherData } from '@/lib/api/types';
import { Temperature } from "@/lib/temperature";
import type { TemperatureUnit } from '@/hooks/use-temperature-unit';
import { cn } from '@/lib/utils';

interface WeatherCopyButtonProps {
  weatherData: WeatherData;
  unit: TemperatureUnit;
}

export default function WeatherCopyButton({ weatherData, unit }: WeatherCopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const degreeSymbol = unit === "celsius" ? "C" : "F";

  const weatherText = useMemo(() => {
    return `Погода в ${weatherData.name}: ${Temperature(weatherData.main.temp, unit)}°${degreeSymbol}, ${weatherData.weather[0].description}. Вітер: ${weatherData.wind.speed} м/с.`;
  }, [weatherData, unit, degreeSymbol]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(weatherText);
      setIsCopied(true);

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Помилка копіювання:", error);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl px-2 py-1 text-sm transition-colors",
        "text-white/85 hover:text-white"
      )}
    >
      <span>{isCopied ? "✅" : "📋"}</span>
      <span>{isCopied ? "Скопійовано!" : "Скопіювати погоду"}</span>
    </button>
  );
}
