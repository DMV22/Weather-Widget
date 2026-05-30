import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ErrorMessage from "@/components/error-message";
import { renderWithProviders } from "@/test/render";

describe("ErrorMessage", () => {
  it("renders provided error message", () => {
    renderWithProviders(
      <ErrorMessage
        message="Не вдалося завантажити погоду"
        onRetry={vi.fn()}
      />
    );

    expect(
      screen.getByText(/не вдалося завантажити погоду/i)
    ).toBeInTheDocument();
  });

  it("renders retry button", () => {
    renderWithProviders(
      <ErrorMessage
        message="Сталася помилка"
        onRetry={vi.fn()}
      />
    );

    expect(
      screen.getByRole("button", { name: /спробувати ще раз/i })
    ).toBeInTheDocument();
  });

  it("calls onRetry when retry button is clicked", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();

    renderWithProviders(
      <ErrorMessage
        message="Сталася помилка"
        onRetry={onRetry}
      />
    );

    await user.click(screen.getByRole("button", { name: /спробувати ще раз/i }));

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("renders custom message from API normalization", () => {
    renderWithProviders(
      <ErrorMessage
        message="Місто не знайдено"
        onRetry={vi.fn()}
      />
    );

    expect(screen.getByText(/місто не знайдено/i)).toBeInTheDocument();
  });
});