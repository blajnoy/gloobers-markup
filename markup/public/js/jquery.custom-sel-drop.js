function SelDrop(options) { //element, persons, personDefault

    var $element = options.element;
    var persons = options.persons || [];
    var personDefault = options.personsDefault || {
            'min': 1,
            'max': 20,
            'val': 10
        };
    var itemsCount = $element.find('.items-count');

    $element.after('<div class="persons-list-wrap"></div>');

    var $wrapper = $($element.next('.persons-list-wrap'));
    var action;

    var that = $(this);


    render();


    function addPerson(person) {
        persons.unshift(person);
        render();
    }

    function removePerson(index) {
        persons.splice(index, 1);
        render();
    }

    function render() {
        var personsList = persons.map(function (person) {
            return '<div class="item">' +
                '<i class="gl-ico gl-ico-user"></i>' +
                '<div class="number-spinner">' +
                '<a href="javascript:void(0);" class="btn btn-link data-down" data-dir="dwn"><i class="gl-ico gl-ico-minus"></i></a>' +
                '<input type="text" class="form-control text-center" value="' + (person.val || 1) + '" min="' + (person.min || 1) + '" max="' + (person.max || 100) + '">' +
                '<a href="javascript:void(0);" class="btn btn-link data-up" data-dir="up"><i class="gl-ico gl-ico-plus"></i></a>' +
                '</div>' +
                '<a class="remove-child-item" href="javascript:void(0);"><i class="gl-ico gl-ico-cart-delete"></i></a>' +
                '</div>';
        });

        personsList = personsList.join('');
        $wrapper.html(personsList);

        $wrapper.find('.item').each(function () {
            var input = $(this).find('.number-spinner input');
            var icoUser = $(this).find('.number-spinner').prev('.gl-ico-user');

            redrawIconRise(icoUser, parseInt(input.val()));
        });

        itemsCount.text(persons.length);

        that.trigger('change');

    }

    function stepIconRise(val) {
        var step = 1 + parseInt(val / 2) / 10;
        return step > 2 ? 2 : step;
    }

    function redrawIconRise(icon, val) {

        if (icon.length != 0) {
            icon.css({
                '-webkit-transform': 'scale(' + stepIconRise(val) + ')',
                '-moz-transform': 'scale(' + stepIconRise(val) + ')',
                '-ms-transform': 'scale(' + stepIconRise(val) + ')',
                '-o-transform': 'scale(' + stepIconRise(val) + ')',
                'transform': 'scale(' + stepIconRise(val) + ')'
            });
        }
    }

    function minMax(value, min, max) {
        if (value > max) {
            return max;
        }
        else if (value < min || isNaN(parseInt(value))) {
            return min;
        }

        return value;
    }

    /* bind events */
    $wrapper.on('mousedown', ".number-spinner .btn", function () {

            var btn = $(this);
            var input = btn.closest('.number-spinner').find('input');
            var icoUser = btn.closest('.number-spinner').prev('.gl-ico-user');

            btn.closest('.number-spinner').find('.btn').removeClass("disabled");

            if (btn.attr('data-dir') == 'up') {
                action = setInterval(function () {

                    if (input.attr('max') == undefined || parseInt(input.val()) < parseInt(input.attr('max'))) {
                        input.val(parseInt(input.val()) + 1);

                        redrawIconRise(icoUser, parseInt(input.val()));

                    } else {
                        btn.addClass("disabled");
                        clearInterval(action);
                    }
                }, 70);
            } else {
                action = setInterval(function () {
                    if (input.attr('min') == undefined || parseInt(input.val()) > parseInt(input.attr('min'))) {
                        input.val(parseInt(input.val()) - 1);

                        redrawIconRise(icoUser, parseInt(input.val()));

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

            var index = input.closest('.item').index();
            persons[index].val = parseInt(input.val());

            clearInterval(action);

            return false;
        });

    $wrapper.on('keypress', ".number-spinner input", function (e) {
            if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                //display error message
                return false;
            }
        })
        .on('change', ".number-spinner input", function () {
            var input = $(this);
            var icoUser = input.closest('.number-spinner').prev('.gl-ico-user');
            var value = parseInt(input.val());
            var min = parseInt(input.attr('min'));
            var max = parseInt(input.attr('max'));

            input.val(minMax(value, min, max));

            var index = input.closest('.item').index();
            persons[index].val = parseInt(input.val());

            redrawIconRise(icoUser, parseInt(input.val()));

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

            redrawIconRise(icoUser, parseInt(input.val()));
        });


    $wrapper.on('click', ".remove-child-item", function (e) {


        var elm = $(this).closest('.item');

        var index = parseInt(elm.index());

        removePerson(index);

        e.stopImmediatePropagation();

    });

    $element.on('click', ".btn-add", function () {
        addPerson(Object.assign({}, personDefault));
    });


    this.getPersons = function () {
        return persons;
    };


}
