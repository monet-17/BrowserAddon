console.log("Content running");

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
	console.log(message);
	let paragraphs = document.getElementsByTagName('p');
	for (elt of paragraphs) {
		console.log(message.txt);
		elt.style['font-size'] = `${message.txt}px`;

		let lineHeight = lineheightRatio(parseInt(message.txt));
		elt.style['line-height'] = `${lineHeight}`;
	}

	function lineheightRatio(x) {
		return (1.2 * x) / 16;
	}
}