import type { GeocodingCity } from "@/lib/api/types";

export function getCityDisplayName(city: GeocodingCity) {
  return city.local_names?.uk || city.local_names?.en || city.name;
}

export function formatCityLabel(city: GeocodingCity) {
  return [getCityDisplayName(city), city.state, city.country]
    .filter(Boolean)
    .join(", ");
}