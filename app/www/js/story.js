$(function() {
    // Handling volunteer form submission
    $('#submit-answers').click(function() {
        var resp = validateStoryAnswers();
        if (resp.length) {
            $('#error').text(resp);
        } else {
            document.forms["story-answers"].submit();
        }
    });

    function validateStoryAnswers() {
        // Go through all the questions, check to see what type it is, then check if it has been answered
        var error = "";
        var i = 1;
        while (true) {
            // Attempt to retrieve question
            var answer = $(`input[name=question-${i}]`);
            if (answer.length) {
                if (answer.length == 1) {
                    // Free response
                    var text = answer.val().trim();
                    if (!text.length) {
                        error += "Error on question " + i + ". ";
                    }
                } else {
                    // Multiple choice
                    answer = answer.filter(':checked');
                    if (answer.length != 1) {
                        error += "Error on question " + i + ". ";
                    }
                }
            } else {
                // Try textarea
                var answer = $(`textarea[name=question-${i}]`);
                if (answer.length == 1) {
                    // Free response
                    var text = answer.val().trim();
                    if (!text.length) {
                        error += "Error on question " + i + ". ";
                    }
                } else {
                    break;
                }
            }
            i++;
        }
        return error;
    }
});
