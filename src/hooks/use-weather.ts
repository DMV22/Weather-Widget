import { useQuery } from '@tanstack/react-query';
import { getCurrentWeather } from '@/lib/api/weather-api';
import { type WeatherParams } from '@/lib/api/weather-api';

export const useWeather = (params: WeatherParams | null) => {
  return useQuery({
    queryKey: ['weather', params],
    queryFn: ({ signal }) => {
      if (!params) {
        throw new Error("Weather params are missing.");
      }

      return getCurrentWeather(params, signal);
    },
    enabled: !!params,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
};