async function countdown() {
    // Initialize timer display element
    const timerElement = document.getElementById("timer");
    
    let mins = 2; // Change this number to adjust minutes
    let secs = 1; // Change this number to adjust seconds

    while (mins > 0 || secs > 0) {
        await wait(1000);

        if (secs > 0) {
            secs--;
        } else if (secs === 0 && mins > 0) {
            mins--;
            secs = 59;
        }

        // Display the time with leading zeros for seconds
        const displaySecs = secs.toString().padStart(2, '0');
        timerElement.innerHTML = `${mins}:${displaySecs}`;

        // Show "soon" when countdown reaches zero
        if (mins === 0 && secs === 0) {
            timerElement.innerHTML = "soon";
        }
    }
}

function wait(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}

// Start the countdown when the script is loaded
countdown();