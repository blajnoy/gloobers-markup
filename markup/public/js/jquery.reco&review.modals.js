/* RECO PASSIONS SELECTING */

$('#passions-choice').on('click', '.item', function () {
    var elm = $(this);
    var check = elm.find('.passion-check');

    if (!elm.hasClass('selected')) {
        elm.addClass('selected');
        check.prop('checked', true);
    } else {
        elm.removeClass('selected');
        check.prop('checked', false);
    }

    return false;
});


var passionsSlider = $('.passions-slider').slick({
    slidesToShow: 1,
    arrows: false,
    draggable: false,
    swipe: false,
    touchMove: false,
    dots: true,
    customPaging : function(slider, i) {
        return '<span class="custom-dot">' + i + '</span>';
    }
});

$('.btn-prev-passions-slider').on('click', function (e) {
    e.preventDefault();
    passionsSlider.slick('slickPrev')
});

$('.btn-next-passions-slider').on('click', function (e) {
    e.preventDefault();
    passionsSlider.slick('slickNext');
});

function refreshSlickSlider(slider) {
    slider.slick("slickSetOption", "", false, true);
}

$('#exampleModal').on('shown.bs.modal', function () {
    refreshSlickSlider(passionsSlider);
});



