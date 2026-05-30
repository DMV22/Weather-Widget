interface WeatherData {
  id: number;                      // 703448
  name: string;                    // 'Kyiv'
  sys: {
    country: string;              // 'UA'
    sunrise: number;
    sunset: number;
  };
  main: {
    temp: number;                 // 15.5
    feels_like: number;           // 14.2
    humidity: number;             // 72
    pressure: number;             // 1015
    temp_min: number;
    temp_max: number;
  };
  weather: Array<{
    id: number;                   // 800
    main: string;                 // 'Clear'
    description: string;          // 'clear sky'
    icon: string;                 // '01d'
  }>;
  wind: {
    speed: number;                // 3.5
    deg: number;                  // 180
  };
  visibility: number;             // 10000
  dt: number;                     // Unix timestamp
}

interface ForecastData {
  list: Array<{
    dt: number;
    dt_txt: string;               // '2024-01-15 12:00:00'
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
      temp_min: number;
      temp_max: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
    };
  }>;
  city: {
    name: string;
    country: string;
  };
}

interface DailyForecast {
  date: string;
  dayName: string;
  temp: number;
  tempMin: number;
  tempMax: number;
  icon: string;
  description: string;
}

export type { WeatherData, ForecastData, DailyForecast };