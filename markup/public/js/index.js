$(document).ready(function () {

    $('.recommendations').slick({
        slidesToShow: 1,
        arrows: false,
        dots: true,
        customPaging : function(slider, i) {
            return '<span class="custom-dot">' + i + '</span>';
        },
        responsive: [
            {
                breakpoint: 5000,
                settings: "unslick"
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.cities-list').slick({
        slidesToShow: 1,
        arrows: false,
        dots: true,
        customPaging : function(slider, i) {
            return '<span class="custom-dot">' + i + '</span>';
        },
        responsive: [
            {
                breakpoint: 5000,
                settings: "unslick"
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

});

