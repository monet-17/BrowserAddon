function setup() {
	noCanvas();
	console.log("popup running");

	let submitBtn = document.getElementById("submit");
	submitBtn.onclick = () => {

		let sizes = select('#size');
		let highcontrast = select('#highcontrast');
		let monochromacy = select('#monochromacy');
		let assistant = select('#assistant');

		let params = {
			active: true,
			currentWindow: true
		}

		chrome.tabs.query(params, gotTabs);

		function gotTabs(tabs) {
			let message = {
				fsize: sizes.value(),
				hcontrast: highcontrast.checked(),
				monochrome: monochromacy.checked(),
				assist: assistant.checked()
			}
			

			chrome.tabs.sendMessage(tabs[0].id, message);
		}
	}
}