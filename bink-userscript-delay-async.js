/**
 * Return a Promise that resolves after a timeout.
 *
 * @param {Number} delay Optional, nonpresent or negative is the same as 0. The number of milliseconds to wait prior to resolving.
 * @param {AbortSignal} ct Optional, if already aborted when this is called or prior to the timeout expiring, the returned Promise will be aborted with new DOMException(…, 'AbortError').
 * @returns {Promise} A Promise which resolves once the delay has passed or is rejected with DOMException(…, 'AbortError') if ct is aborted.
 */
const delayAsync = (delay, ct) => ct ? new Promise((resolve, reject) => {
  function buildAbortError() {
    return new DOMException('Aborted', 'AbortError');
  }
  function handleAbort() {
    clearTimeout(timeoutId);
    reject(buildAbortError());
  }
  if (ct.aborted) {
    throw buildAbortError();
  }
  const timeoutId = setTimeout(() => {
    ct.removeEventListener('abort', handleAbort);
    resolve();
  }, delay);
  ct.addEventListener('abort', handleAbort);
}) : new Promise((resolve) => {
  setTimeout(resolve, delay);
});
