function once(fn) {
  let hasCalled = false;
  let result;
  return function (...args) {
    if (!hasCalled) {
      // check how fn.apply works ? why fn.apply is used instead of fn(...args)
      result = fn.apply(this, args);
      hasCalled = true;
    }
    return result;
  };
}

export const callOnce = once(() => {
  console.log('function called');
});

callOnce();
callOnce();
callOnce();
callOnce();
