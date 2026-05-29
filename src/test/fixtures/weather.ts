import type { WeatherData } from "@/lib/api/types";

export const mockCurrentWeather: WeatherData = {
  id: 703448,
  name: "Kyiv",
  sys: {
    country: "UA",
    sunrise: 1717041000,
    sunset: 1717098000,
  },
  main: {
    temp: 18,
    feels_like: 17,
    humidity: 62,
    pressure: 1014,
    temp_min: 16,
    temp_max: 20,
  },
  weather: [
    {
      id: 800,
      main: "Clear",
      description: "clear sky",
      icon: "01d",
    },
  ],
  wind: {
    speed: 3.4,
    deg: 180,
  },
  visibility: 10000,
  dt: 1717060000,
};