const difficulty = 1;
const minLetters = 3;
const maxLetters = 5;
const frequencymin = 8;
const wordComplexity = 2; // Inverse value - Higher is simpler
const letterContainer = document.querySelector(".letter-container");
const wordinput = document.querySelector(".word-input");
const score = document.querySelector(".score");
const definition = document.querySelector(".difinition");
let random = [];
let TotalPOINTS = 0;
let POINTS = 1000;
score.innerHTML = `Score: ${POINTS}`;

function getWord() {
  fetch(
    `https://wordsapiv1.p.rapidapi.com/words/?random=true&lettersMin=${minLetters}&lettersMax=${maxLetters}&limit=1&page=1&frequencymin=${frequencymin}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
        "x-rapidapi-key": "fe8df6b2a3mshdeb0e3e8304b588p18fd94jsn181b421d6270",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      POINTS = 1000;
      console.log(data);
      let word = "";
      let letters = [];
      word = data.word;
      letters = word.split("");
      for (let i = 0; i < difficulty; i++) {
        random.push(Math.floor(Math.random() * letters.length));
      }
      if (data.results !== undefined) {
        try {
          definition.innerHTML = data.results[0].definition;
        } catch (error) {}
      }

      letters.forEach((letter, index) => {
        letterDiv = document.createElement("div");

        letterDiv.innerHTML = `${letter.toUpperCase()}`;
        if (random.indexOf(index) === -1) {
          letterDiv.classList.add("letter");
          letterDiv.classList.add("character");
        } else {
          letterDiv.classList.add("hidden");
          letterDiv.classList.add("character");
        }

        letterDiv.addEventListener("click", (e) => {
          e.target.classList.remove("hidden");
          e.target.classList.add("letter");
          POINTS -= 300;
          if (POINTS < 0) {
            POINTS = 0;
          }
          score.innerHTML = `Score: ${POINTS}`;
        });

        letterContainer.append(letterDiv);
      });
      wordinput.addEventListener("input", (e) => {
        console.log(e.target.value);
        if (
          e.target.value.toLowerCase() === word.toLowerCase() &&
          word !== ""
        ) {
          console.log("CORRECT");
          wordinput.classList.add("correct");
          setTimeout((e) => {
            wordinput.value = "";
            wordinput.classList.remove("correct");
            letterContainer.innerHTML = "";
            getWord();
          }, 1500);
        } else {
          wordinput.classList.remove("correct");
        }
      });
    });
}
getWord();
