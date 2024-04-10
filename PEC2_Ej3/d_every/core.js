// Check to see if all elements in an array
// are even numbers.
function allEven(input) {
  return input.every(number => number % 2 === 0);
}

// Check to see if all elements in an array
// are of the same type.
function allSameType(input) {
  return input.every((element, index, arr) => typeof element === typeof arr[0]);
}

// Check to see if every element in the matrix is
// an array and that every element in the array is
// greater than 0.
function positiveMatrix(input) {
  return input.every(row => Array.isArray(row) && row.every(num => num > 0));
}

// Check that all items in an array are strings
// and that they all only contain the same vowels.
function allSameVowels(input) {
  if (!Array.isArray(input) || input.length === 0 || input.some(item => typeof item !== 'string')) {
    return false;
  }

  const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
  
  const firstWordVowels = input[0]
    .toLowerCase()
    .split('')
    .filter(char => vowels.has(char));

  return input.every(word => {
    const wordVowels = word
      .toLowerCase()
      .split('')
      .filter(char => vowels.has(char));
    
    return wordVowels.every((vowel, index) => vowel === firstWordVowels[index]);
  });
}





module.exports = {
  allEven,
  allSameType,
  positiveMatrix,
  allSameVowels
};
