
const selectableWords =           // Word list
[
    "tattooine",
    "jakku",
    "naboo",
    "coruscant",
    "kamino",
    "corellia",
    "degobah",
    "mustafar",
    "yavin",
    "krayt",
    "hoth",
];

const maxTries = 5;             // Maximum number of tries player has

let guessedLetters = [];        // Stores the letters the user guessed
let currentWordIndex;           // Index of the current word in the array
let guessingWord = [];          // This will be the word we actually build to match the current word
let remainingGuesses = 0;     // How many tries the player has left
let gameStarted = false;        // Flag to tell if the game has started
let hasFinished = false;        // Flag for 'press any key to try again'     
let wins = 0;                   // How many wins has the player racked up




// Reset our game-level variables
function resetGame() {
    remainingGuesses = maxTries;
    gameStarted = false;
    
    
    // Use Math.floor to round the random number down to the nearest whole.
    currentWordIndex = Math.floor(Math.random() * (selectableWords.length));
    
    // Clear out arrays
    guessedLetters = [];
    guessingWord = [];
    
    // Make sure the hangman image is cleared
    document.getElementById("hangmanImage").src ="";
    
    // Build the guessing word and clear it out
    for (let i = 0; i < selectableWords[currentWordIndex].length; i++) {
        guessingWord.push("_");
    }
    // Hide game over and win images/text
    document.getElementById("winText").style.cssText= "display: none";
    document.getElementById("loseText").style.cssText= "display: none";
    document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
    document.getElementById("gameover-image").style.cssText = "display: none";
    document.getElementById("youwin-image").style.cssText = "display: none";
    
    // Show display
    updateDisplay();
};


//  Updates the display on the HTML Page
function updateDisplay() {
    
    document.getElementById("totalWins").innerText = wins;
    document.getElementById("currentWord").innerText = "";
    for (let i = 0; i < guessingWord.length; i++) {
        document.getElementById("currentWord").innerText += guessingWord[i];
    }
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
    if(remainingGuesses <= 0) {
        document.getElementById("loseText").style.cssText= "display: block";
        $('#loseText').animate({fontSize: '8em'}, "slow");
        $('#loseText').animate({fontSize: '0em'}, "slow");
        document.getElementById("gameover-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
        document.getElementById("currentWord").innerText = selectableWords[currentWordIndex];
        $('audio#loseSound')[0].play()
        hasFinished = true;
    }

};


// Updates the image depending on how many guesses
function updateHangmanImage() {
    document.getElementById("hangmanImage").src = "" + (maxTries - remainingGuesses) + ".png";
};


document.onkeydown = event => {
    // If we finished a game, dump one keystroke and reset.
    if(hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
        // Check to make sure a-z was pressed.
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
        }
    }
};


function makeGuess(letter) {
    if (remainingGuesses > 0) {
        if (!gameStarted) {
            gameStarted = true;
        }
        
        // Make sure we didn't use this letter yet
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
    
    updateDisplay();
    checkWin();
};


// This function takes a letter and finds all instances of 
// appearance in the string and replaces them in the guess word.
function evaluateGuess(letter) {
    // Array to store positions of letters in string
    let positions = [];
    
    // Loop through word finding all instances of guessed letter, store the indicies in an array.
    for (let i = 0; i < selectableWords[currentWordIndex].length; i++) {
        if(selectableWords[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }
    
    // if there are no indicies, remove a guess and update the hangman image
    if (positions.length <= 0) {
        remainingGuesses--;
        updateHangmanImage();
    } else {
        // Loop through all the indicies and replace the '_' with a letter.
        for(let i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};


function checkWin() {
    if(guessingWord.indexOf("_") === -1) {
        document.getElementById("winText").style.cssText = "display: block";
        $('#winText').animate({fontSize: '8em'}, "slow");
        $('#winText').animate({fontSize: '0em'}, "slow");
        document.getElementById("youwin-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
        wins++;
        $('audio#winSound')[0].play()
        hasFinished = true;
        
        
        
        
    }$('audio#bGmusic')[0].play()
};