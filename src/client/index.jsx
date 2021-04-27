import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { Profile } from "./Profile";
import { ChatPage } from "./ChatApp";

function useSessionStorage(key) {
  const [value, setValue] = useState(sessionStorage.getItem(key));
  useEffect(() => {
    sessionStorage.setItem(key, value);
  }, [value]);
  return [value, setValue];
}

function App() {
  const [username, setUsername] = useSessionStorage("username");
  const [email, setEmail] = useSessionStorage("email");
  const [lastname, setLastname] = useSessionStorage("lastname");

  if ((!username, !email, !lastname)) {
    return (
      <Profile
        onUsername={setUsername}
        onEmail={setEmail}
        onLastname={setLastname}
      />
    );
  }

  return <ChatPage username={username} />;
}

ReactDOM.render(<App />, document.getElementById("root"));
