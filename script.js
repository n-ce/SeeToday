import { formatDate, getCalendarDates, getMonthFromNumber } from './calendar.js';

const date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

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
  if (month === 0) {
    year--;
    month = 12;
  }
  month--;
  renderer(getCalendarDates(year, month, 1));
})
nextBtn.addEventListener('click', () => {
  if (month === 11) {
    year++;
    month = -1;
  }
  month++;
  renderer(getCalendarDates(year, month, 1));
})

monthBtn.addEventListener('click', () => {
  console.log(true);
})






function renderer(seed) {
  tbody.innerHTML = '';

  monthBtn.textContent = getMonthFromNumber(month).toUpperCase();

  seed.forEach((dt, index) => {
    const mth = dt.getMonth();
    const dayOfWeek = dt.getDay();
    const displayDay = dt.getDate();

    if (dayOfWeek === 1)
      tbody.appendChild(document.createElement('tr'));

    const td = document.createElement('td');
    td.textContent = displayDay;
    if (month !== mth)
      td.className = 'inactive';

    if (mth === date.getMonth() && displayDay === date.getDate())
      td.className = 'active';

    td.addEventListener('click', () => {
      toggleCalendar();
      const title = formatDate(dt);
      dayTitle.textContent = title;
      const db = getDB();
      if (title in db)
        dayNote.textContent = db[title];
      else
        dayNote.textContent = '';
    });
    tbody.lastElementChild.appendChild(td);
  });

}


renderer(
  getCalendarDates(year, month, 1)
);

function getDB() {
  const baseString = localStorage.getItem('db');
  const database = JSON.parse(baseString || '{}');
  return database;

}

dayNote.addEventListener('input', () => {
  const db = getDB();
  if (dayNote.value)
    db[dayTitle.textContent] = dayNote.value;
  else
    delete db[dayTitle.textContent];
  localStorage.setItem('db', JSON.stringify(db));

})
