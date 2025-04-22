export function getCalendarDates(year, month, weekStartsOn = 0) {

  const calendar = [];
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  let firstDayOfWeek = firstDayOfMonth.getDay();

  // Adjust for the specified week start day
  let daysFromPreviousMonth = (firstDayOfWeek - weekStartsOn + 7) % 7;


  const lastDayOfPreviousMonth = new Date(year, month, 0);
  const daysInPreviousMonth = lastDayOfPreviousMonth.getDate();

  // Add dates from the previous month
  for (let i = 0; i < daysFromPreviousMonth; i++) {
    calendar.push(new Date(year, month - 1, daysInPreviousMonth - daysFromPreviousMonth + 1 + i));
  }

  // Add dates from the current month
  for (let i = 1; i <= daysInMonth; i++) {
    calendar.push(new Date(year, month, i));
  }

  // Add dates from the next month
  const daysLeft = 42 - calendar.length;
  for (let i = 1; i <= daysLeft; i++) {
    calendar.push(new Date(year, month + 1, i));
  }

  return calendar;
}

export const getMonthFromNumber = (number) => [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
][number];

export function formatDate(date) {
  const day = date.getDate();
  const year = date.getFullYear();
  const month = getMonthFromNumber(date.getMonth());
  return `${day} ${month} ${year}`;
}

