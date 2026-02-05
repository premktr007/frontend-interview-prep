function initThrottleDemo() {
  let pressCount = 0;
  let triggerCount = 0;

  const pressCountEl = document.getElementById('press-count');
  const triggerCountEl = document.getElementById('trigger-count');
  const button = document.getElementById('throttle-btn');

  function throttle(callback, delay) {
    let lastExecuted = 0;

    return function () {
      const now = Date.now();
      if (now - lastExecuted >= delay) {
        lastExecuted = now;
        callback();
      }
    };
  }

  const throttledTrigger = throttle(() => {
    triggerCount++;
    triggerCountEl.textContent = triggerCount;
  }, 1000);

  button.addEventListener('click', () => {
    pressCount++;
    pressCountEl.textContent = pressCount;
    throttledTrigger();
  });
}

// bootstrapping
initThrottleDemo();
