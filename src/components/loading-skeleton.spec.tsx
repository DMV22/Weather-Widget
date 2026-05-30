import LoadingSkeleton from "@/components/loading-skeleton";
import { renderWithProviders } from "@/test/render";

describe("LoadingSkeleton", () => {
  it("renders without crashing", () => {
    const { container } = renderWithProviders(<LoadingSkeleton />);

    expect(container).toBeInTheDocument();
  });

  it("renders all skeleton placeholders", () => {
    const { container } = renderWithProviders(<LoadingSkeleton />);

    const skeletons = container.querySelectorAll(".animate-pulse");

    expect(skeletons).toHaveLength(12);
  });

  it("renders main weather card skeleton placeholders", () => {
    const { container } = renderWithProviders(<LoadingSkeleton />);

    const skeletons = container.querySelectorAll(".animate-pulse");

    expect(skeletons.length).toBeGreaterThanOrEqual(7);
  });

  it("renders forecast skeleton placeholders", () => {
    const { container } = renderWithProviders(<LoadingSkeleton />);

    const skeletons = container.querySelectorAll(".animate-pulse");

    expect(skeletons.length).toBeGreaterThanOrEqual(12);
  });
});