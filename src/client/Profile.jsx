import React, { useState } from "react";

export function Profile({ onFirstname, onEmail, onLastname }) {
  const [firstnameField, setFirstnameField] = useState("");
  const [lastnameField, setLastnameField] = useState("");
  const [emailField, setEmailField] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onFirstname(firstnameField);
        onLastname(lastnameField);
        onEmail(emailField);
      }}
    >
      <h2>Enter your first name, last name and email</h2>
      <input
        autoFocus={true}
        placeholder={"first name"}
        type="text"
        value={firstnameField}
        onChange={(e) => setFirstnameField(e.target.value)}
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
