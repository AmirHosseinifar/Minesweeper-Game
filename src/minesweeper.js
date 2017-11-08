class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this.board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }
  playMove(rowIndex, columnIndex) {
    this.board.flipTile(rowIndex, columnIndex) 
    if(this.board._playerBoard[rowIndex][columnIndex] === 'B') {
      console.log('The Game Is Over.');
      this.board.print();
    }else if (this.board.hasSafeTiles()) {
     console.log('Congrats! you won');
    } else {
      console.log('Current Board ');
      this.board.print();
    }
  }
};

class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = (numberOfRows * numberOfColumns);
    this._playerBoard = this.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = this.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    };
  get playerBoard() {
    return this._playerBoard;
    }

  flipTile(rowIndex, columnIndex) {
    if (this.playerBoard[rowIndex][columnIndex] !== ' ') {
      return 'This tile has already been flipped!';
    } else if (this._bombBoard[rowIndex][columnIndex] === 'trump') {
      this.playerBoard[rowIndex][columnIndex] = 'trump';
    } else {
      this.playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }
    this._numberOfTiles--;
  }

  getNumberOfNeighborBombs(rowIndex, columnIndex) {
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
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0; 
    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex <= numberOfColumns) {
        if(this._bombBoard[neighborRowIndex][neighborColumnIndex] == 'trump' ) {
          return numberOfBombs++;
        }
      }
    });
    return numberOfBombs;
    }
  hasSafeTiles() {
    return this._numberOfBombs === this._numberOfTiles;
  };
  print(){
    console.log(this.playerBoard.map(row => row.join(' | ')).join('\n'))
  };

  generatePlayerBoard(numberOfRows, numberOfColumns) {
    let board = [];
    for (let rowIndex = 0; rowIndex<numberOfRows; rowIndex++) {
      let row = [];
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
        row.push(' ');
      } 
      board.push(row)
    }
    return board;
  }

  generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
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
  };
}

const g = new Game(3, 3, 3);
g.playMove(0,0);
















