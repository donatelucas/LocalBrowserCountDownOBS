async function countdown() {
    // Initialize timer display element
    const timerElement = document.getElementById("timer");
    const timerTitle = document.getElementById("timer-title");
    const afterTimerMessage = document.getElementById("after-timer-message");
    
    let hours = 0; // Adjust hours
    let mins = 1; // Adjust minutes
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

        function updateTitle(timerTitle) {
            timerTitle.innerHTML = timerTitle;
        }

        /* 
            Display the time with leading zeros for seconds 
            I would like to rewrite these lines to maybe a one liner function 
            and variable declarations up top, couldn't find a working 
            method thus far. It's not that important for now.
        */
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

async function updateHTML() {
    // Get the input value
    const userInput = document.getElementById('textInput').value;

    // Update the innerHTML of resultDiv with the user input
    document.getElementById('resultDiv').innerHTML = `<strong>You entered:</strong> ${userInput}`;
}

// Add event listener for Enter key press
document.getElementById('textInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        updateHTML();
    }
});

function wait(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}

// Start the countdown when the script is loaded
countdown();