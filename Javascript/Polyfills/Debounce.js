let pressCount = 0;
let triggerCount = 0;

const pressCountEl = document.getElementById('press-count');
const triggerCountEl = document.getElementById('trigger-count');

/**
 * Debounce utility
 * @param {Function} callback
 * @param {number} delay
 */
function debounce(callback, delay) {
  let timerId;

  return function (...args) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

// Debounced function — created ONCE
const debouncedTrigger = debounce(increaseTriggerCount, 500);

function onBtnPress() {
  pressCount++;
  pressCountEl.textContent = pressCount;

  debouncedTrigger();
}

function increaseTriggerCount() {
  triggerCount++;
  triggerCountEl.textContent = triggerCount;
}
