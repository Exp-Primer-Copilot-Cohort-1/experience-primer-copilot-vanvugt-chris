function skillsMember() {
    $('#skillsMember').on('click', function () {
        var member = $(this).data('member');
        $.ajax({
            url: '/skills/' + member,
            method: 'GET',
            success: function (result) {
                $('#skillsMemberContent').html(result);
            }
        });
    });
}