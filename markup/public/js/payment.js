$(document).ready(function () {


    /*$('#payInGloobiesModal').modal({
        backdrop: 'static',
        show: true
    });*/

    /*$('#availableError').modal({
        show: true
    });*/

    $('#paymentModal').modal({
        show: true
    });

    $('.input-tc').on('click', function () {
        $(this).find('.input-tc-val').focus();
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

    if ($("#payment-aside").length != 0) {
        $("#payment-aside").sticky({
            topSpacing: 25,
            bottomSpacing: $('.footer').outerHeight() + 30
        });
    }

});