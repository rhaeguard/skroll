// Timer wrapper class
class Timer {
    constructor(interval) {
        this.stopped = true;
        this.interval = interval;
    }

    start(func) {
        this.stopped = false;
        this.timer = setTimeout(func, this.interval);
    }

    stop() {
        if (this.timer != null) {
            clearTimeout(this.timer);
            this.stopped = true;
        }
    }

    isStopped() {
        return this.stopped;
    }
}

(function () {
    const STEP = 1;
    const TICK = 125;

    var timer = new Timer(TICK);

    function scroll(x) {
        timer.start(() => {
            window.scrollTo({
                left: 0,
                top: x,
                behavior: "smooth",
            });
            const reachedBottom = x <= document.body.scrollHeight;
            // in websites like youtube, the content is dynamic
            // so the scrollHeight stays as 0
            const constantZeroScrollHeight = document.body.scrollHeight == 0;
            if (constantZeroScrollHeight || reachedBottom) {
                scroll(x + STEP);
            }
        });
    }

    chrome.runtime.onMessage.addListener(function (message, sender, respond) {
        const { command } = message;
        if (command === "start-scroll" && timer.isStopped()) {
            scroll(window.scrollY);
        }
    });

    document.addEventListener("wheel", function (e) {
        // if user manually scrolls, then stop the automatic scroll
        // and clear the timeout as well
        timer.stop();
    });
})();
