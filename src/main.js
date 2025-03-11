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
        
        validityTimeH2.innerText = `${dateComponents} | 11:59 PM`;
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
    
    // Add click event for "All passes" link
    const allPassesHeading = document.querySelector(".headertwo");
    if (allPassesHeading && allPassesHeading.textContent.trim() === "All passes") {
        allPassesHeading.addEventListener("click", function(e) {
            e.preventDefault();
            showNoPassesPopup();
        });
    }
    
    // Function to show the "No passes" popup
    function showNoPassesPopup() {
        // Create popup container
        const popupContainer = document.createElement("div");
        popupContainer.classList.add("no-passes-popup");
        
        // Create popup content
        popupContainer.innerHTML = `
            <div class="popup-content">
                <div class="popup-header">
                    <span class="close-popup">&times;</span>
                </div>
                <div class="popup-body">
                    <div class="popup-icon">
                        <i class="fa-solid fa-exclamation-circle"></i>
                    </div>
                    <h3>No active passes found</h3>
                    <p>You don't have any other active passes at the moment.</p>
                </div>
                <div class="popup-footer">
                    <button class="popup-button">OK</button>
                </div>
            </div>
        `;
        
        // Add popup styles
        const popupStyles = document.createElement("style");
        popupStyles.textContent = `
            .no-passes-popup {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            }
            
            .popup-content {
                background-color: white;
                width: 85%;
                max-width: 350px;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                animation: popup-scale 0.3s ease-out;
            }
            
            @keyframes popup-scale {
                0% { transform: scale(0.7); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
            }
            
            .popup-header {
                padding: 10px 15px;
                text-align: right;
            }
            
            .close-popup {
                font-size: 24px;
                font-weight: bold;
                cursor: pointer;
                color: #666;
            }
            
            .popup-body {
                padding: 10px 20px 20px;
                text-align: center;
            }
            
            .popup-icon {
                font-size: 40px;
                color: #d1412e;
                margin-bottom: 15px;
            }
            
            .popup-body h3 {
                margin-bottom: 10px;
                color: #333;
            }
            
            .popup-body p {
                color: #666;
            }
            
            .popup-footer {
                padding: 15px;
                text-align: center;
                background-color: #f8f8f8;
            }
            
            .popup-button {
                background-color: #d1412e;
                color: white;
                border: none;
                padding: 8px 30px;
                border-radius: 5px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.2s;
            }
            
            .popup-button:hover {
                background-color: #b63727;
            }
        `;
        
        // Add to document
        document.head.appendChild(popupStyles);
        document.body.appendChild(popupContainer);
        
        // Close popup events
        const closeButton = popupContainer.querySelector(".close-popup");
        const okButton = popupContainer.querySelector(".popup-button");
        
        closeButton.addEventListener("click", function() {
            document.body.removeChild(popupContainer);
        });
        
        okButton.addEventListener("click", function() {
            document.body.removeChild(popupContainer);
        });
    }
});