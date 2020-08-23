const day = document.querySelector(".day");
const hour = document.querySelector(".hour");
const min = document.querySelector(".min");
const sec = document.querySelector(".sec");
const countdownInput = document.querySelector("#countdown-input");
const countdownSetButton = document.querySelector("#countdown-set-button");
const countdown = document.querySelector(".countdown");
const setUpCountdown = document.querySelector(".set-up-countdown");
const changeCountdown = document.querySelector("#change-countdown");

let dt;
let countdownInterval;

if (localStorage.getItem("countdown")) {
  dt = new Date(JSON.parse(localStorage.getItem("countdown")));
  if (dt - new Date() > 0) {
    startCountdown();
  }
}

countdownInput.addEventListener("input", (e) => {
  dt = new Date(Date.parse(e.target.value));
  console.log(dt);
});

countdownSetButton.addEventListener("click", startCountdown);
changeCountdown.addEventListener("click", () => {
  setUpCountdown.style.display = "block";
  countdown.style.display = "none";
  clearInterval(countdownInterval);
  console.log(dt.toLocaleDateString());
  countdownInput.value = dt.toISOString().slice(0, 16);
});

function startCountdown() {
  if (dt == "") {
    alert("Please select date");
    return;
  } else if (dt - new Date() < 0) {
    alert("Invalid date");
    return;
  }
  setCountdown();
  setUpCountdown.style.display = "none";
  countdown.style.display = "block";
  countdownInterval = setInterval(() => {
    setCountdown();
  }, 1000);
  localStorage.setItem("countdown", JSON.stringify(dt));
}

function setCountdown() {
  let diff = dt - new Date();
  diff = diff / 1000;
  if (diff <= 1) {
    console.log(diff);
    clearInterval(countdownInterval);
    localStorage.clear();
    setUpCountdown.style.display = "block";
    countdown.style.display = "none";
  }
  const tempDay = Math.floor(diff / 86400);
  day.innerHTML = tempDay;
  const tempHour = Math.floor((diff - tempDay * 86400) / 3600);
  hour.innerHTML = tempHour;
  tempMin = Math.floor((diff - tempDay * 86400 - tempHour * 3600) / 60);
  min.innerHTML = tempMin;
  sec.innerHTML = Math.floor(
    diff - tempDay * 86400 - tempHour * 3600 - tempMin * 60
  )
}
