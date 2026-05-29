import { Temperature } from "@/lib/temperature";

describe("Temperature", () => {
  it("returns Celsius value without conversion when unit is celsius", () => {
    expect(Temperature(0, "celsius")).toBe(0);
    expect(Temperature(25, "celsius")).toBe(25);
  });

  it("converts Celsius to Fahrenheit correctly", () => {
    expect(Temperature(0, "fahrenheit")).toBe(32);
    expect(Temperature(10, "fahrenheit")).toBe(50);
    expect(Temperature(25, "fahrenheit")).toBe(77);
  });

  it("rounds values correctly for both units", () => {
    // Фаренгейт: (15.5 * 9) / 5 + 32 = 27.9 + 32 = 59.9 -> округлюється до 60
    expect(Temperature(15.5, "fahrenheit")).toBe(60);

    // Цельсій: 15.5 округлюється до 16 згідно функції
    expect(Temperature(15.5, "celsius")).toBe(16);
  });
});