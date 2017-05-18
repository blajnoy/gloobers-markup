$(document).ready(function () {
    /*$('.test').on('click', function(e) {
        e.preventDefault();

        $.ajax('/test', {
            method: 'POST',
            success:  function(res) {
                alert(res.hi)
            }
        });

    });*/

    $("#payment-aside").sticky({
        topSpacing: 25,
        bottomSpacing: $('.footer').outerHeight() + 30
    });


    /* start statistics chart */
    (function () {
        if($('#chart').length != 0) {
            var ctx = document.getElementById("chart").getContext("2d");

            /*** Gradient ***/
            var gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, 'rgba(250,174,50,1)');
            gradient.addColorStop(1, 'rgba(250,174,50,0)');
            /***************/

            var data = {
                labels : ["January","February","March","April","May","June","July","August","September","October","November","December"],
                datasets: [
                    {
                        fillColor : gradient, // Put the gradient here as a fill color
                        strokeColor : "#ff6c23",
                        pointColor : "#fff",
                        pointStrokeColor : "#ff6c23",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "#ff6c23",
                        data : [1000, 2000, 666, 6000, 777, 500, 1000, 3000, 5000, 6000, 2000, 4000]
                    }
                ]
            };

            var options = {
                responsive: true,
                datasetStrokeWidth : 1,
                pointDotStrokeWidth : 1,
                tooltipFillColor: "rgba(0,0,0,0.8)",
                tooltipFontStyle: "regular",
                tooltipTemplate: "<%if (label){%><%='In ' + label + ' was earned' %>: <%}%><%= '$' + value %>",
                scaleLabel : "<%=  '$' + Number(value).toFixed(0).replace('.', ',')%>"
            };




            var myLineChart = new Chart(ctx).Line(data, options);

        }

    }).call(this);


    /* end statistics chart */


    $('.trips-list').find('.img-slider').slick({
        slidesToShow: 1,
        swipeToSlide: true,
        fade: true
    });

    /* schedule calendar */

    if($('#calendar').length != 0) {
        $('#calendar').fullCalendar({
            header: {
                left: 'prev',
                center: 'title',
                right: 'next'
            },
            defaultDate: '2014-06-12',
            defaultView: 'month',
            editable: false,
            events: [
                {
                    title: 'All Day Event',
                    start: '2014-06-01',
                    description: 'This is a cool event'
                },
                {
                    title: 'Long Event',
                    start: '2014-06-07',
                    end: '2014-06-20'
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: '2014-06-09T16:00:00'
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: '2014-06-16T16:00:00'
                },
                {
                    title: 'Meeting',
                    start: '2014-06-12T10:30:00',
                    end: '2014-06-12T12:30:00'
                },
                {
                    title: 'Lunch',
                    start: '2014-06-12T12:00:00'
                },
                {
                    title: 'Birthday Party',
                    start: '2014-06-13T07:00:00'
                },
                {
                    title: 'Click for Google',
                    url: 'http://google.com/',
                    start: '2014-06-28'
                }
            ]
        });
    }


    /*$('#my-prev-button').click(function() {
        $('#calendar').fullCalendar('prev');

        var view = $('#calendar').fullCalendar('getView');
        changeCalendarTitle(view.title);

        return false;
    });

    $('#my-prev-next').click(function() {
        $('#calendar').fullCalendar('next');

        var view = $('#calendar').fullCalendar('getView');
        changeCalendarTitle(view.title);

        return false;
    });*/

    $('#switchPeriodView input').on('change', function () {
        var view = $(this).prop('id');
        changeCalendarView(view);
    });


    function changeCalendarView(view) {
        $('#calendar').fullCalendar('changeView', view);
    }

    function changeCalendarTitle(titleText) {
        $('.period-ttl').html(titleText);
    }


    /* PASSIONS SELECTING */

    var passionsList = [];


    $('#passions-selecting').on('click', '.item', function () {
        var elm = $(this);
        var id = elm.data('itemId');

        if( !elm.hasClass('selected') ) {
            elm.addClass('selected');
            addPassionInArray(id);
        } else {
            elm.removeClass('selected');
            removePassionInArray(id);
        }

        return false;
    });

    $('#savePS').on("click", function () {

        $('#passions-selected .item').removeClass('show');

        $('#passions-selected .item').filter(function(){
            return passionsList.indexOf( $(this).data('itemId') ) != -1;
        }).addClass('show');

        $('#PassionsModal').modal('hide');

        return false;
    });


    function addPassionInArray(id) {
        passionsList.push(id);
    }

    function removePassionInArray(id) {
        passionsList = passionsList.filter(function(number) {
            return number !== id;
        });
    }

    /* RECO PASSIONS SELECTING */

    $('#passions-choice').on('click', '.item', function () {
        var elm = $(this);
        var check = elm.find('.passion-check');

        if( !elm.hasClass('selected') ) {
            elm.addClass('selected');
            check.prop('checked', true);
        } else {
            elm.removeClass('selected');
            check.prop('checked', false);
        }

        return false;
    });


    /* SPINNER */
    $("#book").on("click", function (event) {
        $('#person-card').LoadingOverlay("show", {
            image: "",
            color: "rgba(80, 30, 0, 0.8)",
            fontawesome: "gl-ico gl-ico-logo fa-spin"
        });

        setTimeout(function () {
            $('#person-card').LoadingOverlay("hide");
        }, 5000);

        return false;
    });

    /* END SPINNER */


    /* Progress of upload file */
    /*$(function() {

     var bar = $('.bar');
     var percent = $('.percent');
     var status = $('#status');

     $('form').ajaxForm({
     beforeSend: function() {
     status.empty();
     var percentVal = '0%';
     bar.width(percentVal);
     percent.html(percentVal);
     },
     uploadProgress: function(event, position, total, percentComplete) {
     var percentVal = percentComplete + '%';
     bar.width(percentVal);
     percent.html(percentVal);
     },
     complete: function(xhr) {
     status.html(xhr.responseText);
     }
     });
     });*/
    /* End Progress of upload file */

    $('.scroll-to-elm').click(function (e) {
        var href = jQuery(this).attr("href"),
            id = href.substring(href.indexOf('#'));

        offsetTop = href === "#" ? 0 : jQuery(id).offset().top - 100;

        jQuery('html, body').stop().animate({
            scrollTop: offsetTop
        }, 300);

        e.preventDefault();
    });

    $('.boarding-selection').on('change', '.checkbox input', function () {
        if ($(this).is(':checked')) {
            $(this).parents('.item:first').addClass('selected');
        } else {
            $(this).parents('.item:first').removeClass('selected');
        }
    });

    $('.categories-drop').on('show.bs.collapse', function () {
        $(this).prev().addClass('opened-drop');
    });

    $('.categories-drop').on('hidden.bs.collapse', function () {
        $(this).prev().removeClass('opened-drop');
    });

    $('.result-list').find('.img-slider').slick({
        slidesToShow: 1,
        swipeToSlide: true,
        fade: true
    });

    $('.testimonials-carousel').slick({
        centerMode: true,
        slidesToShow: 5,
        swipeToSlide: true,
        arrows: false,
        variableWidth: true,
        focusOnSelect: true,
        asNavFor: '.slider-for'
    });

    $('.slider-for').slick({
        slidesToShow: 1,
        arrows: false,
        fade: true,
        draggable: false,
        swipe: false,
        touchMove: false
        //adaptiveHeight: true
    });

    $('.main-slider').slick({
        slidesToShow: 1,
        fade: true,
        arrows: true,
        prevArrow: '<a href="#" class="btn-prev"><i class="gl-ico gl-ico-arrow-left"></i></a>',
        nextArrow: '<a href="#" class="btn-next"><i class="gl-ico gl-ico-arrow-right"></i></a>',
        /*draggable: false,
         swipe: false,
         touchMove: false*/
    });

    $('.search-tabs .radio').click(function () {
        $(this).tab('show');
    });

    $('.how-slider')
        .slick({
            slidesToShow: 1,
            arrows: false
        })
        .on('afterChange', function (event, slick, currentSlide, nextSlide) {
            $('.slider-tabs li').removeClass("active").eq(currentSlide).addClass("active");
        });

    $('.slider-tabs li').each(function (i) {
        $(this).click(function () {
            $('.slider-tabs li').removeClass("active");
            $(this).addClass("active");
            $('.how-slider').slick('slickGoTo', i);
        })
    });

    (function () {

        if ($("#tether-elm").length && $("#tether-target").length) {
            new Tether({
                element: '#tether-elm',
                target: '#tether-target',
                attachment: 'bottom center',
                targetAttachment: 'top center',
                constraints: [{
                    to: 'window',
                    pin: ['top']
                }]
            });
        }

        if ($("#profile-tether-elm").length && $("#profile-tether-target").length) {
            new Tether({
                element: '#profile-tether-elm',
                target: '#profile-tether-target',
                attachment: 'top center',
                targetAttachment: 'top center',
                constraints: [
                    {
                        to: 'window',
                        pin: ['top']
                    }
                ]
            });
        }

    }).call(this);

    (function () {
        var init, setupDrop, _Drop;

        _Drop = Drop.createContext({
            classPrefix: 'drop'
        });

        init = function () {
            return setupDrop();
        };

        setupDrop = function () {


            return $('.open-drop').each(function () {

                var $elm, content, drop, openOn, theme, position, offset;

                $elm = $(this);
                theme = $elm.data('theme');
                openOn = $elm.data('open-on') || 'click';
                offset = $elm.data('offset') || '0 0';
                position = $elm.data('position') || 'bottom center';

                $elm.addClass(theme);

                content = $($elm.data('drop-content')).html() || $elm.next('.drop-content').html();

                return drop = new _Drop({
                    target: $elm[0],
                    classes: theme,
                    position: position,
                    constrainToWindow: true,
                    constrainToScrollParent: false,
                    openOn: openOn,
                    content: content,
                    tetherOptions: {
                        offset: offset
                    }
                });

            });
        };

        init();

    }).call(this);

    /**/
    /*$(function() {
     var target = $('.date-input'),
     elm;


     new Tether({
     element: elm,
     target: target,
     attachment: 'top center',
     targetAttachment: 'top center'
     });
     });*/


    (function () {

        function datapickerDropEmbedding(target) {

            $(target).each(function () {

                var dropElm,
                    $elm,
                    content,
                    drop,
                    theme,
                    position,
                    offset,
                    dropDatapicker,
                    _this = $(this);

                if (_this[0].nodeName != "A") {
                    _this.daterangepicker({
                        "autoApply": true,
                        "showCustomRangeLabel": false,
                        "alwaysShowCalendars": true
                    });
                } else {
                    _this.daterangepicker({
                        "autoApply": true,
                        "showCustomRangeLabel": false,
                        "alwaysShowCalendars": true
                    }).on("click", function () {
                        return false;
                    });

                    _this.data('daterangepicker').updateElement = function () {
                        if (this.element.is('input') && !this.singleDatePicker && this.autoUpdateInput) {
                            this.element.val(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));
                            this.element.trigger('change');
                        } else if (this.element.is('input') && this.autoUpdateInput) {
                            this.element.val(this.startDate.format(this.locale.format));
                            this.element.trigger('change');
                        } else if (this.element.is('a') && this.autoUpdateInput) {
                            this.element.children(".date-field").html(this.startDate.format(this.locale.format));
                        }
                    };

                    _this.children(".date-field").html(_this.data("startDate"));
                }

                _this.on('show.daterangepicker', function () {
                    dropDatapicker.position();
                });

                _this.on('change.daterangepicker', function () {
                    dropDatapicker.position();
                });

                dropElm = _this.data('daterangepicker').container;

                $elm = _this;
                theme = $elm.data('theme');
                offset = $elm.data('offset') || '0 0';
                position = $elm.data('position') || 'bottom center';

                dropElm.addClass(theme).wrapInner("<div class='drop-content'></div>");

                dropDatapicker = new Tether({
                    classPrefix: 'drop',
                    element: dropElm,
                    target: _this,
                    attachment: 'top left',
                    targetAttachment: position,
                    offset: offset,
                    constraints: [
                        {
                            to: 'scrollParent'
                        }
                    ]
                });
            });


        }

        datapickerDropEmbedding('.daterange-input');

    }).call(this);

    (function () {

        $(".date-set .daterange-input").on('apply.daterangepicker', function (ev, picker) {

            $(".btn-primary.daterange-input").data('daterangepicker').setStartDate(picker.startDate);
            $(".btn-primary.daterange-input").data('daterangepicker').setEndDate(picker.endDate);

        });

    })();


    $('.tags-list').find('a.tag').on('click', function () {
        $(this).toggleClass('selected');
        return false;
    });

    /*(function () {

     //  the data that powers the bar chart, a simple array of numeric values
     var chartdata = [40, 60, 80, 100, 70, 120, 100, 60, 70, 150, 120, 140];

     //  the size of the overall svg element
     var height = 200,
     width = 720,

     //  the width of each bar and the offset between each bar
     barWidth = 40,
     barOffset = 20;


     d3.select('#chart').append('svg')
     .attr('width', width)
     .attr('height', height)
     .style('background', '#dff0d8')
     .selectAll('rect').data(chartdata)
     .enter().append('rect')
     .style('fill', '#3c763d')
     .attr('width', barWidth)
     .attr('height', function (data) {
     return data;
     })
     .attr('x', function (data, i) {
     return i * (barWidth + barOffset);
     })
     .attr('y', function (data) {
     return height - data;
     });

     })();*/

    if ($('#ex2').length) {

        $('#ex2').slider({
            tooltip: 'hide'
        });
        $("#ex2").on("slideStop", function (slideEvt) {
            $("#price-min span").text(slideEvt.value[0]);
            $("#price-max span").text(slideEvt.value[1]);
        });

    }


    (function () {


        function rndArr(size) {
            var arr = [];

            for (var i = 0, l = size; i < l; i++) {
                arr.push(Math.round(Math.random() * l))
            }

            return arr;
        }

        /*var chartdata = [500, 100, 10, 10, 500, 100, 10, 10, 0, 35, 1000, 0, 35, 100, 100, 500, 300, 500, 100, 10, 10, 0, 35, 2100, 1000, 500, 300, 300, 500, 100, 10, 10, 0, 35, 1000, 500, 300, 500, 100, 10, 10, 0, 35, 1000, 1000, 500, 1000, 1000, 500, 300];*/

        var chartdata = rndArr(50),
            height = 35,
            width = '100%',
            persentageItemWidth = 100 / chartdata.length;


        var yScale = d3.scaleLinear()
            .domain([0, d3.max(chartdata)])
            .range([0, height]);


        var rect;

        var awesome, dd3;


        var ww = function () {


            dd3 = d3.select('#chart').append('svg');
            rect = dd3
                .attr('width', width)
                .attr('height', height)
                .append('g')
                .selectAll('rect').data(chartdata);

            chartdata = rndArr(50);

            awesome = rect
                .enter().append('rect')
                .style('fill', '#acacac')
                .attr('width', persentageItemWidth + "%")
                .attr('x', function (data, i) {
                    return persentageItemWidth * i + "%";
                })
                .attr('height', 0)
                .attr('y', height);

        };

        ww();

        var qq = function () {

            awesome.transition()
                .attr('height', function (data) {
                    return yScale(data);
                })
                .attr('y', function (data) {
                    return height - yScale(data);
                })
                .delay(function (/*data,*/ i) {
                    return i * 10;
                })
                .duration(1000)
                .ease(d3.easeElastic);

        };
        qq();

        var refreshGraph = function () {
            var qw = rndArr(50);
            awesome.data(qw);
            qq();

        };


        $("#refresh-prices").click(function () {
            refreshGraph();
        })


    })();


});


