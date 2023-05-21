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

    close.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        component.remove();
    });
}

function appendBus(component) {
    var newInput = document.createElement('div');
    var newOutput = document.createElement('div');
    
    newInput.classList.add('bus');
    newInput.classList.add('left');
    newOutput.classList.add('bus');
    newOutput.classList.add('right');

    component.append(newInput);
    component.append(newOutput);

    connect(newInput, component);
    connect(newOutput, component);
}

var busSelected = false;
var selectedBus = NaN;
var selectedComponent = NaN;

function connect(bus, component) {
    bus.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        if(busSelected) {
            appendLineSvg(selectedBus, bus);
    
            busSelected = false;
            selectedBus = NaN;
            selectedComponent = NaN;
        }
        else {
            selectedBus = bus;
            selectedComponent = component;
    
            busSelected = true;
        }
    });
    
}

function appendLineSvg(leftBus, rightBus) {
    var leftCoordinates = leftBus.getBoundingClientRect();
    var rightCoordinates = rightBus.getBoundingClientRect();

    var leftX = leftCoordinates.left;
    var leftY = leftCoordinates.top;

    var rightX = rightCoordinates.left;
    var rightY = rightCoordinates.top;

    var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');

    newLine.setAttribute('id','newLine');
    newLine.setAttribute('x1', leftX - menu.offsetWidth);
    newLine.setAttribute('y1', leftY);
    newLine.setAttribute('x2', rightX - menu.offsetWidth);
    newLine.setAttribute('y2', rightY);
    newLine.setAttribute("stroke", "black")
    connectionsContainer.append(newLine);
}