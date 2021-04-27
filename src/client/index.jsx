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
  const [firstname, setFirstname] = useSessionStorage("firstname");
  const [email, setEmail] = useSessionStorage("email");
  const [lastname, setLastname] = useSessionStorage("lastname");

  if (!firstname) {
    return (
      <Profile
        onFirstname={setFirstname}
        onEmail={setEmail}
        onLastname={setLastname}
      />
    );
  }

  return <ChatPage firstname={firstname} email={email} />;
}

ReactDOM.render(<App />, document.getElementById("root"));
