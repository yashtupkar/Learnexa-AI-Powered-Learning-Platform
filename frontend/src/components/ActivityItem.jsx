import React from "react";

export default function ActivityItem({ title, time, icon }) {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 mt-0.5">{icon}</div>
      <div className="ml-3">
        <p className="text-sm text-gray-800 dark:text-white">{title}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{time}</p>
      </div>
    </div>
  );
}
