import React from "react";
import ReactDOM from "react-dom";
import { CreateProfile } from "./CreateProfile";
import { ChatPage } from "./ChatApp";
import { useSessionStorage } from "./http";
import { BrowserRouter, Link } from "react-router-dom";
import { Route, Switch } from "react-router";
import { ProfilePage } from "./ProfilePage";

function App() {
  const [username, setUsername] = useSessionStorage("username");
  const [email, setEmail] = useSessionStorage("email");
  const [lastname, setLastname] = useSessionStorage("lastname");

  const profileApi = {
    listProfiles: async () => {
      const res = await fetch("/api/profiles");
      if (!res.ok) {
        throw new Error(
          `Something went wrong loading ${res.url}: ${res.statusText}`
        );
      }
      return await res.json();
    },
    getProfile: async (id) => {
      const res = await fetch(`/api/profiles/${id}`);
      if (!res.ok) {
        throw new Error(
          `Something went wrong loading ${res.url}: ${res.statusText}`
        );
      }
      return await res.json();
    },
  };

  if (!username) {
    return (
      <CreateProfile
        onUsername={setUsername}
        onEmail={setEmail}
        onLastname={setLastname}
      />
    );
  }

  return (
    <BrowserRouter>
      <nav>
        <Link to={"/"}> Front page</Link>
      </nav>
      <main>
        <Switch>
          <Route exact path={"/profiles"}>
            <ProfilePage profileApi={profileApi} />
          </Route>
          <Route path={"/chat"}>
            <ChatPage username={username} email={email} />
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

/*<ChatPage username={username} email={email}/>*/
