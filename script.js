import { getCalendarDataForCurrentMonth } from './calendar.js';

const date = new Date();
const longMonth = date.toLocaleString(Intl.Locale, { month: 'long' });
const [prevBtn, monthBtn, nextBtn] = document.querySelectorAll('header button');
const tbody = document.querySelector('tbody');

const dayContainer = document.getElementById('day');
const [dayHeader, dayNote] = dayContainer.children;
const [dayBack, dayTitle] = dayHeader.children;
function toggleCalendar() {
  dayContainer.classList.toggle('hide');
}
dayBack.addEventListener('click', toggleCalendar);

prevBtn.addEventListener('click', () => {
  console.log(true);
})
nextBtn.addEventListener('click', () => {
  console.log(true);
})
monthBtn.textContent = longMonth.toUpperCase();
monthBtn.addEventListener('click', () => {
  console.log(true);
})
dayTitle.textContent = formatDate(date);

const calendarDates = getCalendarDataForCurrentMonth();


calendarDates.forEach((date, index) => {
  const dayOfMonth = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const dayOfWeek = date.getDay();
  console.log(`Date ${index + 1}: ${date.toLocaleDateString('en-US')}, Day of Week: ${dayOfWeek}`);


  const displayDay = date.getDate();
  console.log(`Display day: ${displayDay}`);

  if (dayOfWeek === 1)
    tbody.appendChild(
      document.createElement('tr')
    );

  const td = document.createElement('td');
  td.textContent = displayDay;
  td.addEventListener('click', () => {
    toggleCalendar();
    dayTitle.textContent = formatDate(date);
  });
  tbody.lastElementChild.appendChild(td);
});



function formatDate(date) {
  const day = date.getDate();
  const year = date.getFullYear();
  const monthNames = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];
  const month = monthNames[date.getMonth()];
  return `${day} ${month} ${year}`;
}

