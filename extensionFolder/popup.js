function setup() {
	noCanvas();
	console.log("popup running");

	let sizes = select('#size');
	let highcontrast = select('#highcontrast');
	let monochromacy = select('#monochromacy');
	let assistant = select('#assistant');

	sizes.input(sendMessage);
	highcontrast.changed(sendMessage);
	monochromacy.changed(sendMessage);
	assistant.changed(sendMessage);

	function sendMessage() {
		let message = {
			fsize: sizes.value(),
			hcontrast: highcontrast.checked(),
			monochrome: monochromacy.checked(),
			assist: assistant.checked()
		};

		let params = {
			active: true,
			currentWindow: true
		};

		chrome.tabs.query(params, (tabs) => {
			chrome.tabs.sendMessage(tabs[0].id, message);
		});
	}
}