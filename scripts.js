// Madelyn Hillier
// SD230 Rock Paper Scissors

// Global vars. Player's choice will hold the user's rock, paper, or scissors move.
// Round over represents whether or not the game is active. When it is false, the player
// will be able to select a new hand. Otherwise, they won't be able to click on the hands.
// They will already have made a choice and the game will determine the winner of the round.
let playersChoice;
let roundOver = false;

function formatPlayersChoice() {
    return playersChoice.charAt(0).toUpperCase() + playersChoice.slice(1);
}


function initializeGame() {
    document.querySelector("#lets-go")
        .addEventListener("click", () => {
            document.querySelector("#lets-go").style.display = "none";
            document.querySelector("#play-hand").style.display = "block";
            listenForChoice();
        });

    document.querySelector("#play-hand")
        .addEventListener("click", () => {
            console.log('roundOVer: ' + roundOver);
            
            if(playersChoice != '') {
                setHover();
                roundOver = true;
                document.querySelector("#play-hand").style.display = "none";
                document.querySelector("#play-again").style.display = "block";
                determineWinner();  
            }
    });

    document.querySelector("#play-again")
        .addEventListener("click", () => {
            setHover();
            unclickHands();
            roundOver = false;
            let compMove = document.querySelectorAll('.compMove');
            console.log(compMove);
            // Might not be a compMove if there was a draw in the previous round.
            if(compMove.length > 0) {
                compMove[0].classList.remove('compMove');
            }
            
            document.querySelector("#play-again").style.display = "none";
            document.querySelector("#play-hand").style.display = "block";
            let preview = document.querySelector('h2');
            preview.textContent = 'Rock, Paper, Scissors';

            playersChoice = '';
            console.log('Play again was clicked and game has been RESET!!!!!');
            
        });       
    
}

function listenForChoice() {
    
    const choices = document.querySelectorAll(".choice");
    choices.forEach((choice, i, arr) => {
        choice.addEventListener('click', (e) => {
            if(roundOver == false) {
                playersChoice = arr[i].id;
                let preview = document.querySelector('h2');
                preview.textContent = formatPlayersChoice() + '...';

                unclickHands();
                //console.log('e.target is: ' + e.target);
                e.target.classList.add('clickedHand');
            
            }
        });         
            
    });

}

// Resets the hand icon representing the player's move back to its original color

function unclickHands() {
    let testForPink = document.querySelectorAll('.clickedHand');
    //console.log('clicked ones: ' + test);

    if(testForPink.length > 0) {
        testForPink[0].classList.remove('clickedHand');
    }

    let testForDraw = document.querySelectorAll('.drawHand');
    //console.log('clicked ones: ' + test);

    if(testForDraw.length > 0) {
        testForDraw[0].classList.remove('drawHand');
    }

}


function setHover() {
    const choices = document.querySelectorAll('.choice');
    choices.forEach((choice, i, arr) => {
        let icon = choice.firstElementChild.classList;
        icon.toggle('disabled');
        console.log(icon);
    });

}


initializeGame();



 function determineWinner() {
    const moves = ['Rock', 'Paper', 'Scissors'];
    const computerMove = moves[Math.floor(Math.random() * 3)];
    let compFontAwesome = document.getElementById(computerMove.toLowerCase()).firstElementChild;
    console.log('players move: ' + playersChoice);
    console.log('computer move: ' + computerMove);
    console.log(compFontAwesome);
    
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
    console.log('resultSummary: ' + resultSummary);
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
    console.log('end of round');
    
}