if ($('.sel-pass').length != 0) {
    Select.init({
        selector: '.sel',
        className: 'select-theme-default sel-pass'
    });
}

if ($('.sel').length != 0) {
    $( ".sel" ).select2({
        width: '100%',
        minimumResultsForSearch: -1,
        theme: "bootstrap"
    });
}


/**/

var contentString = '<div class="review-card">' +
    '<div class="img-slider-wrap">' +
    '<div class="img-slider">' +
    '<div class="item"><img src="images/bg-main.jpg" alt=""></div>' +
    '<div class="item"><img src="images/bg-main.jpg" alt=""></div>' +
    '<div class="item"><img src="images/bg-main.jpg" alt=""></div>' +
    '<div class="item"><img src="images/bg-main.jpg" alt=""></div>' +
    '</div>' +
    '</div>' +
    '<div class="card-ttl">' +
    '<div  class="card-ttl-col">' +
    '<strong class="ttl"><a href="#">Lorem Ipsum is simply </a></strong>' +
    '<span class="sub-ttl">Long  location name</span>' +
    '</div>' +
    '<div class="card-rate-wrap">' +
    '<div class="recommend-avatar">' +
    '<img src="images/photo01.jpg" alt="">' +
    '</div>' +
    '<div class="card-rate-info">' +
    '<div class="rating">' +
    '<div class="stars">' +
    '<span class="star"><i class="gl-ico gl-ico-star" aria-hidden="true"></i></span>' +
    '<span class="star"><i class="gl-ico gl-ico-star" aria-hidden="true"></i></span>' +
    '<span class="star"><i class="gl-ico gl-ico-star" aria-hidden="true"></i></span>' +
    '<span class="star"><i class="gl-ico gl-ico-star" aria-hidden="true"></i></span>' +
    '<span class="star empty"><i class="gl-ico gl-ico-star" aria-hidden="true"></i></span>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="recommendation-types">' +
    '<div class="col">' +
    '<strong class="ttl">Username recommends this activity for:</strong>' +
    '<div class="tags">Golf, Music, Scuba diving, Road trip </div>' +
    '</div>' +
    '<div class="col">' +
    '<strong class="ttl">Type of trip</strong>' +
    '<div class="tags">Trip with a friend</div>' +
    '</div>' +
    '</div>' +
    '<div class="content-holder">' +
    '<strong class="ttl">Recommendation</strong>' +
    '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ndustrys standard dummy text ever since the unknown printer too a galley of type and scrambled Lorem sum is simply dummy text of the printing and. typesetting industry. Lorem Ipsum has been the industry standard dummy. Text ever since the unknown printer took a galley of type and scrambled Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the unknown printer took a galley of type and scrambled. Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>' +
    '</div>' +
    '</div>';

