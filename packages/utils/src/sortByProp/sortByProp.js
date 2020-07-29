import orderBy from "lodash/orderBy";

/**
 * Creates array with the objects of given array whose elements
 * are sorted with chosen property.
 *
 * @param {Array} arr - The array to iterate over
 * @param {String} prop - The iteratees to sort by
 * @param {String} direction - The sort orders of `iteratees`
 * @returns {Array} Returns the new sorted array.
 * @example
 * const users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 34 },
 *   { 'user': 'alexander',   'age': 40 }
 * ]
 *
 * // Sort by `user` in ascending order.
 * sortByProp(users, "user")
 * // => objects for [['barney', 34], ['fred', 48], ['alexander', 40]]
 */
const sortByProp = (arr, prop, direction = "asc") =>
  orderBy(arr, typeof prop === "string" ? [prop] : prop, [direction]);

export default sortByProp;
