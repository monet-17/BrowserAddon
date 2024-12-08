console.log('background running');

chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tabs) {
  let msg = {
    txt: 'hello'
  }

  chrome.tabs.sendMessage(tabs.id, msg);
}