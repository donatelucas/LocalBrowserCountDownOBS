// Initialize application object
    const app = {
        timerElement: document.getElementById("timer"),
        titleElement: document.getElementById("timer-title"),
        afterTimerMessageElement: document.getElementById("after-timer-message"),
        
        textInputElement: document.getElementById('textInput'),
        resultDivElement: document.getElementById('resultDiv'),

        hoursInput: document.getElementById('hours'),
        minutesInput: document.getElementById('minutes'),
        titleInput: document.getElementById('title'),
        afterMessageInput: document.getElementById('after_message'),

        // Initialize countdown variables
        get hours() {
            return parseInt(app.hoursInput.value) || 0;
        },
        
        get mins() {
            return parseInt(app.minutesInput.value) || 1;
        },

        set hours(value) {
            app.hoursInput.value = value;
        },
        
        set mins(value) {
            app.minutesInput.value = value;
        }
    };

    // Function to update values
    function updateValues() {
        app.titleElement.textContent = app.titleInput.value;
        app.afterTimerMessageElement.textContent = app.afterMessageInput.value;
        // Update countdown timer with new values
        startCountdown();
    }

    function setResult(text) {
        app.resultDivElement.innerHTML = text;
    }

    // Countdown functionality
    let countdownInterval;
    
    function startCountdown() {
        let totalMinutes = app.mins + (app.hours * 60);
        let seconds = totalMinutes * 60;

        let updateClock = () => {
            const minutesLeft = Math.floor(seconds / 60);
            const secondsLeft = seconds % 60;
            
            const display = ` ${String(minutesLeft).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')} `;
            app.timerElement.textContent = display;

            if (seconds <= 1) {
                clearInterval(countdownInterval);
                app.timerElement.textContent = 'Countdown completed!';
                setResult(`Final message: ${app.titleInput.value}`);
                setTimeout(() => {
                    app.timerElement.textContent = '';
                    setResult('');
                }, 2000);
            }

            seconds--;
        };

        updateClock();
        countdownInterval = setInterval(updateClock, 1000);
    }

    // Event listeners for input changes
    [app.hoursInput, app.minutesInput].forEach(input => {
        input.addEventListener('change', () => {
            startCountdown();
        });
    });

    app.titleInput.addEventListener('change', () => {
        app.titleElement.textContent = app.titleInput.value;
    });

    app.afterMessageInput.addEventListener('change', () => {
        app.afterTimerMessageElement.textContent = app.afterMessageInput.value;
    });

    // Event listener for text input
    app.textInputElement.addEventListener('input', (e) => {
        setResult(e.target.value);
    });

    // Initial setup
    updateValues();