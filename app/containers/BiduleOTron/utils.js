/**
 * Checks equality of the values in the given Arrays.
 * @param {Array} a First array
 * @param {Array} b Second Array
 */
export function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

/**
 * Checks that the given Arrays contain the exact same values.
 * @param {Array} a First array
 * @param {Array} b Second Array
 */
export function arraysContainSameValues(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (b.indexOf(a[i]) === -1) {
      return false;
    }
  }
  return true;
}

/**
 * Checks equality of the values in the given Objects.
 * @param {Object} a First Object
 * @param {Object} b Second Object
 */
export function objectsEqual(a, b) {
  // Create arrays of property names
  const aProps = Object.getOwnPropertyNames(a);
  const bProps = Object.getOwnPropertyNames(b);
  // If number of properties is different, objects are not equivalent
  if (aProps.length != bProps.length) {
    return false;
  }
  for (var i = 0; i < aProps.length; i++) {
    const propName = aProps[i];
   // If values of same property are not equal, objects are not equivalent
    if (a[propName] !== b[propName]) {
        return false;
    }
  }
  // If we made it this far, objects are considered equivalent
  return true;
}

/**
 * Increments/decrements `value` by `inc`, applying a 'rotate' to ensure it stays between `min` and `max`.
 * @param {int} value
 * @param {*} inc
 * @param {*} min
 * @param {*} max
 */
export function cycleValue(value, inc, min, max) {
  if (value === null) {
    value = 0;
  }
  value += inc;
  const range = (max - min + 1);
  while (value > max) value -= range;
  while (value < min) value += range;
  return value;
}

/**
 * Increments/decrements `value` by `inc` and ensures it stays between `min` and `max`.
 * @param {int} value
 * @param {*} inc
 * @param {*} min
 * @param {*} max
 */
export function betweenValue(value, inc, min, max) {
  value += inc;
  if (value < min) value = min;
  if (value > max) value = max;
  return value;
}
