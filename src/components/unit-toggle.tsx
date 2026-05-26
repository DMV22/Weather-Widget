import { Button } from "@/components/ui/button";
import { type TemperatureUnit } from "@/hooks/use-temperature-unit";
import { cn } from "@/lib/utils";

interface UnitToggleProps {
  unit: TemperatureUnit;
  onChange: (unit: TemperatureUnit) => void;
}

export default function UnitToggle({ unit, onChange }: UnitToggleProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 p-1.5 backdrop-blur-sm">
      <Button
        type="button"
        size="sm"
        onClick={() => onChange("celsius")}
        className={cn(
          "h-9 min-w-11 rounded-full px-3 shadow-none",
          unit === "celsius"
            ? "bg-white/18 text-white hover:bg-white/18"
            : "bg-transparent text-white/70 hover:bg-white/10 hover:text-white",
        )}
      >
        °C
      </Button>

      <span className="text-sm text-white/35">/</span>

      <Button
        type="button"
        size="sm"
        onClick={() => onChange("fahrenheit")}
        className={cn(
          "h-9 min-w-11 rounded-full px-3 shadow-none",
          unit === "fahrenheit"
            ? "bg-white/18 text-white hover:bg-white/18"
            : "bg-transparent text-white/70 hover:bg-white/10 hover:text-white",
        )}
      >
        °F
      </Button>
    </div>
  );
}