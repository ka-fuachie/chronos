export interface TimeParams {
  startTime: number
  currTime: number
  elapsedTime: number
  prevTime: number
  dt: number
}

export type TimeLoop = (timeParams: TimeParams) => void;

export interface UpdateLoopInterface {
  callback: TimeLoop
  isRunning: boolean
  run: () => void
  end: () => void
}

let animateId: number

export function loop(callback: TimeLoop): void {
  let currTime: number,
    startTime: number,
    elapsedTime: number,
    prevTime: number,
    dt: number;

  function animate(timestamp: number): void {
    animateId = requestAnimationFrame(animate);

    if (currTime == null) startTime = performance.now()
    currTime = performance.now()

    elapsedTime = currTime - startTime;
    if (elapsedTime === 0) prevTime = 0;
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

  requestAnimationFrame(animate)
}

export function endLoop() {
  cancelAnimationFrame(animateId)
}