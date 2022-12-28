let nav_month = 0;
let clicked = null;
let json_data = JSON.parse(document.getElementById('events-json').textContent);

var events = [];

console.log(events);

for(var i in json_data)
    events.push([i, json_data [i]]);

const calendar = document.getElementById("calendar");
const eventScreen = document.getElementById("event__screen");
const backDrop = document.getElementById("new__event__overlay");
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function openEventCreator(month, prevMonthDays, year, i) {
  let day = i - prevMonthDays;
  let monthSelected = month + 1;

  let date = `${monthSelected}/${day}/${year}`;

  monthSelected = (monthSelected < 10 ? "0" : "") + monthSelected;
  day = (day < 10 ? "0" : "") + day;

  var dateSelected = year + "-" + monthSelected + "-" + day;
  clicked = date;

  const eventForDay = false//events.find((e) => e.date === clicked);

  if (eventForDay) {
    console.log("Event already exists");
  } else {
    eventScreen.style.display = "block";
    document.getElementById("date__select").value = dateSelected;
  }

  backDrop.style.display = "flex";
}

//--------------------------------------DATE & TIME----------------------------------------------

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

//--------------------------------------CREATE CALENDAR----------------------------------------------

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

  calendar.innerHTML = "";

  document.getElementById(
    "month__selected"
  ).innerText = `${dt.toLocaleDateString("en-us", { month: "long" })} ${year}`;

  document.getElementById(
    "current__month"
  ).innerText = `${weekdays[today.getDay()]}, ${dt.toLocaleDateString("en-us", { month: "long" })} ${today.getDate()}, ${year}`;

  for (let i = 1; i <= prevMonthDays + daysCount; i++) {
    const dayBox = document.createElement("div");
    dayBox.classList.add("day");

    if (i > prevMonthDays) {
      dayBox.innerText = i - prevMonthDays;

      let testing = `${year}-${month + 1}-${i - prevMonthDays}`;
      let testing2 = `${year}-0${month + 1}-${i - prevMonthDays}`; //Single digit month
      let testing3 = `${year}-${month + 1}-0${i - prevMonthDays}`; //Single digit day

      for (let i = 0; i < events.length; i++){
        let eventForDay = events[i].find(e => e.event_date == testing);
        let eventForDay2 = events[i].find(e => e.event_date == testing2);
        let eventForDay3 = events[i].find(e => e.event_date == testing3);

        if (eventForDay){
          const eventDiv = document.createElement('div');
          eventDiv.classList.add('event');
          eventDiv.innerText = eventForDay.title;
          dayBox.appendChild(eventDiv);
        }
        else if (eventForDay2){
          const eventDiv = document.createElement('div');
          eventDiv.classList.add('event');
          eventDiv.innerText = eventForDay2.title;
          dayBox.appendChild(eventDiv);
        }
        else if (eventForDay3){
          const eventDiv = document.createElement('div');
          eventDiv.classList.add('event');
          eventDiv.innerText = eventForDay3.title;
          dayBox.appendChild(eventDiv);
        }
      }

      dayBox.addEventListener("click", () =>
        openEventCreator(month, prevMonthDays, year, i, dt)
      );
    } else {
      dayBox.classList.add("padding");
    }

    calendar.appendChild(dayBox);
  }
}

//--------------------------------------CHANGE MONTH DISPLAYED----------------------------------------------

function navMonths() {
  document.getElementById("next__button").addEventListener("click", () => {
    nav_month++;
    console.log(nav_month);
    load();
  });

  document.getElementById("back__button").addEventListener("click", () => {
    nav_month--;
    console.log(nav_month);
    load();
  });
}

navMonths();
load();


//--------------------------------------SUBMIT AND CLEAR FORM--------------------------------------------------

function submitForm(){
  document.getElementById("event__form").submit();
  window.location = location;
}
