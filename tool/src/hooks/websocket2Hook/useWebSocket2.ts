import { useEffect, useState } from "react";

export const useWebSocket2 = (url: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const newSocket = new WebSocket(url);
    newSocket.onopen = () => {
      console.log("Connection established");
      setSocket(newSocket);
    };
    newSocket.onmessage = (message) => {
      setMessages((priv) => [...priv, message?.data]);
    };
    newSocket.onclose = () => {
      console.log("connection closed");
    };
    return () => newSocket.close();
  }, [url]);

  return { messages, socket };
};
