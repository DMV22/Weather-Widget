import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorMessage({
  message = "Не вдалося завантажити дані про погоду.",
  onRetry,
}: ErrorMessageProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Сталася помилка</CardTitle>
        <CardDescription>{message}</CardDescription>
      </CardHeader>

      {onRetry && (
        <CardContent>
          <Button type="button" variant="outline" onClick={onRetry}>
            Спробувати ще раз
          </Button>
        </CardContent>
      )}
    </Card>
  );
}