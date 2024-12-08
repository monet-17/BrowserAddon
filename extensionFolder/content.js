console.log("Content running");

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
  console.log(message);
  let paragraphs = document.getElementsByTagName('p');
  for (elt of paragraphs) {
    console.log(message.txt);
    elt.style['font-size'] = `${message.txt}px`;
  }
}
