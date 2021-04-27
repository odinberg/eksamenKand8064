import React, { useEffect, useState } from "react";
import { LoadingView } from "./LoadingView";

export function ProfilePage({ profileApi }) {
  const [profiles, setProfiles] = useState();
  const [error, setError] = useState();

  async function loadProfiles() {
    try {
      setProfiles(await profileApi.listProfiles());
    } catch (e) {
      setError(e);
    }
  }

  useEffect(loadProfiles, []);

  if (error) {
    return <div>Something went wrong: {error.toString()}</div>;
  }

  if (!profiles) {
    return <LoadingView />;
  }

  return (
    <>
      <h1>List profiles</h1>
      {profiles.map(({ username, email, lastname, id }) => {
        <li key={id} />;
      })}
    </>
  );
}
