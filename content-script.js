(function () {
    const STEP = 1;
    const TICK = 125;

    var timer = null;

    function scroll(x) {
        timer = setTimeout(() => {
            window.scrollTo({
                left: 0,
                top: x,
                behavior: "smooth",
            });
            const reachedBottom = x <= document.body.scrollHeight;
            // in websites like youtube, the content is dynamic
            // so the scrollHeight stays as 0
            const constantZeroScrollHeight = document.body.scrollHeight == 0;
            if (constantZeroScrollHeight || x <= reachedBottom) {
                scroll(x + STEP);
            }
        }, TICK);
    }

    chrome.runtime.onMessage.addListener(function (message, sender, respond) {
        const { command } = message;
        if (command === "start-scroll") {
            scroll(window.scrollY);
        }
    });

    document.addEventListener("wheel", function (e) {
        // if user manually scrolls, then stop the automatic scroll
        // and clear the timeout as well
        if (timer != null) {
            clearTimeout(timer);
        }
    });
})();
