let form = document.querySelector("#comment-form");
const comment = text => `<li>${text}</li>`;
const commentsList = document.querySelector("#list");
const heartArray = [];

form.addEventListener("submit", function(e) {
  e.preventDefault();
  const term = document.querySelector("#search").value;
  commentsList.innerHTML += comment(term);
  form.reset();
});

const counter = document.querySelector("#counter");

const buttonDiv = document.querySelector("#buttonDiv");

const likeList = document.querySelector(".likes");

let isRunning = true;

let counterInterval = setInterval(function() {
  isRunning = true;
  changeTimer(1);
}, 1000);

buttonDiv.addEventListener("click", function(e) {
  if (e.target.dataset.name === "-") {
    changeTimer(-1);
  }
  if (e.target.dataset.name === "+") {
    changeTimer(1);
  }
  if (e.target.dataset.name === "heart") {
    obj = findObj();
    if (document.getElementById(obj.num)) {
      const li = document.getElementById(obj.num);
      li.innerText = `Number ${obj.num} has ${obj.likes} likes`;
    } else {
      likeList.innerHTML += `<li id='${obj.num}'>Number ${obj.num} has ${
        obj.likes
      } likes</li>`;
    }
  }
  if (e.target.dataset.name === "pause") {
    toggleTimer();
  }
});

function changeTimer(num) {
  counter.innerText = `${parseInt(counter.innerText) + num}`;
}

function findObj() {
  for (let obj of heartArray) {
    if (obj.num == counter.innerText) {
      obj.likes++;
      return obj;
    }
  }

  const newObj = {
    num: counter.innerText,
    likes: 1
  };
  heartArray.push(newObj);
  return newObj;
}

function toggleTimer() {
  if (isRunning === true) {
    clearInterval(counterInterval);
    isRunning = false;
  } else {
    counterInterval = setInterval(function() {
      isRunning = true;
      changeTimer(1);
    }, 1000);
  }
}
