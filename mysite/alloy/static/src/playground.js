const playground = document.querySelector("#playground");
let zoom = 1;
const ZOOM_SPEED = 0.1;
let isOnDiv = false;

if (playground.parentNode.matches(":hover")) {
    console.log("true");
    isOnDiv = true;
} else {
    console.log("false");
    isOnDiv = false;
}
document.addEventListener("wheel", function(e) {  
    if(isOnDiv === true) {
        if(e.deltaY > 0){    
            playground.style.transform = `scale(${zoom += ZOOM_SPEED})`;  
        }
        else if(e.deltaY < 0) {    
            playground.style.transform = `scale(${zoom -= ZOOM_SPEED})`;  }
    
    }
});