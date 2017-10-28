
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  let board = [];
  for (let rowIndex = 0; rowIndex<numberOfRows; rowIndex++) {
    let row = [];
    for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
      row.push(' ');
    } 
    board.push(row)
  }
  return board;
};

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  let board = [];
  for (let rowIndex = 0; rowIndex<numberOfRows; rowIndex++) {
    let row = [];
    for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
      row.push(null);
    } 
    board.push(row)
  }

  let numberOfBombsPlaced = 0; 

  while (numberOfBombsPlaced < numberOfBombs) {
    let randomRowIndex = Math.floor(Math.random() * numberOfRows);
    let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    if (board[randomRowIndex][randomColumnIndex] !== 'trump'){
      board[randomRowIndex][randomColumnIndex] = 'trump';
      numberOfBombsPlaced++;
    }
  }
  return board;
}

const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
const neighborOffsets = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1]
];
const numberOfRows = bombBoard.length;
const numberOfColumns = bombBoard[0].length;
let numberOfBombs = 0; 

neighborOffsets.forEach(offset => {
  let neighborRowIndex = rowIndex + offset[0];
  let neighborColumnIndex = columnIndex + offset[1];
  if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex <= numberOfColumns) {
    if(bombBoard[neighborRowIndex][neighborColumnIndex] == 'trump' ) {
      return numberOfBombs++;
    }
  }
});
return numberOfBombs;
};

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
if (playerBoard[rowIndex][columnIndex] !== ' ') {
  console.log( 'This tile has already been flipped!');
  return;
} else if(bombBoard[rowIndex][columnIndex] === 'trump') {
playerBoard[rowIndex][columnIndex] = 'trump';
} else {
  playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
}
}

const printBoard = (board) => {
  board.map(row => row.join(' | ')).join('\n');
  console.log(board.map(row => row.join(' | ')).join('\n'));
};

let playerBoard = generatePlayerBoard(10, 10);
let bombBoard = generateBombBoard(10, 10, 40);

console.log('Player Board: ');
printBoard(playerBoard);

console.log('Bomb Board: ');
printBoard(bombBoard);

flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board: ');
printBoard(playerBoard);
















