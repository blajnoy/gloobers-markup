var existChildrenArr = [{
    'min': 1,
    'max': 20,
    'val': 11
}];

var existAdultsArr = [{
    'min': 18,
    'max': 100,
    'val': 45
}];

var isInit;
var childrenObj;
var adultsObj;

function initPersonsCounter() {

    var childrenCounter = $('.children-counter');
    var adultsCounter = $('.adults-counter');

    if(!isInit) {

        childrenObj = new PersonCounter({
            element: childrenCounter,
            persons: existChildrenArr
        });

        adultsObj = new PersonCounter({
            element: adultsCounter,
            persons: existAdultsArr
        });

        isInit = true;
    }

    $(childrenObj).add(adultsObj).on("change", function(){
        var $elm = $('#personsNum');
        var personsAmount = childrenObj.getPersons().length + adultsObj.getPersons().length;
        $elm.text(personsAmount);
    });

}

