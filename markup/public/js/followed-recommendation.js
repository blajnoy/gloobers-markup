$(document).ready(function () {
    $('.daterange-followed').on('apply.daterangepicker', function(ev, picker) {
        console.log($('.daterange-followed').val());
    });
});