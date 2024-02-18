let ind;
let count = 0;

let accuracy = 0,
  wpm = 0;
let actualWord = [],
  writtenWord = [];
let typedWords = "";
let isGameStart = false;
let inputLetter;
let sentence = "";
let sentences = [
  "In the heart of the bustling city, amidst the towering skyscrapers and bustling streets, lies a hidden oasis of tranquility. Here, time seems to slow down, and the chaos of urban life fades into the background. Lush greenery and colorful flowers adorn the landscape, creating a vibrant tapestry of nature's beauty. The air is filled with the sweet scent of blooming flowers and the gentle rustle of leaves in the breeze. Birds chirp melodiously, adding to the symphony of sounds that fill the air.",

  "People from all walks of life come to this serene retreat to escape the stresses of everyday life. Some come to meditate and find inner peace, while others simply come to admire the natural beauty that surrounds them. Children laugh and play freely, their carefree spirits adding to the joyful atmosphere.",

  "As the sun sets on the horizon, painting the sky in hues of pink and orange, a sense of calm washes over the landscape. The city's hustle and bustle fade away, replaced by a serene stillness that envelops everything in its embrace. In this tranquil haven, all worries and troubles seem to melt away, leaving only a sense of profound peace and contentment.",
];

// this method convert the sentence into a letter inside a tag and load it to the screen
let getWords = () => {
  let box = document.getElementById("box");
  box.innerHTML = `<div id="cursor"></div>`;
  let randomInd = Math.floor(Math.random() * sentences.length);
  sentence = sentences[randomInd];

  for (let i = 0; i < sentence.length; i++) {
    let letter = sentence.charAt(i);
    box.innerHTML += `<span class="letter">${letter}</span>`;
  }
};

//this method check the letter with input letter
checkLetter = (inputLetter) => {
  let spans = document.querySelectorAll(".letter");

  if (ind < sentence.length - 1 || inputLetter === "Backspace") {
    let currentLetter = sentence.charAt(ind + 1);

    if (inputLetter === "Backspace") {
      if (ind >= 0) {
        spans[ind].style.color = "#acabab";
        typedWords = typedWords.slice(0, ind);

        ind--;
        updateCursorPosition(); // it will place after ind--
      }
    } else if (currentLetter === inputLetter) {
      ind++;
      typedWords += inputLetter;

      updateCursorPosition();
      spans[ind].style.color = "#f7e200";
    } else {
      ind++;
      updateCursorPosition();
      spans[ind].style.color = "#ff0045";
    }
  }
};

// Method to update the cursor position
let updateCursorPosition = () => {
  let cursor = document.getElementById("cursor");
  let spans = document.querySelectorAll(".letter");

  if (spans.length > 0 && ind < spans.length) {
    if (ind >= 0) {
      let span = spans[ind];

      cursor.style.top = `${span.offsetTop}px`;
      cursor.style.left = `${span.offsetLeft + span.offsetWidth}px`;
    } else {
      cursor.style.top = ``;
      cursor.style.left = ``;
    }
  } else {
    cursor.style.display = "none";
  }
};

//this method take input from the keyboard
addEventListener("keyup", (event) => {
  inputLetter = event.key;

  if (isGameStart && count < 1) {
    count++;
    timer();
  }

  if (
    inputLetter !== "Shift" &&
    inputLetter !== "Control" &&
    count === 1 &&
    isGameStart
  ) {
    checkLetter(inputLetter);
  }
});

//this method for starting the game
let gameStart = () => {
  //initializing the values
  isGameStart = true;
  count = 0;
  ind = -1;
  getWords();

  let gameWindow = document.getElementById("game-window");
  cursor = document.getElementById("cursor");
  let menu = document.getElementById("menu");
  let text2 = document.getElementById("text2");
  let text3 = document.getElementById("text3");

  text2.setAttribute("id", "text2");
  text3.setAttribute("id", "text3");
  menu.style.display = "none";
  gameWindow.style.display = "flex";
};

//this method for over the game
let gameOver = () => {
  isGameStart = false;

  let gameWindow = document.getElementById("game-window");
  let menu = document.getElementById("menu");
  let heading = document.getElementById("heading");
  let text1 = document.getElementById("text1");
  let text2 = document.getElementById("text2");
  let text3 = document.getElementById("text3");

  getResults();

  menu.style.display = "flex";
  gameWindow.style.display = "none";
  heading.innerText = "Game over";
  text1.innerText = `play again`;
  text2.innerText = `wpm:${wpm}`;
  text3.innerText = `accuracy:${((accuracy / wpm) * 100).toFixed(2)}%`;

  accuracy = 0;
  wpm = 0;
  typedWords = "";
  writtenWord = [];
  actualWord = [];
  text2.onclick = null;
  text3.onclick = null;
};

//this method count the second
let timer = () => {
  let timeShow = document.getElementById("timer");
  let sec = 30;
  timeShow.innerText =`${sec}s`;
  let id = setInterval(() => {
    sec--; 
    timeShow.innerText = `${sec}s`;
    if (sec == 0) {
      clearInterval(id);
      gameOver();
    }
  }, 1000);
};

let getResults = () => {
  let words = "";
  for (let i = 0; i <= ind; i++) {
    words += sentence[i];
  }
  actualWord = words.split(" ");
  writtenWord = typedWords.split(" ");

  for (let i = 0; i < writtenWord.length; i++) {
    if (actualWord[i] === writtenWord[i] && writtenWord[i] != " ") {
      accuracy++;
    }
  }
  wpm =
    actualWord[actualWord.length - 1].length > 1
      ? actualWord.length
      : actualWord.length - 1;
};
