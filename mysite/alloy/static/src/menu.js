sineArray = []

$('.component').on('dblclick', function(){
    id = "sine" + Sine.numberOfComponents;
    sineArray.push(new Sine(id));
    appendComponent(this.classList, id);

});

function appendComponent(componentClassList, componentId) {
    var newComponent =  document.createElement('div');
    componentClassList.forEach(cls => {
        newComponent.classList.add(cls);        
    });
    newComponent.classList.add("live");        
    newComponent.id = componentId;
    playground.append(newComponent);

    dragElement(newComponent);
}