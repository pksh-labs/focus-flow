import { useState, useCallback, useEffect } from "react";
import GoalListDB from "../db/goalList.js";
import AddGoals from "./addGoal.js";
import GoalsList from "./goalList.js";

type Goal = {
  id: string;
  goal: string;
  listType: "blacklist" | "whitelist";
  urls: string[];
};

const goalsDB = new GoalListDB();

export default function FocusFlow() {
  const [goalList, setGoalList] = useState<Goal[]>([]);

  useEffect(() => {
    goalsDB.init((error: any) => {
      console.log("init");

      if (error) {
        console.error("Database initialization error:", error);
        return;
      }
      loadExistingGoals();
    });
  }, []);

  const loadExistingGoals = useCallback(() => {
    console.log("loadExistingGoals");
    if (!goalsDB.db) return;

    const transaction = goalsDB.db.transaction(["settings"], "readonly");
    const store = transaction.objectStore("settings");
    const request = store.getAll();

    request.onsuccess = () => {
      console.log(request);

      setGoalList(request.result);
    };

    request.onerror = () => {
      console.error("Error fetching goals:", request.error);
    };
  }, [goalsDB]);

  const saveSettings = (
    goal: string,
    listType: "blacklist" | "whitelist",
    urls: string[],
  ) => {
    console.log("save");
    if (!goal || !urls?.length) {
      alert("Goal name and min of one url needed to add the goal");
    }
    const settings = { id: goal, goal, listType, active: false, urls };

    goalsDB.saveSettings(settings, (error: any) => {
      if (error) {
        console.error("Error saving settings:", error);
        alert("Error saving settings. Please try again.");
        return;
      }
      alert("Settings saved successfully!");
      loadExistingGoals();
    });
  };

  const deleteGoal = (goalId: IDBValidKey | IDBKeyRange) => {
    console.log("delete");
    if (!goalsDB.db) return;

    const transaction = goalsDB.db.transaction(["settings"], "readwrite");
    const store = transaction.objectStore("settings");
    const request = store.delete(goalId);

    request.onsuccess = () => {
      loadExistingGoals();
    };

    request.onerror = () => {
      console.error("Error deleting goal:", request.error);
    };
  };

  return (
    <div className="max-w-lg mx-auto p-8">
      <h1 className="text-center text-2xl font-bold mb-6">FocusFlow</h1>

      <AddGoals saveSettings={saveSettings} />

      <div className="pt-6">
        <GoalsList goals={goalList} deleteGoal={deleteGoal} />
      </div>
    </div>
  );
}
