'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Game);

    this.board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Game, [{
    key: 'playMove',
    value: function playMove(rowIndex, columnIndex) {
      this.board.flipTile(rowIndex, columnIndex);
      if (this.board._playerBoard[rowIndex][columnIndex] === 'B') {
        console.log('The Game Is Over.');
        this.board.print();
      } else if (this.board.hasSafeTiles()) {
        console.log('Congrats! you won');
      } else {
        console.log('Current Board ');
        this.board.print();
      }
    }
  }]);

  return Game;
}();

;

var Board = function () {
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = this.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = this.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Board, [{
    key: 'flipTile',
    value: function flipTile(rowIndex, columnIndex) {
      if (this.playerBoard[rowIndex][columnIndex] !== ' ') {
        return 'This tile has already been flipped!';
      } else if (this._bombBoard[rowIndex][columnIndex] === 'trump') {
        this.playerBoard[rowIndex][columnIndex] = 'trump';
      } else {
        this.playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
      }
      this._numberOfTiles--;
    }
  }, {
    key: 'getNumberOfNeighborBombs',
    value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
      var _this = this;

      var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
      var numberOfRows = this._bombBoard.length;
      var numberOfColumns = this._bombBoard[0].length;
      var numberOfBombs = 0;
      neighborOffsets.forEach(function (offset) {
        var neighborRowIndex = rowIndex + offset[0];
        var neighborColumnIndex = columnIndex + offset[1];
        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex <= numberOfColumns) {
          if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] == 'trump') {
            return numberOfBombs++;
          }
        }
      });
      return numberOfBombs;
    }
  }, {
    key: 'hasSafeTiles',
    value: function hasSafeTiles() {
      return this._numberOfBombs === this._numberOfTiles;
    }
  }, {
    key: 'print',
    value: function print() {
      console.log(this.playerBoard.map(function (row) {
        return row.join(' | ');
      }).join('\n'));
    }
  }, {
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
      var board = [];
      for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
        var row = [];
        for (var columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
          row.push(' ');
        }
        board.push(row);
      }
      return board;
    }
  }, {
    key: 'generateBombBoard',
    value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
      var board = [];
      for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
        var row = [];
        for (var columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
          row.push(null);
        }
        board.push(row);
      }
      var numberOfBombsPlaced = 0;
      while (numberOfBombsPlaced < numberOfBombs) {
        var randomRowIndex = Math.floor(Math.random() * numberOfRows);
        var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        if (board[randomRowIndex][randomColumnIndex] !== 'trump') {
          board[randomRowIndex][randomColumnIndex] = 'trump';
          numberOfBombsPlaced++;
        }
      }
      return board;
    }
  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }]);

  return Board;
}();

var g = new Game(3, 3, 3);
g.playMove(0, 0);