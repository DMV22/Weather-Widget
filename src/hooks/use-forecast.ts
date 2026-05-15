import { useQuery } from '@tanstack/react-query';
import { getForecast } from '@/lib/api/weather-api';

export const useForecast = (city: string) => {
  return useQuery({
    queryKey: ['forecast', city],
    queryFn: ({ signal }) => getForecast(city, signal),
    enabled: Boolean(city.trim()),
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
};