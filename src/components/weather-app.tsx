import { useState } from "react";
import { useWeather } from "@/hooks/use-weather";
import { useForecast } from "@/hooks/use-forecast";
import SearchBar from "@/components/search-bar";
import CurrentWeather from "@/components/current-weather";
import ForecastList from "./forecast-list";
import LoadingSkeleton from "@/components/loading-skeleton";
import ErrorMessage from "@/components/error-message";

export default function WeatherApp() {
  const [searchCity, setSearchCity] = useState("Kyiv");
  const [inputValue, setInputValue] = useState("Kyiv");

  const currentData = useWeather(searchCity);
  const forecastData = useForecast(searchCity);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const normalizedCity = inputValue.trim();
    if (!normalizedCity) return;

    setSearchCity(normalizedCity);
  };

  return (
    <>
      <div className="mx-auto max-w-md p-6 space-y-4">
        <SearchBar
          value={inputValue}
          onChange={setInputValue}
          onSubmit={handleSearch}
          isLoading={currentData.isLoading}
        />
        {currentData.isLoading && <LoadingSkeleton />}
        {currentData.isError && (
          <ErrorMessage
            message={currentData.error.message || "Не вдалося завантажити дані"}
            onRetry={() => currentData.refetch()}
          />
        )}
        {currentData.data && !currentData.isError && (
          <CurrentWeather data={currentData.data} isFetching={currentData.isFetching} />
        )}
      </div>

      <div>
        {forecastData.data && <ForecastList data={forecastData.data} isFetching={forecastData.isFetching} />}
      </div>
    </>
  );
}