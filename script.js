// Setting up variables
const TIE = "tie";
const player1 = "player1";
const player2 = "player2";
let timeout;
let turn = "player1";
let winner = "";
let count = 0;
let trnCnt = 0;
let roww;

let boardMatrix = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
];

function showMessage(message) {
  document.querySelector("#result").innerHTML = message;
  // clear message after 30s
  clearTimeout(timeout);
  timeout = setTimeout(function () {
    document.querySelector("#result").innerHTML = "";
  }, 15000);
}

function init() {
  // display empty board and welcome message
  showMessage(`Let's play! You against your friend.`);
}
// CONTROLLER
// checks hortizontal
function checkHorizontal(newRow, column) {
  column = Number(column);

  //3 left
  if (column >= 3) {
    if (
      turn == boardMatrix[newRow][column - 1] &&
      turn == boardMatrix[newRow][column - 2] &&
      turn == boardMatrix[newRow][column] &&
      turn == boardMatrix[newRow][column - 3]
    ) {
      winner = turn;
      showMessage(`Congratulations ${winner}!`);
      return;
    }
  }
  // two left, one right
  if (column >= 2 && column <= 5) {
    if (
      turn == boardMatrix[newRow][column - 1] &&
      boardMatrix[newRow][column + 1] == turn &&
      boardMatrix[newRow][column] == turn &&
      boardMatrix[newRow][column - 2] == turn
    ) {
      winner = turn;
      showMessage(`Congratulations ${winner}!`);
      return;
    }
  }
  // three right
  if (column <= 3) {
    if (
      turn == boardMatrix[newRow][column + 1] &&
      boardMatrix[newRow][column + 2] == turn &&
      boardMatrix[newRow][column] == turn &&
      boardMatrix[newRow][column + 3] == turn
    ) {
      winner = turn;
      showMessage(`Congratulations ${winner}!`);
      return;
    }
  }
  // two right, one left
  if (column >= 1 && column <= 4) {
    if (
      turn == boardMatrix[newRow][column - 1] &&
      boardMatrix[newRow][column + 1] == turn &&
      boardMatrix[newRow][column] == turn &&
      boardMatrix[newRow][column + 2] == turn
    ) {
      winner = turn;
      showMessage(`Congratulations ${winner}!`);
      return;
    }
  } else {
    return;
  }
}
// check diagonal right
function checkDiagonalRight(newRow, column) {
  column = Number(column);
  //1 up 2 down right
  if (column <= 4 && column >= 1 && newRow <= 3 && newRow >= 1) {
    if (
      boardMatrix[newRow][column] == turn &&
      boardMatrix[newRow + 1][column - 1] == turn &&
      boardMatrix[newRow + 2][column - 2] == turn &&
      boardMatrix[newRow - 1][column + 1] == turn
    ) {
      winner = turn;
      showMessage(`Congratulations ${winner}!`);
      return;
    }
  }

  //3 down right
  if (column <= 3 && column >= 0 && newRow < 3 && newRow >= 0) {
    if (
      boardMatrix[newRow][column] == turn &&
      boardMatrix[newRow + 1][column + 1] == turn &&
      boardMatrix[newRow + 2][column + 2] == turn &&
      boardMatrix[newRow + 3][column + 3] == turn
    ) {
      winner = turn;
      showMessage(`Congratulations ${winner}!`);
      return;
    }
  }
  // 3 up right
  if (column >= 0 && column <= 3 && newRow >= 3) {
    if (
      boardMatrix[newRow][column] == turn &&
      boardMatrix[newRow - 1][column + 1] == turn &&
      boardMatrix[newRow - 2][column + 2] == turn &&
      boardMatrix[newRow - 3][column + 3] == turn
    ) {
      winner = turn;
      showMessage(`Congratulations ${winner}!`);
      return;
    }
  }
  // 2 up 1 down right
  if (column >= 1 && column <= 4 && newRow >= 2 && newRow <= 4) {
    if (
      boardMatrix[newRow][column] == turn &&
      boardMatrix[newRow - 1][column + 1] == turn &&
      boardMatrix[newRow - 2][column + 2] == turn &&
      boardMatrix[newRow + 1][column - 1] == turn
    ) {
      winner = turn;
      showMessage(`Congratulations ${winner}!`);
    }
  }
}

