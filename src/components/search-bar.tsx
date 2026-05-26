import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  );
}