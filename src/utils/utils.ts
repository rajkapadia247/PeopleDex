export const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;

  return function (...args) {
    const context = this;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}
