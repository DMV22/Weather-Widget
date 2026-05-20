import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
}

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  isLoading = false,
}: SearchBarProps) {
  return (
    <form onSubmit={onSubmit} className="mb-4 flex gap-2">
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Введіть місто (напр. Lviv)..."
        disabled={isLoading}
      />
      <Button type="submit" disabled={isLoading || !value.trim()}>
        {isLoading ? "Пошук..." : "Пошук"}
      </Button>
    </form>
  );
}