//contentString = '<div class="card card-advisor"><div class="img-h"><span class="img-wrap"><img src="images/bg-main.jpg" alt="image"></span><span class="photo-adv"><img src="images/photo01-big.jpg" alt="avatar"></span><div class="categories-adv"><span class="category"></span></div></div><div class="card-ttl"><div  class="card-ttl-col"><strong class="ttl"><a href="#">Lorem Ipsum is simply </a></strong><span class="sub-ttl">Long  location name</span></div><div class="card-rate-info"><div class="rating"><strong class="rating-ttl">7</strong><div class="stars"><span class="star"><i class="gl-ico gl-ico-star" aria-hidden="true"></i></span><span class="star"><i class="gl-ico gl-ico-star" aria-hidden="true"></i></span><span class="star"><i class="gl-ico gl-ico-star" aria-hidden="true"></i></span><span class="star"><i class="gl-ico gl-ico-star" aria-hidden="true"></i></span><span class="star empty"><i class="gl-ico gl-ico-star" aria-hidden="true"></i></span></div></div><em class="recommend"><strong>25</strong> Recommendations</em></div></div><footer><span class="adv-desc-info">21 years, <br>IT engeneer in Deftsoft</span><a href="#" class="btn">Recommendations on map</a></footer><div class="more-info"><div class="show-more-row"><a class="lnk-expand collapsed" href="#adv-drop100" data-toggle="collapse" aria-expanded="false" aria-controls="collapseExample" data-lnk-expand-text-show="Show interests (25)" data-lnk-expand-text-hide="Hide interests"><i class="gl-ico gl-ico-arrow-down"></i></a></div><div class="more-drop collapse" id="adv-drop100"><div class="more-drop-area"><div class="interests-tags">Golf, Music, Scuba diving, Road trip</div></div></div></div></div>';

