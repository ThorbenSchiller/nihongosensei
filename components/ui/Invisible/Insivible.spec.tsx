import React from "react";
import ReactDOM from "react-dom";
import Invisible from "./Invisible";

describe("Invisible", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Invisible>foo</Invisible>, div);
  });
});
