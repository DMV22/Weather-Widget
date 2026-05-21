import { useEffect, useState } from "react";
import { useWeather } from "@/hooks/use-weather";
import { useForecast } from "@/hooks/use-forecast";
import { useGeolocation } from "@/hooks/use-geolocation";

import SearchBar from "@/components/search-bar";
import CurrentWeather from "@/components/current-weather";
import ForecastList from "@/components/forecast-list";
import LoadingSkeleton from "@/components/loading-skeleton";
import ErrorMessage from "@/components/error-message";

import { type WeatherParams } from "@/lib/api/weather-api";

const DEFAULT_CITY = "Kyiv";

export default function WeatherApp() {
  const [queryParams, setQueryParams] = useState<WeatherParams>({ city: DEFAULT_CITY });
  const [inputValue, setInputValue] = useState(DEFAULT_CITY);

  const { coordinates, error: geoError, isLoading: isGeoLoading, getCurrentPosition } = useGeolocation();

  const currentData = useWeather(queryParams);
  const forecastData = useForecast(queryParams);

  useEffect(() => {
    getCurrentPosition();
  }, [getCurrentPosition]);

  useEffect(() => {
    if (coordinates) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQueryParams({
        lat: coordinates.lat,
        lon: coordinates.lon,
      });
    }
  }, [coordinates]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const normalizedCity = inputValue.trim();
    if (!normalizedCity) return;

    setQueryParams({ city: normalizedCity });
  };

  return (
    <>
      <div className="mx-auto max-w-md p-6 space-y-4">
        <SearchBar
          value={inputValue}
          onChange={setInputValue}
          onSubmit={handleSearch}
          isLoading={currentData.isLoading || isGeoLoading}
        />

        {geoError && (
          <p className="text-sm text-muted-foreground">
            {geoError}. Подивіться погоду для {DEFAULT_CITY} або введіть інше місто вручну.
          </p>
        )}

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