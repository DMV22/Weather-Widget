import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import WeatherApp from "@/components/weather-app";
import { renderWithProviders } from "@/test/render";

vi.mock("@/hooks/use-weather", () => ({ useWeather: vi.fn() }));
vi.mock("@/hooks/use-forecast", () => ({ useForecast: vi.fn() }));
vi.mock("@/hooks/use-geolocation", () => ({ useGeolocation: vi.fn() }));
vi.mock("@/hooks/use-temperature-unit", () => ({ useTemperatureUnit: vi.fn() }));
vi.mock("@/hooks/use-favorite-city", () => ({ useFavoriteCity: vi.fn() }));
vi.mock("@/hooks/use-city-autocomplete", () => ({ useCityAutocomplete: vi.fn() }));

import { useWeather } from "@/hooks/use-weather";
import { useForecast } from "@/hooks/use-forecast";
import { useGeolocation } from "@/hooks/use-geolocation";
import { useTemperatureUnit } from "@/hooks/use-temperature-unit";
import { useFavoriteCity } from "@/hooks/use-favorite-city";
import { useCityAutocomplete } from "@/hooks/use-city-autocomplete";
import { mockCurrentWeather } from "@/test/fixtures/weather";
import { mockForecast } from "@/test/fixtures/forecast";
import { mockGeocodingCities } from "@/test/fixtures/geocoding"


describe("WeatherApp", () => {
  const setTemperatureUnit = vi.fn();
  const toggleFavorite = vi.fn();
  const isFavorite = vi.fn(() => false);
  const getCurrentPosition = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useTemperatureUnit).mockReturnValue({
      unit: "celsius",
      setTemperatureUnit,
    });

    vi.mocked(useGeolocation).mockReturnValue({
      coordinates: null,
      error: null,
      isLoading: false,
      getCurrentPosition,
    });

    vi.mocked(useFavoriteCity).mockReturnValue({
      favorites: [],
      toggleFavorite,
      isFavorite,
    });

    vi.mocked(useCityAutocomplete).mockReturnValue({
      suggestions: [],
      isLoading: false,
      isFetching: false,
      error: null,
      debouncedQuery: "",
    });

    vi.mocked(useWeather).mockReturnValue({
      data: mockCurrentWeather,
      isLoading: false,
      isError: false,
      isFetching: false,
      error: null,
    } as unknown as ReturnType<typeof useWeather>);

    vi.mocked(useForecast).mockReturnValue({
      data: mockForecast,
      isLoading: false,
      isError: false,
      isFetching: false,
      error: null,
    } as unknown as ReturnType<typeof useForecast>);
  });

  it("renders widget title and default city input", () => {
    renderWithProviders(<WeatherApp />);

    expect(screen.getByText(/weather widget/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue("Kyiv")).toBeInTheDocument();
  });

  it("calls getCurrentPosition on mount", () => {
    renderWithProviders(<WeatherApp />);

    expect(getCurrentPosition).toHaveBeenCalledTimes(1);
  });

  it("renders loading skeleton when current weather is loading", () => {
    vi.mocked(useWeather).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      isFetching: false,
      error: null,
    } as unknown as ReturnType<typeof useWeather>);

    const { container } = renderWithProviders(<WeatherApp />);

    expect(container.querySelectorAll(".animate-pulse").length).toBeGreaterThan(0);
  });

  it("renders error message when current weather request fails", () => {
    vi.mocked(useWeather).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      isFetching: false,
      error: {
        name: "Error",
        message: "Місто не знайдено",
      },
    } as unknown as ReturnType<typeof useWeather>);

    renderWithProviders(<WeatherApp />);

    expect(screen.getByText(/місто не знайдено/i)).toBeInTheDocument();
  });

  it("renders geolocation fallback message when geolocation fails", () => {
    vi.mocked(useGeolocation).mockReturnValue({
      coordinates: null,
      error: "Не вдалося визначити геолокацію",
      isLoading: false,
      getCurrentPosition,
    });

    renderWithProviders(<WeatherApp />);

    expect(
      screen.getByText(/не вдалося визначити геолокацію/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/подивіться погоду для kyiv/i)
    ).toBeInTheDocument();
  });

  it("renders current weather content on successful load", () => {
    renderWithProviders(<WeatherApp />);

    expect(screen.getAllByText("Kyiv, UA").length).toBeGreaterThan(0);
    expect(screen.getByText("Відчувається як")).toBeInTheDocument();
    expect(screen.getByText("Вологість")).toBeInTheDocument();
    expect(screen.getByText("Вітер")).toBeInTheDocument();
  });

  it("renders forecast components when forecast data is available", () => {
    renderWithProviders(<WeatherApp />);

    expect(screen.getAllByText(/kyiv/i).length).toBeGreaterThan(0);
  });

  it("calls setTemperatureUnit when user switches unit", async () => {
    const user = userEvent.setup();
    renderWithProviders(<WeatherApp />);

    await user.click(screen.getByRole("button", { name: "°F" }));

    expect(setTemperatureUnit).toHaveBeenCalledWith("fahrenheit");
  });

  it("submits search for a new city", async () => {
    const user = userEvent.setup();
    renderWithProviders(<WeatherApp />);

    const input = screen.getByPlaceholderText(/search city/i);
    await user.clear(input);
    await user.type(input, "Lviv");

    await user.click(screen.getByRole("button", { name: /search/i }));

    expect(screen.getByDisplayValue("Lviv")).toBeInTheDocument();
  });

  it("shows autocomplete suggestions when available", async () => {
    const user = userEvent.setup();

    vi.mocked(useCityAutocomplete).mockReturnValue({
      suggestions: mockGeocodingCities,
      isLoading: false,
      isFetching: false,
      error: null,
      debouncedQuery: "Ky",
    });

    renderWithProviders(<WeatherApp />);

    const input = screen.getByPlaceholderText(/search city/i);
    await user.click(input);

    expect(screen.getAllByText(/kyiv/i).length).toBeGreaterThan(0);
  });
});