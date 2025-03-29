export type Goal = {
  id: string;
  goal: string;
  listType: "blacklist" | "whitelist";
  urls: string[];
};
