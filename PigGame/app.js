/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

Additional Rules
- A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. 
- Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. 
- Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. 

*/

var scores, roundScore, activePlayer, gamePlaying, previousRoll1,previousRoll2;

//Call init function
init();

//implement roll dice event
document.querySelector('.btn-roll').addEventListener('click',function(){
    if(gamePlaying){
        
        //Generate random number between 1 and 6
        var dice1 = Math.floor(Math.random() * 6 ) + 1;
        var dice2 = Math.floor(Math.random() * 6 ) + 1;

        //Change the dice display to the number rolled
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-'+dice1+'.png';
        document.getElementById('dice-2').src = 'dice-'+dice2+'.png';

         
        // Reset the score if a player throws two consecutive sixes
        if((dice1 === 6 && previousRoll1 === 6) && (dice2 === 6 && previousRoll2 === 6)){
            previousRoll1 = 0;
            previousRoll2 = 0;
            scores[activePlayer] = 0;
            document.getElementById('score-'+activePlayer).textContent = '0';
            nextPlayer();  
        }else if(dice1 !== 1 && dice2 !== 1){
            //Add the dice value to the current score if value is not 1
            roundScore = roundScore + dice1 + dice2;
            document.getElementById('current-'+activePlayer).textContent = roundScore;
        }
        else{
            //if the value is 1 then next player gets the turn
            nextPlayer();
        }

        previousRoll1 = dice1;
        previousRoll2 = dice2;

    }
});

//Implement hold button event
document.querySelector('.btn-hold').addEventListener('click',function(){
    if(gamePlaying){
        //Add the current score to the global score
        scores[activePlayer] += roundScore;
        document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];

        //Check if score is greater than or equal to 100

        //Get the score from the user input
        var enteredScore = document.querySelector('.final-score').value;
        var winningScore;

        if(enteredScore){
            winningScore = enteredScore;
        }else{
            winningScore = 100;
        }
        
        if(scores[activePlayer] >= winningScore){
            gamePlaying = false;
            document.getElementById('name-'+activePlayer).textContent = 'Winner!!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
        }else{
            nextPlayer();
        } 

    }
});

//Implement next game button event
document.querySelector('.btn-new').addEventListener('click',init);

function nextPlayer(){
    roundScore = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none'
}


function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying =  true;
    previousRoll1 = 0;
    previousRoll2 = 0;
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}