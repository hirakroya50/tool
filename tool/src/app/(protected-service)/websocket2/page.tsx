"use client";
import { useEffect, useState } from "react";

export default function WebSocketComponent2() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080");
    setSocket(newSocket);
    newSocket.onopen = () => {
      console.log("Connection established");
    };
    newSocket.onmessage = (message) => {
      setMessages((priv) => [...priv, message?.data]);
    };
    newSocket.onclose = () => {
      console.log("connection closed");
    };
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

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
