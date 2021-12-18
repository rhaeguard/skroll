chrome.action.onClicked.addListener(({ id }) => {
    chrome.tabs.sendMessage(id, { command: "start-scroll" }, {});
});
