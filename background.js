function checkForValidUrl(tabId, changeInfo, tab) {
	// If the tabs url contains the sakai-url
	if (tab.url.indexOf('sakai.imp.fu-berlin.de:8443') > -1) {
		// ... show the page action icon
		chrome.pageAction.show(tabId);
	}
};

function reworkHtml(tab) {
    chrome.tabs.executeScript(tab.id, {file: "content.js"});
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);
chrome.pageAction.onClicked.addListener(reworkHtml);
