let activeGoal = null;
let blockingRules = [];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "START_GOAL") {
    activeGoal = message.goal;
    setupURLBlocking(activeGoal);
  }

  if (message.type === "STOP_GOAL") {
    console.log("stop goal");

    activeGoal = null;
    removeURLBlocking();
  }
});

function setupURLBlocking(goal) {
  // Remove any existing rules first
  removeURLBlocking();

  // Prepare blocking rules based on list type
  if (goal.listType === "blacklist") {
    blockingRules = goal.urls.map((url) => ({
      id: generateRuleId(),
      priority: 1,
      action: {
        type: "redirect",
        redirect: { url: chrome.runtime.getURL("./blocked/index.html") },
      },
      condition: {
        urlFilter: formatURLForBlocking(url),
        resourceTypes: ["main_frame", "sub_frame"],
      },
    }));
  } else if (goal.listType === "whitelist") {
    // Allow priority should be greater than block priority
    blockingRules = goal.urls.map((url) => ({
      id: generateRuleId(),
      priority: 2,
      action: { type: "allow" },
      condition: {
        urlFilter: formatURLForBlocking(url),
        resourceTypes: ["main_frame", "sub_frame"],
      },
    }));

    blockingRules.push({
      id: generateRuleId(),
      priority: 1,
      action: {
        type: "redirect",
        redirect: { url: chrome.runtime.getURL("./blocked/index.html") },
      },
      condition: {
        urlFilter: "*",
        resourceTypes: ["main_frame", "sub_frame"],
      },
    });
  }

  // Apply blocking rules
  chrome.declarativeNetRequest.updateDynamicRules(
    {
      addRules: blockingRules,
      removeRuleIds: [],
    },
    () => {
      if (chrome.runtime.lastError) {
        console.error(
          "Error applying blocking rules:",
          chrome.runtime.lastError,
        );
      } else {
        console.log("Blocking rules applied successfully");
        chrome.declarativeNetRequest.getDynamicRules((rules) => {
          console.log("Currently applied rules:", rules);
        });
      }
    },
  );
}

function removeURLBlocking() {
  // Fetch existing rules and remove them
  chrome.declarativeNetRequest.getDynamicRules((rules) => {
    const ruleIds = rules.map((rule) => rule.id);
    if (ruleIds.length > 0) {
      chrome.declarativeNetRequest.updateDynamicRules(
        {
          removeRuleIds: ruleIds,
        },
        () => {
          if (chrome.runtime.lastError) {
            console.error(
              "Error removing existing rules:",
              chrome.runtime.lastError,
            );
          } else {
            console.log("Existing rules removed successfully");
          }
        },
      );
    }
  });
}

function generateRuleId() {
  return Math.floor(Math.random() * 100000);
}

function formatURLForBlocking(url) {
  url = url.replace(/^https?:\/\//, "");
  url = url.replace(/\/$/, "");
  const formattedUrl = `*://${url}/*`;
  console.log("Formatted URL for blocking:", formattedUrl);
  return formattedUrl;
}
