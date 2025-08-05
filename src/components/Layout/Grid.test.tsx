import { describe, expect, it } from "vitest";

import { render, screen } from "../../test/test-utils";
import { Grid } from "./Grid";

describe("Grid", () => {
  it("should render children", () => {
    render(
      <Grid>
        <div>Grid Item 1</div>
        <div>Grid Item 2</div>
      </Grid>
    );

    expect(screen.getByText("Grid Item 1")).toBeInTheDocument();
    expect(screen.getByText("Grid Item 2")).toBeInTheDocument();
  });

  it("should render with default responsive columns", () => {
    render(
      <Grid>
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    );

    const gridContainer = screen.getByText("Item 1").parentElement;
    expect(gridContainer).toHaveClass("mantine-SimpleGrid-root");
  });

  it("should apply custom column configuration", () => {
    render(
      <Grid cols={{ mobile: 1, tablet: 2, desktop: 4 }}>
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    );

    const gridContainer = screen.getByText("Item 1").parentElement;
    expect(gridContainer).toHaveClass("mantine-SimpleGrid-root");
  });

  it("should apply spacing when specified", () => {
    render(
      <Grid spacing="lg">
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    );

    const gridContainer = screen.getByText("Item 1").parentElement;
    expect(gridContainer).toHaveClass("mantine-SimpleGrid-root");
  });

  it("should apply custom className when provided", () => {
    render(
      <Grid className="custom-grid">
        <div>Item 1</div>
      </Grid>
    );

    const gridContainer = screen.getByText("Item 1").parentElement;
    expect(gridContainer).toHaveClass("custom-grid");
    expect(gridContainer).toHaveClass("mantine-SimpleGrid-root");
  });

  it("should render multiple children in grid layout", () => {
    render(
      <Grid cols={{ mobile: 2, tablet: 3, desktop: 4 }} spacing="sm">
        <div>Card 1</div>
        <div>Card 2</div>
        <div>Card 3</div>
        <div>Card 4</div>
      </Grid>
    );

    expect(screen.getByText("Card 1")).toBeInTheDocument();
    expect(screen.getByText("Card 2")).toBeInTheDocument();
    expect(screen.getByText("Card 3")).toBeInTheDocument();
    expect(screen.getByText("Card 4")).toBeInTheDocument();

    const gridContainer = screen.getByText("Card 1").parentElement;
    expect(gridContainer).toHaveClass("mantine-SimpleGrid-root");
  });

  it("should handle single child", () => {
    render(
      <Grid cols={{ mobile: 1, tablet: 1, desktop: 1 }}>
        <div>Single Item</div>
      </Grid>
    );

    expect(screen.getByText("Single Item")).toBeInTheDocument();

    const gridContainer = screen.getByText("Single Item").parentElement;
    expect(gridContainer).toHaveClass("mantine-SimpleGrid-root");
  });

  it("should handle empty children gracefully", () => {
    render(<Grid>{null}</Grid>);

    const gridContainer = document.querySelector(".mantine-SimpleGrid-root");
    expect(gridContainer).toBeInTheDocument();
  });

  it("should handle undefined children gracefully", () => {
    render(<Grid>{undefined}</Grid>);

    const gridContainer = document.querySelector(".mantine-SimpleGrid-root");
    expect(gridContainer).toBeInTheDocument();
  });

  it("should work with complex child elements", () => {
    render(
      <Grid cols={{ mobile: 1, tablet: 2, desktop: 2 }}>
        <div>
          <h3>Title 1</h3>
          <p>Description 1</p>
        </div>
        <div>
          <h3>Title 2</h3>
          <p>Description 2</p>
        </div>
      </Grid>
    );

    expect(screen.getByText("Title 1")).toBeInTheDocument();
    expect(screen.getByText("Description 1")).toBeInTheDocument();
    expect(screen.getByText("Title 2")).toBeInTheDocument();
    expect(screen.getByText("Description 2")).toBeInTheDocument();
  });

  it("should maintain consistent grid behavior with many items", () => {
    render(
      <Grid cols={{ mobile: 2, tablet: 3, desktop: 3 }} spacing="md">
        <div>A</div>
        <div>B</div>
        <div>C</div>
        <div>D</div>
        <div>E</div>
      </Grid>
    );

    // All items should be present
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.getByText("C")).toBeInTheDocument();
    expect(screen.getByText("D")).toBeInTheDocument();
    expect(screen.getByText("E")).toBeInTheDocument();

    const gridContainer = screen.getByText("A").parentElement;
    expect(gridContainer).toHaveClass("mantine-SimpleGrid-root");
  });

  it("should pass through additional SimpleGrid props", () => {
    render(
      <Grid style={{ backgroundColor: "red" }} data-testid="custom-grid">
        <div>Item 1</div>
      </Grid>
    );

    const gridContainer = screen.getByTestId("custom-grid");
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer).toHaveClass("mantine-SimpleGrid-root");
  });
});
