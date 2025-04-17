# Local Browser Countdown for OBS

A small Javascript solution that allows you to run a countdown locally for OBS. It's helpful for streamers. Likely to be compatible with other tools if the threading system of them is executed the same way.

# Why it might not work with other software (if they are not single-threaded and event-driven)

The issue likely arises from how asynchronous functions in JavaScript interact with OBS's scripting environment, which is single-threaded and event-driven. In JavaScript within OBS, async functions don't run concurrently but allow non-blocking operations using
callbacks and promises. Timer Updates vs. Code Execution: The timer update works because obs.timer.Add() schedules the callback regardless of other code flow. However, other JavaScript may not execute if they're not triggered by events or callbacks. Script Structure and Flow: 
If the script relies on a single async function without proper sequencing (e.g., using .then()), subsequent code might not run. Ensure that after setting up timers, 
necessary functions are called either within callbacks or event listeners.

# How to use it

Download the folder and place in any location you want. Use the location of obs-overlay.html as a Local File in the browser source. e.g. 
[x] Local File -> C:/user/LocalBrowserCountdownOBS/obs-overlay.html

When you need to restart/change the timer or title, open the browser source properties and click "Refresh cache of current page". 