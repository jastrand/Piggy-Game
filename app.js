

let score, roundScore, activePlayer, gamePlaying;

const initGame = () => {
  score = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true

  document.querySelector('.dice').style.display = 'none'
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}

initGame();

document.querySelector('.btn-roll').addEventListener('click', function () {

  if (gamePlaying) {
    dice = Math.floor(Math.random() * 6) + 1;

    // Random number for the dice
    const diceDOM = document.querySelector('.dice');
    // display the dice 
    diceDOM.style.display = 'block';
    // Select the right image depending on the dice result
    diceDOM.src = 'dice-' + dice + '.png';
    // Update the round score if the score is not === 1

    if (dice !== 1) {
      // add score and add to the current score
      roundScore += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      // next player
      nextPlayer()
    };
  }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gamePlaying) {
    // add CURRENT score to GLOBAL score
    score[activePlayer] += roundScore;
    // update the UI
    document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];
    // check if player won the game
    if (score[activePlayer] >= 100) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none'
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      // next player
      nextPlayer()
    };
  };

});

const nextPlayer = () => {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
};

// Start a new game
document.querySelector('.btn-new').addEventListener('click', initGame);
