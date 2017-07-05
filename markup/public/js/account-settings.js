$(document).ready(function () {

    var telInput = $("#phone"),
        errorMsg = $("#error-msg"),
        telInputWrap = telInput.parents(".form-group:first");

    // initialise plugin
    telInput.intlTelInput({
        utilsScript: "./js/intlTelInputUtils.js"
    });

    var reset = function () {
        telInput.removeClass("error");
        telInputWrap.removeClass("has-error");
        errorMsg.addClass("hide");
    };

    // on blur: validate
    telInput.blur(function () {

        reset();

        if (telInput.intlTelInput("isValidNumber")) {
            /*validMsg.removeClass("hide");*/
        } else {
            telInput.addClass("error");
            telInputWrap.addClass("has-error");
            errorMsg.removeClass("hide");
        }
    });

    // on keyup / change flag: reset
    telInput.on("keyup change", reset);

    function reValidate() {

        var $form = $("#form");

        $form.validator('validate');

        if (!telInput.intlTelInput("isValidNumber")) {
            telInput.addClass("error");
            telInputWrap.addClass("has-error");
            errorMsg.removeClass("hide");
        }
    }

    function isValidForm($form) {
        return $form.find(".has-error").length <= 0;
    }

    $('#btnSubmit').on('click', function () {

        reValidate();
        var isValid = isValidForm($("#form"));

        console.log(isValid);
    })
});