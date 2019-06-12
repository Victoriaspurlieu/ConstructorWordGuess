var Word = require("./word.js");
var inquirer = require("inquirer");

// enter characters
var charArray = "abcdefghijklmnopqrstuvwxyz";

// List of words 
var dogBreed = ["bulldog", "labrador", "poodle", "pug", "beagle", "pomeranian", "poiter", "dobermann", "weimaraner", "german shepherd", "dachshund"];

// choose random dog breed
var randomIndex = Math.floor(Math.random() * dogBreed.length);
var randomWord = dogBreed[randomIndex];

// Pass random word through Word constructor
computerWord = new Word(randomWord);

var requireNewWord = false;

// Array for guessed letters
var incorrectLetters = [];
var correctLetters = [];

// Attempts
var guessesLeft = 10;

function generator() {

    // Generates new word for Word constructor if true
    if (requireNewWord) {
        // Selects random dogBreed array
        var randomIndex = Math.floor(Math.random() * dogBreed.length);
        var randomWord = dogBreed[randomIndex];

        // Passes random word through the Word constructor
        computerWord = new Word(randomWord);

        
        requireNewWord = false;
    }


    // Checking if letter is "true"
    var wordComplete = [];
    computerWord.objArray.forEach(completeCheck);

    // letters remaining to be guessed
    if (wordComplete.includes(false)) {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "Guess a letter between A-Z!",
                    name: "userinput"
                }
            ])
            .then(function (input) {

               
                if (!charArray.includes(input.userinput) || input.userinput.length > 1) {
                    console.log("\nPlease try again!\n");
                    generator();
                } else {

                   
                    if (incorrectLetters.includes(input.userinput) || correctLetters.includes(input.userinput) || input.userinput === "") {
                        console.log("\nAlready Guessed or Nothing Entered\n");
                        generator();
                    } else {

                        // Checks if guess is correct
                        var wordCheckArray = [];
                        computerWord.userGuess(input.userinput);

                        computerWord.objArray.forEach(wordCheck);
                        if (wordCheckArray.join('') === wordComplete.join('')) {
                            console.log("\nIncorrect\n");
                           
                            incorrectLetters.push(input.userinput);
                            guessesLeft--;
                        } else {
                            console.log("\nCorrect!\n");
                           
                            correctLetters.push(input.userinput);
                        }

                        
                        computerWord.log();

                        // Prints attempts left
                        console.log("Attempts Left: " + guessesLeft + "\n");

                        // Print letters guessed already
                        console.log("Letters Guessed: " + incorrectLetters.join(" ") + "\n");

                        if (guessesLeft > 0) {
                            // Call function 
                            generator();
                        } else {
                            console.log("Sorry, you lose!\n");

                            restartGame();
                        }


                        
                        function wordCheck(key) {
                            wordCheckArray.push(key.guessed);
                        }
                    }
                }
            })
    } else {
        console.log("Great Job!\n");

        restartGame();
    }

   
    function completeCheck(key) {
        wordComplete.push(key.guessed);
    }

}

function restartGame() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Would you like to:",
                choices: ["Play Again", "Exit"],
                name: "restart"
            }
        ])
        .then(function (input) {
            if (input.restart === "Play Again") {
                requireNewWord = true;
                incorrectLetters = [];
                correctLetters = [];
                guessesLeft = 10;
                generator();
            } else {
                return
            }
        })
}

generator();
