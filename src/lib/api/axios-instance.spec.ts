import { type InternalAxiosRequestConfig } from "axios";
import { weatherApi } from "@/lib/api/axios-instance";

describe("weatherApi interceptors", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("adds appid to request params in request interceptor", async () => {
    const requestInterceptor =
      weatherApi.interceptors.request.handlers?.[0]?.fulfilled;

    expect(requestInterceptor).toBeTypeOf("function");

    const config = {
      params: {
        q: "Kyiv",
      },
    } as InternalAxiosRequestConfig;

    const result = await requestInterceptor!(config);

    expect(result.params).toMatchObject({
      q: "Kyiv",
      appid: expect.any(String),
    });
  });

  it('normalizes 404 response into ApiError with message "Місто або локацію не знайдено."', async () => {
    const responseRejectedInterceptor =
      weatherApi.interceptors.response.handlers?.[0]?.rejected;

    expect(responseRejectedInterceptor).toBeTypeOf("function");

    const axiosError = {
      response: {
        status: 404,
      },
    };

    await expect(responseRejectedInterceptor!(axiosError)).rejects.toEqual({
      status: 404,
      message: "Місто або локацію не знайдено.",
    });
  });

  it("normalizes timeout error into ApiError with status 408", async () => {
    const responseRejectedInterceptor =
      weatherApi.interceptors.response.handlers?.[0]?.rejected;

    expect(responseRejectedInterceptor).toBeTypeOf("function");

    const axiosError = {
      code: "ECONNABORTED",
    };

    await expect(responseRejectedInterceptor!(axiosError)).rejects.toEqual({
      status: 408,
      message: "Час очікування відповіді вичерпано. Спробуйте пізніше.",
    });
  });
});