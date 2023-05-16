var N = 50;

class Generator {
  constructor(id, freq, amplitude, offset, phase) {
    this.id = id
    this.out0 = [];
    this.freq = freq;
    this.amplitude = amplitude;
    this.offset = offset;
    this.phase = phase;
    this.labels = [];
  }
}

class Sine extends Generator{
  static numberOfComponents = 0;

  constructor(id, freq = 1000, amplitude = 1, offset = 0, phase = 0) {
    super(id, freq, amplitude, offset, phase);
    this.name = "SINE WAVE";
    Sine.numberOfComponents += 1;
    this.transferFunction();
  }

  transferFunction() {
    for(let step = 0; step < N; step=step + 0.1) {
      this.out0.push(this.amplitude * Math.sin(2*Math.PI*this.freq + step + this.phase));
      this.labels.push(step.toString());
    }
  }

  getId() {
    return this.id;
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
  if(elmnt.classList.contains('live')) {
    elmnt.ondblclick = appendAnalysis(elmnt.id);
  }
}

function appendAnalysis(componentId) {
  var newAnalysis = document.createElement('div');
  newAnalysis.classList.add("analysis");
  newAnalysis.classList.add("resizable");
  newAnalysis.id = componentId + "Analysis";
  playground.append(newAnalysis);
  var newResizers = document.createElement('div');
  newResizers.classList.add("resizers");
  newAnalysis.append(newResizers);
  appendCanvas(newAnalysis, componentId);
  appendResizers(newResizers);
  dragElement(newAnalysis);
  makeResizableDiv(newAnalysis, newResizers);
}

function appendResizers(analysis) {
  var newResizerTL = document.createElement('div');
  newResizerTL.classList.add("resizer");
  newResizerTL.classList.add("top-left");
  analysis.append(newResizerTL);
  var newResizerTR = document.createElement('div');
  newResizerTR.classList.add("resizer");
  newResizerTR.classList.add("top-right");
  analysis.append(newResizerTR);
  var newResizerBL = document.createElement('div');
  newResizerBL.classList.add("resizer");
  newResizerBL.classList.add("bottom-left");
  analysis.append(newResizerBL);
  var newResizerBR = document.createElement('div');
  newResizerBR.classList.add("resizer");
  newResizerBR.classList.add("bottom-right");
  analysis.append(newResizerBR);
}

function appendCanvas(analysis, componentId) {
  var newCanvas = document.createElement('canvas');
  newCanvas.id = componentId + "Canvas";
  analysis.append(newCanvas);
  var component = componentList[0];
  plot(newCanvas, component);
}

function plot(ctx, component) {
  console.log(component.out0)
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: component.labels,
      datasets: [
        {
          label: component.name,
          data: component.out0,
          fill: false,
          cubicInterpolationMode: 'monotone',
          tension: 0.4
        }
      ]
    },
    options: {
      elements: {
        point: {
          radius: 0,
          pointStyle: false
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          min: 0,
          max: 100,
          ticks: {
            display: false
          },
          grid: {
            display: false
          }
        },
        y: {
          grid: {
            display: false
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
}