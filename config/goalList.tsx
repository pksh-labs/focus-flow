import React from "react";
import { Goal } from "./helper";

type GoalsListProps = {
  goals: Goal[];
  deleteGoal: (id: string) => void;
};

const GoalsList: React.FC<GoalsListProps> = ({ goals, deleteGoal }) => {
  return (
    <div className="flex flex-col items-center w-full">
      {goals.length === 0 ? (
        <p className="text-center text-gray-500">No goals added yet</p>
      ) : (
        <div className="w-full max-w-2xl">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className="bg-white shadow-md rounded-2xl p-4 mb-4 flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">{goal.goal}</h3>
                <span
                  className={`px-2 py-1 rounded-full text-white text-sm ${
                    goal?.listType === "blacklist"
                      ? "bg-red-500"
                      : "bg-green-500"
                  }`}
                >
                  {goal?.listType?.charAt(0)?.toUpperCase() +
                    goal?.listType?.slice(1)}
                </span>
              </div>
              <div className="text-sm">
                <strong>URLs:</strong>{" "}
                {goal?.urls?.length > 0
                  ? goal.urls.map((url, index) => (
                      <span
                        key={index}
                        className="bg-gray-200 text-gray-700 px-2 py-1 rounded-lg text-xs mr-2"
                      >
                        {url}
                      </span>
                    ))
                  : "No URLs specified"}
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => deleteGoal(goal.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-2xl hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GoalsList;
