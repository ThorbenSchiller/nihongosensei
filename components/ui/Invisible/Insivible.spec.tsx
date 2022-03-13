import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Invisible } from "./Invisible";

describe("Invisible", () => {
  it("should contain the passed children and the `invisible` class", () => {
    render(<Invisible>foo</Invisible>);

    expect(screen.getByTestId("invisible")).not.toBeNull();
    expect(screen.getByTestId("invisible")).toHaveTextContent("foo");
  });
});
