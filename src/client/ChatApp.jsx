import React, { useEffect, useRef, useState } from "react";
import { ChatView } from "./ChatView";

export function ChatApp() {
  const [chatLog, setChatLog] = useState([]);
  const [ws, setWs] = useState();
  const connected = useRef(false);

  function connect() {
    console.log("Connecting");
    const ws = new WebSocket("ws://" + window.location.host);
    setWs(ws);
    ws.onopen = (event) => {
      console.log("Opened", event);
      connected.current = true;
    };
    ws.onclose = () => {
      if (connected.current) {
        setTimeout(connect, 1000);
      } else {
        setTimeout(connect, 1000);
      }
      connected.current = false;
    };
    ws.onerror = (event) => {
      console.log(event);
    };
    ws.onmessage = (msg) => {
      console.log(msg);
      const { firstname, email, message, id, lastname } = JSON.parse(msg.data);
      setChatLog((chatLog) => [
        ...chatLog,
        { firstname, email, message, id, lastname },
      ]);
    };
  }

  useEffect(() => connect(), []);

  function sendMessage(json) {
    ws.send(JSON.stringify(json));
  }
  return { chatLog, sendMessage };
}
export function ChatPage({ firstname, email }) {
  const { chatLog, sendMessage } = ChatApp();

  function handleSendMessage(message) {
    sendMessage({ firstname, message, email });
  }

  return (
    <ChatView
      firstname={firstname}
      email={email}
      chatLog={chatLog}
      onSendMessage={handleSendMessage}
    />
  );
}
