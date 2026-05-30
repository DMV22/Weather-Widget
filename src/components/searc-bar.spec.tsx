import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SearchBar from "@/components/search-bar";
import { renderWithProviders } from "@/test/render";
import { mockGeocodingCities } from "@/test/fixtures/geocoding";

function setup(props?: Partial<React.ComponentProps<typeof SearchBar>>) {
  const onChange = vi.fn();
  const onSubmit = vi.fn((e) => e.preventDefault());
  const onSuggestionSelect = vi.fn();

  renderWithProviders(
    <SearchBar
      value="Ky"
      onChange={onChange}
      onSubmit={onSubmit}
      onSuggestionSelect={onSuggestionSelect}
      suggestions={mockGeocodingCities}
      isLoading={false}
      isSuggestionsLoading={false}
      {...props}
    />
  );

  return {
    onChange,
    onSubmit,
    onSuggestionSelect,
  };
}

describe("SearchBar", () => {
  it("renders controlled input value", () => {
    setup({ value: "Kyiv" });

    const input = screen.getByPlaceholderText(/search city/i);

    expect(input).toHaveValue("Kyiv");
  });

  it("calls onChange when user types", async () => {
    const user = userEvent.setup();
    const { onChange } = setup({ value: "" });

    const input = screen.getByPlaceholderText(/search city/i);

    await user.type(input, "Kyiv");

    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenLastCalledWith("v");
  });

  it("calls onSubmit when form is submitted", async () => {
    const user = userEvent.setup();
    const { onSubmit } = setup({ value: "Kyiv" });

    const button = screen.getByRole("button", { name: /search/i });

    await user.click(button);

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("shows suggestions dropdown when input is focused and value length is >= 2", async () => {
    const user = userEvent.setup();
    setup({ value: "Ky" });

    const input = screen.getByPlaceholderText(/search city/i);
    await user.click(input);

    expect(screen.getAllByRole("button", { name: /kyiv/i }).length).toBeGreaterThan(0);
    expect(screen.getByText(/kyiv oblast/i)).toBeInTheDocument();
  });

  it("calls onSuggestionSelect when user clicks suggestion", async () => {
    const user = userEvent.setup();
    const { onSuggestionSelect } = setup({ value: "Ky" });

    const input = screen.getByPlaceholderText(/search city/i);
    await user.click(input);

    const suggestionButtons = screen.getAllByRole("button", { name: /kyiv/i });
    await user.click(suggestionButtons[0]);

    expect(onSuggestionSelect).toHaveBeenCalledTimes(1);
    expect(onSuggestionSelect).toHaveBeenCalledWith(mockGeocodingCities[0]);
  });

  it('shows "Searching cities..." when suggestions are loading', async () => {
    const user = userEvent.setup();
    setup({
      value: "Ky",
      suggestions: [],
      isSuggestionsLoading: true,
    });

    const input = screen.getByPlaceholderText(/search city/i);
    await user.click(input);

    expect(screen.getByText(/searching cities/i)).toBeInTheDocument();
  });

  it('shows "No cities found" when suggestions are empty', async () => {
    const user = userEvent.setup();
    setup({
      value: "Ky",
      suggestions: [],
      isSuggestionsLoading: false,
    });

    const input = screen.getByPlaceholderText(/search city/i);
    await user.click(input);

    expect(screen.getByText(/no cities found/i)).toBeInTheDocument();
  });

  it("does not show suggestions if input value length is less than 2", async () => {
    const user = userEvent.setup();
    setup({ value: "K" });

    const input = screen.getByPlaceholderText(/search city/i);
    await user.click(input);

    expect(screen.queryByText(/no cities found/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/searching cities/i)).not.toBeInTheDocument();
  });

  it("disables submit button when input is empty", () => {
    setup({ value: "" });

    const button = screen.getByRole("button", { name: /search/i });

    expect(button).toBeDisabled();
  });

  it("disables input and button when main loading is active", () => {
    setup({
      value: "Kyiv",
      isLoading: true,
    });

    const input = screen.getByPlaceholderText(/search city/i);
    const button = screen.getByRole("button");

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });

  it("hides suggestions after blur", async () => {
    const user = userEvent.setup();
    setup({ value: "Ky" });

    const input = screen.getByPlaceholderText(/search city/i);
    await user.click(input);

    expect(screen.getAllByRole("button", { name: /kyiv/i }).length).toBeGreaterThan(0);

    await user.tab();

    await waitFor(() => {
      expect(screen.queryByText(/kyiv oblast/i)).not.toBeInTheDocument();
    });
  });
});