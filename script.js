const SELECTED = 'selected';

const createDivElement = (className) => {
  const div = document.createElement('div');
  div.className = className;
  return div;
};

const setEventListeners = (element, eventType, eventFunction) => {
  element.addEventListener(eventType, eventFunction);
};

const colorPaletteContainer = document.querySelector('#color-palette');

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

window.onload = () => {
  createColorPallet();
  createPixelBoard();
  setEventListeners(clearButton, 'click', clearBoard);
  setEventListeners(boardSizeBtn, 'click', changeBoardSize);
};
