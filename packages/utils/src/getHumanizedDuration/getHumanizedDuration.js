// Note: only accurate (to human relevant precision) for up to one day b/c variable length of months and years - damn earth and gregorian calendar
/**
 * Return humanized string for duration
 * @param {number} secondsParam - number of seconds to convert to human-readable string
 * @param {number} numOfTimeframesParam - number of timeframes to include in returned value
 * @example
 *  getHumanizedDuration(3665, 3) -> 1 hour 10 minutes 5 seconds
 *  getHumanizedDuration(3665, 2) -> 1 hour 10 minutes
 */

export default function(secondsParam = 0, numOfTimeframesParam = 2) {
  if (isNaN(parseInt(secondsParam, 10))) {
    throw TypeError(`'seconds' argument must be a integer parseable value. Value passed: ${secondsParam}`);
  }

  if (isNaN(parseInt(numOfTimeframesParam, 10))) {
    throw TypeError(
      `'numOfTimeframes' argument must be a integer parseable value. Value passed: ${numOfTimeframesParam}`
    );
  }

  const seconds = parseInt(secondsParam, 10);
  const numOfTimeframes = parseInt(numOfTimeframesParam, 10);

  const EPOCHS = ["year", "month", "day", "hour", "minute", "second"];

  const DURATION_IN_SECONDS = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  };

  const timeframeStrings = [];
  EPOCHS.forEach((epoch, index) => {
    const interval =
      index === 0
        ? Math.floor(seconds / DURATION_IN_SECONDS[epoch]) // don't use modulus for first epoch
        : Math.floor((seconds % DURATION_IN_SECONDS[EPOCHS[index - 1]]) / DURATION_IN_SECONDS[epoch]); // use remainder from previous epoch as numerator

    if (interval >= 1 && timeframeStrings.length < numOfTimeframes) {
      timeframeStrings.push(interval === 1 ? `1 ${epoch}` : `${interval} ${epoch}s`);
    }
  });

  return timeframeStrings.join(" ");
}
