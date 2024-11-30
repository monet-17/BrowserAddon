/**ta funkcja przymusowo zmienia tło każdego elementu, usuwa obraski, bordery i różnego rodzaju graficzne rzeczy*/
function changeBackground() {
    document.querySelectorAll("*").forEach(element => {
        element.style.setProperty("border", "1px solid white")
        element.style.setProperty("border-radius", "none")
        element.style.setProperty("background-color", "black")
        // element.style.setProperty("background-image", "none") //ta rzecz za dużo krzywdy robi
        element.style.setProperty("filter", "brightness(1.5)")
        element.style.setProperty("color", "white")
        element.style.setProperty("box-shadow", "none")
        element.style.setProperty("color", "white")
        element.style.setProperty("opacity", "1")
    })
}
changeBackground()


/**ta funkcja obrysuje po swojemu rzeczy którę mają pełnego rodzaju interakcję */
function highlightPointsOfInterest() {
    const allElements = document.querySelectorAll("button, input, a");
    allElements.forEach(element => {
        element.style.border = "3px solid yellow";
    })
}
highlightPointsOfInterest()

///**ta funkcja słucha czy są zmiany w dokumencie, jest krytycznie niestabilna i spowalnia przeglądarkę do zera*/
// const observer = new MutationObserver((mutationsList, observer) => {
//     for (const mutation of mutationsList) {
//         changeBackground()
//     }
//   });
  
//   const config = { childList: true, subtree: true, attributes: true };
//   observer.observe(document.body, config);