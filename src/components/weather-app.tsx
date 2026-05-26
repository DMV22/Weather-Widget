import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useWeather } from "@/hooks/use-weather";
import { useForecast } from "@/hooks/use-forecast";
import { useGeolocation } from "@/hooks/use-geolocation";
import { useTemperatureUnit } from "@/hooks/use-temperature-unit";
import { useFavoriteCity } from "@/hooks/use-favorite-city";
import { useCityAutocomplete } from "@/hooks/use-city-autocomplete";

import SearchBar from "@/components/search-bar";
import CurrentWeather from "@/components/current-weather";
import ForecastList from "@/components/forecast-list";
import LoadingSkeleton from "@/components/loading-skeleton";
import ErrorMessage from "@/components/error-message";
import UnitToggle from "@/components/unit-toggle";
import ForecastDaily from "@/components/forecast-daily";
import FavoriteButton from "@/components/favorite-button";
import FavoriteList from "@/components/favorite-list";
import WeatherCopyButton from "@/components/weather-copy-button";

import { type WeatherParams } from "@/lib/api/weather-api";
import type { GeocodingCity } from "@/lib/api/types";
import { cn } from "@/lib/utils";
import { formatCityLabel } from "@/lib/format-city";

const DEFAULT_CITY = "Kyiv";

export default function WeatherApp() {
  const [queryParams, setQueryParams] = useState<WeatherParams>({ city: DEFAULT_CITY });
  const [inputValue, setInputValue] = useState(DEFAULT_CITY);

  const { unit, setTemperatureUnit } = useTemperatureUnit();
  const { coordinates, error: geoError, isLoading: isGeoLoading, getCurrentPosition } = useGeolocation();
  const { favorites, toggleFavorite, isFavorite } = useFavoriteCity();
  const { suggestions, isLoading: isSuggestionsLoading, isFetching: isSuggestionsFetching } = useCityAutocomplete(inputValue)

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

  const submitSearch = () => {
    const normalizedCity = inputValue.trim();

    if (!normalizedCity) return;

    setQueryParams({ city: normalizedCity });
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    submitSearch();
  };

  const handleSuggestionSelect = (city: GeocodingCity) => {
    const label = formatCityLabel(city);

    setInputValue(label);
    setQueryParams({
      lat: city.lat,
      lon: city.lon,
    });
  };

  const handleSelectFavoriteCity = (city: { name: string }) => {
    setInputValue(city.name);
    setQueryParams({ city: city.name });
  };

  const isNight = useMemo(() => {
    const icon = currentData.data?.weather?.[0]?.icon;;
    return icon?.endsWith("n") ?? false;
  }, [currentData.data]);

  return (
    <main
      className={cn(
        "min-h-screen px-4 py-6 md:px-6",
        "flex items-center justify-center",
        "transition-colors duration-500",
        isNight
          ? "bg-[linear-gradient(135deg,var(--bg-night-from),var(--bg-night-to))]"
          : "bg-[linear-gradient(135deg,var(--bg-day-from),var(--bg-day-to))]"
      )}
    >
      <section
        className={cn(
          "w-full max-w-3xl rounded-[28px] border border-white/15",
          "bg-(--widget-bg) backdrop-blur-xl",
          "shadow-[0_24px_80px_rgba(2,6,23,0.28)]",
          "p-4 sm:p-5 md:p-6",
          "text-white"
        )}
      >
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300 shadow-[0_0_16px_rgba(252,211,77,0.8)]" />
            <p className="text-sm font-semibold tracking-[0.02em] text-white">
              Weather Widget
            </p>
          </div>

          <UnitToggle unit={unit} onChange={setTemperatureUnit} />
        </div>

        <SearchBar
          value={inputValue}
          onChange={setInputValue}
          onSubmit={handleSearch}
          onSuggestionSelect={handleSuggestionSelect}
          suggestions={suggestions}
          isLoading={currentData.isLoading || isGeoLoading}
          isSuggestionsLoading={isSuggestionsLoading || isSuggestionsFetching}
        />

        {geoError && (
          <p className="mt-3 text-sm text-white/70">
            {geoError}. Подивіться погоду для {DEFAULT_CITY} або введіть інше місто вручну.
          </p>
        )}

        <div className="mt-5 space-y-5">
          {currentData.data && !currentData.isError && (
            <FavoriteList
              favorites={favorites}
              currentCityId={currentData.data.id}
              onSelectCity={handleSelectFavoriteCity}
              onRemoveCity={toggleFavorite}
            />
          )}

          {currentData.isLoading && <LoadingSkeleton />}

          {currentData.isError && (
            <ErrorMessage
              message={currentData.error.message || "Не вдалося завантажити дані"}
              onRetry={submitSearch}
            />
          )}

          {currentData.data && !currentData.isError && (
            <>
              <CurrentWeather
                data={currentData.data}
                isFetching={currentData.isFetching}
                unit={unit}
              />

              <div className="flex flex-wrap items-center gap-3">
                <FavoriteButton
                  currentCity={{
                    id: currentData.data.id,
                    name: currentData.data.name,
                    country: currentData.data.sys.country,
                  }}
                  isFavorite={isFavorite(currentData.data.id)}
                  onToggle={toggleFavorite}
                />

                <WeatherCopyButton
                  weatherData={currentData.data}
                  unit={unit}
                />
              </div>
            </>
          )}

          {forecastData.data && (
            <>
              <ForecastList
                data={forecastData.data}
                isFetching={forecastData.isFetching}
                unit={unit}
              />

              <ForecastDaily
                data={forecastData.data}
                isFetching={forecastData.isFetching}
                unit={unit}
              />
            </>
          )}
        </div>
      </section>
    </main>
  );
}