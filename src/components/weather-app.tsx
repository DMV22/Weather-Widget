import React, { useState } from 'react';
import { useWeather } from '../hooks/use-weather';

export default function WeatherApp() {
  const [searchCity, setSearchCity] = useState('Kyiv');
  const [inputVal, setInputVal] = useState('');

  // Call the custom hook to fetch weather data
  const { data, isLoading, isError, error, isFetching } = useWeather(searchCity);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputVal.trim()) setSearchCity(inputVal);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Введіть місто (напр. Lviv)..."
          className="border p-2 rounded w-full text-black"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Пошук
        </button>
      </form>

      {isLoading && <p className="text-gray-500">Завантаження даних про погоду...</p>}

      {isError && (
        <p className="text-red-500">
          Помилка: {error.message || 'Не вдалося завантажити дані'}
        </p>
      )}

      {data && (
        <div className="border p-4 rounded shadow bg-card text-card-foreground relative">
          {/* Indicator for background cache update (if the user searches for the same city again) */}
          {isFetching && <span className="absolute top-2 right-2 text-xs text-blue-400">Оновлення...</span>}

          <h2 className="text-2xl font-bold">{data.name}, {data.sys?.country}</h2>
          <p className="text-4xl my-2 font-semibold">{Math.round(data.main.temp)}°C</p>
          <p className="capitalize text-gray-600 dark:text-gray-300">
            {data.weather[0]?.description}
          </p>
          <div className="text-sm mt-2 text-muted-foreground">
            <p>Вологість: {data.main.humidity}%</p>
            <p>Вітер: {data.wind.speed} м/с</p>
          </div>
        </div>
      )}
    </div>
  );
}
