import { useQuery } from '@tanstack/react-query';
import { getCurrentWeather } from '../lib/api/weather-api';

export const useWeather = (city: string) => {
  return useQuery({
    queryKey: ['weather', city],
    queryFn: () => getCurrentWeather(city),
    enabled: !!city,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
};
