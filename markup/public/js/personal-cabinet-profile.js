function initSelDrop(drop) {

    var $list = $(drop.drop).find('.drop-list');
    var $elmTxt = $(drop.target).find('.sel-text');

    $list.on('click', 'a', function (e) {
        e.stopImmediatePropagation();
        e.preventDefault();

        $elmTxt.text($(this).text());
        $(drop.target).data('chosen-value', $(this).parent().data('value'));


        $list.find('li').removeClass('active');
        $(this).parent().addClass('active');

        drop.close();
    });

    return false;
}

function markerDragHandleEvent(event) {

    var iconContent = $(this)[0].labelContent;

    switch (iconContent) {
        case '<i class="gl-ico gl-ico-home-user"></i>':
            type = 1;
            break;
        case '<i class="gl-ico gl-ico-home"></i>':
            type = 2;
            break;
        case '<i class="gl-ico gl-ico-briefcase"></i>':
            type = 3;
            break;
        case '<i class="gl-ico gl-ico-heart"></i>':
            type = 4;
            break;
        case '<i class="gl-ico gl-ico-users-group"></i>':
            type = 5;
            break;
        case '<i class="gl-ico gl-ico-school-book-bag"></i>':
            type = 6;
            break;
        case '<i class="gl-ico gl-ico-users"></i>':
            type = 7;
            break;
        case '<i class="gl-ico gl-ico-family"></i>':
            type = 8;
            break;
        default:
            console.log("no type for this icon")
    }

    console.log('type of marker: ' + type);
    console.log('lat: ' + event.latLng.lat());
    console.log('lng: ' + event.latLng.lng());
    console.log('----------------------------');
}


$(document).ready(function () {


    $('#addPlace').on('click', function () {

        var elm = document.getElementById('destination-hotel');
        var type = parseInt($('#typeOfTrip').data('chosen-value'), 10);
        var lat = elm.getAttribute("data-location-lat");
        var lng = elm.getAttribute("data-location-lng");
        var point = new google.maps.LatLng(lat, lng);

        addPassportMarker(point, type);
    });


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
            labelInBackground: true,
            draggable: true,
            raiseOnDrag: false
        });

        //marker.addListener('drag', markerDragHandleEvent);
        marker.addListener('dragend', markerDragHandleEvent);

        var latLng = marker.getPosition();
        map.setCenter(location);

        return marker;

    }



    var telInput = $("#phone")/*,
     errorMsg = $("#error-msg"),
     validMsg = $("#valid-msg")*/;

    // initialise plugin
    telInput.intlTelInput({
        utilsScript: "./js/intlTelInputUtils.js"
    });

    var reset = function () {
        telInput.removeClass("error");
        /*errorMsg.addClass("hide");
         validMsg.addClass("hide");*/
    };

    // on blur: validate
    telInput.blur(function () {

        reset();

        if ($.trim(telInput.val())) {
            if (telInput.intlTelInput("isValidNumber")) {
                /*validMsg.removeClass("hide");*/
            } else {
                telInput.addClass("error");
                /*errorMsg.removeClass("hide");*/
            }
        }
    });

    // on keyup / change flag: reset
    telInput.on("keyup change", reset);

    /*croperSize.on("slideStop", function(sliderValue) {
        $('#crop-avatar').cropper('zoom', 0.1)
    });

    console.log(CropAvatar)*/

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


