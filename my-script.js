const Gameboard = (function () {
  const board = ["", "", "", "", "", "", "", "", ""];

  return {
    getBoard: function () {
      return board;
    },

    placeMark: function (index, mark) {
      board[index] = mark;
    },
  };
})();

function createPlayer(name, mark) {
  return { name: name, mark: mark };
}

const GameController = (function () {
  const player1 = createPlayer("Ricardo", "X");
  const player2 = createPlayer("Cristiano", "O");
  const players = [player1, player2];

  let activePlayer = player1;

  return {
    switchPlayerTurn: function () {
      activePlayer = activePlayer === player1 ? player2 : player1;
      console.log("Kolej gracza:", activePlayer);
    },

    getActivePlayer: function () {
      return activePlayer;
    },

    playRound: function (index) {
      const board = Gameboard.getBoard();

      if (board[index] === "") {
        Gameboard.placeMark(index, activePlayer.mark);
        this.switchPlayerTurn();
      }
    },
  };
})();
