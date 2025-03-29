import React from "react";
import FocusIcon from "./focusIcon";
import TimeIcon from "./timeIcon";
import FlowIcon from "./flowIcon";

const BlockedPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <FocusIcon className="w-16 h-16 text-indigo-600" />
            <div className="absolute -top-1 -right-1">
              <div className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-indigo-400 opacity-75"></div>
              <div className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></div>
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Stay Focused
        </h1>

        <p className="text-center text-gray-600 mb-6">
          This page is blocked by FocusFlow
        </p>

        <div className="space-y-4 mb-8">
          <div className="flex items-center space-x-3 text-gray-700">
            <TimeIcon className="w-5 h-5 text-indigo-500" />
            <span>Time to be productive</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-700">
            <FlowIcon className="w-5 h-5 text-indigo-500" />
            <span>Stay in your flow state</span>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          "The successful warrior is the average person, with laser-like focus"
          <div className="mt-1 font-medium">― Bruce Lee</div>
        </div>
      </div>
    </div>
  );
};

export default BlockedPage;
