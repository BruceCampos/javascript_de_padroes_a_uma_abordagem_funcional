export const partialize = (fn, ...args) => fn.bind(null, ...args);

export const compose =
  (...fns) =>
  (value) => {
    return fns.reduceRight((previousValue, fn) => fn(previousValue), value);
  };

export const pipe =
  (...fns) =>
  (value) => {
    return fns.reduce((previousValue, fn) => fn(previousValue), value);
  };
