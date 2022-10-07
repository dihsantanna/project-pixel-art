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

window.onload = () => {
  setColorsInPalette();
};
