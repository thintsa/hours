$(document).ready(function () {
    // date picker for the birthday
    $('#birthday').fdatepicker({
        format: 'd.m.yyyy',
        weekStart: 1
    })

    // image uploader for the employee image
    $('#imageupload').ajaxfileupload({
        action: '/upload',
        onStart: function () {},
        onComplete: function (response) {
            // switch image to correct one
            var image = $('<img id="thumb" class="thumb" src="' + response.filename + '"/>');
            var imagecontainer = $('img#thumb');
            imagecontainer.replaceWith(image);
            // put the name in the form too
            $('#photo').val(response.filename);
        },
        submit_button: $('#uploadsubmit')
    });

    // submit automatically when the picture is selected
    $('#imageupload').change(function (event) {
        $('#uploadsubmit').click();
    });

    $('#addimage').submit(function (event) {
        event.preventDefault();
    });

    $('#newemployee_submit').on('click', function (event) {
        var user = {
            name: $('#name').val(),
            birthday: Date.parseString($('#birthday').val(), 'd.M.yyyy'),
            photo: $('#photo').val(),
            gender: $('input[name=gender]:checked').val()
        };

        if(user.name != "" && user.birthday != null && user.gender != null) {

            $.post('/employees', user, function (data, status) {
                console.log("success");
            });

            // clear forms
            $('#addimage')[0].reset();
            $('img#thumb').replaceWith($('<img id="thumb" class="thumb placeholder"></img>'));
            $('#newemployee')[0].reset();
        } else {
            if(user.name == "") {
                $('#namelabel').addClass('highlight');
            }
            if(user.birthday == null) {
                $('#birthdaylabel').addClass('highlight');
            }
            if(user.gender == null) {
                $('#genderlabel').addClass('highlight');
            }
        }

    });
});
