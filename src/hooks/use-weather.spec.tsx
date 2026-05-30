import { renderHook, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";

import { useWeather } from "@/hooks/use-weather";
import { server } from "@/test/server";
import { mockCurrentWeather } from "@/test/fixtures/weather";
import { createTestWrapper } from "@/test/render";

const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";


describe("useWeather", () => {
  it("returns WeatherData on successful request", async () => {
    const wrapper = createTestWrapper();

    const { result } = renderHook(() => useWeather({ city: "Kyiv" }), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockCurrentWeather);
    expect(result.current.data?.name).toBe("Kyiv");
    expect(result.current.error).toBeNull();
  });

  it('goes to error state and returns normalized 404 message "Місто не знайдено"', async () => {
    server.use(
      http.get(WEATHER_URL, () => {
        return HttpResponse.json(
          {
            code: "404",
            message: "city not found",
          },
          { status: 404 }
        );
      })
    );

    const wrapper = createTestWrapper();

    const { result } = renderHook(() => useWeather({ city: "UnknownCity" }), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    }, { timeout: 2000 });

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toEqual({
      status: 404,
      message: "Місто або локацію не знайдено.",
    });
  });

  it("requests weather by coordinates", async () => {
    let capturedSearchParams = new URLSearchParams;

    server.use(
      http.get(WEATHER_URL, ({ request }) => {
        const url = new URL(request.url);
        capturedSearchParams = url.searchParams;

        return HttpResponse.json(mockCurrentWeather);
      })
    );

    const wrapper = createTestWrapper();

    const { result } = renderHook(() => useWeather({ lat: 50.4501, lon: 30.5234 }),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(capturedSearchParams?.get("lat")).toBe("50.4501");
    expect(capturedSearchParams?.get("lon")).toBe("30.5234");
  });
});