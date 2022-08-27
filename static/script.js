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

function updateTime() {
  let currentDate = new Date();
  let today =
    currentDate.getMonth() +
    1 +
    "/" +
    currentDate.getDate() +
    "/" +
    currentDate.getFullYear();

  if (currentDate.getMinutes() <= 9) {
    let time =
      currentDate.getHours() +
      ":0" +
      currentDate.getMinutes() +
      ":" +
      currentDate.getSeconds();
    let dateAndTime = today + " " + time;
    document.getElementById("current__time").innerText = `${dateAndTime}`;
  } else {
    let time =
      currentDate.getHours() +
      ":" +
      currentDate.getMinutes() +
      ":" +
      currentDate.getSeconds();
    let dateAndTime = today + " " + time;
    document.getElementById("current__time").innerText = `${dateAndTime}`;
  }
}

setInterval(updateTime, 1000);

function load() {
  const dt = new Date();
  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  /*const monthSelector = document.createElement("h1");
  monthSelector.classList.add("month");

  select__month.appendChild(monthSelector);*/

  const firstDay = new Date(year, month, 1);
  const daysCount = new Date(year, month + 1, 0).getDate();

  const dateString = firstDay.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const prevMonthDays = weekdays.indexOf(dateString.split(", ")[0]);

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

load();
