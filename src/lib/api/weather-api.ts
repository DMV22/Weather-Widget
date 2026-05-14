import axios from 'axios';
import { type WeatherData } from './types';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    appid: API_KEY,
    units: 'metric', // Given that the temperature is in Celsius
    lang: 'uk'       // Description of weather in Ukrainian
  }
});


export const getCurrentWeather = async (city: string): Promise<WeatherData> => {
  const response = await weatherApi.get('/weather', {
    params: { q: city }
  });
  //console.log('Current Weather Response:', response.data);

  return response.data;
};
