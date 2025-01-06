function setup() {
	noCanvas();
	console.log("popup running");
	let size = select('#size');
	size.input(changeText);

	function changeText() {

		let params = {
			active: true,
			currentWindow: true
		}

		chrome.tabs.query(params, gotTabs);

		function gotTabs(tabs) {
			console.log("got tabs");
			console.log(tabs);

			let message = size.value();
			let msg = {
				txt: size.value()
			}

			chrome.tabs.sendMessage(tabs[0].id, msg);
		}

	}
}