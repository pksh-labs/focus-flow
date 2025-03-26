import React from "react";

interface IconProps {
  className?: string;
}

const FocusIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
    <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const TimeIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const FlowIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
  </svg>
);

const BlockedPage: React.FC<any> = () => {
  const message = "This page is blocked by FocusFlow";

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

        <p className="text-center text-gray-600 mb-6">{message}</p>

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
