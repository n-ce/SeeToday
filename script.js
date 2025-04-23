import { formatDate, getCalendarDates, getMonthFromNumber } from './calendar.js';

const date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
let weekStart = 1;

const [prevBtn, monthBtn, nextBtn] = document.querySelectorAll('header button');
const tbody = document.querySelector('tbody');
const dayContainer = document.getElementById('day');
const [dayHeader, dayNote] = dayContainer.children;
const [dayBack, dayTitle] = dayHeader.children;


dayBack.addEventListener('click', () => {

  const db = getDB();
  const ctx = dayTitle.textContent;
  const d = document.querySelector(`[data-date="${ctx}"]`);
  if (dayNote.value) {
    db[ctx] = dayNote.value;
    if (!d.classList.contains('logged'))
      d.classList.add('logged');
  }
  else {
    delete db[ctx];
    if (d.classList.contains('logged'))
      d.classList.remove('logged');
  }
  localStorage.setItem('db', JSON.stringify(db));
  dayContainer.classList.toggle('hide');
});

prevBtn.addEventListener('click', () => {
  if (month === 0) {
    year--;
    month = 12;
  }
  month--;
  renderer(getCalendarDates(year, month, weekStart));
})
nextBtn.addEventListener('click', () => {
  if (month === 11) {
    year++;
    month = -1;
  }
  month++;
  renderer(getCalendarDates(year, month, weekStart));
})

monthBtn.addEventListener('click', () => {
  weekStart--;
  if (weekStart === 7)
    weekStart = 0;
  console.log(weekStart);
  renderer(getCalendarDates(year, month, weekStart));
})





function renderer(seed) {
  tbody.innerHTML = '';

  monthBtn.textContent = getMonthFromNumber(month).toUpperCase();

  seed.forEach((dt) => {
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

    const title = formatDate(dt);

    if (title in getDB())
      td.classList.add('logged');

    td.dataset.date = title;

    td.addEventListener('click', () => {
      dayContainer.classList.toggle('hide');
      dayTitle.textContent = title;
      const db = getDB();
      if (title in db)
        dayNote.value = db[title];
      else
        dayNote.value = '';
    });
    tbody.lastElementChild.appendChild(td);
  });

}


renderer(
  getCalendarDates(year, month, weekStart)
);

function getDB() {
  const baseString = localStorage.getItem('db');
  const database = JSON.parse(baseString || '{}');
  return database;

}

