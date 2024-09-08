// script.js
function storeAnswers() {
    let form = document.getElementById('phq-9');
    let answers = form.querySelectorAll('input[type="radio"]:checked');

    answers.forEach(answer => {
        localStorage.setItem(answer.name, answer.value);
    });

    return true; // Allow form submission to go to the next page
}

function calculateFinalScore() {
    let form = document.getElementById('surveyForm2');
    let scoreArray = [];

    // Question 1: Calculate sleep duration (Q5 - Q2)
    let sleepStart = form.querySelector('input[name="q1"]').value;
    let sleepEnd = form.querySelector('input[name="q5"]').value;
    let sleepStartDate = new Date(`1970-01-01T${sleepStart}:00`);
    let sleepEndDate = new Date(`1970-01-01T${sleepEnd}:00`);
    let sleepDuration = (sleepEndDate - sleepStartDate) / (1000 * 60 * 60);
    if (sleepDuration < 0) sleepDuration += 24; // Handle overnight sleep

    if (sleepDuration >= 7 && sleepDuration <= 9) scoreArray.push(0);
    else if (sleepDuration == 6 || sleepDuration == 10) scoreArray.push(1);
    else scoreArray.push(2);

    // Question 2: Bedtime (Q2)
    let bedtime = form.querySelector('input[name="q2"]').value;
    let bedtimeHour = new Date(`1970-01-01T${bedtime}:00`).getHours();

    if (bedtimeHour < 23) scoreArray.push(0);
    else if (bedtimeHour === 0) scoreArray.push(1);
    else scoreArray.push(2);

    // Question 5: Wake up time (Q5)
    let wakeupTime = form.querySelector('input[name="q5"]').value;
    let wakeupHour = new Date(`1970-01-01T${wakeupTime}:00`).getHours();

    if (wakeupHour <= 7) scoreArray.push(0);
    else if (wakeupHour == 8) scoreArray.push(1);
    else scoreArray.push(2);

    // Question 6: Get up time (Q6)
    let getUpTime = form.querySelector('input[name="q6"]').value;
    let getUpHour = new Date(`1970-01-01T${getUpTime}:00`).getHours();

    if (getUpHour <= 8) scoreArray.push(0);
    else if (getUpHour == 9) scoreArray.push(1);
    else scoreArray.push(2);

    // Question 4: Number of wakeups (Q4)
    let wakeupCount = form.querySelector('input[name="q4"]').value;
    if (wakeupCount == 0 || wakeupCount == 1) scoreArray.push(0);
    else if (wakeupCount == 2 || wakeupCount == 3) scoreArray.push(1);
    else scoreArray.push(2);

    // Question 3: Time to fall asleep (Q3)
    let fallAsleepTime = form.querySelector('input[name="q3"]').value;
    if (fallAsleepTime <= 10) scoreArray.push(0);
    else if (fallAsleepTime > 10 && fallAsleepTime < 45) scoreArray.push(1);
    else scoreArray.push(2);

    // Question 7: Sleep quality rating (Q7)
    let sleepQuality = form.querySelector('input[name="q7"]').value;
    if (sleepQuality >= 8 && sleepQuality <= 10) scoreArray.push(0);
    else if (sleepQuality >= 5 && sleepQuality <= 7) scoreArray.push(1);
    else scoreArray.push(2);

    // Compute final score for page 2 using majority voting
    let finalScorePage2 = scoreArray.sort((a,b) =>
        scoreArray.filter(v => v===a).length - scoreArray.filter(v => v===b).length
    ).pop();

    // Retrieve stored answers from the first page
    let finalScorePage1 = 0;
    for (let i = 1; i <= 9; i++) {
        let qValue = localStorage.getItem(`q${i}`);
        if (qValue) finalScorePage1 += parseInt(qValue);
    }

    // Clear the stored answers
    localStorage.clear();

    // Redirect to the result page with the scores
    window.location.href = `result.html?scorePage1=${finalScorePage1}&scorePage2=${finalScorePage2}`;

    return false; // Prevent form submission to avoid page reload
}
