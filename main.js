// Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.

function createNumbersArray(count) {
  let arr = [];
  for (let i = 1; i <= count; i++) {
    arr.push(i);
    arr.push(i);
  }
  return arr;
}


// Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел


function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}



// Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.
function gameProp() {
  const setGame = document.createElement('div');
  const title = document.createElement('h1');
  const subTitle = document.createElement('p');
  const description = document.createElement('p');
  const timeDescr = document.createElement('p');
  const form = document.createElement('form');
  const input = document.createElement('input');
  const startBtn = document.createElement('button');

  setGame.classList.add('start__game')
  title.classList.add('start__game__title');
  subTitle.classList.add('start__game__subtitle');
  description.classList.add('start__game__descr');
  timeDescr.classList.add('start__game__timedescr');
  form.classList.add('start__game__form');
  input.classList.add('start__game__input');
  startBtn.classList.add('start__game__btn');

  title.textContent = 'Игра в пары';
  subTitle.textContent = 'Количество карточек';
  description.textContent = 'Введите чётное число от 2 до 10';
  timeDescr.textContent = 'Внимание! Игра автоматически завершится через 1 минуту!';
  startBtn.textContent = 'Начать игру';

  document.body.append(setGame);
  setGame.append(title, subTitle, description, timeDescr, form);
  form.append(input, startBtn);

  let count;

  form.addEventListener('submit', function (e) {
    e.preventDefault()
    count = input.value;
    if (count % 2 == 0 && count <= 10) {
      setGame.style.display = 'none'
      startGame(count)
    } else {
      setGame.style.display = 'none'
      startGame(8)
    }
  })
}




function startGame(count) {

  //Создание поля игры
  const game = document.createElement('div');
  game.classList.add('game')
  document.body.append(game);
  //Создание перемешанного массива
  let arr = shuffle(createNumbersArray(count))
  //Создание карточек из массива
  for (i = 0; i < arr.length; i++) {
    let card = document.createElement('div');
    card.classList.add('card')
    card.textContent = arr[i];
    game.append(card)
  }
  const restartBtn = document.createElement('button');
  restartBtn.classList.add('restart__btn')
  restartBtn.textContent = 'Начать заново'
  game.append(restartBtn);
  restartBtn.addEventListener('click', () => {
    location.reload();
  })

  const cards = document.querySelectorAll('.card');

  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;


  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('open');

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();

  }

  function checkForMatch() {
    let isMatch = firstCard.textContent === secondCard.textContent;
    isMatch ? disableCards() : unflipCards();
  }

  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
  }

  function unflipCards() {
    setTimeout(() => {
      firstCard.classList.remove('open');
      secondCard.classList.remove('open');

      resetBoard();
    }, 1500);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  cards.forEach(card => card.addEventListener('click', flipCard));
  //
  (function gameOver() {
    const gameOver = document.createElement('div');
    gameOver.classList.add('game__over');
    gameOver.textContent = 'Game Over';
    setTimeout(() => {
      lockBoard = true;
      game.append(gameOver);
    }, 60000)
  })()

}

gameProp();
