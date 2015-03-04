$(document).ready(function () {
    // date picker for the birthday
    //XXX: it's not optimal for touch devices
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

    // submit image form automatically when the picture is selected
    $('#imageupload').change(function (event) {
        $('#uploadsubmit').click();
    });
    $('#addimage').submit(function (event) {
        event.preventDefault();
    });

    // create new employee
    $('#newemployee_submit').on('click', function (event) {
        var user = {
            name: $('#name').val(),
            birthday: Date.parseString($('#birthday').val(), 'd.M.yyyy'),
            photo: $('#photo').val(),
            gender: $('input[name=gender]:checked').val()
        };

        // crude check for mandatory fields
        if(user.name != "" && user.birthday != null && user.gender != null) {

            $.post('/employees', user, function (data, status) {
                console.log("success");
            });

            // clear forms
            $('#addimage')[0].reset();
            $('img#thumb').replaceWith($('<img id="thumb" class="thumb placeholder"></img>'));
            $('#newemployee')[0].reset();

            //XXX: the new one should just be inserted to dom, but I'll just reload the page
            location.reload();

        } else { // highlight missing fields
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

    // create hours
    $(document).on('click', '#hours_submit', function (event) {
        var hours = {
            employee_id: $('#employee_id').val(),
            "date": Date.parseString($('#date').val(), 'd.M.yyyy'),
            category: $('#category').val(),
            hours: $('#hours').val()
        };

        // crude check for mandatory fields
        if(hours.category != "" && hours["date"] != undefined && hours.hours != null) {

            $.post('/hours', hours, function (data, status) {
                console.log("success");
            });

            // clear forms
            $('#hours_input')[0].reset();

            //XXX: the new one should just be inserted to dom, but I'll just reload the page
            location.reload();

        } else { // highlight missing fields
            if(hours.category == "") {
                $('#namelabel').addClass('highlight');
            }
            if(hours.date == null) {
                $('#birthdaylabel').addClass('highlight');
            }
            if(hours.gender == hours) {
                $('#genderlabel').addClass('highlight');
            }
         }
    });

    // open employees hours
    $(document).on('click', 'a.openhours', function(event){
        employee_id = event.target.id;

        // check if table is already open and remove it
        if($(event.target).hasClass('opened')) {
            $(event.target).removeClass('opened');
            $('.hourstable').remove(); //XXX: yeah, it removes all tables
            return;
        }

        $.getJSON('/employees/' + employee_id + '/hours?' + new Date().getTime(), function(data, status) {
            var hours = [];
            hours.push('<div class="small-12 columns"><form id="hours_input"><table><thead><tr><th width="20%">Date</th><th width="40%">Category</th><th width="20%">Hours</th><th width="10%"></th></tr></thead><tbody>');

            // new hour input
            // today could be the default, perhaps
            hours.push('<tr><td><input type="text" id="date" name="date" placeholder="18.3.1980" /></td><td><select id="category" name="category"><option value="Project work">Project work</option><option value="Maintenance">Maintenance</option><option value="Lunch">Lunch</option><option value="Overtime">Overtime</option></select></td><td><input id="hours" name="hours" type="number" /></td><td><input type="button" class="button" id="hours_submit" href="#" value="Add" /><input type="hidden" id="employee_id" name="employee_id" value="' + employee_id + '" /></td></tr>');

            $.each(data, function(key, val) {
                var date = new Date(val.date);
                hours.push('<tr><td>' + date.format('d.M.yyyy') + '</td><td>' + val.category + '</td><td>' + val.hours + '</td><td></td></tr>');
            });

            hours.push('</tbody></table></form></div>');

            $('<div/>', {
                'class': 'row hourstable',
                html: hours.join('')
            }).appendTo($(event.target).parent().parent());

            $(event.target).addClass('opened');

            // add datepicker to the date
            $('#date').fdatepicker({
                format: 'd.m.yyyy',
                weekStart: 1
            })
        });

        event.preventDefault();
    });

    function load_employees() {
        $.getJSON('/employees', function(data, status) {
            var employees = [];
            $.each(data, function(key, val) {
                var gender = val.gender ? 'Female' : 'Male';
                var birthday = new Date(val.birthday);

                employees.push('<div class="small-12 columns employee"><div class="small-3 columns"><img class="thumb" src="' + val.photo + '"></img></div><div class="small-6 columns"><div class="name">' + val.name + '</div><div class="gender">' + gender + '</div><div class="birthday">' + birthday.format('d.M.yyyy') + '</div></div><div class="small-2 columns"><a href="#" id="' + val._id + '" class="button round openhours">&#9660;</a></div></div>');
            });
            $('<div/>', {
                'class': 'row',
                html: employees.join('')
            }).appendTo('#employees');
        });
    }

    load_employees();
});
