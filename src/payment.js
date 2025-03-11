document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const pinDigits = document.querySelectorAll('.pin-digit');
    const keys = document.querySelectorAll('.key');
    const successSound = document.getElementById('success-sound');
    
    // Display the amount from local storage if available
    const storedFare = localStorage.getItem("fare") || "₹20.0";
    const fareAmount = storedFare.replace('₹', '').trim();
    document.getElementById('display-amount').textContent = fareAmount;

    // Store entered PIN
    let currentPin = '';
    const correctPin = '1245';

    // Add click event to all keys
    keys.forEach(key => {
        key.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            
            if (value === 'clear') {
                // Clear the last digit
                if (currentPin.length > 0) {
                    currentPin = currentPin.slice(0, -1);
                    updatePinDisplay();
                }
            } else if (value === 'confirm') {
                // Check if the PIN is correct
                if (currentPin === correctPin) {
                    // Play success sound
                    successSound.play();
                    
                    // Visual feedback
                    document.querySelector('.confirm').style.backgroundColor = '#4CAF50';
                    
                    // Redirect to main.html after a short delay
                    setTimeout(() => {
                        window.location.href = 'main.html';
                    }, 1000);
                } else {
                    // Show error for incorrect PIN
                    shakePinInput();
                    currentPin = '';
                    updatePinDisplay();
                }
            } else {
                // Add digit if we have less than 4
                if (currentPin.length < 4) {
                    currentPin += value;
                    updatePinDisplay();
                }
            }
        });
    });

    // Update the visual PIN display
    function updatePinDisplay() {
        for (let i = 0; i < pinDigits.length; i++) {
            if (i < currentPin.length) {
                pinDigits[i].classList.add('filled');
            } else {
                pinDigits[i].classList.remove('filled');
            }
        }
    }

    // Shake animation for incorrect PIN
    function shakePinInput() {
        const pinInput = document.querySelector('.pin-input');
        pinInput.classList.add('shake');
        setTimeout(() => {
            pinInput.classList.remove('shake');
        }, 500);
    }

    // Add shake animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .shake {
            animation: shake 0.5s;
        }
    `;
    document.head.appendChild(style);
});