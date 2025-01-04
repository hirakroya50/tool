"use client";
import { useState } from "react";
import { useWebSocket2 } from "~/hooks/websocket2Hook/useWebSocket2";

export default function WebSocketComponent2() {
  const [userInput, setUserInput] = useState("");
  const { messages, socket } = useWebSocket2(
    process?.env?.NEXT_PUBLIC_WEBSOCKET_CHAT_URL ?? "",
  );

  if (!socket) {
    <div>connecting to the server for websocket .....</div>;
  }

  return (
    <div>
      <div className="m-4 flex flex-col border text-xs">
        <p className="text-lg underline"> WebSocket message display:</p>
        {messages.map((item, i) => {
          return (
            <div key={i} className="border">
              message no{i + 1} . {item}
            </div>
          );
        })}
      </div>
      <form
        className="m-2 flex flex-col items-center border p-3"
        onSubmit={(e) => {
          e.preventDefault();
          socket?.send(userInput);
        }}
      >
        <input
          type="text"
          className="border"
          placeholder="type your message..."
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button type="submit">send</button>
      </form>
    </div>
  );
}
