function setupStyle() {

    const check1 = document.getElementById('highcontrast');
    const check2 = document.getElementById('monochromacy');

    if (check1 && check2) {
        check1.addEventListener('change', () => {
            if (check1.checked) {
                check2.checked = false;
            }
        });

        check2.addEventListener('change', () => {
            if (check2.checked) {
                check1.checked = false;
            }
        });
    }
}

window.addEventListener('DOMContentLoaded', setupStyle);