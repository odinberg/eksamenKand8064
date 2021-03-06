import React, { useState } from "react";

export function ChatView({ firstname, chatLog, onSendMessage, email }) {
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
        <h3>Welcome {firstname}</h3>
        <h3>Email: {email}</h3>
      </header>
      <main>
        <h2>You can now chat...</h2>
        <div className={"chatLog"}>
          {chatLog.map(({ id, firstname, message }) => (
            <div key={id} className={"message"}>
              <strong>{firstname}:</strong> {message}
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
