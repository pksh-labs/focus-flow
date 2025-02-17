import { useState } from "react";

const FocusFlow = () => {
  const [goals, setGoals] = useState([
    { id: 1, name: "Write blog post", active: false },
    { id: 2, name: "Work on side project", active: true },
  ]);

  const toggleGoal = (id: number) => {
    setGoals(goals.map(goal => goal.id === id ? { ...goal, active: !goal.active } : goal));
  };

  return (
    <div className="w-[300px] p-4 font-sans bg-white">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <img src="../logo/logo-new.png" width="20" height="20" alt="Logo" />
        <h1 className="text-lg font-bold text-gray-900">FocusFlow</h1>
      </div>
      
      <div className="h-px bg-gray-200 my-4" />
      
      {/* Goal List */}
      <div className="flex flex-col gap-2 mb-4">
        {goals.map((goal) => (
          <div key={goal.id} className={`flex justify-between items-center p-2 rounded-lg border ${goal.active ? "bg-green-100 border-green-500" : "bg-gray-100 border-gray-300"}`}>
            <span>{goal.name}</span>
            <div className="flex gap-2">
              {goal.active ? (
                <button className="px-3 py-1 text-white bg-red-500 rounded-md text-sm" onClick={() => toggleGoal(goal.id)}>
                  Stop
                </button>
              ) : (
                <button className="px-3 py-1 text-white bg-indigo-600 rounded-md text-sm" onClick={() => toggleGoal(goal.id)}>
                  Start
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="h-px bg-gray-200 my-4" />
      
      {/* Config Button */}
      <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white rounded-lg px-4 py-2 text-sm hover:bg-indigo-700">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
        Configure Blocked Sites
      </button>
    </div>
  );
};

export default FocusFlow;
