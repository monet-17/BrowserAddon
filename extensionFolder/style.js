function setupStyle() {
    noCanvas();

    const check1 = document.getElementById('highcontrast');
    const check2 = document.getElementById('monochromacy');

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

    const sizeInput = select('#size');
    const sizeLabel = document.querySelector('label[for="size"]');

    sizeInput.elt.addEventListener('focus', () => {
        sizeLabel.classList.add('focused-label');
    });

    sizeInput.elt.addEventListener('blur', () => {
	    sizeLabel.classList.remove('focused-label');
    });


    const highcontrastInput = select('#highcontrast');
    const highcontrastLabel = document.querySelector('label[for="highcontrast"]');
    const monochromacyInput = select('#monochromacy');
    const monochromacyLabel = document.querySelector('label[for="monochromacy"]');

    highcontrastInput.elt.addEventListener('focus', () => {
	    highcontrastLabel.classList.add('focused-label');
    });

    highcontrastInput.elt.addEventListener('blur', () => {
	    highcontrastLabel.classList.remove('focused-label');
    });

    monochromacyInput.elt.addEventListener('focus', () => {
	    monochromacyLabel.classList.add('focused-label');
    });

    monochromacyInput.elt.addEventListener('blur', () => {
	    monochromacyLabel.classList.remove('focused-label');
    });
}