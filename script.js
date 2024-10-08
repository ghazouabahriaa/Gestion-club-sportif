let nav = 0;
let clicked = null;
let events = localStorage.getItem("events")
  ? JSON.parse(localStorage.getItem("events"))
  : [];
let x=0;

const calendar = document.getElementById("calendar");
const newEventModal = document.getElementById("newEventModal");
const deleteEventModal = document.getElementById("deleteEventModal");
const backDrop = document.getElementById("modalBackDrop");
const eventTitleInput = document.getElementById("eventTitleInput");
const eventTime1 = document.getElementById("time1");
const eventTime2 = document.getElementById("time2");
const eventPlace = document.getElementById("salle");
const eventCoach = document.getElementById("coach");
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

function openModal(date) {
  clicked = date;

  const eventForDay = events.find((e) => e.date === clicked);
  /*
 if (eventForDay) {
    document.getElementById('eventText').innerText = eventForDay.title;
    document.getElementById('Time').innerText = eventForDay.theTime;
    document.getElementById('Place').innerText = eventForDay.place;
    document.getElementById('Coach').innerText = eventForDay.coach;
    deleteEventModal.style.display = 'block';
  } else {*/
  newEventModal.style.display = "block";

  backDrop.style.display = "block";
}

function load() {
  let events2 = [...events];
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric"
  });
  const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);

  document.getElementById(
    "monthDisplay"
  ).innerText = `${dt.toLocaleDateString("en-us", { month: "long" })} ${year}`;

  calendar.innerHTML = "";

  for (let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement("div");
    daySquare.classList.add("day");

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      /*  const eventForDay = events.find(e => e.date === dayString);*/
      var eventForDay = events2.find((e) => e.date === dayString);
      console.log(eventForDay);
      if (i - paddingDays === day && nav === 0) {
        daySquare.id = "currentDay";
      }

      while (eventForDay !== undefined) {
          const eventDiv = document.createElement("div");
          eventDiv.classList.add("event");
          eventDiv.innerText = eventForDay.title;
          if (eventForDay.title=="BasketBall"){eventDiv.classList.add("red"); }
          if (eventForDay.title=="Soccer"){eventDiv.classList.add("blue"); }
          if (eventForDay.title=="HandBall"){eventDiv.classList.add("purple"); }
          if (eventForDay.title=="Crossfit"){eventDiv.classList.add("green"); }
          if (eventForDay.title=="Tennis"){eventDiv.classList.add("magenta"); }
          if (eventForDay.title=="Boxing"){eventDiv.classList.add("orange"); }
          daySquare.appendChild(eventDiv);
          const timetext = document.createElement("p");
          timetext.classList.add("timetext");
          timetext.innerText = eventForDay.theTime;
          eventDiv.appendChild(timetext);
          const placetext = document.createElement("p");
          placetext.classList.add("placetext");
          placetext.innerText = eventForDay.place;
          eventDiv.appendChild(placetext);
          const coachtext = document.createElement("p");
          coachtext.classList.add("coachtext");
          coachtext.innerText = eventForDay.coach;
          eventDiv.appendChild(coachtext);
          events2 = events2.filter((e) => e !== eventForDay);
          var eventForDay = events2.find((e) => e.date === dayString);
        
      }

      daySquare.addEventListener("click", () => openModal(dayString));
    } else {
      daySquare.classList.add("padding");
    }

    calendar.appendChild(daySquare);
  }
}

function closeModal() {
  eventTitleInput.classList.remove("error");
  newEventModal.style.display = "none";
  deleteEventModal.style.display = "none";
  backDrop.style.display = "none";
  eventTitleInput.value = "";
  clicked = null;
  load();
}

function saveEvent() {
  if (eventTitleInput.value) {
    eventTitleInput.classList.remove("error");

    events.push({
      date: clicked,
      title: eventTitleInput.value,
      theTime:
        "From " + String(eventTime1.value) + " To " + String(eventTime2.value),
      place: eventPlace.value,
      coach: eventCoach.value
    });

    localStorage.setItem("events", JSON.stringify(events));
    closeModal();
  } else {
    eventTitleInput.classList.add("error");
  }
}

function deleteEvent() {
  events = events.filter((e) => e.date !== clicked);
  localStorage.setItem("events", JSON.stringify(events));
  closeModal();
}
function weekFunction() {
  let x1= x.toString()+"px";
  document.getElementById("calendar").style.marginTop=x1;
}

function initButtons() {
  document.getElementById("nextButton").addEventListener("click", () => {
    nav++;
    load();
  });

  document.getElementById("backButton").addEventListener("click", () => {
    nav--;
    load();
  });
  document.getElementById("next").addEventListener("click", () => {
    if(x>-1600){
    x-=530;
    weekFunction();}
  });
  document.getElementById("back").addEventListener("click", () => {
    if(x<0){
    x+=530;
    weekFunction();}
  });
  document.getElementById("saveButton").addEventListener("click", saveEvent);
  document.getElementById("cancelButton").addEventListener("click", closeModal);
  document
    .getElementById("deleteButton")
    .addEventListener("click", deleteEvent);
  document.getElementById("closeButton").addEventListener("click", closeModal);
}
load();
initButtons();
