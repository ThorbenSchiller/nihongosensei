import { render } from "@testing-library/react";
import React from "react";
import { joinBy } from "./joinBy";

describe("joinBy", () => {
  it("should join the elements correctly with the given glue", () => {
    const first = <span key="first">first</span>;
    const previous = [first];
    const current = <span key="second">second</span>;
    const index = 2;
    const glue = "-";
    const joinByFunction = joinBy(glue);

    const joined = joinByFunction(previous, current, index);
    const screen = render(<>{joined}</>);
    const text = screen.baseElement.textContent;

    expect(joined.length).toEqual(3);
    expect(joined[0]).toEqual(first);
    expect(joined[2]).toEqual(current);
    expect(text).toEqual("first-second");
  });
});
