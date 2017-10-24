
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  let board = [];
  let i;
  for (i = 0; i<numberOfRows; i++) {
    let row = [];
    for (let j = 0; j < numberOfColumns; j++){
      row.push(' ');
    } 
    board.push(row)
  }
  return board;
};

//  console.log(generatePlayerBoard(10, 5))

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  let board = [];
  let h;
  for (h = 0; h<numberOfRows; h++) {
    let row = [];
    for (let d = 0; d < numberOfColumns; d++){
      row.push(null);
    } 
    board.push(row)
  }
  let numberOfBombsPlaced = 0; 
  while (numberOfBombsPlaced < numberOfBombs) {
    let randomRowIndex = Math.floor(Math.random() * numberOfRows);
    let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    board[randomRowIndex][randomColumnIndex] = 'B';
    numberOfBombsPlaced ++;
    // there is a chance that bombs go on bombs
  }

  return board;
}

const printBoard = (board) => {
  board.map(row => row.join(' | ')).join('\n');
  console.log(board.map(row => row.join(' | ')).join('\n'));
};

let playerBoard = generatePlayerBoard(3, 4);
// console.log(generatePlayerBoard(3, 4));
let bombBoard = generateBombBoard(3, 4, 5);
// console.log(generateBombBoard(3,4,5));

console.log('Player Board: ');
printBoard(playerBoard);

console.log('Bomb Board: ');
printBoard(bombBoard)

















