import { useEffect, useState } from 'react'

export interface FavoriteCity {
  id: number;
  name: string;
  country: string;
}

const STORAGE_KEY = "weather-favorite-cities";

export const useFavoriteCity = () => {
  const [favorites, setFavorites] = useState<FavoriteCity[]>((() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }
  ));

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (city: FavoriteCity) => {
    setFavorites((prev) => {
      const isExist = prev.some((item) => item.id === city.id);
      if (isExist) {
        return prev.filter((item) => item.id !== city.id);
      } else {
        return [...prev, city];
      }
    });
  };

  const isFavorite = (cityId: number) => {
    return favorites.some((item) => item.id === cityId);
  };

  return { favorites, toggleFavorite, isFavorite }
}
