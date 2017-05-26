function PersonCounter(options) { //element, persons

    var $element = options.element;
    var persons = options.persons || [];
    var personDefault = {
        'min': 1,
        'max': 20,
        'val': 10
    };

    $element.after( '<div class="children-wrap"></div>' );

    var $wrapper = $($element.next('.children-wrap'));

    function render() {
        var personsList = persons.map(function (person) {
            return '<div class="item">' +
                '<i class="gl-ico gl-ico-user"></i>' +
                '<div class="number-spinner">' +
                '<a href="javascript:void(0);" class="btn btn-link data-down" data-dir="dwn"><i class="gl-ico gl-ico-minus"></i></a>' +
                '<input type="text" class="form-control text-center" value="' + person.val + '" min="' + person.min + '" max="' + person.max + '">' +
                '<a href="javascript:void(0);" class="btn btn-link data-up" data-dir="up"><i class="gl-ico gl-ico-plus"></i></a>' +
                '</div>' +
                '<a class="remove-child-item" href="javascript:void(0);"><i class="gl-ico gl-ico-cart-delete"></i></a>' +
                '</div>';
        });

        personsList = personsList.join('');
        $wrapper.html( personsList );

        /* bind events */
        var action;

        $(document).on('mousedown', ".number-spinner .btn", function () {
                var btn = $(this);
                var input = btn.closest('.number-spinner').find('input');
                var icoUser = btn.closest('.number-spinner').prev('.gl-ico-user');

                btn.closest('.number-spinner').find('.btn').removeClass("disabled");

                if (btn.attr('data-dir') == 'up') {
                    action = setInterval(function () {
                        if (input.attr('max') == undefined || parseInt(input.val()) < parseInt(input.attr('max'))) {
                            input.val(parseInt(input.val()) + 1);

                            if (icoUser.length != 0) {
                                icoUser.css({
                                    '-webkit-transform': 'scale(' + stepIconRise(input.val()) + ')',
                                    '-moz-transform': 'scale(' + stepIconRise(input.val()) + ')',
                                    '-ms-transform': 'scale(' + stepIconRise(input.val()) + ')',
                                    '-o-transform': 'scale(' + stepIconRise(input.val()) + ')',
                                    'transform': 'scale(' + stepIconRise(input.val()) + ')'
                                });
                            }

                        } else {
                            btn.addClass("disabled");
                            clearInterval(action);
                        }
                    }, 70);
                } else {
                    action = setInterval(function () {
                        if (input.attr('min') == undefined || parseInt(input.val()) > parseInt(input.attr('min'))) {
                            input.val(parseInt(input.val()) - 1);

                            if (icoUser.length != 0) {
                                icoUser.css({
                                    '-webkit-transform': 'scale(' + stepIconRise(input.val()) + ')',
                                    '-moz-transform': 'scale(' + stepIconRise(input.val()) + ')',
                                    '-ms-transform': 'scale(' + stepIconRise(input.val()) + ')',
                                    '-o-transform': 'scale(' + stepIconRise(input.val()) + ')',
                                    'transform': 'scale(' + stepIconRise(input.val()) + ')'
                                });
                            }

                        } else {
                            btn.addClass("disabled");
                            clearInterval(action);
                        }
                    }, 70);
                }

                var index = input.closest('.item').index();
                persons[index].val = parseInt(input.val());

                return false;
            })
            .on('mouseup', ".number-spinner .btn", function () {
                var btn = $(this);
                var input = btn.closest('.number-spinner').find('input');

                clearInterval(action);

                var index = input.closest('.item').index();
                persons[index].val = parseInt(input.val());

                return false;
            });

        $(document).on('keyup', ".number-spinner input", function () {
                var input = $(this);
                var icoUser = input.closest('.number-spinner').prev('.gl-ico-user');
                var value = input.val();
                var min = input.attr('min');
                var max = input.attr('max');

                input.val(minMax(value, min, max));

                var index = input.closest('.item').index();
                persons[index].val = parseInt(input.val());

                if (icoUser.length != 0) {
                    icoUser.css({
                        '-webkit-transform': 'scale(' + stepIconRise(input.val()) + ')',
                        '-moz-transform': 'scale(' + stepIconRise(input.val()) + ')',
                        '-ms-transform': 'scale(' + stepIconRise(input.val()) + ')',
                        '-o-transform': 'scale(' + stepIconRise(input.val()) + ')',
                        'transform': 'scale(' + stepIconRise(input.val()) + ')'
                    });
                }

            })
            .on('blur', ".number-spinner input", function () {
                var input = $(this);
                var icoUser = input.closest('.number-spinner').prev('.gl-ico-user');

                if ($(this).val() == '') {
                    var min = input.attr('min');
                    input.val(min);
                }

                var index = input.closest('.item').index();
                persons[index].val = parseInt(input.val());

                if (icoUser.length != 0) {
                    icoUser.css({
                        '-webkit-transform': 'scale(' + stepIconRise(input.val()) + ')',
                        '-moz-transform': 'scale(' + stepIconRise(input.val()) + ')',
                        '-ms-transform': 'scale(' + stepIconRise(input.val()) + ')',
                        '-o-transform': 'scale(' + stepIconRise(input.val()) + ')',
                        'transform': 'scale(' + stepIconRise(input.val()) + ')'
                    });
                }
            });

        $(document).on('click', ".remove-child-item", function (e) {

            var elm = $(this).closest('.item');
            var index = parseInt(elm.index());

            removePerson(index);

            e.stopImmediatePropagation();

        });
    }

    function stepIconRise(val) {
        var step = 1 + parseInt(val / 2) / 10;
        return step > 2 ? 2 : step;
    }

    function minMax(value, min, max) {
        if (value == '')
            return value;
        else if (parseInt(value) < min || isNaN(parseInt(value)))
            return min;
        else if (parseInt(value) > max)
            return max;
        else return value;
    }

    function addPerson(person) {
        persons.push(person);
        render();
    }

    function removePerson(index) {
        persons.splice(index, 1);
        render();
    }

    $(document).on('click', ".btn-add", function () {
        addPerson(Object.assign({}, personDefault));
    });

    this.getPersons = function () {
        return persons;
    };

    render();

}








(function ($) {

    var settings = {

    };

    $.fn.personCounter = function(options){
        settings = $.extend(settings, options);

        this.each(function () {
            $(this).
        });

        return this;
    }

})(jQuery);
