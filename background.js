chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "checkStatus") {
    fetch(message.url, {
      method: "GET",
      mode: "cors",
      redirect: "manual"  // This is the key change - prevents automatic redirect following
    })
      .then(res => sendResponse({ status: res.status }))
      .catch(() => sendResponse({ status: 0 }));
    return true;
  }
});

// Toggle injection on tab when icon is clicked
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      window.dispatchEvent(new CustomEvent("toggle-link-status"));
    }
  });
});
