import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { render } from "@/test/test-utils";
import { PressReference } from "@/types";

import { PressLink } from "./PressLink";

const reference: PressReference = {
  title: "Test Article",
  source: "Test Source",
  url: "https://example.com/article",
  favicon: "/assets/press/test-favicon.png",
};

describe("PressLink", () => {
  it("should link the article title to the external url in a new tab without opener", () => {
    render(<PressLink reference={reference} />);

    const link = screen.getByRole("link", { name: /Test Article/ });
    expect(link).toHaveAttribute("href", "https://example.com/article");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("should render the favicon as decorative image from the local path", () => {
    const { container } = render(<PressLink reference={reference} />);

    const favicon = container.querySelector("img");
    expect(favicon).toHaveAttribute("src", "/assets/press/test-favicon.png");
    expect(favicon).toHaveAttribute("alt", "");
    expect(favicon).toHaveAttribute("aria-hidden", "true");
    // Decorative image must not show up as accessible image
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("should render no image when the reference has no favicon", () => {
    const { container } = render(
      <PressLink reference={{ ...reference, favicon: undefined }} />
    );

    expect(container.querySelector("img")).toBeNull();
    expect(screen.getByRole("link", { name: /Test Article/ })).toHaveAttribute(
      "href",
      "https://example.com/article"
    );
  });

  it("should show only the source when the article language is unknown", () => {
    render(<PressLink reference={reference} />);

    expect(screen.getByText("Test Source")).toBeInTheDocument();
  });

  it("should show only the source when the article language matches the UI language", () => {
    render(<PressLink reference={{ ...reference, language: "en" }} />);

    expect(screen.getByText("Test Source")).toBeInTheDocument();
  });

  it("should append a language hint when the article language differs from the UI language", () => {
    render(<PressLink reference={{ ...reference, language: "de" }} />);

    expect(
      screen.getByText("Test Source · article in German")
    ).toBeInTheDocument();
  });
});
