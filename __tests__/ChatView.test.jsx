import { ChatView } from "../src/client/ChatView";
import ReactDOM from "react-dom";
import React from "react";
import { Simulate } from "react-dom/test-utils";

describe("Chat view", () => {
  it("Shows chat log messages ", () => {
    const container = document.createElement("div");
    ReactDOM.render(
      <ChatView chatLog={["Hello there", "how are you?"]} />,
      container
    );
    expect(container).toMatchSnapshot();
    expect(container.querySelector("#chatLog div").textContent).toEqual(
      "Hello there"
    );
  });
  it("submits a new chat message ", () => {
    const container = document.createElement("div");
    const onSendMessage = jest.fn();
    ReactDOM.render(
      <ChatView chatLog={[]} onSendMessage={onSendMessage} />,
      container
    );
    Simulate.change(container.querySelector("input"), {
      target: { value: "Where are you" },
    });
    Simulate.submit(container.querySelector("form"));
    expect(onSendMessage).toBeCalledWith("Where are you");
  });
});
