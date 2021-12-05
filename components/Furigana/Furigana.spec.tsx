import React from "react";
import ReactDOM from "react-dom";
import Furigana from "./Furigana";

describe("Furigana", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Furigana reading="にほん">日本語</Furigana>, div);
  });
});
