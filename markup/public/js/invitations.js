$(document).ready(function () {

    var $invitationsModal = $('#invitationsModal');

    var inviteList = [
        {
            name: 'Natali Coltrain',
            email: 'Lorem@gmail.com',
            image: 'images/photo06.jpg'
        },
        {
            name: 'Natali Coltrain1',
            email: 'Lorem@gmail.com',
            image: 'images/photo06.jpg'
        },{
            name: 'Natali Coltrain2',
            email: 'Lorem@gmail.com',
            image: 'images/photo06.jpg'
        },{
            name: 'Natali Coltrain3',
            email: 'Lorem@gmail.com',
            image: 'images/photo06.jpg'
        },{
            name: 'Natali Coltrain3',
            email: 'Lorem@gmail.com',
            image: 'images/photo06.jpg'
        }
    ];

    $invitationsModal.on('show.bs.modal', function () {

        var $inviteList = initInviteList(inviteList);

        $('#invitesTribeList').html($inviteList);
        $('#foundPeoplesNum, .select-all-num').html($inviteList.length);

        $('#invitesTribeList').find('input[type=checkbox]').on('change', function () {
            var choisenPersons = $('#invitesTribeList').find('input[type=checkbox]:checked').length;
            changeChosenPersonsCounter(choisenPersons);
        });

        $('#chkToggleAll').on('click', function () {
            if(!$(this).data('checkedAll')){
                $('#invitesTribeList').find('input[type=checkbox]').prop('checked', true);
                $(this).data('checkedAll', true).next('label').find('.toggle-all-txt').html('Deselect all');
            } else {
                $('#invitesTribeList').find('input[type=checkbox]').prop('checked', false);
                $(this).data('checkedAll', false).next('label').find('.toggle-all-txt').html('Select all');
            }

            $('#invitesTribeList').find('input[type=checkbox]').trigger('change');
        });

    });

    var tpl = '<li>' +
            '<div class="checkbox checkbox-inline">'+
            '<input id="inviteChk{index}" type="checkbox" name="conditions">'+
            '<label for="inviteChk{index}"></label>'+
            '</div>'+
            '<img src="{image}" alt="" width="60" height="60">'+
            '<div class="text-h">'+
            '<strong class="name">{name}</strong>'+
            '<p>{email}</p>'+
            '</div>'+
            '</li>';

    function initInviteList(list) {
        return list.map(function(person, index){
            var template = tpl.replace(/{index}/g, index).replace(/{([^}]+)}/g, function(str, p1){
                return person[p1]
            });
            return $(template)
        })
    }

    function changeChosenPersonsCounter(count) {
        var $counter = $('.selected-num');
        $counter.html("(" + count + ")");
    }

});