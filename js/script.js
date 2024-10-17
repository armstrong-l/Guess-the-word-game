// Unordered list where guesses appear
const guessed = document.querySelector(".guessed-letters");

// Guess Button
const guessButton = document.querySelector(".guess");

// Text input where the player will guess a letter
const letterGuess = document.querySelector(".letter");

//Empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");

//Paragraph where the remaining guesses will display
const remaining = document.querySelector(".remaining");

//Span inside the paragraph where the remaining guesses will display
const numberGuessesSpan = document.querySelector(".remaining span");

//Empty paragraph where messages will appear when the player guesses a letter
const message = document.querySelector(".message");

// The hidden button to prompt the player to play again
const playAgain = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

// Selecting a word

const getWords = async function () {
    const res = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const wordList = await res.text();
    // console.log(wordList);
    const wordArray = wordList.split("\n");
    // console.log(wordArray);
    selectWord(wordArray);
    letterPlace(word);
    console.log(word);
};

const selectWord = function(wordArray) {
    const randomIndex = Math.floor(Math.random() * wordArray.length); 
    word = wordArray[randomIndex];
    word.trim();
};

//Start game

getWords();


// Displaying word with place holders

const letterPlace = function(word) {
    const placeHolders = [];
    for (const place of word) {
        placeHolders.push("●");
        };
    wordInProgress.innerText = placeHolders.join("");
    };
   

//Click button event listener

guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    const guess = letterGuess.value;
    // console.log(guess);
    
    message.innerText = "";
    const correctInput = checkInput(guess);
    // console.log(correctInput);
    if (correctInput) {
    makeGuess(guess);
    }
    
    letterGuess.value = "";
});


//Validate input to check correct characters

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

// Directions on what to do with a suitable guess

const makeGuess = function(guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You have already tried that letter! Please try again."}
        else {guessedLetters.push(guess)
        // console.log(guessedLetters);
        guessList(guessedLetters);
        guessRemainCount(guess);
        updateWord(guessedLetters);
        
        }
    };

    // Creating list of guessed letters

    const guessList = function (guessedLetters) {
        guessed.innerHTML = "";
        for(const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessed.append(li);
        }
    };


    // Updating placeholders with correct letter guesses

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


// Remaining guesses count and messages

const guessRemainCount = function(guess) {
    const upperWord = word.toUpperCase();
    if(!upperWord.includes(guess)) {
        message.innerText = `Sorry, the word has no ${guess}.`;
        remainingGuesses -= 1;
         
    } else {
    message.innerText = `Good guess! The letter ${guess} is in the word!`;
         }


if(remainingGuesses === 0) {
    message.innerHTML = `GAME OVER!! The word was <span class="highlight">${word}</span>.`;
    startOver();
     }  else if (remainingGuesses === 1) {
    numberGuessesSpan.innerText = `only one guess`;
 }  else {
    numberGuessesSpan.innerText = `${remainingGuesses} guesses`;
} 
 };

 // When players wins

const playerWins = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You guessed the correct word! Congrats!</p>';
        startOver();
    }
};
    

const startOver = function() {
    guessButton.classList.add("hide");
    remaining.classList.add("hide");
    guessed.classList.add("hide");
    playAgain.classList.remove("hide");
}

playAgain.addEventListener("click", function() {
    message.classList.remove("win");
    message.innerText = "";
    guessed.innerText = "";

    remainingGuesses = 8;
    guessedLetters = [];
    numberGuessesSpan.innerText = `${remainingGuesses} guesses`;


    guessButton.classList.remove("hide");
    remaining.classList.remove("hide");
    guessed.classList.remove("hide");
    playAgain.classList.add("hide");

    getWords();
});