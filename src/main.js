// Script for main.html
document.addEventListener("DOMContentLoaded", function () {
    // Retrieve Data from LocalStorage
    let date = localStorage.getItem("date") || "N/A";
    let time = localStorage.getItem("time") || "N/A";
    let passType = localStorage.getItem("passType") || "N/A";
    let fare = localStorage.getItem("fare") || "₹0";
    let aadharNo = localStorage.getItem("aadharNo") || "0000";

    // Debugging: Check if data is retrieved correctly
    console.log("Retrieved Data:", { date, time, passType, fare, aadharNo });

    // Extract pass type without the price (remove the price part)
    let cleanPassType = passType.replace(/\s*-\s*₹\d+(\.\d+)?|\s*₹\d+(\.\d+)?/g, "").trim();
    
    // Update `main.html` dynamically
    const passtypeH2 = document.querySelector(".passtype-H2");
    if (passtypeH2) passtypeH2.innerText = cleanPassType;
    
    const passPriceH2 = document.querySelector(".pass-price h2");
    if (passPriceH2) passPriceH2.innerText = fare;
    
    const bookingTimeH2 = document.querySelector(".pass-type-2 .passtype-2-H2");
    if (bookingTimeH2) bookingTimeH2.innerText = `${date} | ${time}`;
    
    const passIdH2 = document.querySelector(".pass-Id h2");
    if (passIdH2) passIdH2.innerText = aadharNo;
    
    // Update Validity Time to match the booking date with 11:59 PM time
    const validityTimeH2 = document.querySelectorAll(".pass-info-onto.pass-type-2 .passtype-2-H2")[1];
    if (validityTimeH2) {
        // Extract just the date part from the stored date (assuming format like "08 Mar, 2025")
        let dateComponents = date.split(',')[0].trim(); // Gets "08 Mar"
        
        // If date contains year, extract just the day and month
        if (dateComponents.includes(" ")) {
            // Format is already day month (like "08 Mar")
        } else {
            // Try to extract from full date
            const matches = date.match(/(\d{2}\s+[a-zA-Z]{3})/);
            if (matches && matches[1]) {
                dateComponents = matches[1];
            }
        }
        
        // Extract year from the full date if available (assuming format like "08 Mar, 2025")
        let year = "";
        const yearMatch = date.match(/\d{2,4}$/);
        if (yearMatch) {
            year = yearMatch[0];
            // If it's a 4-digit year, take last 2 digits
            if (year.length === 4) {
                year = year.substring(2);
            }
        }
        
        validityTimeH2.innerText = `${dateComponents} ${year} | 11:59 PM`;
    }
    
    // Generate dynamic pass code in format "YYMMDD(time:sec)1N3QEJ9"
    const passCodeElement = document.querySelector(".pass-code .code");
    if (passCodeElement) {
        // Get current date and time for the code
        const now = new Date();
        
        // Format the date part as YYMMDD
        const yy = now.getFullYear().toString().slice(-2);
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const dd = String(now.getDate()).padStart(2, '0');
        
        // Get seconds for the time part
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        // Add fixed "1N3QEJ9" as the random part
        const randomPart = "1N3QEJ9";
        
        const passCode = `${yy}${mm}${dd}${seconds}${randomPart}`;
        
        passCodeElement.innerText = passCode;
    }
});