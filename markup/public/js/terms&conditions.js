$(document).ready(function () {

    var body = $("body");

    $('.lnk-read-next').click(function(){
        body.stop().animate({scrollTop:0}, 300, 'swing', function() {
            $('.terms-nav > .active').next('li').find('a').trigger('click');
        });

        return false;
    });

    $('.lnk-read-prev').click(function(){
        body.stop().animate({scrollTop:0}, 300, 'swing', function(){
            $('.terms-nav > .active').prev('li').find('a').trigger('click');
        });

        return false;
    });
});