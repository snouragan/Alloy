function appendClose(component) {
    var close = document.createElement("div");
    close.classList.add("close");

    component.append(close);

    component.addEventListener('mouseover', function(e) {
        close.style.visibility = "visible";
    });

    component.addEventListener('mouseout', function(e) {
        close.style.visibility = "hidden";
    });
}