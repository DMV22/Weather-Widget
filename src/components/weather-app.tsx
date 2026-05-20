import { useState } from "react";
import { useWeather } from "@/hooks/use-weather";
import SearchBar from "@/components/search-bar";
import CurrentWeather from "@/components/current-weather";
import LoadingSkeleton from "@/components/loading-skeleton";
import ErrorMessage from "@/components/error-message";

export default function WeatherApp() {
  const [searchCity, setSearchCity] = useState("Kyiv");
  const [inputValue, setInputValue] = useState("Kyiv");

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useWeather(searchCity);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const normalizedCity = inputValue.trim();
    if (!normalizedCity) return;

    setSearchCity(normalizedCity);
  };

  return (
    <div className="mx-auto max-w-md p-6 space-y-4">
      <SearchBar
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleSearch}
        isLoading={isLoading}
      />

      {isLoading && <LoadingSkeleton />}

      {isError && (
        <ErrorMessage
          message={error.message || "Не вдалося завантажити дані"}
          onRetry={() => refetch()}
        />
      )}

      {data && !isError && (
        <CurrentWeather data={data} isFetching={isFetching} />
      )}
    </div>
  );
}