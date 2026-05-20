export interface WeatherData {
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