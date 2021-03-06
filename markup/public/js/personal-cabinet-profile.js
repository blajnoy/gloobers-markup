function initSelDrop(drop) {

    var $list = $(drop.drop).find('.drop-list');
    var $elmTxt = $(drop.target).find('.sel-text');

    $list.on('click', 'a', function (e) {
        e.stopImmediatePropagation();
        e.preventDefault();

        $elmTxt.text($(this).text());
        $(drop.target).data('chosen-value', $(this).parent().data('value'));

        drop.close();
    });

    return false;
}

function returnDropById(dropId) {
    return drops.filter(function(obj, elm) {
        return elm.target.id == dropId;
    });
}

function hidePassportTypeItem(typeNum, dropId) {
    var $drop = $(returnDropById(dropId)[0].drop);
    var $target = $(returnDropById(dropId)[0].target);
    var $elmTxt = $target.find('.sel-text');
    var $item = $drop.find("li[data-value='" + typeNum + "']");

    $target.data('chosenValue', '');
    $elmTxt.text($target.data('defaultText'));
    $item.addClass('hide');
}

function showPassportTypeItem(typeNum, dropId) {
    var $drop = $(returnDropById(dropId)[0].drop);
    var $target = $(returnDropById(dropId)[0].target);
    var $elmTxt = $target.find('.sel-text');
    var $item = $drop.find("li[data-value='" + typeNum + "']");

    $target.data('chosenValue', '');
    $elmTxt.text($target.data('defaultText'));
    $item.removeClass('hide');
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
    console.log('id: ' + this.get("id"));
    console.log('----------------------------');
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function removePoint(elm) {
    var index = returnMarkerIndexById( $(elm).data('markerId') );
    var type = markers[index].markerType;

    markers[index].setMap(null);
    showPassportTypeItem(type, 'typeOfTrip');
}

function returnMarkerIndexById(markerId) {
    return markers.findIndex(function(marker, index) {
        return marker.id === markerId;
    });
}

function addPassportMarker(location, type) {
    var infowindow = new google.maps.InfoWindow({
        content: "holding ..."
    });
    infoWindows.push(infowindow);

    var markerIcon = {
        url: 'images/marker.svg',
        scaledSize: new google.maps.Size(30, 40),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(15, 40)
    };

    var icon,
        markerId = getRandomInt(1, 100)+'';

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

    var type = type+'';

    //debugger;
    var marker = new MarkerWithLabel({
        map: map,
        animation: false, //google.maps.Animation.DROP,
        position: location,
        icon: markerIcon,
        labelContent: icon,
        labelAnchor: new google.maps.Point(offsetAnchorX, 34),
        labelClass: "custom-marker-icon",
        labelInBackground: true,
        //draggable: true,
        raiseOnDrag: false,
        title: 'title',
        id: markerId,
        markerType: type
    });

    var elm = document.getElementById('destination-hotel');
    var addr = elm.getAttribute("data-address");

    var contentString = '<div class="passport-marker-info">' +
        '<div>' + addr + '</div>' +
        '<div class="text-right"><a class="lnk-remove-point" href="javascript: void(0)" data-marker-id=' + marker.id + ' onclick="removePoint(this)">remove point</a></div>' +
        '</div>';


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
                width: '15px',
                height: '15px',
                left: '-7px'
            });
            iwBackground.children(':nth-child(3)').children(':nth-child(2)').css({
                width: '15px',
                height: '15px',
                left: '7px'
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

            iwBackground.parent().css({
                'margin': '33px 0 0 1px',
                'transition': 'all .2s cubic-bezier(0, 0, 0.265, 1.55)'
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

    });

    //marker.addListener('drag', markerDragHandleEvent);
    //marker.addListener('dragend', markerDragHandleEvent);


    var latLng = marker.getPosition();

    map.setCenter(location);
    markers.push(marker);

    hidePassportTypeItem(type, 'typeOfTrip');


    return marker;
}

$(document).ready(function () {

    $('#addPlace').on('click', function () {
        var elm = document.getElementById('destination-hotel');
        var type = parseInt($('#typeOfTrip').data('chosen-value'), 10);
        var lat = elm.getAttribute("data-location-lat");
        var lng = elm.getAttribute("data-location-lng");
        var point = new google.maps.LatLng(lat, lng);

        addPassportMarker(point, type, contentString);
    });

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


