let nav_month = 0;
let clicked = null;
let events = localStorage.getItem("events")
  ? JSON.parse(localStorage.getItem("events"))
  : [];

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Saturday",
];
const calendar = document.getElementById("calendar");

/*function updateTime() {
  let currentDate = new Date();

  let today =
    currentDate.getMonth() + 1 + "/" + currentDate.getDate() + "/" + currentDate.getFullYear(); // prettier-ignore

  if (currentDate.getMinutes() <= 9) {
    var time =
      currentDate.getHours() + ":0" + currentDate.getMinutes() + ":" + currentDate.getSeconds(); // prettier-ignore
  } else if (currentDate.getSeconds() <= 9) {
    var time =
      currentDate.getHours() + ":" + currentDate.getMinutes() + ":0" + currentDate.getSeconds(); // prettier-ignore
  } else {
    var time =
      currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds(); // prettier-ignore
  }
  let dateAndTime = today + " " + time;
  document.getElementById("navbar__logo").innerText = `${dateAndTime}`;
}

setInterval(updateTime, 1000);*/

function load() {
  const today = new Date();
  const dt = new Date(today.getFullYear(), today.getMonth());

  if (nav_month !== 0) {
    dt.setMonth(new Date().getMonth() + nav_month);
  }

  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDay = new Date(year, month, 1);
  const daysCount = new Date(year, month + 1, 0).getDate();

  const dateString = firstDay.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const prevMonthDays = weekdays.indexOf(dateString.split(", ")[0]);

  calendar.innerHTML = '';

  document.getElementById(
    "month__selected"
  ).innerText = `${dt.toLocaleDateString("en-us", { month: "long" })} ${year}`;

  document.getElementById(
    "current__month"
  ).innerText = `${dt.toLocaleDateString("en-us", { month: "long" })} ${year}`;


  for (let i = 1; i <= prevMonthDays + daysCount; i++) {
    const dayBox = document.createElement("div");
    dayBox.classList.add("day");

    if (i > prevMonthDays) {
      dayBox.innerText = i - prevMonthDays;

      dayBox.addEventListener("click", (event) => {
        event.currentTarget.classList.toggle("selected");
      });
    } else {
      dayBox.classList.add("padding");
    }

    calendar.appendChild(dayBox);
  }
}

function navMonths() {
  document.getElementById('next__button').addEventListener('click', () => {
    nav_month++;
    console.log(nav_month);
    load();
  });

  document.getElementById('back__button').addEventListener('click', () => {
    nav_month--;
    console.log(nav_month);
    load();
  });
}

navMonths()
load();