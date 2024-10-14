// Unordered list where guesses appear
const guessed = document.querySelector(".guessed-letters");

// Button
const button = document.querySelector(".guess");

// Text input where the player will guess a letter
const letterGuess = document.querySelector(".letter");

//Empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");

//Paragraph where the remaining guesses will display
const remaining = document.querySelector(".remaining");

//Span inside the paragraph where the remaining guesses will display
const numberGuesses = document.querySelector(".remaining span");

//Empty paragraph where messages will appear when the player guesses a letter
const message = document.querySelector(".message");

// The hidden button to prompt the player to play again
const playAgain = document.querySelector(".play-again");

const word = "magnolia";

const letterPlace = function(word) {
    const placeHolders = [];
    for (const place of word) {
        placeHolders.push("●");
        };
    wordInProgress.innerText = placeHolders.join("");
    };
   

letterPlace(word);

button.addEventListener("click", function(e) {
    e.preventDefault();
    const guess = letterGuess.value;
    console.log(guess);
    letterGuess.value = "";
});