var locations = [
    {
        "content": "bla bla bla",
        'advisor_latitude': 49.768525,
        "advisor_longitude": -70.075736,
        "rate": 3,
        "currency": "$",
        "price": 88,
        "reviews": 8,
        "type_of_trip": 1
        /*
         **** types of trip: ****

         #1: I live there
         #2: I've been living there
         #3: I've been there in a business trip
         #4: I've been there in a romantic trip
         #5: I've been there with a group
         #6: I've been there alone
         #7: I've been there with the friend
         #8: I've been in a family trip

         */
    },
    {
        "content": "bla bla bla",
        "advisor_latitude": 50.768525,
        "advisor_longitude": -74.075736,
        "rate": 1,
        "currency": "$",
        "price": 8,
        "reviews": 1,
        "type_of_trip": 2
    },
    {
        "content": "bla bla bla",
        "advisor_latitude": 51.768525,
        "advisor_longitude": -76.075736,
        "rate": 5,
        "currency": "$",
        "price": 104,
        "reviews": 20,
        "type_of_trip": 3
    }
];

var map;

var markers = [],
    infoWindows = [];

map = initMap();
initMarkers(locations, getDefaultMarker);


function initMap() {

    var desktopScreen = Modernizr.mq("only screen and (min-width:1024px)"),
        zoom = desktopScreen ? 10 : 8,
        scrollable = draggable = !Modernizr.hiddenscroll || desktopScreen,
        myLatLng = {lat: 50.768525, lng: -74.075736},
        customStyles = [
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#444444"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 45
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#46bcec"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            }
        ];

    return new google.maps.Map(document.getElementById('map'), {
        zoom: zoom,
        center: myLatLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: scrollable,
        draggable: draggable,
        styles: customStyles
    });
}

