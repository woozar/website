import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MantineProvider } from "@mantine/core";

import { ProcessingOutputConnection } from "./ProcessingOutputConnection";

const renderProcessingOutputConnection = (props: {
  shouldReduceMotion: boolean;
  isDesktop: boolean;
}) => {
  return render(
    <MantineProvider>
      <ProcessingOutputConnection {...props} />
    </MantineProvider>
  );
};

describe("ProcessingOutputConnection", () => {
  it("should render desktop version", () => {
    const { container } = renderProcessingOutputConnection({
      shouldReduceMotion: false,
      isDesktop: true,
    });

    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("viewBox", "0 0 120 200");
    expect(svg).toHaveAttribute("width", "120");
  });

  it("should render mobile version", () => {
    const { container } = renderProcessingOutputConnection({
      shouldReduceMotion: false,
      isDesktop: false,
    });

    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("viewBox", "0 0 100 60");
    expect(svg).toHaveAttribute("height", "60");
  });

  it("should render horizontal line for desktop", () => {
    const { container } = renderProcessingOutputConnection({
      shouldReduceMotion: false,
      isDesktop: true,
    });

    const path = container.querySelector("path");
    expect(path).toBeInTheDocument();
    expect(path).toHaveAttribute("d", "M10,100 L110,100");
  });

  it("should render vertical line for mobile", () => {
    const { container } = renderProcessingOutputConnection({
      shouldReduceMotion: false,
      isDesktop: false,
    });

    const path = container.querySelector("path");
    expect(path).toBeInTheDocument();
    expect(path).toHaveAttribute("d", "M50,10 L50,50");
  });

  it("should handle reduced motion preference", () => {
    const { container } = renderProcessingOutputConnection({
      shouldReduceMotion: true,
      isDesktop: true,
    });

    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("should render animated circles for desktop", () => {
    const { container } = renderProcessingOutputConnection({
      shouldReduceMotion: false,
      isDesktop: true,
    });

    const circles = container.querySelectorAll("circle");
    expect(circles).toHaveLength(3);

    // Check that circles have animation attributes
    const firstCircle = circles[0];
    expect(firstCircle).toHaveAttribute("cx", "10");
    expect(firstCircle).toHaveAttribute("cy", "100");
  });

  it("should render animated circles for mobile", () => {
    const { container } = renderProcessingOutputConnection({
      shouldReduceMotion: false,
      isDesktop: false,
    });

    const circles = container.querySelectorAll("circle");
    expect(circles).toHaveLength(3);

    // Check that circles have animation attributes for vertical movement
    const firstCircle = circles[0];
    expect(firstCircle).toHaveAttribute("cx", "50");
    expect(firstCircle).toHaveAttribute("cy", "10");
  });
});
