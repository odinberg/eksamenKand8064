import React, { useState } from "react";

export function ChatView({
  username,
  chatLog,
  onSendMessage,
  email,
  lastname,
}) {
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSendMessage(message);
    setMessage("");
  }

  return (
    <>
      <header>
        <h1>Eksamen chat</h1>
        <h3>Welcome {username}</h3>
        <h2>Email: {email}</h2>
      </header>
      <main>
        <h2>You can now chat...</h2>
        <div className={"chatLog"}>
          {chatLog.map(({ id, username, message, email }) => (
            <div key={id} className={"message"}>
              <strong>{username}:</strong> {message}
            </div>
          ))}
        </div>
      </main>
      <footer>
        <form onSubmit={handleSubmit}>
          <input
            autoFocus={true}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button>Send</button>
        </form>
      </footer>
    </>
  );
}
