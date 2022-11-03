// Madelyn Hillier
// SD230 Rock Paper Scissors


// Runs a web-based game of rock, paper, scissors.

// Global vars. Player's choice will hold the user's rock, paper, or scissors move.
// Round over represents whether or not the game is active. When it is false, the player
// will be able to select a new hand. Otherwise, they won't be able to click on the hands.
// They will already have made a choice and the game will determine the winner of the round.

let playersChoice;
let roundOver = false;

// Takes the id of the player's move and formats it for the game result display.

function formatPlayersChoice() {
    return playersChoice.charAt(0).toUpperCase() + playersChoice.slice(1);
}

// Sets the display up for the start of the game.
// Creates click listeners for the three game state buttons: let's go, play hand, and play again.
// Sets click listeners for the hand icons.

function initializeGame() {
    document.querySelector("#lets-go")
        .addEventListener("click", () => {
            document.querySelector("#lets-go").style.display = "none";
            document.querySelector("#play-hand").style.display = "block";
            listenForChoice();
        });

    // Creates the 'play-hand' button's actions. When the user clicks this,
    // the hands won't have hover action anymore and won't be clickable.
    // The button's text will change to 'play again'. The game will 
    // determine a move for the computer and the outcome of the game 
    // will be displayed on the screen.

    document.querySelector("#play-hand")
        .addEventListener("click", () => {
            
            if(playersChoice != '') {
                setHover();
                roundOver = true;
                document.querySelector("#play-hand").style.display = "none";
                document.querySelector("#play-again").style.display = "block";
                determineWinner();  
            }
    });

    // Creates the 'play-again' button's actions. When the user clicks this, 
    // the hands will be turned back to their original colors and their hover
    // functions will be restored. The button's text will change to 'play hand'.

    document.querySelector("#play-again")
        .addEventListener("click", () => {
            setHover();
            unclickHands();
            roundOver = false;
            let compMove = document.querySelectorAll('.compMove');
            // Might not be a compMove if there was a draw in the previous round.
            if(compMove.length > 0) {
                compMove[0].classList.remove('compMove');
            }
            document.querySelector("#play-again").style.display = "none";
            document.querySelector("#play-hand").style.display = "block";
            let preview = document.querySelector('h2');
            preview.textContent = 'Rock, Paper, Scissors';
            playersChoice = '';
            
        });       
    
}

// Creates click listeners for the hand icons.
// When the user clicks on a hand, the screen will show the name of the icon
// that the user chose and the hand will turn pink.

function listenForChoice() {
    
    const choices = document.querySelectorAll(".choice");
    choices.forEach((choice, i, arr) => {
        choice.addEventListener('click', (e) => {
            if(roundOver == false) {
                playersChoice = arr[i].id;
                let preview = document.querySelector('h2');
                preview.textContent = formatPlayersChoice() + '...';
                unclickHands();
                e.target.classList.add('clickedHand');
            
            }
        });         
            
    });

}

// Resets the hand icon representing the player's move back to its original color

function unclickHands() {
    let testForPink = document.querySelectorAll('.clickedHand');

    if(testForPink.length > 0) {
        testForPink[0].classList.remove('clickedHand');
    }

    let testForDraw = document.querySelectorAll('.drawHand');

    if(testForDraw.length > 0) {
        testForDraw[0].classList.remove('drawHand');
    }

}

// Toggles the hover state of the hand icons.

function setHover() {
    const choices = document.querySelectorAll('.choice');
    choices.forEach((choice, i, arr) => {
        let icon = choice.firstElementChild.classList;
        icon.toggle('disabled');
    });

}


initializeGame();

// Generates the computer's move. Determines the game's winner.
// Creates and formats the results statement that will be displayed.

 function determineWinner() {
    const moves = ['Rock', 'Paper', 'Scissors'];
    const computerMove = moves[Math.floor(Math.random() * 3)];
    let compFontAwesome = document.getElementById(computerMove.toLowerCase()).firstElementChild;
    
    let formattedPlayersChoice = formatPlayersChoice(); 
    let computerWon;
    let resultPhrase = '';
    let resultSummary = 'Draw!';

    if(computerMove !== formattedPlayersChoice) {
        let outcome = [formattedPlayersChoice, computerMove];
        compFontAwesome.classList.add('compMove');

        if(outcome.includes('Rock') && outcome.includes('Scissors')) {
            computerWon = outcome[1] === 'Rock';
            resultPhrase = 'Rock breaks Scissors. '
        } else if(outcome.includes('Paper') && outcome.includes('Rock')) {
            computerWon = outcome[1] === 'Paper';
            resultPhrase = 'Paper covers Rock. '
        } else if(outcome.includes('Scissors') && outcome.includes('Paper')) {
            computerWon = outcome[1] === 'Scissors';
            resultPhrase = 'Scissors cut Paper. '
        } 
        if(computerWon) {
            resultSummary = 'You Lose!';
        } else {
            resultSummary = 'You Win!'
        }
    }

    let resultBanner = document.querySelector('h2');
    resultBanner.textContent = resultPhrase;
    let summarySpan = document.createElement('span');
    if(computerWon !== undefined) {
        if(computerWon) {
            summarySpan.style.color = '#D2FFAF';
        } else {
            summarySpan.style.color = '#FE00B7';
        }
    } 

    if(resultSummary === 'Draw!') {
        let hand = document.getElementById('' + playersChoice).firstElementChild;
        hand.classList.remove('clickedHand');
        hand.classList.add('drawHand');
    }
    summarySpan.innerHTML = resultSummary;
    resultBanner.appendChild(summarySpan);
    
}




