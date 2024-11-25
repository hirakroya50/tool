import { useEffect, useRef, useState } from "react";

interface WebSocketMessage {
  data: string;
}

export const useWebSocket = (url: string) => {
  const [messages, setMessages] = useState<string[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event: WebSocketMessage) => {
      setMessages((prev) => [...prev, event.data]);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [url]);

  const sendMessage = (message: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    }
  };

  return { messages, sendMessage };
};
