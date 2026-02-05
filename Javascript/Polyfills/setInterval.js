function mySetInterval(fn, delay) {
  let timerId = null;
  let isCancelled = false;

  function run() {
    if (isCancelled) return;

    fn();

    timerId = setTimeout(run, delay);
  }

  timerId = setTimeout(run, delay);

  return function clear() {
    isCancelled = true;
    clearTimeout(timerId);
  };
}

const clear = mySetInterval(() => {
  console.log("tick");
}, 1000);

setTimeout(clear, 5000);
