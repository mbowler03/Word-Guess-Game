




/*Basically I want to set an array, set a bunch of variables, and start a function to begin 
when a key is pressed and keep them all the same case. I want to establish a display and keep it updated with "get
ElementById" Statments. I will have 2 sound files: one for correct and one for incorrect with functions around each.
Finally, I will have the word reset and choose a different word.*/ 

(function() {
 

    var possibleWords = ["England", "Spain", "Morrocco", "Italy", "China", "Russia", "Latvia", 
                            "Turkey", "Croatia", "Poland", "Australia", "Canada", "Japan", "Mexico",
                            "Israel", "Thailand", "Cambodia", "Vietnam", "Ukraine"]

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

    function checkForLetter(letter) {
        var foundLetter = false
        var correctSound = document.createElement("audio")
        var incorrectSound = document.createElement("audio")
        correctSound.setAttribute("src", "Assets/Sounds/Correct.wav")
        incorrectSound.setAttribute("src","Assets/Sounds/Scream.wav")

        
        for (var i=0, j= wordToMatch.length; i<j; i++) {
            if (letter === wordToMatch[i]) {
                guessingWord[i] = letter
                foundLetter = true
                correctSound.play()
                if (guessingWord.join("") === wordToMatch) {
                   
                    wins++
                    pauseGame = true
                    updateDisplay()
                    setTimeout(resetGame)
                }
                
            }
        }

        if (!foundLetter) {
            incorrectSound.play()
            if (!guessedLetters.includes(letter)) {
                guessedLetters.push(letter)
                numGuess--
            }
            if (numGuess === 0) {
                
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
  
    function isAlpha (ch){
        return /^[A-Z]$/i.test(ch);
    }

    function resetGame() {
        numGuess = maxGuess
        pauseGame = false

        
        wordToMatch = possibleWords[Math.floor(Math.random() * possibleWords.length)].toUpperCase()
        console.log(wordToMatch)

     
        guessedLetters = []
        guessingWord = []

        
        for (var i=0, j=wordToMatch.length; i < j; i++){
          
        }
       
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



