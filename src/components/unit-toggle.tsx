import { Button } from "@/components/ui/button";
import { type TemperatureUnit } from "@/hooks/use-temperature-unit";

interface UnitToggleProps {
  unit: TemperatureUnit;
  onChange: (unit: TemperatureUnit) => void;
}

export default function UnitToggle({ unit, onChange }: UnitToggleProps) {
  return (
    <div className="inline-flex rounded-md border p-1">
      <Button
        type="button"
        variant={unit === "celsius" ? "default" : "ghost"}
        size="sm"
        onClick={() => onChange("celsius")}
      >
        °C
      </Button>

      <Button
        type="button"
        variant={unit === "fahrenheit" ? "default" : "ghost"}
        size="sm"
        onClick={() => onChange("fahrenheit")}
      >
        °F
      </Button>
    </div>
  );
}