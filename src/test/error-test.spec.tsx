import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/render";
import ErrorMessage from "@/components/error-message";

describe("ErrorMessage", () => {
  it("renders passed message", () => {
    renderWithProviders(
      <ErrorMessage message="Місто не знайдено" onRetry = {() => {}} />
  );

  expect(screen.getByText("Місто не знайдено")).toBeInTheDocument();
});
});