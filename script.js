const colorPalette = document.querySelector('#color-palette');
const colors = colorPalette.querySelectorAll('.color');

const colorGenerator = () => {
  const randomNumber = () => Math.floor(Math.random() * (255 + 1));

  const color = `rgb(${randomNumber()}, ${randomNumber()}, ${randomNumber()})`;

  return color !== 'rgb(255, 255, 255)' ? color : colorGenerator();
};

const generateColorsList = () => {
  const colorsList = [];

  while (colorsList.length <= 3) {
    const color = colorGenerator();

    if (!colorsList.includes(color)) {
      colorsList.push(color);
    }
  }
  return colorsList;
};

const setColorsInPalette = () => {
  colors[0].style.backgroundColor = 'black';
  const colorsList = generateColorsList();

  for (let index = 1; index < colors.length; index += 1) {
    colors[index].style.backgroundColor = colorsList[index];
  }
};

const pixelBoard = document.querySelector('#pixel-board');

const boardSize = 5;

const createPixel = () => {
  const pixel = document.createElement('div');
  pixel.className = 'pixel';
  return pixel;
};

const createLine = (size) => {
  const line = document.createElement('div');
  line.className = 'line';

  for (let index = 0; index < size; index += 1) {
    const pixel = createPixel();
    line.appendChild(pixel);
  }
  return line;
};

const createPixelBoard = (size) => {
  for (let index = 0; index < size; index += 1) {
    const line = createLine(size);
    pixelBoard.appendChild(line);
  }
};

window.onload = () => {
  setColorsInPalette();
  createPixelBoard(boardSize);
};
