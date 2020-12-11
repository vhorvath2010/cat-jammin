var baseBPM = 120;
var clicks = [];
var lastTime;

function press() {
    // Register the new time
    var time = new Date().getTime();
    registerTime(time);
    // Update the BPM if needed
    updateBPM();
}

function registerTime(time) {
    clicks.length++;
    if (clicks.length == 1) {
        clicks[0] = 0;
    } else {
        var len = clicks.length;
        clicks[len - 1] = time - lastTime;
    }
    lastTime = time;
}

function updateBPM() {
    if (clicks.length >= 5) {
        var totalTime = 0;
        for (var i = -1; i >= -5; i--) {
            totalTime += clicks[clicks.length + i];
        }
        var BPM = (5 / (totalTime / 1000.0)) * 60;
        var ratio = BPM / baseBPM;
        console.log(ratio);
        document.querySelector('video').playbackRate = ratio;
        document.querySelector('video').time = 0;
    }
}