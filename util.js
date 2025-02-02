async function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function createCanvas(canvasWidth, canvasHeight) {
  const canvas = document.createElement("canvas");
  const devicePixelRatio = window.devicePixelRatio || 1;
  const context = canvas.getContext("2d");

  canvas.width = canvasWidth * devicePixelRatio;
  canvas.height = canvasHeight * devicePixelRatio;

  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;

  context.scale(devicePixelRatio, devicePixelRatio);

  return canvas;
}

function image(img, x, y) {
  context.drawImage(img, x, y);
}

function random(min, max) {
  if (min == null) {
    return Math.random();
  }

  if (max == null) {
    return Math.random() * min;
  }

  if (min > max) {
    const temp = min;
    min = max;
    max = temp;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function constrain(n, low, high) {
  return Math.max(Math.min(n, high), low);
}

function map(n, start1, stop1, start2, stop2, withinBounds) {
  const newValue =
    ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;

  if (!withinBounds) {
    return newValue;
  }

  if (start2 < stop2) {
    return constrain(newValue, start2, stop2);
  } else {
    return constrain(newValue, stop2, start2);
  }
}
