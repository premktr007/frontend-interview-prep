// The same can be implemented with requestAnimationFrames()
function mySetTimeout(fn, delay) {
  const startTime = Date.now();

  const intervalId = setInterval(() => {
    const elapsed = Date.now() - startTime;

    if (elapsed >= delay) {
      fn();
      clearInterval(intervalId);
    }
  }, 1);

  return intervalId;
}

const id = mySetTimeout(() => {
  console.log("Executed after delay");
}, 1000);

//Optional cancel
clearInterval(id);
