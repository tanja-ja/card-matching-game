let inp = document.querySelector('#inp');
let btn = document.querySelector('#btn');
let btnAgame = document.querySelector('#btnAgame');
let wrapperCards = document.querySelector('#wrapper');
let cardOne = null;
let cardTwo = null;


//создаем массив карточек
let arrCard = ['1', '1',
  '2', '2',
  '3', '3',
  '4', '4',
  '5', '5',
  '6', '6',
  '7', '7',
  '8', '8',
  '9', '9',
  '10', '10',
  '11', '11',
  '12', '12',
  '13', '13',
  '14', '14',
  '15', '15',
  '16', '16',
  '17', '17',
  '18', '18',
  '20', '20'
]

let res = 4;
let newArr = [];

btn.addEventListener('click', function play() {
 
  //проверяем значение
  if (inp.value % 2 == 0 && inp.value <= 10 && inp.value >= 2) {
    res = inp.value ** 2;
  } else {
    inp.value = res;
    alert('В поле можно ввести чётное число от 2 до 10')
  }

  // задаем ширину .wrapper-cards

  wrapperCards.style.width = (140 * inp.value) + 'px';

  btn.classList.add('active');

  // создаем новый масив

  for (let i = 0; i < res; i++) {
    newArr[i] = arrCard[i]
  }
  // перемешиваем масив

  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
  shuffle(newArr);

  // создаем div карт

  function getListContent() {

    let fragment = new DocumentFragment();

    for (let i = 0; i < res; i++) {
      let card = document.createElement("div");
      card.classList.add('card');

      // card.append(newArr[i]);

      card.setAttribute('data-number', newArr[i])
      fragment.append(card);
    }

    return fragment;
  }
  wrapperCards.append(getListContent());

  //таймер

  let seconds = document.querySelector('.seconds');
  seconds.textContent = 60;
  let timerID = setInterval(function func() {
    seconds.textContent--;
    if
      (seconds.textContent == 0) {
      clearInterval(timerID);
      alert('Время вышло, вы открыли ' + document.querySelectorAll('.success').length + ' карт(ы)');
      btnAgame.classList.add('active');
    }
    btnAgame.addEventListener('click', function () {
      if (document.querySelector(".card")) {
        wrapperCards.innerHTML = '';
        btnAgame.classList.remove('active');
        btn.classList.remove('active');
        inp.value = '';
        seconds.textContent = ''
      }

    })
  }, 1000)

  // Находим карты 

  let cardsInGame = document.querySelectorAll('.card')
  for (let card of cardsInGame) {
    card.addEventListener('click', function () {
      card.classList.add('open');

      card.textContent = card.dataset.number;
      let cardsOpen = document.getElementsByClassName('open');
      if (cardsOpen.length == 2) {
        flip(cardsOpen[0], cardsOpen[1]);
      }

      //если номера не совпали удаляем
      function flip(cardOne, cardTwo) {
        if (cardOne !== null && cardTwo !== null) {
          if (cardOne.dataset.number !== cardTwo.dataset.number) {
            setTimeout(() => {
              cardOne.classList.remove('open');
              cardTwo.classList.remove('open');
            }, 500)

          }
        }
        //совпадение
        if (cardOne !== null && cardTwo !== null) {
          if (cardOne.textContent == cardTwo.textContent) {
            setTimeout(() => {
              cardOne.classList.add('success');
              cardTwo.classList.add('success');
              cardOne.classList.remove('open');
              cardTwo.classList.remove('open');

            }, 500);
            if (document.querySelectorAll('.success').length + 2 === res) {
              setTimeout(() => {
                clearInterval(timerID)
                alert('Вы открыли все карты!')
                btnAgame.classList.add('active');
              }, 800)
            }
          }
        }

      }

    })

  }

});









