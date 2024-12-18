console.log("Content running");

chrome.runtime.onMessage.addListener(gotMessage);

let updated = false;
let pageStyles = document.styleSheets[0];
let insertedRules = [];

function gotMessage(message, sender, sendResponse) {
	console.log(message);
	let allElements = document.getElementsByTagName('*');
	for (elt of allElements) {
		console.log(message.fsize);
		if (message.fsize === '') {
			message.fsize = '16';
		}
		elt.style['font-size'] = `${message.fsize}px`;

		let lineHeight = lineheightRatio(parseInt(message.fsize));
		elt.style['line-height'] = `${lineHeight}`;
	}

	if (message.assist) {
		readAssistant(highlight());
	}
	
	if (message.hcontrast) {
		rmAddedStyles();
		mkHighContrastStyles();
		updated = true;
	} else if (message.monochrome) {
		rmAddedStyles();
		mkMonochromeStyles();
		updated = true;
	} else if ((!message.hcontrast || !message.monochrome) && updated) {
		rmAddedStyles();
		updated = false;
	}

	function lineheightRatio(x) {
		return (1.2 * x) / 16;
	}

	function mkHighContrastStyles() {
		insertedRules.push(pageStyles.insertRule('body, div, figure{ background-color: #000000; color: #FFFFFF; }', pageStyles.cssRules.length));
        insertedRules.push(pageStyles.insertRule('h1, h2, h3, h4, h5, h6, div h1, div h2, div h3, div h4, div h5, div h6 { color: #FFD700; }', pageStyles.cssRules.length));
        insertedRules.push(pageStyles.insertRule('div a, a { color: #00FFFF; }', pageStyles.cssRules.length));
        insertedRules.push(pageStyles.insertRule('div a:hover, a:hover { color: #FF4500; }', pageStyles.cssRules.length));
        insertedRules.push(pageStyles.insertRule('button { background-color: #FF0000; color: #FFFFFF; border: none; padding: 10px 20px; cursor: pointer; }', pageStyles.cssRules.length));
        insertedRules.push(pageStyles.insertRule('button:hover { background-color: #FFFF00; }', pageStyles.cssRules.length));
        insertedRules.push(pageStyles.insertRule('table { border-collapse: collapse; width: 100%; }', pageStyles.cssRules.length));
        insertedRules.push(pageStyles.insertRule('table, th, td { border: 2px solid #FFFFFF; }', pageStyles.cssRules.length));
        insertedRules.push(pageStyles.insertRule('th, td { padding: 8px; text-align: left; }', pageStyles.cssRules.length));
        insertedRules.push(pageStyles.insertRule('th, tr, td { background-color: #00008B; color: #FFFFFF; }', pageStyles.cssRules.length));
        insertedRules.push(pageStyles.insertRule('input, textarea, select { background-color: #333333; color: #FFFFFF; border: 1px solid #FFFFFF; }', pageStyles.cssRules.length));
        insertedRules.push(pageStyles.insertRule('.navbar { background-color: #4B0082; color: #FFFFFF; }', pageStyles.cssRules.length));
        insertedRules.push(pageStyles.insertRule('.navbar a { color: #FFFF00; }', pageStyles.cssRules.length));
        insertedRules.push(pageStyles.insertRule('.navbar a:hover { color: #FF6347; }', pageStyles.cssRules.length));
	}

	function rmAddedStyles() {
		while (insertedRules.length > 0) {
            let ruleId = insertedRules.pop();
            pageStyles.deleteRule(ruleId);
        }
	}

	function mkMonochromeStyles() {
        insertedRules.push(pageStyles.insertRule('body { background-color: #D3D3D3; color: #808080; }', pageStyles.cssRules.length));
        insertedRules.push(pageStyles.insertRule('h1, h2, h3, h4, h5, h6 { color: #404040; }', pageStyles.cssRules.length));
        insertedRules.push(pageStyles.insertRule('a { color: #808080; }', pageStyles.cssRules.length));
        insertedRules.push(pageStyles.insertRule('a:hover { color: #505050; }', pageStyles.cssRules.length));
        insertedRules.push(pageStyles.insertRule('button { background-color: #A9A9A9; color: #D3D3D3; border: 1px solid #808080; padding: 10px 20px; cursor: pointer; }', pageStyles.cssRules.length));
        insertedRules.push(pageStyles.insertRule('button:hover { background-color: #808080; }', pageStyles.cssRules.length));
        insertedRules.push(pageStyles.insertRule('table { border-collapse: collapse; width: 100%; }', pageStyles.cssRules.length));
        insertedRules.push(pageStyles.insertRule('table, th, td { border: 1px solid #808080; }', pageStyles.cssRules.length));
        insertedRules.push(pageStyles.insertRule('th, td { padding: 8px; text-align: left; }', pageStyles.cssRules.length));
        insertedRules.push(pageStyles.insertRule('th { background-color: #A9A9A9; color: #404040; }', pageStyles.cssRules.length));
        insertedRules.push(pageStyles.insertRule('input, textarea, select { background-color: #D3D3D3; color: #808080; border: 1px solid #808080; }', pageStyles.cssRules.length));
        insertedRules.push(pageStyles.insertRule('.navbar { background-color: #808080; color: #D3D3D3; }', pageStyles.cssRules.length));
        insertedRules.push(pageStyles.insertRule('.navbar a { color: #808080; }', pageStyles.cssRules.length));
        insertedRules.push(pageStyles.insertRule('.navbar a:hover { color: #505050; }', pageStyles.cssRules.length));
    }

	function readAssistant(text) {
		window.speechSynthesis.cancel();
		if ('speechSynthesis' in window) {
			console.log("Speech synthesis is supported.");
		} else {
			console.log("Speech synthesis is not supported.");
		}
		console.log("Text to be read: ", text);
		const actor = new SpeechSynthesisUtterance(text);
		actor.lang = 'en-US';
		actor.rate = 1;
		actor.pitch = 1;
		actor.volume = 1;
		window.speechSynthesis.speak(actor);

	}

	function highlight() {
		const selection = window.getSelection();
		if (selection.rangeCount > 0) {
			return selection.toString();
		}
		return '';
	}
}