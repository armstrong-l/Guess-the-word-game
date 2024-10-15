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
const guessedLetters = [];


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
    message.innerText = "";
    const checkMessage = checkInput(guess);
    console.log(checkMessage);
    makeGuess(guess);
    
});


const checkInput = function(input) {
    const acceptedLetter = /[a-zA-Z]/;
    
    if (input.length === 0) {
        message.innerText = "You need to enter a letter!";
    }
    else if (input.length > 1 ) {
        message.innerText = "Please enter only one letter at a time.";
    }
    else if (!input.match(acceptedLetter)) {
        message.innerText = "Please only input letters: A-Z!";
    }
    else {return input;}
};

const makeGuess = function(guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You have already tried that letter! Please try again."}
        else {guessedLetters.push(guess)
        console.log(guessedLetters);
        guessList(guessedLetters);
        updateWord(guessedLetters);
        }
    };

    const guessList = function (guessedLetters) {
        guessed.innerHTML = "";
        for(const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessed.append(li);
        }
    };

    const updateWord = function (guessedLetters) {
        const wordUpper = word.toUpperCase();
        const wordArray = wordUpper.split("");
        // console.log(wordArray);
        const revealWord = [];
        for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
           revealWord.push(letter.toUpperCase());
        }
        else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");

    playerWins();
};


const playerWins = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You guessed the correct word! Congrats!</p>';
    }
};
    