"use client";
import { useState } from "react";
import { useWebSocket } from "~/hooks/websocketHook/useWebSocket";
// import { useWebSocket } from '../hooks/useWebSocket';

const WebSocketComponent: React.FC = () => {
  const { messages, sendMessage } = useWebSocket(
    process?.env?.NEXT_PUBLIC_WEBSOCKET_CHAT_URL ?? "",
  );
  const [input, setInput] = useState<string>("");

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-xl font-semibold">WebSocket Chat</h1>
      <div className="mb-2.5 h-48 overflow-y-auto border border-gray-300 p-2.5">
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="rounded border border-gray-300 p-2"
        />
        <button
          onClick={handleSend}
          className="rounded bg-blue-500 px-3 py-2 text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default WebSocketComponent;
