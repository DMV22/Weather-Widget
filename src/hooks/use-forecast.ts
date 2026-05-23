import { useQuery } from '@tanstack/react-query';
import { getForecast, type WeatherParams } from '@/lib/api/weather-api';

export const useForecast = (params: WeatherParams | null) => {
  return useQuery({
    queryKey: ['forecast', params],
    queryFn: ({ signal }) => {
      if (!params) {
        throw new Error("Weather params are missing.");
      }

      return getForecast(params, signal);
    },
    enabled: !!params,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
};