import { useState } from "react";

type AddGoalsProps = {
  saveSettings: (
    goal: string,
    listType: "blacklist" | "whitelist",
    urls: string[],
  ) => void;
};

export default function AddGoals({ saveSettings }: AddGoalsProps) {
  const [goal, setGoal] = useState("");
  const [listType, setListType] = useState<"blacklist" | "whitelist">(
    "blacklist",
  );
  const [urls, setUrls] = useState([""]);
  const [errors, setErrors] = useState<string[]>([]);

  const validateUrl = (url: string) => {
    try {
      new URL(url); // This throws if the URL is invalid
      return true;
    } catch (_) {
      return false;
    }
  };

  const addUrl = () => {
    setUrls([...urls, ""]);
    setErrors([...errors, ""]);
  };

  const updateUrl = (index: number, value: string) => {
    const newUrls = [...urls];
    const newErrors = [...errors];

    newUrls[index] = value;
    newErrors[index] =
      validateUrl(value) || value === "" ? "" : "Invalid URL format";

    setUrls(newUrls);
    setErrors(newErrors);
  };

  const removeUrl = (index: number) => {
    setUrls(urls.filter((_, i) => i !== index));
    setErrors(errors.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (
      errors.some((error) => error) ||
      urls.some((url) => url && !validateUrl(url))
    ) {
      alert("Please fix the errors before saving.");
      return;
    }
    saveSettings(goal, listType, urls);
    setGoal("");
    setListType("blacklist");
    setUrls([""]);
    setErrors([""]);
  };

  return (
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
        onChange={(e) =>
          setListType(e.target.value as "blacklist" | "whitelist")
        }
      >
        <option value="blacklist">Blacklist (Block these sites)</option>
        <option value="whitelist">Whitelist (Allow only these sites)</option>
      </select>

      <h2 className="text-lg font-semibold mt-6">Website URLs</h2>
      <div className="flex flex-col gap-2 mt-2">
        {urls.map((url, index) => (
          <div key={index} className="flex flex-col gap-1">
            <div className="flex gap-2">
              <input
                type="text"
                className={`flex-grow border p-2 rounded ${errors[index] ? "border-red-500" : ""}`}
                placeholder="Enter website URL (e.g., https://example.com)"
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
            {errors[index] && (
              <p className="text-red-500 text-sm">{errors[index]}</p>
            )}
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
        onClick={handleSave}
      >
        Save Settings
      </button>
    </div>
  );
}
