import { useEffect, useState } from "react";
export interface NotificationWebSocketMessage {
  messages: string[];
}
const useNotificationByPubSun = (url: string): NotificationWebSocketMessage => {
  const [messages, setMessages] = useState<string[]>([]);
  console.log({ messages });
  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (message) => {
      try {
        setMessages((prevMessages) => [...prevMessages, message.data]);
      } catch (error) {
        console.error("Failed to parse WebSocket message:", error);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, [url]);

  return { messages };
};

export default useNotificationByPubSun;
