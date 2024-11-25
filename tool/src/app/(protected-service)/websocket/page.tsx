"use client";
import { useState } from "react";
import { useWebSocket } from "~/hooks/useWebSocket";
// import { useWebSocket } from '../hooks/useWebSocket';

const WebSocketComponent: React.FC = () => {
  const { messages, sendMessage } = useWebSocket("ws://localhost:8080");
  const [input, setInput] = useState<string>("");

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>WebSocket Chat</h1>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "200px",
          overflowY: "auto",
          marginBottom: "10px",
        }}
      >
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        style={{
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          marginRight: "10px",
        }}
      />
      <button
        onClick={handleSend}
        style={{
          padding: "8px 12px",
          border: "none",
          background: "blue",
          color: "white",
          borderRadius: "4px",
        }}
      >
        Send
      </button>
    </div>
  );
};

export default WebSocketComponent;
