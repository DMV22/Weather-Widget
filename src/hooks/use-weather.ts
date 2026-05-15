import { useQuery } from '@tanstack/react-query';
import { getCurrentWeather } from '@/lib/api/weather-api';

export const useWeather = (city: string) => {
  return useQuery({
    queryKey: ['weather', city],
    queryFn: ({ signal }) => getCurrentWeather(city, signal),
    enabled: Boolean(city.trim()),
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
};