function getRatingMarker(element) {

    var markerIcon = {
        url: 'images/transparent.png',
        scaledSize: new google.maps.Size(0, 0),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0)
    };

    var position = {
        lat: parseFloat(element.advisor_latitude),
        lng: parseFloat(element.advisor_longitude)
    };

    var star = '<i class="gl-ico gl-ico-star"></i>',
        markerText = Array(element.rate + 1).join(star),
        markerLabel = '<div class="marker-h">' + markerText + '</div>';

    $('.calcMarkerWidthElm').find('.custom-marker').remove();

    var calcWidthElm = '<div class="custom-marker rating-marker">' + markerLabel + '</div>';

    var offsetAnchorX = ($('.calcMarkerWidthElm').append(calcWidthElm).width()) / 2;

    var marker = new MarkerWithLabel({
        map: map,
        animation: google.maps.Animation.DROP,
        position: position,
        icon: markerIcon,
        labelContent: markerLabel,
        labelAnchor: new google.maps.Point(offsetAnchorX, 40),
        labelClass: "custom-marker rating-marker",
        labelInBackground: true
    });

    return marker;

};

function getHotelMarker(element) {

    var markerIcon = {
        url: 'images/transparent.png',
        scaledSize: new google.maps.Size(0, 0),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0)
    };

    var position = {
        lat: parseFloat(element.advisor_latitude),
        lng: parseFloat(element.advisor_longitude)
    };

    var markerText = element.currency + element.price,
        markerLabel = '<div class="marker-h">' + markerText + '</div>';

    $('.calcMarkerWidthElm').find('.custom-marker').remove();

    var calcWidthElm = '<div class="custom-marker">' + markerLabel + '</div>';

    var offsetAnchorX = ($('.calcMarkerWidthElm').append(calcWidthElm).width()) / 2;

    var marker = new MarkerWithLabel({
        map: map,
        animation: google.maps.Animation.DROP,
        position: position,
        icon: markerIcon,
        labelContent: markerLabel,
        labelAnchor: new google.maps.Point(offsetAnchorX, 40),
        labelClass: "custom-marker",
        labelInBackground: true
    });

    return marker;

};

