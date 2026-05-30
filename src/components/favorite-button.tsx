import { type FavoriteCity } from "@/hooks/use-favorite-city";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  currentCity: FavoriteCity;
  isFavorite: boolean;
  onToggle: (city: FavoriteCity) => void;
}

export default function FavoriteButton({
  currentCity,
  isFavorite,
  onToggle,
}: FavoriteButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onToggle(currentCity)}
      title={isFavorite ? "Видалити з улюблених" : "Додати в улюблені"}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl px-2 py-1 text-sm transition-colors",
        "text-white/85 hover:text-white"
      )}
    >
      <span className="text-xl leading-none">{isFavorite ? "⭐️" : "☆"}</span>
      <span>{isFavorite ? "В улюблених" : "Додати в улюблені"}</span>
    </button>
  );
}