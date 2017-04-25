$(document).ready(function () {

    $('.map-types').on('click', '.marker', function (elm) {
        $('.map-types').find('.marker').removeClass('selected');
        $(this).addClass('selected');
        return false;
    });
});

