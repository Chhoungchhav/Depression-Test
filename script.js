// script.js
function storeAnswers() {
    let form = document.getElementById('surveyForm1');
    let answers = form.querySelectorAll('input[type="radio"]:checked');

    answers.forEach(answer => {
        localStorage.setItem(answer.name, answer.value);
    });

    return true; // Allow form submission to go to the next page
}

function calculateFinalScore() {
    let form = document.getElementById('surveyForm2');
    let score = 0;

    // Retrieve stored answers from the first page
    let q1Value = localStorage.getItem('q1');
    if (q1Value) {
        score += parseInt(q1Value);
    }

    // Get the numeric value for hours of exercise per week
    let q2Value = form.querySelector('input[name="q2"]').value;
    if (q2Value) {
        score += parseInt(q2Value); // Adjust scoring logic as needed
    }

    // Get the time value for when the user goes to bed
    let q3Value = form.querySelector('input[name="q3"]').value;
    if (q3Value) {
        // Convert time to a score (example: just taking hours for simplicity)
        let timeParts = q3Value.split(':');
        let hours = parseInt(timeParts[0]);
        score += hours; // Adjust scoring logic as needed
    }

    // Clear the stored answers
    localStorage.clear();

    // Redirect to the result page with the score
    window.location.href = `result.html?score=${score}`;

    return false; // Prevent form submission to avoid page reload
}
