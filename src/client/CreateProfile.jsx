import React, { useState } from "react";

export function CreateProfile({ onUsername, onEmail, onLastname }) {
  const [usernameField, setUsernameField] = useState("");
  const [lastnameField, setLastnameField] = useState("");
  const [emailField, setEmailField] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Submitting", { username, email, lastname });
    await fetch("/api/profiles", {
      method: "POST",
      body: JSON.stringify({ username, email, lastname }),
      headers: {
        "Content-Type:": "application/json",
      },
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Enter your username, last name and email</h2>
      <input
        autoFocus={true}
        placeholder={"username"}
        type="text"
        value={usernameField}
        onChange={(e) => setUsernameField(e.target.value)}
      />

      <input
        placeholder={"last name"}
        type="text"
        value={lastnameField}
        onChange={(e) => setLastnameField(e.target.value)}
      />

      <input
        type="text"
        placeholder={"email"}
        value={emailField}
        onChange={(e) => setEmailField(e.target.value)}
      />
      <button>Submit</button>
    </form>
  );
}
