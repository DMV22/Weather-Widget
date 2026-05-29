import axios, { type InternalAxiosRequestConfig } from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
export interface ApiError {
  status?: number;
  message: string;
}

export const weatherApi = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  timeout: 10000,
  params: {
    units: "metric",
    lang: "uk",
  },
});

export const geoApi = axios.create({
  baseURL: "https://api.openweathermap.org",
  timeout: 10000,
});

const attachApiKey = (config: InternalAxiosRequestConfig) => {
  config.params = config.params || {};

  if (!API_KEY) {
    throw {
      status: 500,
      message: "Відсутній OpenWeather API key.",
    } satisfies ApiError;
  }

  config.params.appid = API_KEY;
  return config;
};

const handleApiError = (error: unknown) => {
  // if (!axios.isAxiosError(error)) {
  //   return Promise.reject({
  //     message: "Невідома помилка.",
  //   } satisfies ApiError);
  // }

  const errObj = error as Record<string, unknown>;
  const response = errObj?.response as Record<string, unknown> | undefined;

  if (errObj?.code === "ECONNABORTED") {
    return Promise.reject({
      status: 408,
      message: "Час очікування відповіді вичерпано. Спробуйте пізніше.",
    } satisfies ApiError);
  }

  if (response && typeof response.status === "number") {
    const status = response.status;
    let message = "Сталася невідома помилка при отриманні даних.";

    switch (status) {
      case 400:
        message = "Некоректний запит. Перевірте параметри пошуку.";
        break;
      case 401:
        message = "Помилка авторизації. Невірний або неактивний API Key.";
        break;
      case 404:
        message = "Місто або локацію не знайдено.";
        break;
      case 429:
        message = "Перевищено ліміт запитів для вашого тарифного плану API.";
        break;
      case 500:
      case 502:
      case 503:
      case 504:
        message = "Сервер OpenWeather тимчасово недоступний.";
        break;
    }

    return Promise.reject({
      status,
      message,
    } satisfies ApiError);
  }

  return Promise.reject({
    message: "Невідома помилка.",
  } satisfies ApiError);
};

weatherApi.interceptors.request.use(attachApiKey);
geoApi.interceptors.request.use(attachApiKey);

weatherApi.interceptors.response.use((response) => response, handleApiError);
geoApi.interceptors.response.use((response) => response, handleApiError);