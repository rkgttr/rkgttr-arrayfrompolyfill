/**
 * rkgttr-arrayfrompolyfill
 *
 * Copyright © 2016 Erik Guittiere. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
const ArrayFromPolyfill = (() => {
  if (!Array.from) {
    Array.from = (() => {
      let toStr = Object.prototype.toString,
        isCallable = fn =>
          typeof fn === 'function' || toStr.call(fn) === '[object Function]',
        toInteger = value => {
          let number = Number(value);
          if (isNaN(number)) {
            return 0;
          }
          if (number === 0 || !isFinite(number)) {
            return number;
          }
          return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
        },
        maxSafeInteger = Math.pow(2, 53) - 1,
        toLength = value => {
          let len = toInteger(value);
          return Math.min(Math.max(len, 0), maxSafeInteger);
        };
      return function from(arrayLike) {
        let C = this, items = Object(arrayLike);
        if (arrayLike == null) {
          throw new TypeError(
            "Array.from must use an Array like object - null ou undefined can't be used"
          );
        }
        let mapFn = arguments.length > 1 ? arguments[1] : void undefined, T;
        if (typeof mapFn !== 'undefined') {
          if (!isCallable(mapFn)) {
            throw new TypeError(
              'Array.from: when used, second argument must be a function'
            );
          }
          if (arguments.length > 2) {
            T = arguments[2];
          }
        }
        let len = toLength(items.length),
          A = isCallable(C) ? Object(new C(len)) : new Array(len),
          k = 0,
          kValue;
        while (k < len) {
          kValue = items[k];
          if (mapFn) {
            A[k] = typeof T === 'undefined'
              ? mapFn(kValue, k)
              : mapFn.call(T, kValue, k);
          } else {
            A[k] = kValue;
          }
          k += 1;
        }
        A.length = len;
        return A;
      };
    })();
  }
})();

export {ArrayFromPolyfill as default};
