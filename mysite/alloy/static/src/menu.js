var numberOfComponents = 0;

$('.component, .display').on('dblclick', function(){

    $.get("get_number_of_components", function(num) {
        numberOfComponents = num;
    });

    appendComponent(this.classList, this.id + numberOfComponents);

    $.ajax({
        url: "create_component",
        type: "POST",
        data: {
            id: this.id + numberOfComponents,
        },
    })  

});

function appendComponent(componentClassList, componentId) {
    var newComponent =  document.createElement('div');
    componentClassList.forEach(cls => {
        newComponent.classList.add(cls);        
    });
    newComponent.classList.add("live");        
    newComponent.id = componentId;
    playground.appendChild(newComponent);
}