import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MantineProvider } from "@mantine/core";

import { InputProcessingConnections } from "./InputProcessingConnections";

const renderInputProcessingConnections = (props: {
  inputCount: number;
  shouldReduceMotion: boolean;
  isDesktop: boolean;
}) => {
  return render(
    <MantineProvider>
      <InputProcessingConnections {...props} />
    </MantineProvider>
  );
};

describe("InputProcessingConnections", () => {
  it("should render desktop version with single input", () => {
    const { container } = renderInputProcessingConnections({
      inputCount: 1,
      shouldReduceMotion: false,
      isDesktop: true,
    });

    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("viewBox", "0 0 120 200");
  });

  it("should render desktop version with multiple inputs", () => {
    const { container } = renderInputProcessingConnections({
      inputCount: 3,
      shouldReduceMotion: false,
      isDesktop: true,
    });

    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();

    // Should have 3 connection groups (one for each input)
    const groups = container.querySelectorAll("g");
    expect(groups).toHaveLength(3);
  });

  it("should render mobile version", () => {
    const { container } = renderInputProcessingConnections({
      inputCount: 2,
      shouldReduceMotion: false,
      isDesktop: false,
    });

    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("viewBox", "0 0 100 60");
    expect(svg).toHaveAttribute("height", "60");
  });

  it("should handle reduced motion preference", () => {
    const { container } = renderInputProcessingConnections({
      inputCount: 1,
      shouldReduceMotion: true,
      isDesktop: true,
    });

    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("should render correct number of animated circles per connection", () => {
    const { container } = renderInputProcessingConnections({
      inputCount: 2,
      shouldReduceMotion: false,
      isDesktop: true,
    });

    // Each connection has 2 animated circles
    const circles = container.querySelectorAll("circle");
    expect(circles).toHaveLength(4); // 2 connections × 2 circles each
  });

  it("should render mobile connections with proper spacing", () => {
    const { container } = renderInputProcessingConnections({
      inputCount: 3,
      shouldReduceMotion: false,
      isDesktop: false,
    });

    const paths = container.querySelectorAll("path");
    expect(paths).toHaveLength(3);

    // Each mobile connection should have 2 circles
    const circles = container.querySelectorAll("circle");
    expect(circles).toHaveLength(6);
  });
});
