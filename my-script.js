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
  const winnerCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let activePlayer = player1;

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === player1 ? player2 : player1;
    console.log("Kolej gracza:", activePlayer);
  };

  const checkWinner = (board) => {
    for (let i = 0; i < winnerCombinations.length; i++) {
      const [a, b, c] = winnerCombinations[i];

      if (board[a] !== "" && board[a] === board[c] && board[a] === board[b]) {
        return true;
      }
    }
    return false;
  };

  const getActivePlayer = () => {
    return activePlayer;
  };

  const playRound = (index) => {
    const board = Gameboard.getBoard();

    if (board[index] === "") {
      Gameboard.placeMark(index, activePlayer.mark);

      if (checkWinner(board)) {
        console.log(`wygrałeś: ${activePlayer.name}`);
        return;
      }
      switchPlayerTurn();
    }
  };

  return { switchPlayerTurn, getActivePlayer, playRound };
})();
