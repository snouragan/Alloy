N = 10000;
Fs = 100000;

class Generator {
  constructor(freq, amplitude, offset, phase) {
    this.out0 = [];
    this.freq = freq;
    this.amplitude = amplitude;
    this.offset = offset;
    this.phase = phase;
  }
}

class Sine extends Generator{
  static numberOfComponents = 0;

  constructor(id, freq = 1000, amplitude = 1, offset = 0, phase = 0) {
    super(freq, amplitude, offset, phase);
    this.id = id;
    Sine.numberOfComponents += 1;
  }

  transferFunction() {
    for(let step = 0; step < N; step++) {
      this.out0.push(amplitude * Math.sin(2*Math.PI*freq/Fs + step + phase));
    }
  }
}

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

function analyzeComponent(elmnt) {
  elmnt.ondblclick = appendAnalysis;
}

function appendAnalysis(componentId) {
  var newAnalysis = document.createElement('div');
  
  newAnalysis.classList.add("analysis");
  newAnalysis.id = componentId + "Analysis";
  playground.append(newAnalysis);
  appendCanvas(newAnalysis, componentId);

  dragElement(newAnalysis);
}

function appendCanvas(analysis, componentId) {
  var newCanvas = document.createElement('canvas');
  newCanvas.id = componentId + "Canvas";
  analysis.append(newCanvas);
  plot(newCanvas);
}

function plot(ctx) {
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}