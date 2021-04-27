import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { Username } from "./Username";
import { ChatApp, ChatPage } from "./ChatApp";

function useSessionStorage(key) {
  const [value, setValue] = useState(sessionStorage.getItem(key));
  useEffect(() => {
    sessionStorage.setItem(key, value);
  }, [value]);
  return [value, setValue];
}

function App() {
  const [username, setUsername] = useSessionStorage("username");

  if (!username) {
    return <Username onUsername={setUsername} />;
  }

  return <ChatPage username={username} />;
}

ReactDOM.render(<App />, document.getElementById("root"));
