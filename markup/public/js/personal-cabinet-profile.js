$(document).ready(function () {

    var croperSize = new Slider('#cropImgSize', {
        tooltip: 'hide'
    });

    croperSize.on("slideStop", function(sliderValue) {
        $('#crop-avatar').cropper('zoom', 0.1)
    });

    /*$('.slider-increase').on('click', function (e) {
        e.preventDefault();
        var val = croperSize.getValue();
        croperSize.setValue( val - 1 );
    });

    $('.slider-decrease').on('click', function (e) {
        e.preventDefault();
        var val = croperSize.getValue();
        croperSize.setValue( val + 1 );
    });*/


});


