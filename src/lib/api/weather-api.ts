import { type ForecastData, type WeatherData } from './types';
import { weatherApi } from './axios-instance';

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