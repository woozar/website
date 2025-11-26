import {
  RenderOptions,
  render as testingLibraryRender,
} from "@testing-library/react";

import { ReactElement } from "react";

import { AllTheProviders } from "./router-providers";

// Override the render method with our custom render that includes all providers
export const render = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper"> & { noRouter?: boolean }
) => {
  const { noRouter, ...renderOptions } = options ?? {};
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <AllTheProviders noRouter={noRouter}>{children}</AllTheProviders>
  );
  return testingLibraryRender(ui, { wrapper: Wrapper, ...renderOptions });
};

export { screen, fireEvent } from "@testing-library/react";
