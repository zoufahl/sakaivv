// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('background.js');
  chrome.tabs.executeScript(null, {file: "content.js"});
});
