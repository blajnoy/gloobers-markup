$(document).ready(function () {

    var action;

    $(document).on('mousedown', ".number-spinner .btn", function(){
        var btn = $(this);
        var input = btn.closest('.number-spinner').find('input');

        var icoUser = btn.closest('.number-spinner').prev('.gl-ico-user');


        btn.closest('.number-spinner').find('.btn').removeClass("disabled");



        if (btn.attr('data-dir') == 'up') {
            action = setInterval(function(){
                if ( input.attr('max') == undefined || parseInt(input.val()) < parseInt(input.attr('max')) ) {
                    input.val(parseInt(input.val())+1);

                    if (icoUser.length != 0) {
                        icoUser.css({
                            '-webkit-transform' : 'scale(' + stepIconRise(input.val()) + ')',
                            '-moz-transform'    : 'scale(' + stepIconRise(input.val()) + ')',
                            '-ms-transform'     : 'scale(' + stepIconRise(input.val()) + ')',
                            '-o-transform'      : 'scale(' + stepIconRise(input.val()) + ')',
                            'transform'         : 'scale(' + stepIconRise(input.val()) + ')'
                        });
                    }

                } else{
                    btn.addClass("disabled");
                    clearInterval(action);
                }
            }, 70);
        } else {
            action = setInterval(function(){
                if ( input.attr('min') == undefined || parseInt(input.val()) > parseInt(input.attr('min')) ) {
                    input.val(parseInt(input.val())-1);

                    if (icoUser.length != 0) {
                        icoUser.css({
                            '-webkit-transform' : 'scale(' + stepIconRise(input.val()) + ')',
                            '-moz-transform'    : 'scale(' + stepIconRise(input.val()) + ')',
                            '-ms-transform'     : 'scale(' + stepIconRise(input.val()) + ')',
                            '-o-transform'      : 'scale(' + stepIconRise(input.val()) + ')',
                            'transform'         : 'scale(' + stepIconRise(input.val()) + ')'
                        });
                    }

                } else{
                    btn.addClass("disabled");
                    clearInterval(action);
                }
            }, 70);
        }

        return false;
    })
    .on('mouseup', ".number-spinner .btn", function () {

        clearInterval(action);

        return false;
    });

    $(document).on('keyup', ".number-spinner input", function(){
        var input = $(this);
        var icoUser = input.closest('.number-spinner').prev('.gl-ico-user');
        var value = input.val();
        var min = input.attr('min');
        var max = input.attr('max');

        input.val(minmax(value, min, max));

        if (icoUser.length != 0) {
            icoUser.css({
                '-webkit-transform' : 'scale(' + stepIconRise(input.val()) + ')',
                '-moz-transform'    : 'scale(' + stepIconRise(input.val()) + ')',
                '-ms-transform'     : 'scale(' + stepIconRise(input.val()) + ')',
                '-o-transform'      : 'scale(' + stepIconRise(input.val()) + ')',
                'transform'         : 'scale(' + stepIconRise(input.val()) + ')'
            });
        }

    }).on('blur', ".number-spinner input", function(){
        var input = $(this);
        var icoUser = input.closest('.number-spinner').prev('.gl-ico-user');

        if($(this).val() == '') {


            var min = input.attr('min');

            input.val(min);
        }

        if (icoUser.length != 0) {
            icoUser.css({
                '-webkit-transform' : 'scale(' + stepIconRise(input.val()) + ')',
                '-moz-transform'    : 'scale(' + stepIconRise(input.val()) + ')',
                '-ms-transform'     : 'scale(' + stepIconRise(input.val()) + ')',
                '-o-transform'      : 'scale(' + stepIconRise(input.val()) + ')',
                'transform'         : 'scale(' + stepIconRise(input.val()) + ')'
            });
        }
    });


    $(document).on('click', ".remove-chid-item", function(e){

        var item = $(this).closest('.item');

        removeChildItem(item);
        e.stopImmediatePropagation();

    });



    $(document).on('click', ".person-row .btn-add", function(e){
        var parent = $(this).closest('.person-row').next('.children-wrap');

        addChildItem(parent, 1, 20)
    });


    function stepIconRise(val) {
        var step = 1 + parseInt(val/2)/10;
        return step > 2 ? 2 : step;
    }

    

    function minmax(value, min, max) {
        if(value == '')
            return value;
        else if(parseInt(value) < min || isNaN(parseInt(value)))
            return min;
        else if(parseInt(value) > max)
            return max;
        else return value;
    }

    function removeChildItem(item) {
        item.remove();
    }


    function addChildItem(parent, min, max) {

        var itemParent = parent;
        var min = min || 1;
        var max = max || 10;


        var tpl = '<div class="item">' +
                '<i class="gl-ico gl-ico-user"></i>' +
                '<div class="number-spinner">' +
                '<a href="javascript:void(0);" class="btn btn-link data-down" data-dir="dwn"><i class="gl-ico gl-ico-minus"></i></a>' +
                '<input type="text" class="form-control text-center" value="1" min="' + min + '" max="' + max + '">' +
                '<a href="javascript:void(0);" class="btn btn-link data-up" data-dir="up"><i class="gl-ico gl-ico-plus"></i></a>' +
                '</div>' +
                '<a class="btn-add remove-chid-item" href="javascript:void(0);"><i class="gl-ico gl-ico-cart-delete"></i></a>' +
                '</div>';

        itemParent.prepend($(tpl));
    }
});

