import React, { useState } from "react";

export function ChatView({ onSendMessage, chatLog }) {
  const [message, setMessage] = useState("");

  function handleSubmitChatMsg(e) {
    e.preventDefault();
    onSendMessage(message);
    setMessage("");
  }

  return (
    <>
      <header>
        <h1>Chat with friends</h1>
      </header>
      <main id="chatWindow">
        <div id="chatLog">
          {chatLog.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
      </main>
      <footer>
        <form onSubmit={handleSubmitChatMsg}>
          <input
            type="text"
            autoFocus={true}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button>Submit</button>
        </form>
      </footer>
    </>
  );
}
