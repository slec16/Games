const cards = document.querySelectorAll('.memory-card');
const endGame = cards.length/2;
let h1 = document.getElementsByTagName('h1')[0];
let sec = 0;
let min = 0;
let timeFlag = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let disableFlag = 0;


function tick(){
    sec++;
    if (sec >= 60) {
        sec = 0;
        min++;
    }
}

function add() {
    tick();
    h1.textContent = (min > 9 ? min : "0" + min)
       		 + ":" + (sec > 9 ? sec : "0" + sec);
    timer();
}

function timer() {
   t = setTimeout(add, 1000);
}

//timer();

function stopTime() {
    clearTimeout(t);
    timeFlag = 0;
}



function flipCard() {
  if (timeFlag == 0) {
    h1.textContent = "00:00";
    sec = 0;
    min = 0;
    timer();
    timeFlag = 1;
  }
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  disableFlag++;

  if(disableFlag == endGame){
    resetGame();
    return;
  }

  resetBoard();
  
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function resetGame() {
    stopTime();
    setTimeout(() => {
        cards.forEach(card => card.classList.remove('flip'));
        alert("Игра пройдена!");
        shuffle();
    },1500);
    
    resetBoard();
    cards.forEach(card => card.addEventListener('click', flipCard));
    
}





function shuffle() {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
    })
}

shuffle();

cards.forEach(card => card.addEventListener('click', flipCard));