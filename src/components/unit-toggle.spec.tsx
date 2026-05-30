import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import UnitToggle from "@/components/unit-toggle";
import { renderWithProviders } from "@/test/render";

describe("UnitToggle", () => {
  it("renders Celsius and Fahrenheit buttons", () => {
    renderWithProviders(
      <UnitToggle unit="celsius" onChange={vi.fn()} />
    );

    expect(screen.getByRole("button", { name: "°C" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "°F" })).toBeInTheDocument();
  });

  it("renders divider between buttons", () => {
    renderWithProviders(
      <UnitToggle unit="celsius" onChange={vi.fn()} />
    );

    expect(screen.getByText("/")).toBeInTheDocument();
  });

  it('calls onChange with "celsius" when Celsius button is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    renderWithProviders(
      <UnitToggle unit="fahrenheit" onChange={onChange} />
    );

    await user.click(screen.getByRole("button", { name: "°C" }));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("celsius");
  });

  it('calls onChange with "fahrenheit" when Fahrenheit button is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    renderWithProviders(
      <UnitToggle unit="celsius" onChange={onChange} />
    );

    await user.click(screen.getByRole("button", { name: "°F" }));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("fahrenheit");
  });

  it("renders Celsius button as active when unit is celsius", () => {
    renderWithProviders(
      <UnitToggle unit="celsius" onChange={vi.fn()} />
    );

    const celsiusButton = screen.getByRole("button", { name: "°C" });
    const fahrenheitButton = screen.getByRole("button", { name: "°F" });

    expect(celsiusButton.className).toMatch(/bg-white\/18/);
    expect(fahrenheitButton.className).toMatch(/bg-transparent/);
  });

  it("renders Fahrenheit button as active when unit is fahrenheit", () => {
    renderWithProviders(
      <UnitToggle unit="fahrenheit" onChange={vi.fn()} />
    );

    const celsiusButton = screen.getByRole("button", { name: "°C" });
    const fahrenheitButton = screen.getByRole("button", { name: "°F" });

    expect(fahrenheitButton.className).toMatch(/bg-white\/18/);
    expect(celsiusButton.className).toMatch(/bg-transparent/);
  });
});