
// 5 min timer
let timeLeft = 5 * 60;

function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    document.getElementById("timer").innerText =
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

let countdown = setInterval(() => {
    updateTimerDisplay();
    if (timeLeft <= 0) {
        clearInterval(countdown);
        document.getElementById("timer").innerText = "Time's Up!";
        window.location.href = "timesUp.html";
    }
    timeLeft--;
}, 1000);

updateTimerDisplay();


// Dinamic Timing
document.addEventListener("DOMContentLoaded", function () {
    function updateDateTime() {
        let now = new Date();

        let options = { day: '2-digit', month: 'short', year: 'numeric' };
        let formattedDate = now.toLocaleDateString('en-GB', options);
        let formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

        document.getElementById("current-datetime").innerText = `${formattedDate} | ${formattedTime}`;
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);
});

function formatInput(input) {
    input.value = input.value.replace(/\D/g, '').slice(0, 4); // Remove non-numeric characters & limit to 4
}
