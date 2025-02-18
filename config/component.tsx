import { useState } from "react";

export default function FocusFlow() {
  const [goal, setGoal] = useState("");
  const [listType, setListType] = useState("blacklist");
  const [urls, setUrls] = useState([""]);

  const addUrl = () => setUrls([...urls, ""]);
  const updateUrl = (index: number, value: string) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };
  const removeUrl = (index: number) => setUrls(urls.filter((_, i) => i !== index));

  const saveSettings = () => {
    console.log({ goal, listType, urls });
    // Save logic
  };

  return (
    <div className="max-w-lg mx-auto p-8">
      <h1 className="text-center text-2xl font-bold mb-6">FocusFlow</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Add Your Goal</h2>
        <label className="block font-medium">Your Goal:</label>
        <input 
          type="text" 
          className="w-full border p-2 rounded mt-1" 
          placeholder="e.g., Stay focused on work"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />

        <label className="block font-medium mt-4">List Type:</label>
        <select 
          className="w-full border p-2 rounded mt-1" 
          value={listType}
          onChange={(e) => setListType(e.target.value)}
        >
          <option value="blacklist">Blacklist (Block these sites)</option>
          <option value="whitelist">Whitelist (Allow only these sites)</option>
        </select>
        
        <h2 className="text-lg font-semibold mt-6">Website URLs</h2>
        <div className="flex flex-col gap-2 mt-2">
          {urls.map((url, index) => (
            <div key={index} className="flex gap-2">
              <input 
                type="text" 
                className="flex-grow border p-2 rounded" 
                placeholder="Enter website URL"
                value={url}
                onChange={(e) => updateUrl(index, e.target.value)}
              />
              <button 
                className="bg-red-500 text-white p-2 rounded"
                onClick={() => removeUrl(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button 
          className="w-full bg-green-600 text-white py-2 rounded mt-4"
          onClick={addUrl}
        >
          + Add URL
        </button>
        
        <button 
          className="w-full bg-blue-600 text-white py-2 rounded mt-4"
          onClick={saveSettings}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
