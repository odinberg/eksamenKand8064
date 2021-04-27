import React from "react";
import ReactDOM from "react-dom";
import { Profile } from "../src/client/Profile";

describe("Profile", () => {
  it("add new profile ", () => {
    const container = document.createElement("div");
    ReactDOM.render(<Profile firstname={setFirstname} />, container);
  });
});
