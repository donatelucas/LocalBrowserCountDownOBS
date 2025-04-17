async function countdown() {
    // Initialize timer display element
    const timerElement = document.getElementById("timer");
    
    let hours = 2; // Adjust hours
    let mins = 5; // Adjust minutes
    let secs = 0; // Adjust seconds

    while (hours > 0 || mins > 0 || secs > 0) {
        await wait(1000);

        if (secs > 0) {
            secs--;
        } else if (secs === 0 && mins > 0) {
            mins--;
            secs = 59;
        } else if (mins === 0 && hours > 0) {
            hours --;
            mins = 59;
        }

        // Display the time with leading zeros for seconds
        const secsDisplay = secs.toString().padStart(2, '0');
        const minsDisplay = mins.toString().padStart(2, '0');
        const hoursDisplay = hours.toString().padStart(2, '0');
        timerElement.innerHTML = `${hoursDisplay}:${minsDisplay}:${secsDisplay}`;

        // Display message when countdown reaches zero
        if (mins === 0 && secs === 0 && hours === 0) {
            timerElement.innerHTML = "Time is up!";
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