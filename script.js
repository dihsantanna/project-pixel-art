const SELECTED = 'selected';

let INTERVAL_ID = null;

const createDivElement = (className, id = '') => {
  const div = document.createElement('div');
  div.className = className;
  div.id = id;
  return div;
};

const createButton = (className, id, text) => {
  const button = document.createElement('button');
  button.className = className;
  button.id = id;
  button.innerText = text;
  return button;
};

const setEventListeners = (element, eventType, eventFunction) => {
  element.addEventListener(eventType, eventFunction);
};

// Colors Pallet
const colorPaletteContainer = document.querySelector('#color-palette');
const generateColorsButton = document.querySelector('.generate-colors');

const colorGenerator = () => {
  const randomNumber = (Math.random() * 0xfffff * 1000000).toString(16);

  const color = `#${randomNumber.slice(0, 6)}`;

  return color !== '#ffffff' || color !== '#000000' ? color : colorGenerator();
};

const generateColorsList = () => {
  const colorsList = ['black'];

  while (colorsList.length <= 3) {
    const color = colorGenerator();
    if (!colorsList.includes(color)) {
      colorsList.push(color);
    }
  }
  return colorsList;
};

const selectColor = (event) => {
  const selectedColor = document.querySelector('.selected');
  selectedColor.classList.remove(SELECTED);

  event.target.classList.add(SELECTED);
};

const setColorInPalette = (element, color) => {
  const colorElement = element;
  colorElement.style.backgroundColor = color;
};

const createColorPallet = () => {
  const colorsList = generateColorsList();

  colorsList.forEach((color, index) => {
    const colorElement = createDivElement(`color${!index ? ` ${SELECTED}` : ''}`);
    setColorInPalette(colorElement, color);
    setEventListeners(colorElement, 'click', selectColor);
    colorPaletteContainer.appendChild(colorElement);
  });
};

const leftSpinAnimation = (element) => {
  const el = element;
  let deg = 0;
  clearInterval(INTERVAL_ID);

  const spin = () => {
    if (deg === -360) {
      clearInterval(INTERVAL_ID);
    } else {
      deg -= 4;
      el.style.transform = `rotate(${deg}deg)`;
    }
  };

  INTERVAL_ID = setInterval(spin, 1);
};

const generateNewColors = () => {
  leftSpinAnimation(generateColorsButton);
  colorPaletteContainer.innerHTML = '';
  createColorPallet();
};

// Pixels Board

const pixelBoard = document.querySelector('#pixel-board');
const clearButton = document.querySelector('#clear-board');
const boardSizeBtn = document.querySelector('#generate-board');

let boardSize = 5;

const setSelectedColorInPixel = (event) => {
  const selectedColor = document.querySelector('.selected');
  const color = selectedColor.style.backgroundColor;

  const pixel = event.target;
  pixel.style.backgroundColor = color;
};

const createPixel = () => {
  const pixel = createDivElement('pixel');
  setEventListeners(pixel, 'click', setSelectedColorInPixel);
  return pixel;
};

const createLine = (size) => {
  const line = createDivElement('line');

  for (let index = 0; index < size; index += 1) {
    const pixel = createPixel();
    line.appendChild(pixel);
  }
  return line;
};

const createPixelBoard = () => {
  for (let index = 0; index < boardSize; index += 1) {
    const line = createLine(boardSize);
    pixelBoard.appendChild(line);
  }
};

const createNewBoard = () => {
  pixelBoard.innerHTML = '';
  createPixelBoard();
};

const handleBoardSize = (size) => {
  if (size < 5) {
    boardSize = 5;
  } else if (size > 50) {
    boardSize = 50;
  } else {
    boardSize = size;
  }
};

const changeBoardSize = () => {
  const inputSize = document.querySelector('#board-size');

  if (!inputSize.value) return alert('Board inválido!');

  const re = /\d{1,2}/;
  const size = re.test(inputSize.value) ? inputSize.value : boardSize;

  handleBoardSize(size);

  createNewBoard();
  inputSize.value = boardSize;
};

const clearBoard = () => {
  const pixels = document.querySelectorAll('.pixel');
  Array.from(pixels).forEach((pixel) => {
    const pixelElement = pixel;
    pixelElement.style.backgroundColor = 'white';
  });
};

// Saved Colors Pallet

const savedColorsContainer = document.querySelector('#saved-colors');

const handleSavedColors = (event) => {
  const selectedColor = document.querySelector('.selected');
  const color = selectedColor.style.backgroundColor;
  const button = event.target.id.match(/\d/)[0];

  const colorElement = document.querySelector(`#save-${button}`);
  colorElement.style.backgroundColor = color;
  colorElement.classList.add('saved');
};

const createSavedColorsPallet = () => {
  for (let index = 0; index < 4; index += 1) {
    const colorElementContainer = createDivElement('salvage-container');
    const colorElement = createDivElement('salvage', `save-${index}`);
    const saveColorButton = createButton('save-btn', `save-btn-${index}`, 'Salvar');

    setColorInPalette(colorElement, 'white');
    setEventListeners(colorElement, 'click', selectColor);
    setEventListeners(saveColorButton, 'click', handleSavedColors);

    colorElementContainer.appendChild(saveColorButton);
    colorElementContainer.appendChild(colorElement);
    savedColorsContainer.appendChild(colorElementContainer);
  }
};

// BG Animation

const bgContainer = document.querySelector('ul');

const randomNumber = (min, max) => Math.random() * (max - min) + min;

const createParams = () => ({
  size: Math.floor(randomNumber(50, 120)),
  position: randomNumber(1, 94),
  delay: randomNumber(5, 1),
  duration: randomNumber(10, 40),
});

const generateAnimation = (element, { size, position, delay, duration }, isUp) => {
  const elementAnimation = element;
  elementAnimation.style.width = `${size}px`;
  elementAnimation.style.height = `${size}px`;
  elementAnimation.style.backgroundColor = colorGenerator();
  elementAnimation.style[isUp ? 'left' : 'bottom'] = `${position}%`;
  elementAnimation.style.animationDelay = `${delay}s`;
  elementAnimation.style.animationDuration = `${duration}s`;
};

const createAnimationElements = () => {
  for (let i = 0; i < 50; i += 1) {
    const circle = document.createElement('li');
    const isUp = i % 2 === 0;
    circle.className = `${isUp ? 'up' : 'right'}`;

    const params = createParams();

    generateAnimation(circle, params, isUp);

    bgContainer.appendChild(circle);
  }
};

window.onload = () => {
  createColorPallet();
  createPixelBoard();
  createSavedColorsPallet();
  setEventListeners(clearButton, 'click', clearBoard);
  setEventListeners(boardSizeBtn, 'click', changeBoardSize);
  setEventListeners(generateColorsButton, 'click', generateNewColors);
  createAnimationElements();
};
