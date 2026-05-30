import { useQuery } from '@tanstack/react-query';
import { getCitySuggestions } from '@/lib/api/weather-api';
import { useDebounce } from '@/hooks/use-debounce';

export const useCityAutocomplete = (query: string) => {
  const debouncedQuery = useDebounce(query.trim(), 500);

  const autocompleteQuery = useQuery({
    queryKey: ["city-autocomplete", debouncedQuery],
    queryFn: ({ signal }) => getCitySuggestions(debouncedQuery, signal),
    enabled: debouncedQuery.length >= 2,
    staleTime: 1000 * 60 * 5,
  });

  return {
    suggestions: autocompleteQuery.data ?? [],
    isLoading: autocompleteQuery.isLoading,
    isFetching: autocompleteQuery.isFetching,
    error: autocompleteQuery.error,
    debouncedQuery,
  };
};