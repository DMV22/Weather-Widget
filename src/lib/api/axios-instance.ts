import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    appid: API_KEY,
    units: 'metric', // Given that the temperature is in Celsius
    lang: 'uk'       // Description of weather in Ukrainian
  }
});
