function triggerScroll(tabId) {
    chrome.tabs.sendMessage(tabId, { command: "start-scroll" }, {});
}

chrome.action.onClicked.addListener(({ id }) => {
    triggerScroll(id);
});

chrome.commands.onCommand.addListener((command, tab) => {
    console.log(command)
    if (command === "scroll") {
        triggerScroll(tab.id);
    }
});
