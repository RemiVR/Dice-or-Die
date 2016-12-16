/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

  var scores, roundScore, activePlayer, gamePlaying, userName1, userName2;

  var diceDOM = document.querySelector('.dice');
  var player1 = document.querySelector('.player-0-panel');
  var player2 = document.querySelector('.player-1-panel');

  init();

  var lastDice;

  document.querySelector('.btn-new').addEventListener('click', init);

  document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
      var dice = Math.floor(Math.random() * 6) + 1;

      diceDOM.style.display = 'block';
      diceDOM.src = 'dice-' + dice + '.png';

      diceDOM.classList.add('dice-roll');

      if (dice === 6 && lastDice === 6) {
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = '0';
        nextPlayer();
      } else if (dice !== 1) {
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
      } else {
        diceDOM.classList.add('dice-fail');
        gamePlaying = false;
        setTimeout(nextPlayer, 750);
      }
      lastDice = dice;
    }
  });


  diceDOM.addEventListener('animationend', function(){
    diceDOM.classList.remove('dice-roll');
  });


  document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying){
      scores[activePlayer] += roundScore;
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

      var scoreInput = document.querySelector('.final-score').value;
      var winningScore;
      if (scoreInput) {
        winningScore = scoreInput;
      } else {
        winningScore = 100;
      }

      if (scores[activePlayer] >= winningScore) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        diceDOM.style.display = 'none';

        var currentPlayer = document.querySelector('.player-' + activePlayer + '-panel');
        currentPlayer.classList.add('winner');
        currentPlayer.classList.remove('active');
        gamePlaying = false;
      } else {
        nextPlayer();
      }
    }
  });


  function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    player1.classList.toggle('active');
    player2.classList.toggle('active');

    diceDOM.classList.remove('dice-fail');
    gamePlaying = true;
  }


  function init() {
    scores =[0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    diceDOM.style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    player1.classList.remove('winner', 'active');
    player2.classList.remove('winner', 'active');
    player1.classList.add('active');
    document.querySelector('.reg-player-1').style.display = 'block';
    document.querySelector('.reg-player-2').style.display = 'block';

    userName1 = document.getElementById('input-player-1').value = '';
    userName1 = document.getElementById('input-player-2').value = '';
  }


  document.querySelector('.reg-player-1').addEventListener('submit', function(event) {
    event.preventDefault();
    userName1 = document.getElementById('input-player-1').value;
    document.getElementById('name-0').textContent = userName1;
    document.querySelector('.reg-player-1').style.display = 'none';

  });

  document.querySelector('.reg-player-2').addEventListener('submit', function(event) {
    event.preventDefault();
    userName2 = document.getElementById('input-player-2').value;
    document.getElementById('name-1').textContent = userName2;
    document.querySelector('.reg-player-2').style.display = 'none';
  });
