function sum(array) {
  return array.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
}

function productAll(array) {
  return array.reduce(
    (accumulator, subarray) =>
      accumulator * subarray.reduce((acc, curr) => acc * curr, 1),
    1
  );
}

function objectify(array) {
  return array.reduce((obj, [key, value]) => {
    obj[key] = value;
    return obj;
  }, {});
}

function luckyNumbers(array) {
  const concatNumbers = array
    .reduce((sentence, number, index, arr) => {
      if (index === 0) {
        return sentence + number;
      } else if (index === arr.length - 1) {
        return sentence + ', and ' + number;
      } else {
        return sentence + ', ' + number;
      }
    }, '')
    .trim();

  return `Your lucky numbers are: ${concatNumbers}`;
}

module.exports = {
  sum,
  productAll,
  objectify,
  luckyNumbers,
};
