// Make a bunch of stuff
let form = document.querySelector("#comment-form");
const comment = text => `<li>${text}</li>`;
const commentsList = document.querySelector("#list");
const heartArray = [];
const counter = document.querySelector("#counter");
const buttonDiv = document.querySelector("#buttonDiv");
const likeList = document.querySelector(".likes");
// Bool to see if timer is running or not
let isRunning = true;
// Start running the timer
let counterInterval = setInterval(function() {
  isRunning = true;
  changeTimer(1);
}, 1000);

// Form to add comments to comment list
form.addEventListener("submit", function(e) {
  e.preventDefault();
  const term = document.querySelector("#search").value;
  commentsList.innerHTML += comment(term);
  form.reset();
});

// Group listener to handle all button clicks
buttonDiv.addEventListener("click", function(e) {
  if (e.target.dataset.name === "-") {
    changeTimer(-1);
  }
  if (e.target.dataset.name === "+") {
    changeTimer(1);
  }
  if (e.target.dataset.name === "heart") {
    //   Check if an object with that number already exists or make a new one if it doesn't
    obj = findObj();
    if (document.getElementById(obj.num)) {
      const li = document.getElementById(obj.num);
      //   Make it exists on the page replace its inner text with the updated one (which has the new like count)
      li.innerText = `Number ${obj.num} has ${obj.likes} likes`;
    }
    // Make a new list item on the page
    else {
      likeList.innerHTML += `<li id='${obj.num}'>Number ${obj.num} has ${
        obj.likes
      } likes</li>`;
    }
  }
  if (e.target.dataset.name === "pause") {
    toggleTimer();
  }
});

// Function to increase or decrease timer clock given a num
function changeTimer(num) {
  counter.innerText = `${parseInt(counter.innerText) + num}`;
}

// Looks to see if the object exists
function findObj() {
  // If it exists increment it and return it
  for (let obj of heartArray) {
    if (obj.num == counter.innerText) {
      obj.likes++;
      return obj;
    }
  }
  // If it doesn't exist make a new one and return it
  const newObj = {
    num: counter.innerText,
    likes: 1
  };
  heartArray.push(newObj);
  return newObj;
}

function toggleTimer() {
  // If the timer is running, stop it
  if (isRunning === true) {
    clearInterval(counterInterval);
    isRunning = false;
  }
  // If its not running, start it
  else {
    counterInterval = setInterval(function() {
      isRunning = true;
      changeTimer(1);
    }, 1000);
  }
}
