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
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg bg-white shadow-md">
        <header className="flex items-center justify-between rounded-t-lg bg-red-500 p-4 text-white">
          <h2 className="text-lg font-semibold">Redis Notifications</h2>
          <span className="text-xs italic">WebSocket: {websocketUrl}</span>
        </header>
        <div className="max-h-[85vh] overflow-y-auto border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {messages.length > 0 ? (
              messages.map((msg, index: number) => (
                <li
                  key={index}
                  className="flex items-start gap-2 p-3 hover:bg-gray-50"
                >
                  <span className="block text-sm font-medium text-gray-800">
                    {msg}
                    {/* {JSON.parse(msg)?.data} */}
                  </span>
                </li>
              ))
            ) : (
              <li className="p-4 text-center text-gray-500">
                No messages received yet.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotificationC;
