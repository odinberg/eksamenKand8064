import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { ChatApp } from "./ChatApp";
import { Username } from "./Username";

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

  return <ChatApp username={username} />;
}

ReactDOM.render(<App />, document.getElementById("root"));
