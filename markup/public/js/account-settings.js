$(document).ready(function () {

    var telInput = $("#phone");

    // initialise plugin
    telInput.intlTelInput({
        utilsScript: "./js/intlTelInputUtils.js"
    });

    var reset = function () {
        telInput.removeClass("error");
    };

    // on blur: validate
    telInput.blur(function () {

        reset();

        if ($.trim(telInput.val())) {
            if (telInput.intlTelInput("isValidNumber")) {
                /*validMsg.removeClass("hide");*/
            } else {
                telInput.addClass("error");
            }
        }
    });

    // on keyup / change flag: reset
    telInput.on("keyup change", reset);

});