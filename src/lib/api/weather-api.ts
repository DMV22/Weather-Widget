import { type ForecastData, type WeatherData } from './types';
import { weatherApi } from './axios-instance';

export const getCurrentWeather = async (city: string, signal: AbortSignal): Promise<WeatherData> => {
  const response = await weatherApi.get('/weather', {
    params: { q: city },
    signal
  })

  return response.data;
};

export const getForecast = async (city: string, signal: AbortSignal): Promise<ForecastData> => {
  const response = await weatherApi.get('/forecast', {
    params: { q: city },
    signal
  })

  return response.data;
};