$("#stickedAsideBox").sticky({
    topSpacing: 30,
    bottomSpacing: $('.footer').outerHeight() + 30
});


var recoDescSlider = $('.recommendations-desc-slider').slick({
    slidesToShow: 1,
    swipeToSlide: true,
    draggable: false,
    arrows: false,
    infinite: false
});


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

    if (recoDescSlider.$slides.length-1 == slider.slick('slickCurrentSlide')) {
        alert("Last slide");
    }

    console.log(slider.slick('slickCurrentSlide'));
}

function prevSlide(slider) {
    slider.slick('slickPrev');
    console.log(slider.slick('slickCurrentSlide'));
}
