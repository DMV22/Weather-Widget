import { type FavoriteCity } from "@/hooks/use-favorite-city";
import { cn } from "@/lib/utils";

interface FavoriteListProps {
  favorites: FavoriteCity[];
  currentCityId?: number;
  onSelectCity: (city: FavoriteCity) => void;
  onRemoveCity: (city: FavoriteCity) => void;
}

export default function FavoriteList({
  favorites,
  currentCityId,
  onSelectCity,
  onRemoveCity,
}: FavoriteListProps) {
  if (favorites.length === 0) {
    return (
      <p className="px-1 text-sm text-white/60">
        Список улюблених міст порожній
      </p>
    );
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {favorites.map((city) => {
        const isActive = currentCityId === city.id;

        return (
          <div
            key={city.id}
            onClick={() => onSelectCity(city)}
            className={cn(
              "inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-sm transition-colors cursor-pointer",
              isActive
                ? "border-white/30 bg-white/18 text-white"
                : "border-white/10 bg-white/8 text-white/80 hover:bg-white/12"
            )}
          >
            <span>{city.name}</span>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onRemoveCity(city);
              }}
              className="inline-flex h-5 w-5 items-center justify-center rounded-full text-xs text-white/70 hover:bg-white/10 hover:text-white"
              aria-label={`Видалити ${city.name} з улюблених`}
            >
              ✕
            </button>
          </div>

        );
      })}
    </div>
  );
}