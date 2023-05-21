const playground = document.querySelector("#playground");
const connectionsContainer = document.querySelector("#connectionsContainer");
let zoom = 1;
const ZOOM_SPEED = 0.1;
let isOnDiv = false;

function setHoverTrue() {
    // console.log("true");
    isOnDiv = true;
}
    
function setHoverFalse() {
    // console.log("false");
    isOnDiv = false;
}



document.addEventListener("wheel", function(e) {  
    if(isOnDiv === true) {
        if(e.deltaY > 0 && zoom > -2.5){    
            playground.style.transform = `scale(${zoom += ZOOM_SPEED})`;  
        }
        else if(e.deltaY < 0 && zoom > -2.5) {    
            playground.style.transform = `scale(${zoom -= ZOOM_SPEED})`;  }
    }

});