// check diagonal left
function checkDiagonalLeft(newRow, column) {
  column = Number(column);
  //if((newRow +3 <6) &&(newRow-3>-3) &&(column-3 >-1) && (column+3 <7)) {
  if (newRow <= 5 && newRow >= 3 && column >= 3 && column <= 6) {
    //3 left up
    if (
      boardMatrix[newRow][column] == turn &&
      boardMatrix[newRow - 1][column - 1] == turn &&
      boardMatrix[newRow - 2][column - 2] == turn &&
      boardMatrix[newRow - 3][column - 3] == turn
    ) {
      winner = turn;
      showMessage(`Congratulations ${winner}!`);
    }
  }
  if (newRow <= 4 && newRow >= 2 && column >= 2 && column <= 5) {
    //1 down 2 up left
    if (
      boardMatrix[newRow][column] == turn &&
      boardMatrix[newRow + 1][column + 1] == turn &&
      boardMatrix[newRow - 2][column - 2] == turn &&
      boardMatrix[newRow - 1][column - 1] == turn
    ) {
      winner = turn;
      showMessage(`Congratulations ${winner}!`);
    }
  }
  // 1 up 2 down
  if (newRow <= 3 && newRow >= 1 && column >= 0 && column <= 4) {
    if (
      boardMatrix[newRow][column] == turn &&
      boardMatrix[newRow - 1][column - 1] == turn &&
      boardMatrix[newRow + 1][column + 1] == turn &&
      boardMatrix[newRow + 2][column + 2] == turn
    ) {
      winner = turn;
      showMessage(`Congratulations ${winner}!`);
    }
  }
  // // 3 left down
  if (newRow >= 0 && newRow <= 2 && column >= 3 && column <= 6) {
    if (
      boardMatrix[newRow][column] == turn &&
      boardMatrix[newRow + 1][column - 1] == turn &&
      boardMatrix[newRow + 2][column - 2] == turn &&
      boardMatrix[newRow + 3][column - 3] == turn
    ) {
      winner = turn;
      showMessage(`Congratulations ${winner}!`);
    }
  }
}

// checks vertical matches
function checkVertical(newRow, column) {
  column = Number(column);
  if (newRow < 3) {
    if (
      turn == boardMatrix[newRow + 1][column] &&
      turn == boardMatrix[newRow + 2][column] &&
      turn == boardMatrix[newRow + 3][column] &&
      turn == boardMatrix[newRow][column]
    ) {
      winner = turn;
      showMessage(`Congratulations ${winner}!`);
      return winner;
    }
  }
}
// does all the checks: horizontal, vertical, diagonal
function checkWinner(newRow, col) {
  if (winner != "" && winner != "tie") {
    return;
  }
  if (winner === "") {
    checkHorizontal(newRow, col);
    checkVertical(newRow, col);
    checkDiagonalRight(newRow, col);
    checkDiagonalLeft(newRow, col);
  } else if (winner === "tie") {
    showMessage(`There's a tie!`);
  }
}

function play(evt, id) {
  const cellId = evt.target.id;
  const [row, col] = cellId.split("-");
  newPlaceHolder(row, col);
  if (winner === "") {
    insertImage(roww, col);
  }
  // finds the box based on the cell the user clicks, and insert the image in the correct place
  try {
    checkWinner(roww, col);
    changePlayer();
    count = +1;
  } catch (TypeError) {
    changePlayer();
  }
}

//inserting the image according to the player
function insertImage(newRow, collum) {
  // lasso
  let newId = `${newRow}-${collum}`;
  let img = document.createElement("img");
  if (turn == "player1") {
    img.src =
      "https://toppng.com/uploads/preview/western-cowboy-cowgirl-free-clip-art-lasso-png-lasso-11563494262giljsuynv1.png";
    document.getElementById(newId).appendChild(img);
  }
  // cowboy hat
  else {
    img = document.createElement("img");
    img.src =
      "https://clipartcraft.com/images/cowboy-hat-transparent-emoji-9.png";
    document.getElementById(newId).appendChild(img);
  }
}

// function that changes the player once the box is clicked
function changePlayer() {
  if (turn == "player1") {
    turn = "player2";
    return turn;
  } else {
    turn = "player1";
    return turn;
  }
}
//clears the board when the button is clicked
function clearBoard() {
  boardMatrix = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ];
  turn = "player1";
  winner = "";
  counter = 0;
  roww;
  showMessage("");
  for (imgElements of document.querySelectorAll("img")) {
    imgElements.remove("img");
  }
}
// setup default player names
init();

//bubbling down to the lowest empty spot in that column
function newPlaceHolder(row, col) {
  for (let i = 5; i > -1; i--) {
    if (boardMatrix[Number(row) + i][col] === null) {
      // because we need it to always go to the bottom of the column, this is the newSpot
      //let newSpot = boardMatrix[Number(row)+i][col]
      boardMatrix[Number(row) + i][col] = turn;
      roww = Number(row) + i;
      break;
    }
  }
}
