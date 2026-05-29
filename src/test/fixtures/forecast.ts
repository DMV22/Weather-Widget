import type { ForecastData } from "@/lib/api/types";

export const mockForecast: ForecastData = {
  list: [
    {
      dt: 1717060800,
      dt_txt: "2026-05-29 12:00:00",
      main: {
        temp: 18,
        feels_like: 17,
        humidity: 60,
        temp_min: 17,
        temp_max: 19,
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
        speed: 3.1,
      },
    },
    {
      dt: 1717147200,
      dt_txt: "2026-05-30 12:00:00",
      main: {
        temp: 20,
        feels_like: 19,
        humidity: 58,
        temp_min: 18,
        temp_max: 21,
      },
      weather: [
        {
          id: 801,
          main: "Clouds",
          description: "few clouds",
          icon: "02d",
        },
      ],
      wind: {
        speed: 3.8,
      },
    },
    {
      dt: 1717233600,
      dt_txt: "2026-05-31 12:00:00",
      main: {
        temp: 21,
        feels_like: 20,
        humidity: 55,
        temp_min: 19,
        temp_max: 22,
      },
      weather: [
        {
          id: 500,
          main: "Rain",
          description: "light rain",
          icon: "10d",
        },
      ],
      wind: {
        speed: 4.2,
      },
    },
    {
      dt: 1717320000,
      dt_txt: "2026-06-01 12:00:00",
      main: {
        temp: 19,
        feels_like: 18,
        humidity: 63,
        temp_min: 17,
        temp_max: 20,
      },
      weather: [
        {
          id: 803,
          main: "Clouds",
          description: "broken clouds",
          icon: "04d",
        },
      ],
      wind: {
        speed: 3.6,
      },
    },
    {
      dt: 1717406400,
      dt_txt: "2026-06-02 12:00:00",
      main: {
        temp: 22,
        feels_like: 21,
        humidity: 57,
        temp_min: 20,
        temp_max: 23,
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
        speed: 2.9,
      },
    },
  ],
  city: {
    name: "Kyiv",
    country: "UA",
  },
};