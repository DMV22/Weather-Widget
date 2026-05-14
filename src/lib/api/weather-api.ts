import { type WeatherData } from './types';
import { weatherApi } from './axios-instance';

export const getCurrentWeather = async (city: string): Promise<WeatherData> => {
  const response = await weatherApi.get('/weather', {
    params: { q: city }
  })

  return response.data;
};
