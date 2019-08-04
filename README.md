# ConstructorWordGuess
This is a node.js based application with interactive prompts on the command-line.

The game requires inquirer or prompt npm packages.

1. Letter.js: Contains a constructor, Letter. This constructor displays a blank placeholder depending on whether or not the user has guessed the letter.

2. Word.js: Contains a constructor, Word that depends on the Letter constructor. This is used to create an object representing the current word the user is attempting to guess.

3. index.js: The file containing the logic for the course of the game, which depends on Word.js and:

* Randomly selects a word and uses the Word constructor to store it

* Prompts the user for each guess and keeps track of the user's remaining guesses
