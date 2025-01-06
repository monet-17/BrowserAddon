console.log("Content running");

chrome.runtime.onMessage.addListener(gotMessage);

let updated = false;
let pageStyles = document.styleSheets[0];
let insertedRules = [];

function gotMessage(message, sender, sendResponse) {
	console.log(message);
	let paragraphs = document.getElementsByTagName('p');
	for (elt of paragraphs) {
		console.log(message.fsize);
		if (message.fsize === '') {
			message.fsize = '16';
		}
		elt.style['font-size'] = `${message.fsize}px`;

		let lineHeight = lineheightRatio(parseInt(message.fsize));
		elt.style['line-height'] = `${lineHeight}`;
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
        insertedRules.push(pageStyles.insertRule('button { background-color: #FF0000; color: #FFFFFF; border: none; padding: 1rem 2rem; cursor: pointer; }', pageStyles.cssRules.length));
        insertedRules.push(pageStyles.insertRule('button:hover { background-color: #FFFF00; }', pageStyles.cssRules.length));
        insertedRules.push(pageStyles.insertRule('table { border-collapse: collapse; width: 100%; }', pageStyles.cssRules.length));
        insertedRules.push(pageStyles.insertRule('table, th, td { border: 0.1rem solid #FFFFFF; }', pageStyles.cssRules.length));
        insertedRules.push(pageStyles.insertRule('th, td { padding: 0.4rem; text-align: left; }', pageStyles.cssRules.length));
        insertedRules.push(pageStyles.insertRule('th, tr, td { background-color: #00008B; color: #FFFFFF; }', pageStyles.cssRules.length));
        insertedRules.push(pageStyles.insertRule('input, textarea, select { background-color: #333333; color: #FFFFFF; border: 0.8rem solid #FFFFFF; }', pageStyles.cssRules.length));
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
        insertedRules.push(pageStyles.insertRule('button { background-color: #A9A9A9; color: #D3D3D3; border: 0.8rem solid #808080; padding: 1rem 2rem; cursor: pointer; }', pageStyles.cssRules.length));
        insertedRules.push(pageStyles.insertRule('button:hover { background-color: #808080; }', pageStyles.cssRules.length));
        insertedRules.push(pageStyles.insertRule('table { border-collapse: collapse; width: 100%; }', pageStyles.cssRules.length));
        insertedRules.push(pageStyles.insertRule('table, th, td { border: 0.8rem solid #808080; }', pageStyles.cssRules.length));
        insertedRules.push(pageStyles.insertRule('th, td { padding: 0.6rem; text-align: left; }', pageStyles.cssRules.length));
        insertedRules.push(pageStyles.insertRule('th { background-color: #A9A9A9; color: #404040; }', pageStyles.cssRules.length));
        insertedRules.push(pageStyles.insertRule('input, textarea, select { background-color: #D3D3D3; color: #808080; border: 0.8rem solid #808080; }', pageStyles.cssRules.length));
        insertedRules.push(pageStyles.insertRule('.navbar { background-color: #808080; color: #D3D3D3; }', pageStyles.cssRules.length));
        insertedRules.push(pageStyles.insertRule('.navbar a { color: #808080; }', pageStyles.cssRules.length));
        insertedRules.push(pageStyles.insertRule('.navbar a:hover { color: #505050; }', pageStyles.cssRules.length));
    }
}