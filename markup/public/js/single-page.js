$(document).ready(function () {
    var personsDefault = [{
        'min': 1,
        'max': 20,
        'val': 11
    }];



    var elem = $('.persona');

    persona1 = new PersonCounter({
        element: elem,
        persons: personsDefault
    });

});