//www.101Computing.net/othello-game/

var player=1; //1 for White, 2 for Black
var grid = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 2, 0, 0, 0],
  [0, 0, 0, 2, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
];
var valid = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
];

var dx = [1, 0, -1, -1, 0, 1, 1, -1];
var dy = [1, 1, 1, -1, -1, -1, 0, 0];

function selectCell(row,col) {
//A function used to add a disc
//This function is incomplete
//It should check that the player is allowed to place their disc on the selected cell.
  // valid[0][0]=1;
  if (valid[row][col]) {
    if ((player==1) && (grid[row][col]==0)) {
      grid[row][col]=1;
      player=2;
      document.getElementById("colorTurn").innerHTML="Black Turn";
    } else if ((player==2) && (grid[row][col]==0)) {
      grid[row][col]=2;
      player=1;
      document.getElementById("colorTurn").innerHTML="White Turn";
    }
  }
  
  //Complete the code here to flip existing disc following the rules of the game

  //Then calculate and display the score by counting the number of white discs and the number of black discs (Note: You can do this in the refreshGrid() function)
  
  refreshGrid();
}
function validMoves() {
  // var turn = (player == 1) ? "white" : "black";
  // document.getElementById("colorTurn").innerHTML=turn;
  for (var row = 0; row < 8; ++row) {
    for (var col = 0; col < 8; ++col) {
      if (grid[row][col]) {
        if (player == 1 && grid[row][col] == 1) {
          for (var i = 0; i < 8; ++i) {
            var x = row + dx[i];
            var y = col + dy[i];

            if (x >= 0 && x < 64 && y >= 0 && y < 64) {

            }
          }
        }
      }
      else {

      }
    }
  }
} 

//A function used to refresh the Othello grid on screen
function refreshGrid() {
  // document.write("Gello");
  // resetGrid();
  validMoves()
  for (var row = 0; row < 8; row++) {
    for (var col = 0; col < 8; col++) {
      if (grid[row][col]==0) {
                document.getElementById("cell"+row+col).childNodes[0].style.backgroundColor="#129104";
      } else if (grid[row][col]==1) { //1 for white
                document.getElementById("cell"+row+col).childNodes[0].style.backgroundColor="#FFFFFF";
      } else if (grid[row][col]==2) { //2 for black
                document.getElementById("cell"+row+col).childNodes[0].style.backgroundColor="#000000";
       }
    }
  }  
}

function resetGrid() {
  //Reset all values to 0 in the grid array
  //ADD CODE HERE
  for (var row = 0; row < 8; ++row) {
    for (var col = 0; col < 8; ++col) {
      grid[row][col] = 0;
    }
  }
  grid[3][3] = grid[4][4] = 1;
  grid[3][4] = grid[4][3] = 2;
  refreshGrid();
}


refreshGrid()
