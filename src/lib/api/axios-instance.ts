import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
export interface ApiError {
  status?: number;
  message: string;
}

export const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  timeout: 10000, // 10 seconds timeout for requests
  params: {
    units: 'metric', // Given that the temperature is in Celsius
    lang: 'uk'       // Description of weather in Ukrainian
  }
});


// Add a request interceptor
weatherApi.interceptors.request.use(
  (config) => {
    config.params = config.params || {};

    // Check if API key is present
    if (!API_KEY) {
      return Promise.reject({
        status: 500,
        message: "Відсутній OpenWeather API key.",
      } satisfies ApiError);
    }

    config.params.appid = API_KEY;
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
weatherApi.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.code === "ECONNABORTED") {
      return Promise.reject({
        status: 408,
        message: "Час очікування відповіді вичерпано. Спробуйте пізніше.",
      } satisfies ApiError);
    }

    const status = error.response?.status;
    let message = 'Сталася невідома помилка при отриманні погоди.';

    // Map OpenWeather specific API response error codes
    switch (status) {
      case 400:
        message = 'Некоректний запит. Перевірте параметри пошуку.';
        break;
      case 401:
        message = 'Помилка авторизації. Невірний або неактивний API Key.';
        break;
      case 404:
        message = 'Місто або локацію не знайдено.';
        break;
      case 429:
        message = 'Перевищено ліміт запитів для вашого тарифного плану API.';
        break;
      case 500:
      case 502:
      case 503:
      case 504:
        message = 'Сервер OpenWeather тимчасово недоступний.';
        break;
    }

    return Promise.reject({
      status,
      message,
    } satisfies ApiError);
  }
);