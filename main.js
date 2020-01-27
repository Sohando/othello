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

var dx = [-1, -1, -1, 0, 0, 1, 1, 1];
var dy = [-1, 0, 1, -1, 1, -1, 0, 1];

function selectCell(row,col) {
//A function used to add a disc
//This function is incomplete
//It should check that the player is allowed to place their disc on the selected cell.
  // valid[0][0]=1;
  // console.log(row, col);
  // console.log(valid[row][col])
  // resetValid();
  validMoves();

  if (valid[row][col]) {
    if ((player == 1)) {
      grid[row][col]=1;
      player=2;
      document.getElementById("colorTurn").innerHTML="Black Turn";
    } else if ((player==2)) {
      grid[row][col]=2;
      player=1;
      document.getElementById("colorTurn").innerHTML="White Turn";
    }

    if (player == 2) {
      console.log(row, col);
      for (var i = 0; i < 8; ++i) {
        var x = row + dx[i];
        var y = col + dy[i];
        var flag = false;
        var t1 = row;
        var t2 = col;
        while (limit(x, y)) {
          
          if (grid[x][y] == 1) {
            flag = true;
            break;
          }
          x += dx[i];
          y += dy[i];
        }
        if (flag) {
          while (t1 <= x && t2 <= y) {
            grid[t1][t2] = 1;
            t1 += dx[i];
            t2 += dy[i];
          }
        }
      }      
    }
    else if (player == 1) {
      for (var i = 0; i < 8; ++i) {
        var x = row + dx[i];
        var y = col + dy[i];
        var flag = false;
        var t1 = row;
        var t2 = col;
        while (limit(x, y)) {
          
          if (grid[x][y] == 2) {
            flag = true;
            break;
          }
          x += dx[i];
          y += dy[i];
        }
        if (flag) {
          while (t1 <= x && t2 <= y) {
            grid[t1][t2] = 1;
            t1 += dx[i];
            t2 += dy[i];
          }
        }
      }   
    }
  }
  
  //Complete the code here to flip existing disc following the rules of the game


  //Then calculate and display the score by counting the number of white discs and the number of black discs (Note: You can do this in the refreshGrid() function)
  // resetValid();
  refreshGrid();
}

function limit(x, y) {
  return (x >= 0 && x < 8 && y >= 0 && y < 8);
}
function validMoves() {
  if (player == 1) {
    for (var row = 0; row < 8; ++row) {
      for (var col = 0; col < 8; ++col) {
        for (var i = 0; i < 8; ++i) {
          var x = row + dx[i];
          var y = col + dy[i];
          var flag = false;

          if (limit(x, y)) {
            // console.log(x, y)
            if (grid[x][y] == 2) {
              while (limit(x, y)) {
                x += dx[i];
                y += dy[i];
                // console.log(x, y);
                if (grid[x][y] == 1) {
                  flag = true;
                  break;
                }
                if (!grid[x][y]) {
                  break;
                }
               
              }
              if (flag) {
                valid[row][col] = 1;
                grid[row][col] = 3;
              }
            }
          }
        }
      }
    }
  }
  else {
    // Player 2
    console.log(player)
    for (var row = 0; row < 8; ++row) {
      for (var col = 0; col < 8; ++col) {
        if (!grid[row][col]) {
          for (var i = 0; i < 8; ++i) {
            var x = row + dx[i];
            var y = col + dy[i];
            var flag = false;

            if (limit(x, y)) {
              
              if (grid[x][y] == 1) {
                console.log(x, y, "ami")
                while (limit(x, y)) {
                  console.log(x, y);
                  x += dx[i];
                  y += dy[i];
                  console.log(x, y);
                  console.log(dx[i], dy[i]);
                  
                  if (grid[x][y] == 2) {
                    flag = true;

                    break;
                  }
                  if (!grid[x][y]) {
                    console.log("Here")
                    break;
                  }
                }
                if (flag) {
                  console.log(row, col, "F");
                  valid[col][row] = 1;
                  grid[row][col] = 3;
                }
              }
            }
          }
        }
      }
    }
  }
}

//A function used to refresh the Othello grid on screen
function refreshGrid() {
  // document.write("Gello");
  // resetGrid();
  resetValid();
  validMoves();
  for (var row = 0; row < 8; row++) {
    for (var col = 0; col < 8; col++) {
      if (grid[row][col]==0) {
                document.getElementById("cell"+row+col).childNodes[0].style.backgroundColor="#129104";
      } else if (grid[row][col]==1) { //1 for white
                document.getElementById("cell"+row+col).childNodes[0].style.backgroundColor="#FFFFFF";
      } else if (grid[row][col]==2) { //2 for black
                document.getElementById("cell"+row+col).childNodes[0].style.backgroundColor="#000000";
      }
      else if (grid[row][col]==3){
          document.getElementById("cell"+row+col).childNodes[0].style.backgroundColor="red";
      }
    }
  } 
  
  
}
function resetValid() {
  for (var row = 0; row < 8; ++row) {
    for (var col = 0; col < 8; ++col) {
      valid[row][col] = 0;
      if (grid[row][col] == 3) grid[row][col] = 0;
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

resetValid();
validMoves();
refreshGrid();
