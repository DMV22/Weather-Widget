import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorMessage({
  message = "Не вдалося завантажити дані про погоду.",
  onRetry,
}: ErrorMessageProps) {
  return (
    <Card className="rounded-[24px] border-red-200/20 bg-red-500/10 text-white shadow-none backdrop-blur-sm">
      <CardContent className="flex flex-col items-start gap-4 p-5">
        <div>
          <p className="text-sm font-semibold text-red-100">
            Сталася помилка
          </p>
          <p className="mt-1 text-sm text-white/75">{message}</p>
        </div>

        {onRetry && (
          <Button
            type="button"
            onClick={onRetry}
            className="rounded-2xl border border-white/15 bg-white/12 text-white shadow-none hover:bg-white/18"
          >
            Спробувати ще раз
          </Button>
        )}
      </CardContent>
    </Card>
  );
}