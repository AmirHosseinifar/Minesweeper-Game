'use strict';

var generatePlayerBoard = function generatePlayerBoard(numberOfRows, numberOfColumns) {
  var board = [];
  var i = void 0;
  for (i = 0; i < numberOfRows; i++) {
    var row = [];
    for (var j = 0; j < numberOfColumns; j++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
};

//  console.log(generatePlayerBoard(10, 5))

var generateBombBoard = function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
  var board = [];
  var h = void 0;
  for (h = 0; h < numberOfRows; h++) {
    var row = [];
    for (var d = 0; d < numberOfColumns; d++) {
      row.push(null);
    }
    board.push(row);
  }
  var numberOfBombsPlaced = 0;
  while (numberOfBombsPlaced < numberOfBombs) {
    var randomRowIndex = Math.floor(Math.random() * numberOfRows);
    var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    board[randomRowIndex][randomColumnIndex] = 'B';
    numberOfBombsPlaced++;
    // there is a chance that bombs go on bombs
  }

  return board;
};

var printBoard = function printBoard(board) {
  board.map(function (row) {
    return row.join(' | ');
  }).join('\n');
  console.log(board.map(function (row) {
    return row.join(' | ');
  }).join('\n'));
};

var playerBoard = generatePlayerBoard(3, 4);
// console.log(generatePlayerBoard(3, 4));
var bombBoard = generateBombBoard(3, 4, 5);
// console.log(generateBombBoard(3,4,5));

console.log('Player Board: ');
printBoard(playerBoard);

console.log('Bomb Board: ');
printBoard(bombBoard);