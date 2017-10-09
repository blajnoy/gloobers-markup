$("#stickedAsideBox").sticky({
    topSpacing: 30,
    bottomSpacing: $('.footer').outerHeight() + 30
});


var recoDescSlider = $('.recommendations-desc-slider').slick({
    slidesToShow: 1,
    swipeToSlide: true,
    draggable: false,
    //arrows: false,
    nextArrow: $('.reviews-nav .lnk-next, .pages-nav .lnk-next'),
    prevArrow: $('.reviews-nav .lnk-prev, .pages-nav .lnk-prev'),
    infinite: false,
    adaptiveHeight: true,
    fade: true
});

recoDescSlider.slick('slickGoTo', 0);



/*

$(".pages-nav").find(".lnk-prev").on('click', function (e) {
    e.preventDefault();
    prevSlide(recoDescSlider);
});
$('.pages-nav').find(".lnk-next").on('click', function (e) {
    e.preventDefault();
    nextSlide(recoDescSlider);
});

function nextSlide(slider) {
    slider.slick('slickNext');

    console.log(slider.slideCount);
    console.log(slider.slick('slickCurrentSlide'));

    /!*if (recoDescSlider.$slides.length-1 == slider.slick('slickCurrentSlide')) {
        alert("Last slide");
    }*!/
}

function prevSlide(slider) {
    slider.slick('slickPrev');
}
*/