function getAdvisorMarker(element) {

    var markerIcon = {
        url: 'images/transparent.png',
        scaledSize: new google.maps.Size(0, 0),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0)
    };

    var position = {
        lat: parseFloat(element.advisor_latitude),
        lng: parseFloat(element.advisor_longitude)
    };

    var markerText = '<i class="gl-ico gl-ico-user"></i>' + element.reviews,
        markerLabel = '<div class="marker-h">' + markerText + '</div>';

    $('.calcMarkerWidthElm').find('.custom-marker').remove();

    var calcWidthElm = '<div class="custom-marker">' + markerLabel + '</div>';

    var offsetAnchorX = ($('.calcMarkerWidthElm').append(calcWidthElm).width()) / 2;

    var marker = new MarkerWithLabel({
        map: map,
        animation: google.maps.Animation.DROP,
        position: position,
        icon: markerIcon,
        labelContent: markerLabel,
        labelAnchor: new google.maps.Point(offsetAnchorX, 40),
        labelClass: "custom-marker advisor-marker",
        labelInBackground: true
    });

    return marker;

};

function getDefaultMarker(element) {

    var markerIcon = {
        url: 'images/marker.svg',
        scaledSize: new google.maps.Size(30, 40),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(15, 40)
    };

    var position = {
        lat: parseFloat(element.advisor_latitude),
        lng: parseFloat(element.advisor_longitude)
    };

    var icon,
        type = element.type_of_trip;

    /*
     **** types of trip: ****

     #1: I live there
     #2: I've been living there
     #3: I've been there in a business trip
     #4: I've been there in a romantic trip
     #5: I've been there with a group
     #6: I've been there alone
     #7: I've been there with the friend
     #8: I've been in a family trip

     */

    switch (type) {
        case 1:
            icon = '<i class="gl-ico gl-ico-home-user"></i>';
            break;
        case 2:
            icon = '<i class="gl-ico gl-ico-home"></i>';
            break;
        case 3:
            icon = '<i class="gl-ico gl-ico-briefcase"></i>';
            break;
        case 4:
            icon = '<i class="gl-ico gl-ico-heart"></i>';
            break;
        case 5:
            icon = '<i class="gl-ico gl-ico-users-group"></i>';
            break;
        case 6:
            icon = '<i class="gl-ico gl-ico-school-book-bag"></i>';
            break;
        case 7:
            icon = '<i class="gl-ico gl-ico-users"></i>';
            break;
        case 8:
            icon = '<i class="gl-ico gl-ico-family"></i>';
            break;
        default:
            console.log("no icon for this type")
    }

    $('.calcMarkerWidthElm').find('.custom-marker-icon').remove();

    var calcWidthElm = '<div class="custom-marker-icon">' + icon + '</div>';

    var offsetAnchorX = ( $('.calcMarkerWidthElm').append(calcWidthElm).width() ) / 2;

    var marker = new MarkerWithLabel({
        map: map,
        animation: false, //google.maps.Animation.DROP,
        position: position,
        icon: markerIcon,
        labelContent: icon,
        labelAnchor: new google.maps.Point(offsetAnchorX, 34),
        labelClass: "custom-marker-icon",
        labelInBackground: true
    });

    return marker;

};

