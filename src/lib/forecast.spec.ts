import { transformForecastToDaily } from "@/lib/forecast";
import { mockForecast } from "@/test/fixtures/forecast";

describe("transformForecastToDaily", () => {
  it("groups forecast entries by day and returns 5 daily records", () => {
    const result = transformForecastToDaily(mockForecast);

    expect(result).toHaveLength(5);

    expect(result[0]).toMatchObject({
      icon: "01d",
      description: expect.any(String),
    });

    expect(result.map((day) => day.date)).toEqual([
      "2026-05-29",
      "2026-05-30",
      "2026-05-31",
      "2026-06-01",
      "2026-06-02",
    ]);
  });

  it("returns only one record for the same day even if API contains multiple time slots", () => {
    const forecastList = {
      list: [
        {
          dt: 1717060800,
          dt_txt: "2026-05-29 09:00:00",
          main: {
            temp: 16,
            feels_like: 15,
            humidity: 60,
            temp_min: 14,
            temp_max: 17,
          },
          weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
          wind: { speed: 3.2 },
        },
        {
          dt: 1717071600,
          dt_txt: "2026-05-29 12:00:00",
          main: {
            temp: 18,
            feels_like: 17,
            humidity: 58,
            temp_min: 16,
            temp_max: 19,
          },
          weather: [{ id: 801, main: "Clouds", description: "few clouds", icon: "02d" }],
          wind: { speed: 3.4 },
        },
      ],
      city: {
        name: "Kyiv",
        country: "UA",
      },
    };

    const result = transformForecastToDaily(forecastList);

    expect(result).toHaveLength(1);
    expect(result[0].date).toBe("2026-05-29");
  });
});