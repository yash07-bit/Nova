/**
 * Wraps asynchronous functions to catch errors and pass them to the next middleware.
 * This prevents the server from hanging on unhandled promise rejections.
 *
 * @param {Function} func - The asynchronous function to wrap
 * @returns {Function} - A new function that executes the passed function and catches errors
 */
module.exports = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch(next);
  };
};
