/*Basically I want to set an array, set a bunch of variables, and start a function to begin 
when a key is pressed and keep them all the same case. I want to establish a display and keep it updated with "get
ElementById" Statments. I will have 2 sound files: one for correct and one for incorrect with functions around each.
Finally, I will have the word reset and choose a different word.*/ 

(function() {
 
// Set array
    var possibleWords = ["England", "Spain", "Morrocco", "Italy", "China", "Russia", "Latvia", 
                            "Turkey", "Croatia", "Poland", "Australia", "Canada", "Japan", "Mexico",
                            "Israel", "Thailand", "Cambodia", "Vietnam", "Ukraine"]
//set variables
    var wins = 0
    var maxGuess = 10
    var guessedLetters = []
    var guessingWord = []
    var pauseGame = false
    var numGuess
    var wordToMatch
    
    resetGame()
    document.onkeypress = function(event) {
        if (isAlpha(event.key) && !pauseGame) {
            checkForLetter(event.key.toUpperCase())
        }
    }


    // setup function to check if letter is in the country. If it is found play sound and if not found play another sound.
    function checkForLetter(letter) {
        var foundLetter = false
        var correctSound = document.createElement("audio")
        var incorrectSound = document.createElement("audio")
        correctSound.setAttribute("src", "Assets/Sounds/Correct.wav")
        incorrectSound.setAttribute("src","Assets/Sounds/Scream.wav")

        // setting a for loop to check the word for letter match
        for (var i=0, j= wordToMatch.length; i<j; i++) {
            if (letter === wordToMatch[i]) {
                guessingWord[i] = letter
                foundLetter = true
                correctSound.play()
                // If after guessing all the letters the word matches
                if (guessingWord.join("") === wordToMatch) {
                    // count wins
                    wins++
                    pauseGame = true
                    updateDisplay()
                    setTimeout(resetGame)
                }
                
            }
        }

        if (!foundLetter) {
            incorrectSound.play()
            // Check if inccorrect guess is already on the list
            if (!guessedLetters.includes(letter)) {
                // Add incorrect letter to guessed letter list
                guessedLetters.push(letter)
                // lower number of guesses
                numGuess--
            }
            if (numGuess === 0) {
                // Display word before reseting game
                guessingWord = wordToMatch.split()
                pauseGame = true
                setTimeout(resetGame)
            }
            if (numGuess === maxGuess) {
                losses++
            }
        }

        updateDisplay()
    }
    // this is added to make sure it is alpha character
    function isAlpha (ch){
        return /^[A-Z]$/i.test(ch);
    }

    function resetGame() {
        numGuess = maxGuess
        pauseGame = false

        // Get a new word
        wordToMatch = possibleWords[Math.floor(Math.random() * possibleWords.length)].toUpperCase()
        console.log(wordToMatch)

        // Reset word arrays
        guessedLetters = []
        guessingWord = []

        // Reset the guessed word
        for (var i=0, j=wordToMatch.length; i < j; i++){
          
        }
        // Update the Display
        updateDisplay()
    }

    function updateDisplay () {
        document.getElementById("totalWins").innerText = wins
        document.getElementById("currentWord").innerText = guessingWord.join("")
        document.getElementById("remainingGuesses").innerText = numGuess
        document.getElementById("guessedLetters").innerText =  guessedLetters.join(" ")
    }
})
();



