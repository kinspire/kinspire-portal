var selected = null;

$('.signup-avatar').click(function() {
    $(this).next().prop("checked", true);
    $(this).addClass('signup-avatar-selected');

    if (selected && selected != this) {
        $(selected).removeClass('signup-avatar-selected');
    }
    selected = this;
});

// Signup logic
$('.signup-button').click(function() {
    var form = document.forms['signup'];

    var firstname = form["firstname"];
    var lastname = form["lastname"];
    var birthday = form["birthday"];
    var classlevel = form["class-level"];
    var avatar = form["avatar"];

    var errors = 0;
    [firstname, lastname, birthday, classlevel, avatar].forEach(function(element) {
        var value = "" + (element.value ? element.value : "");
        if (value.trim().length == 0) {
            errors++;
            $(element).addClass('error');
        } else{
            $(element).removeClass('error');
        }
    });

    if (errors === 0) {
        // Sign up!
        form.submit();
    }
});
