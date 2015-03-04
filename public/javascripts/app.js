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
    

});
