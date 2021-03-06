// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`

import {Board} from './board.js'
class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this.board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }
  playMove(rowIndex, columnIndex) {
    this.board.flipTile(rowIndex, columnIndex) 
    if(this.board._playerBoard[rowIndex][columnIndex] === 'trump') {
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
