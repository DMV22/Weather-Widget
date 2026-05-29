import { http, HttpResponse } from "msw";
import { mockCurrentWeather } from "@/test/fixtures/weather";
import { mockForecast } from "@/test/fixtures/forecast";
import { mockGeocodingCities } from "@/test/fixtures/geocoding";

const WEATHER_BASE_URL = "https://api.openweathermap.org";

export const handlers = [
  http.get(`${WEATHER_BASE_URL}/data/2.5/weather`, () => {
    return HttpResponse.json(mockCurrentWeather);
  }),

  http.get(`${WEATHER_BASE_URL}/data/2.5/forecast`, () => {
    return HttpResponse.json(mockForecast);
  }),

  http.get(`${WEATHER_BASE_URL}/geo/1.0/direct`, () => {
    return HttpResponse.json(mockGeocodingCities);
  }),
];