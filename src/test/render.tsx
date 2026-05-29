import { QueryClientProvider } from "@tanstack/react-query";
import { render, type RenderOptions } from "@testing-library/react";
import type { PropsWithChildren, ReactElement } from "react";
import { createTestQueryClient } from "@/test/test-query-client";

export function createTestWrapper() {
  const queryClient = createTestQueryClient();

  return function TestWrapper({ children }: PropsWithChildren) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
  };
}

export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  const wrapper = createTestWrapper();

  return render(ui, {
    wrapper,
    ...options,
  });
}