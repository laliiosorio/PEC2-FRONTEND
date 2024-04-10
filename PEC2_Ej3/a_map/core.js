function multiplyBy10(array) {
  return array.map((num) => num * 10);
}

function shiftRight(array) {
  return array.map((_, index, arr) => {
    const newIndex = (index - 1 + arr.length) % arr.length;
    return arr[newIndex];
  });
}

function onlyVowels(array) {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  return array.map((str) =>
    str
      .split('')
      .filter((char) => vowels.includes(char.toLowerCase()))
      .join('')
  );
}

function doubleMatrix(array) {
  return array.map((row) => row.map((num) => num * 2));
}

module.exports = {
  multiplyBy10,
  shiftRight,
  onlyVowels,
  doubleMatrix,
};
