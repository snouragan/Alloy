$('.component').on('dblclick', function(component){
    if($this.hasClass('sine')) {
        $.ajax({
            url: "create_component",
            type: "POST",
            data: {
                id: $this.id,
                
            },
        })  
    }
});