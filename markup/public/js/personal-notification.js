$(document).ready(function () {

    $("#stickedAsideBox").sticky({
        topSpacing: 30,
        bottomSpacing: $('.footer').outerHeight() + 30
    });

    $('.lnk-filter').on('click', function (e) {
        e.preventDefault();

        $(this).toggleClass('up')
    });

});




function dragulaInit() {
    var dragulaNotify  = dragula(
        [document.querySelector('#notifications-list_dropID')],
        {
            removeOnSpill: true
        }
    );
    dragulaNotify.on("remove", function (el) {
       console.log($(el).attr('id'));
    });
}
