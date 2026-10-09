// use in not-wordle*.html

'use strict';

const display = document.getElementById('display');
const input = document.getElementById('input');
const instruction = document.getElementById('instruction');

const answer = WORD.toUpperCase();
const answerLength = answer.length;

const rows = Array(MAX_GUESSES).fill(' ');
const columns = Array(answerLength).fill(' ');

display.style.width = `${answerLength * 2}rem`;
input.style.width = `${answerLength * 2}rem`;
input.setAttribute('minlength', answerLength);
input.setAttribute('maxlength', answerLength);

instruction.innerText = `Type ${answerLength} letters`;

let guesses = 0;

//// Count letters
//// for tracking yellow

let totalCount = {};
for (let letter of answer) {
  totalCount[letter] = totalCount[letter] ? totalCount[letter] + 1 : 1;
}

//// Draw Grid

for ( let rowIdx in rows ) {
  let row = document.createElement('div');
  row.className = 'row';
  row.id = `row-${rowIdx}`;
  display.appendChild(row);
  for ( let columnIdx in columns ) {
    let cell = document.createElement('div');
    cell.className = 'cell';
    cell.id = 'cell-' + rowIdx + '-' + columnIdx;
    row.appendChild(cell);
    cell.append(' ');
  }
}

//// Check guess

// takes guess as uppercase string
function checkCorrect(guess) {
  let result = [];
  let count = {};
  Object.assign(count, totalCount);
  for (let letterIdx in guess) {
    let isMatch = guess[letterIdx] == answer[letterIdx];
    if ( isMatch ) {
      let letter = guess[letterIdx];
      result.push('correct');
      count[letter] -= 1;
    } else {
      result.push('');
    }
  }
  return [result, count];
}

// takes guess as uppercase string
function checkPartiallyCorrect(guess, guessValidity, count) {
  let result = guessValidity;
  for (let letterIdx in guess) {
    let letter = guess[letterIdx];
    let isPresent = answer.includes(letter);
    let isAvailable = count[letter] > 0 && result[letterIdx] == '';
    if ( isPresent && isAvailable ) {
      result[letterIdx] = 'partial';
      count[letter] -= 1;
    }
  }
  return result;
}

// takes guess as uppercase string
function displayGuess(guess, validatedGuess, rowIdx) {
  for (let letterIdx in guess) {
    let letter = guess[letterIdx];
    let cellState = validatedGuess[letterIdx];
    let columnIdx = letterIdx;
    let cellId = 'cell-' + rowIdx + '-' + columnIdx;
    let cell = document.getElementById(cellId);
    cell.innerText = letter;
    if (cellState != '') {
      cell.classList.add(cellState);
    } else {
      cell.classList.add('incorrect');
    }
  }
}

//// Handle input

input.addEventListener('keyup', (e) => {
  // remove anything that isn't a-z or A-Z
  let validInput = '';
  for (let letter of input.value) {
    if ( letter.toUpperCase().match(VALID_CHARS) ) {
      validInput += letter;
    }
  }
  input.value = validInput;

  const guess = input.value.toUpperCase();
  const isValid = guess.match(`${VALID_CHARS}{${answerLength}}`);
  const remainingChars = answerLength - guess.length;

  // update instructions
  if ( remainingChars == 0) {
    instruction.innerText = "Press 'Enter' to guess";
  } else if ( remainingChars == 1) {
    instruction.innerText = `Type 1 letter`;
  } else {
    instruction.innerText = `Type ${remainingChars} letters`;
  }

  // truncate input because some browsers
  // don't truncate to maxlength
  if ( input.value.length > answerLength ) {
    input.value = input.value.slice(0, answerLength);
  }

  // submit guess if valid
  if ( e.key == 'Enter' && isValid ) {
    input.value = '';
    let [correct, count] = checkCorrect(guess);
    let validatedGuess = checkPartiallyCorrect(guess, correct, count);
    let rowIdx = guesses;
    guesses++;
    displayGuess(guess, validatedGuess, rowIdx);
    if (guess == answer) {
      input.outerHTML = `<p>You got it in ${guesses}!<p>`;
      instruction.outerHTML = '';
    }
    if (guesses == MAX_GUESSES) {
      input.outerHTML = `<p>Awww... The answer was '${answer}'.<p>`;
      instruction.outerHTML = '';
    }
  }
});
