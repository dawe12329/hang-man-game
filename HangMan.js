const categories = [
  [
    'everton',
    'liverpool',
    'swansea',
    'chelsea',
    'manchestercity',
    'newcastleunited',
  ],
  ['alien', 'dirtyharry', 'gladiator', 'findingnemo', 'jaws'],
  ['manchester', 'milan', 'madrid', 'amsterdam', 'prague'],
];

const hints = [
  [
    'Based in Mersyside',
    'First Welsh team to reach the Premier League',
    'Owned by a Russian Billionaire',
    'Once managed by Phil Brown',
    '2013 FA Cup runners up',
    "Gazza's first club",
  ],
  [
    'Science-Fiction horror film',
    '1971 American action film',
    'Historical drama',
    'Animated Fish',
    'Giant great white shark',
  ],
  [
    'Northern city in the UK',
    'Home of AC and Inter',
    'Spanish capital',
    'Netherlands capital',
    'Czech Republic capital',
  ],
];

let chosenCategoryIndex = Math.floor(Math.random() * categories.length);
let chosenCategory = categories[chosenCategoryIndex];
let chosenWordIndex = Math.floor(Math.random() * chosenCategory.length);
let chosenWord = chosenCategory[chosenWordIndex];

const buttons = document.getElementById('buttons');
const category = document.getElementById('categoryName');
const lives = document.getElementById('mylives');
const clue = document.getElementById('clue');
const hintButton = document.getElementById('hint');
const placeHolder = document.querySelector('#hold');
const playAgainButton = document.getElementById('reset');
const hint = document.createElement('li');

const hangmanParts = [
  'frame1',
  'frame2',
  'frame3',
  'frame4',
  'head',
  'noose',
  'body',
  'left-arm',
  'right-arm',
  'left-leg',
  'right-leg',
];
let currentHangmanPart = 0;

let animate = function () {
  let drawMe = currentLives - 1;
  drawArray[drawMe]();
};

canvas = function () {
  myStickman = document.getElementById('stickman');
  context = myStickman.getContext('2d');
  context.beginPath();
  context.strokeStyle = '#fff';
  context.lineWidth = 2;
};

head = function () {
  myStickman = document.getElementById('stickman');
  context = myStickman.getContext('2d');
  context.beginPath();
  context.arc(60, 25, 10, 0, Math.PI * 2, true);
  context.stroke();
};

draw = function ($pathFromx, $pathFromy, $pathTox, $pathToy) {
  context.moveTo($pathFromx, $pathFromy);
  context.lineTo($pathTox, $pathToy);
  context.stroke();
};

frame1 = function () {
  draw(0, 150, 150, 150);
};

frame2 = function () {
  draw(10, 0, 10, 600);
};

frame3 = function () {
  draw(0, 5, 70, 5);
};

frame4 = function () {
  draw(60, 5, 60, 15);
};

torso = function () {
  draw(60, 36, 60, 70);
};

rightArm = function () {
  draw(60, 46, 100, 50);
};

leftArm = function () {
  draw(60, 46, 20, 50);
};

rightLeg = function () {
  draw(60, 70, 100, 100);
};

leftLeg = function () {
  draw(60, 70, 20, 100);
};

drawArray = [
  rightLeg,
  leftLeg,
  rightArm,
  leftArm,
  torso,
  head,
  frame4,
  frame3,
  frame2,
  frame1,
];

let selectedLetters = [];

function animateHangman() {
  if (currentHangmanPart < hangmanParts.length) {
    const hangman = document.getElementById('stickman');
    const hangmanPart = document.createElement('div');
    hangmanPart.className = `hangman-part ${hangmanParts[currentHangmanPart]}`;
    hangman.appendChild(hangmanPart);
    currentHangmanPart++;
  }
}

const alphabet = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

function renderPlaceHolder() {
  placeHolder.textContent = '_ '.repeat(chosenWord.length);
}

function renderCategory() {
  const ul = document.createElement('ul');
  category.appendChild(ul);

  if (chosenCategory === categories[0]) {
    category.innerHTML = 'Category: Premier League Football Teams';
  } else if (chosenCategory === categories[1]) {
    category.innerHTML = 'Category: Films';
  } else if (chosenCategory === categories[2]) {
    category.innerHTML = 'Category: Cities';
  }
}

function createButtons() {
  const btnArea = document.createElement('ul');
  btnArea.id = 'alphabet';

  for (let i = 0; i < alphabet.length; i++) {
    const btn = document.createElement('li');
    btn.id = 'letter';
    btn.textContent = alphabet[i];
    btnArea.appendChild(btn);
    btn.addEventListener('click', letterSelector);

    function letterSelector() {
      if (selectedLetters.includes(btn.textContent)) {
        return;
      }

      selectedLetters.push(btn.textContent);
      btn.style.backgroundColor = 'gray';

      let correctGuess = false;

      for (let i = 0; i < chosenWord.length; i++) {
        if (chosenWord[i].toUpperCase() === btn.textContent) {
          placeHolder.textContent = updatePlaceholder(i, btn.textContent);
          correctGuess = true;
        }
      }

      if (!correctGuess) {
        reduceLives();
      }
    }

    function updatePlaceholder(index, letter) {
      const placeholderArray = placeHolder.textContent.split(' ');
      placeholderArray[index] = letter;
      return placeholderArray.join(' ');
    }
  }

  startingLives = 10;
  function reduceLives() {
    currentLives = startingLives -= 1;
    lives.innerHTML = 'Current Lives:' + currentLives;

    if (currentLives < 1) {
      lives.innerHTML = 'Game Over';
    } else {
      animate();
    }
  }

  buttons.appendChild(btnArea);
}

function clueHandler() {
  hint.innerHTML = hints[chosenCategoryIndex][chosenWordIndex];
  clue.appendChild(hint);
}

function resetGame() {
  selectedLetters = [];

  placeHolder.textContent = '_ '.repeat(chosenWord.length);
  chosenCategoryIndex = Math.floor(Math.random() * categories.length);
  chosenCategory = categories[chosenCategoryIndex];
  chosenWordIndex = Math.floor(Math.random() * chosenCategory.length);
  chosenWord = chosenCategory[chosenWordIndex];
  lives.textContent = 'Current Lives: 10';
  startingLives = 11;
  currentLives = startingLives -= 1;
  lives.innerHTML = 'Current Lives:' + currentLives;
  hint.innerHTML = null;
}

livesCounter = document.createElement('ul');
lives.appendChild(livesCounter);
lives.innerHTML = 'Current Lives: 10';
hintButton.addEventListener('click', clueHandler);
playAgainButton.addEventListener('click', resetGame);
createButtons();
renderCategory();
renderPlaceHolder();
console.log(chosenCategory);
console.log(chosenWord);

canvas();
