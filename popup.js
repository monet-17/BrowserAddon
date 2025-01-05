function setup() {
	function pushVars() {
		let size = select('#size');
		let highcontrast = select('#highcontrast');
		let monochromacy = select('#monochromacy');
	
		let params = {
			active: true,
			currentWindow: true
		};
	
		chrome.tabs.query(params, gotTabs);
	
		function gotTabs(tabs) {
			let message = {
				fsize: size.value(),
				hcontrast: highcontrast.checked(),
				monochrome: monochromacy.checked()
			};
	
			chrome.tabs.sendMessage(tabs[0].id, message);
		}
	}
	
	noCanvas();
	console.log("popup running");

	let check1 = document.getElementById('highcontrast');
    let check2 = document.getElementById('monochromacy');

	check1.addEventListener('change', function() { check(this); });
	check2.addEventListener('change', function() { check(this); });

    function check(x) {
        if (x.checked) {
            if (x.id === check1.id) {
                check2.checked = false;
            } else {
                check1.checked = false;
            }
        }
    }
	check1.onclick = () => {
		pushVars()
	}

	check2.onclick = () => {
		pushVars()
	}

	let submitBtn = document.getElementById("submit");
	submitBtn.onclick = () => {
		pushVars()
	}
}