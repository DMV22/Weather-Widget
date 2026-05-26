import { useMemo, useState, type FormEvent } from "react"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type GeocodingCity } from "@/lib/api/types"
import { getCityDisplayName } from "@/lib/format-city";
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  onSuggestionSelect: (city: GeocodingCity) => void;
  suggestions: GeocodingCity[];
  isLoading?: boolean;
  isSuggestionsLoading?: boolean;
}

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  onSuggestionSelect,
  suggestions,
  isLoading = false,
  isSuggestionsLoading = false,
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  const shouldShowSuggestions = useMemo(() => {
    return isFocused && value.trim().length >= 2;
  }, [isFocused, value]);

  return (
    <div className="relative">
      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]"
      >
        <div className="flex min-h-13 items-center gap-3 rounded-2xl border border-white/15 bg-white/8 px-4 backdrop-blur-sm">
          <span className="text-sm text-white/70">🔎</span>

          <Input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              window.setTimeout(() => {
                setIsFocused(false)
              }, 150);
            }}
            placeholder="Search city..."
            disabled={isLoading}

            className="border-none bg-transparent px-0 text-white shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-white/45"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading || !value.trim()}
          className={cn(
            "min-h-13 rounded-2xl border border-white/15 px-5",
            "bg-white/12 text-white shadow-none",
            "hover:bg-white/18",
            "disabled:bg-white/8 disabled:text-white/50",
          )}
        >
          {isLoading ? "Loading..." : "Search"}
        </Button>
      </form>

      {shouldShowSuggestions && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/95 shadow-xl backdrop-blur-xl">
          {isSuggestionsLoading ? (
            <div className="px-4 py-3 text-sm text-white/65">
              Searching cities...
            </div>
          ) : suggestions.length > 0 ? (
            <ul className="py-2">
              {suggestions.map((city, index) => (
                <li key={`${city.name}-${city.lat}-${city.lon}-${index}`}>
                  <button
                    type="button"
                    onClick={() => onSuggestionSelect(city)}
                    className="flex w-full items-start justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-white/8"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white">
                        {getCityDisplayName(city)}
                      </p>
                      <p className="truncate text-xs text-white/55">
                        {[city.state, city.country].filter(Boolean).join(", ")}
                      </p>
                    </div>

                    <span className="shrink-0 text-xs text-white/35">
                      {city.country}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-3 text-sm text-white/55">
              No cities found
            </div>
          )}
        </div>
      )}
    </div>
  )
}