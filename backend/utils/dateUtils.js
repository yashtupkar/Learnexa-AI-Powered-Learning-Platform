
function getCurrentIndianDate(date = new Date()) {
  const now = date instanceof Date ? date : new Date(date);
  // IST is UTC+5:30 (5.5 * 60 = 330 minutes)
  const istOffset = 330 * 60 * 1000; // in milliseconds
  const istTime = new Date(now.getTime() + istOffset);
  // Return date at midnight IST
  return new Date(
    istTime.getUTCFullYear(),
    istTime.getUTCMonth(),
    istTime.getUTCDate(),
    0,
    0,
    0,
    0
  );
}

function isConsecutiveDay(lastDate, currentDate) {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round((currentDate - lastDate) / oneDay) === 1;
}

function isSameDay(date1, date2) {
  return date1.toDateString() === date2.toDateString();
}

module.exports = {
  getCurrentIndianDate,
  isConsecutiveDay,
  isSameDay,
};
