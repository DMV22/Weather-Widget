import { useCallback, useState } from "react";

interface Coordinates {
  lat: number;
  lon: number;
}

interface GeolocationState {
  coordinates: Coordinates | null;
  error: string | null;
  isLoading: boolean;
  getCurrentPosition: () => void;
}

function getErrorMessage(error: GeolocationPositionError): string {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return 'Доступ до геолокації заборонено';
    case error.POSITION_UNAVAILABLE:
      return 'Інформація про місцезнаходження недоступна';
    case error.TIMEOUT:
      return 'Час очікування вичерпано';
    default:
      return 'Невідома помилка геолокації';
  }
}

export const useGeolocation = (): GeolocationState => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentPosition = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Геолокація не підтримується вашим браузером.");
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setIsLoading(false);
      },
      (geoError) => {
        setError(getErrorMessage(geoError));
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  return {
    coordinates,
    error,
    isLoading,
    getCurrentPosition,
  };
}