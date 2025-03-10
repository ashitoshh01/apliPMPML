
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

document.addEventListener("DOMContentLoaded", function () {
    const payButton = document.querySelector(".pay-button a");

    payButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default link action

        // Get Current Date & Time
        let now = new Date();
        let formattedDate = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        let formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

        // Get Selected Pass Type & Fare
        let selectedPass = document.querySelector('input[name="pass"]:checked');
        let passType = selectedPass ? selectedPass.nextElementSibling.innerText.trim() : "Not Selected";

        // Extract Rupees from the Pass Type Text
        let fareMatch = passType.match(/₹\d+/);
        let fare = fareMatch ? fareMatch[0] : "₹0";

        // Get Aadhar/PAN Last 4 Digits
        let aadharNo = document.getElementById("digit-input").value.trim();
        if (aadharNo.length !== 4 || isNaN(aadharNo)) {
            alert("Please enter exactly 4 numeric digits for Aadhar/PAN.");
            return;
        }

        // Store Data in LocalStorage
        localStorage.setItem("date", formattedDate);
        localStorage.setItem("time", formattedTime);
        localStorage.setItem("passType", passType);
        localStorage.setItem("fare", fare);
        localStorage.setItem("aadharNo", aadharNo);

        // Redirect to main.html
        window.location.href = "main.html";
    });
});


document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        // Retrieve Data from LocalStorage
        let date = localStorage.getItem("date") || "N/A";
        let time = localStorage.getItem("time") || "N/A";
        let passType = localStorage.getItem("passType") || "N/A";
        let fare = localStorage.getItem("fare") || "₹0";
        let aadharNo = localStorage.getItem("aadharNo") || "0000";

        // Debugging: Check if data is retrieved correctly
        console.log("Retrieved Data:", { date, time, passType, fare, aadharNo });

        // Update `main.html` dynamically
        document.querySelector(".passtype-H2").innerText = passType;
        document.querySelector(".pass-price h2").innerText = fare;
        document.querySelector(".passtype-2-H2").innerText = `${date} | ${time}`;
        document.querySelector(".pass-Id h2").innerText = aadharNo;

    }, 300); // Small delay to ensure elements are available
});
