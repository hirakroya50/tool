"use client";
import React from "react";

import useNotificationByPubSun, {
  type NotificationWebSocketMessage,
} from "~/hooks/notificationHook/useNotificationByPubSun";
const NotificationC = () => {
  const websocketUrl = "ws://localhost:8081";
  const { messages }: NotificationWebSocketMessage =
    useNotificationByPubSun(websocketUrl);
  console.log(messages);
  return (
    <div>
      <h2>Redis Messages: websocket url : {websocketUrl}</h2>
      <ul>
        {messages.map((msg, index: number) => (
          <li key={index}>
            <strong>{msg}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationC;
