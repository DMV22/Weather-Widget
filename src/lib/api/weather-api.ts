import type { ForecastData, GeocodingCity, WeatherData } from '@/lib/api/types';
import { weatherApi, geoApi } from "@/lib/api/axios-instance";

export type WeatherParams = { city: string } | { lat: number; lon: number };

const buildQueryParams = (params: WeatherParams) => {
  if ('city' in params) {
    return { q: params.city };
  } else {
    return { lat: params.lat, lon: params.lon };
  }
}

export const getCurrentWeather = async (params: WeatherParams, signal: AbortSignal): Promise<WeatherData> => {
  const response = await weatherApi.get('/weather', {
    params: buildQueryParams(params),
    signal
  })

  return response.data;
};

export const getForecast = async (params: WeatherParams, signal: AbortSignal): Promise<ForecastData> => {
  const response = await weatherApi.get('/forecast', {
    params: buildQueryParams(params),
    signal
  })

  return response.data;
};

export const getCitySuggestions = async (query: string, signal: AbortSignal): Promise<GeocodingCity[]> => {
  const normalizedQuery = query.trim();

  if (normalizedQuery.length < 2) return [];

  const response = await geoApi.get('/geo/1.0/direct', {
    params: {
      q: normalizedQuery,
      limit: 5,
    },
    signal
  })

  return response.data;
}