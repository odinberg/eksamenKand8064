import React, { useState } from "react";

export function Username({ onUsername }) {
  const [usernameField, setUsernameField] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onUsername(usernameField);
      }}
    >
      <h1>Enter your username</h1>
      <input
        autoFocus={true}
        type="text"
        value={usernameField}
        onChange={(e) => setUsernameField(e.target.value)}
      />
      <button>Submit</button>
    </form>
  );
}
