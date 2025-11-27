const boxes = document.querySelectorAll(".box");
const restartButton = document.getElementById("restart");
const text = document.getElementById("text-space");

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    GameController.playRound(index);
  });
});

restartButton.addEventListener("click", () => {
  GameController.resetGame();
});

const Gameboard = (function () {
  const board = ["", "", "", "", "", "", "", "", ""];

  return {
    getBoard: function () {
      return board;
    },

    placeMark: function (index, mark) {
      board[index] = mark;
    },

    resetBoard: function () {
      board.fill("");
    },
  };
})();

function createPlayer(name, mark) {
  return { name: name, mark: mark };
}

const GameController = (function () {
  const player1 = createPlayer("Ricardo", "X");
  const player2 = createPlayer("Cristiano", "O");

  let activePlayer = player1;
  let isGameOver = false;

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

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === player1 ? player2 : player1;
    console.log("Kolej gracza:", activePlayer);
    text.textContent = `Kolej gracza: ${activePlayer.name}`;
  };

  const checkWinner = (board) => {
    for (let element of winnerCombinations) {
      const [a, b, c] = element;

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
    if (isGameOver) return;

    const board = Gameboard.getBoard();

    if (board[index] === "") {
      Gameboard.placeMark(index, activePlayer.mark);

      boxes[index].textContent = activePlayer.mark;

      if (checkWinner(board)) {
        isGameOver = true;
        console.log(`wygrałeś: ${activePlayer.name}`);
        text.textContent = `Wygrałeś: ${activePlayer.name}`;
        return;
      } else if (!board.includes("")) {
        isGameOver = true;
        console.log("Remis");
        text.textContent = "Remis";
        return;
      }
      switchPlayerTurn();
    }
  };

  const resetGame = () => {
    Gameboard.resetBoard();
    isGameOver = false;
    activePlayer = player1;
    text.textContent = `Kolej gracza: ${activePlayer.name}`;
    boxes.forEach((box) => {
      box.textContent = "";
    });
  };

  return { switchPlayerTurn, getActivePlayer, playRound, resetGame };
})();
