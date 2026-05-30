import { screen } from "@testing-library/react";

import CurrentWeather from "@/components/current-weather";
import { renderWithProviders } from "@/test/render";
import { mockCurrentWeather } from "@/test/fixtures/weather";

describe("CurrentWeather", () => {
  it("renders city name and country", () => {
    renderWithProviders(
      <CurrentWeather data={mockCurrentWeather} unit="celsius" isFetching={false} />
    );

    expect(screen.getByText(/kyiv/i)).toBeInTheDocument();
    expect(screen.getByText(/ua/i)).toBeInTheDocument();
  });

  it("renders current temperature", () => {
    renderWithProviders(
      <CurrentWeather data={mockCurrentWeather} unit="celsius" isFetching={false} />
    );

    expect(screen.getByText(/18°/i)).toBeInTheDocument();
  });

  it("renders weather description", () => {
    renderWithProviders(
      <CurrentWeather data={mockCurrentWeather} unit="celsius" isFetching={false} />
    );

    expect(screen.getByText(/чисте небо/i)).toBeInTheDocument();
  });

  it("renders feels like temperature", () => {
    renderWithProviders(
      <CurrentWeather data={mockCurrentWeather} unit="celsius" isFetching={false} />
    );

    expect(screen.getByText(/відчувається як/i)).toBeInTheDocument();
    expect(screen.getByText(/17°/i)).toBeInTheDocument();
  });

  it("renders humidity value", () => {
    renderWithProviders(
      <CurrentWeather data={mockCurrentWeather} unit="celsius" isFetching={false} />
    );

    expect(screen.getByText(/вологість/i)).toBeInTheDocument();
    expect(screen.getByText(/62%/i)).toBeInTheDocument();
  });

  it("renders wind speed", () => {
    renderWithProviders(
      <CurrentWeather data={mockCurrentWeather} unit="celsius" isFetching={false} />
    );

    expect(screen.getByText(/вітер/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp("3.4 m/s", "i"))).toBeInTheDocument();
  });

  it("renders fetching indicator when data is being refreshed", () => {
    renderWithProviders(
      <CurrentWeather data={mockCurrentWeather} unit="celsius" isFetching={true} />
    );

    expect(screen.getByText(/оновлення/i)).toBeInTheDocument();
  });
});