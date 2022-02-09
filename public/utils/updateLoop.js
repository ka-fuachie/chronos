let animateId;
export function loop(callback) {
    let currTime, startTime, elapsedTime, prevTime, dt;
    function animate(timestamp) {
        animateId = requestAnimationFrame(animate);
        if (currTime == null)
            startTime = performance.now();
        currTime = performance.now();
        elapsedTime = currTime - startTime;
        if (elapsedTime === 0)
            prevTime = 0;
        dt = elapsedTime - prevTime;
        //* Main code goes here *//
        callback({
            startTime,
            currTime,
            elapsedTime,
            prevTime,
            dt,
        });
        //* ******************* *//
        prevTime = elapsedTime;
    }
    requestAnimationFrame(animate);
}
export function endLoop() {
    cancelAnimationFrame(animateId);
}
