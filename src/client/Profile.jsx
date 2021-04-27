import React, { useState } from "react";

export function Profile({ onUsername, onEmail, onLastname }) {
  const [usernameField, setUsernameField] = useState("");
  const [lastnameField, setLastnameField] = useState("");
  const [emailField, setEmailField] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onUsername(usernameField);
        onLastname(lastnameField);
        onEmail(emailField);
      }}
    >
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
