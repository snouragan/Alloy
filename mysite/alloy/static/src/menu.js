var componentList = [];

const menu = document.querySelector("#menu");

$('.component').on('dblclick', function(e){
    e.preventDefault();
    e.stopPropagation();
    id = "sine" + Sine.numberOfComponents;
    componentList.push(new Sine(id));
    appendComponent(this.classList, id);
});

function appendComponent(componentClassList, componentId) {
    var newComponent =  document.createElement('div');
    componentClassList.forEach(cls => {
        newComponent.classList.add(cls);        
    });

    appendBus(newComponent);

    newComponent.classList.add("live");        
    newComponent.id = componentId;
    playground.prepend(newComponent);

    dragElement(newComponent);
    appendClose(newComponent);
    analyzeComponent(newComponent);
}