function addPassportMarker(location, type) {

    var markerIcon = {
        url: 'images/marker.svg',
        scaledSize: new google.maps.Size(30, 40),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(15, 40)
    };

    var icon;

    switch (type) {
        case 1:
            icon = '<i class="gl-ico gl-ico-home-user"></i>';
            break;
        case 2:
            icon = '<i class="gl-ico gl-ico-home"></i>';
            break;
        case 3:
            icon = '<i class="gl-ico gl-ico-briefcase"></i>';
            break;
        case 4:
            icon = '<i class="gl-ico gl-ico-heart"></i>';
            break;
        case 5:
            icon = '<i class="gl-ico gl-ico-users-group"></i>';
            break;
        case 6:
            icon = '<i class="gl-ico gl-ico-school-book-bag"></i>';
            break;
        case 7:
            icon = '<i class="gl-ico gl-ico-users"></i>';
            break;
        case 8:
            icon = '<i class="gl-ico gl-ico-family"></i>';
            break;
        default:
            console.log("no icon for this type")
    }

    $('.calcMarkerWidthElm').find('.custom-marker-icon').remove();

    var calcWidthElm = '<div class="custom-marker-icon">' + icon + '</div>';

    var offsetAnchorX = ( $('.calcMarkerWidthElm').append(calcWidthElm).width() ) / 2;

    var marker = new MarkerWithLabel({
        map: map,
        animation: false, //google.maps.Animation.DROP,
        position: location,
        icon: markerIcon,
        labelContent: icon,
        labelAnchor: new google.maps.Point(offsetAnchorX, 34),
        labelClass: "custom-marker-icon",
        labelInBackground: true
    });

    var latLng = marker.getPosition();
    map.setCenter(location);

    return marker;

}

