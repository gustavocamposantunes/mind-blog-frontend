import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import type { ReactNode } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  }
});

const customRender = (ui: ReactNode, options = {}) =>
  render(ui, { wrapper: ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>, ...options });

export {
  render as baseRender,
  screen,
  fireEvent,
  waitFor,
  act,
  within,
  cleanup,
} from "@testing-library/react";
export { customRender as render };
