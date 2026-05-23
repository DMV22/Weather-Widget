import { useState } from 'react'

export type TemperatureUnit = 'celsius' | 'fahrenheit'
const STORAGE_KEY = "weather-temperature-unit";

export const useTemperatureUnit = () => {
  const [unit, setUnit] = useState<TemperatureUnit>(() => {
    return localStorage.getItem(STORAGE_KEY) as TemperatureUnit || "celsius"
  });

  const setTemperatureUnit = (nextUnit: TemperatureUnit) => {
    setUnit(nextUnit);
    localStorage.setItem(STORAGE_KEY, nextUnit);
  };

  return { unit, setTemperatureUnit }
}