function initMarkers(objects, markerTemplate) {

    var marker,
        infowindow;

    $('body').append('<div class="calcMarkerWidthElm"></div>');

    objects.forEach(function (element) {


        infowindow = new google.maps.InfoWindow({
            content: "holding ..."
        });

        infoWindows.push(infowindow);

        marker = markerTemplate(element);

        marker.addListener('click', function () {

            infowindow.setContent(contentString);

            google.maps.event.addListener(infowindow, 'domready', function () {

                // Reference to the DIV that wraps the bottom of infowindow
                var iwOuter = $('.gm-style-iw');
                var iwBackground = iwOuter.prev();
                // Removes background shadow DIV
                iwBackground.children(':nth-child(1)').css({'display': 'none'});

                // Removes background shadow DIV
                iwBackground.children(':nth-child(2)').css({'display': 'none'});

                // Removes white background DIV
                iwBackground.children(':nth-child(4)').css({'display': 'none'});

                iwBackground.children(':nth-child(3)').css({
                    marginTop: '-9px'
                });

                iwBackground.children(':nth-child(3)').children(':nth-child(1)').css({
                    width: '20px',
                    height: '20px',
                    left: '-11px'
                });
                iwBackground.children(':nth-child(3)').children(':nth-child(2)').css({
                    width: '20px',
                    height: '20px',
                    left: '9px'
                });


                iwBackground.children(':nth-child(3)').children(':nth-child(1)').children().css({
                    'left': 0,
                    'width': '100%',
                    'height': '100%',
                    'box-shadow': 'none',
                    'z-index': '1',
                    opacity: '1',
                    transform: 'skewX(45deg)'
                });
                iwBackground.children(':nth-child(3)').children(':nth-child(2)').children().css({
                    'left': 0,
                    'width': '100%',
                    'height': '100%',
                    'box-shadow': 'none',
                    'z-index': '1',
                    opacity: '1',
                    transform: 'skewX(-45deg)'
                });

                // Reference to the div that groups the close button elements.
                var iwCloseBtn = iwOuter.next();

                // Apply the desired effect to the close button
                //iwCloseBtn.css({opacity: '1', right: '38px', top: '3px', border: '7px solid #48b5e9', 'border-radius': '13px', 'box-shadow': '0 0 5px #3990B9'});

                // If the content of infowindow not exceed the set maximum height, then the gradient is removed.
                $('.iw-bottom-gradient').css({display: 'none'});

                // The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
                iwCloseBtn.mouseout(function () {
                    $(this).css({opacity: '1'});
                });
            });

            closeAllInfoWindows(infoWindows);

            infowindow.open(map, this);

            $('.map').find('.img-slider').slick({
                slidesToShow: 1,
                swipeToSlide: true,
                fade: true
            });
        });

        markers.push(marker);
    });
}

function closeAllInfoWindows(infoWindows) {
    for (var i = 0; i < infoWindows.length; i++) {
        infoWindows[i].close();
    }
}


$('#addPlace').on('click', function () {

    var elm = document.getElementById('destination-hotel');
    var type = parseInt($('#typeOfTrip').val(), 10);
    var lat = elm.getAttribute("data-location-lat");
    var lng = elm.getAttribute("data-location-lng");
    var point = new google.maps.LatLng(lat, lng);

    addPassportMarker(point, type);

});


var bounds = new google.maps.LatLngBounds();

//  Go through each...

for (var i = 0; i < markers.length; i++) {
    bounds.extend(markers[i].position);
}
//  Fit these bounds to the map
map.fitBounds(bounds);

/**/


function hometowngeocode(id) {

    var autocomleteField = document.getElementById(id);
    var home_autocomplete = new google.maps.places.Autocomplete(
        (autocomleteField),
        {types: ['geocode']});

    home_autocomplete.addListener('place_changed', function () {
        var place = home_autocomplete.getPlace();

        autocomleteField.setAttribute("data-location-lat", place.geometry.location.lat());
        autocomleteField.setAttribute("data-location-lng", place.geometry.location.lng());
    });
}

