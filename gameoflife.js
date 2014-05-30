// grid generator 
// grid coordination system is based on array by poisition x + y * width

function Grid(width, height) {
  this.width = width;
  this.height = height;
  this.id = environment;
  this.el = environment;
  //this.life = new Life(environment);
  this.buildTable();
  this.grid = this.seed();
  // var seed = test.seed(100,100);
  this.displayGrid();
  // this.life.generate(this);
}
// // the value of the point
// Grid.prototype.valueAt = function(point) {
//   return this.cells[point.y * this.width + point.x];
// };

  // table generator 

  function Life(id) {
    this.id = id;
    this.el = id;
  }

  Grid.prototype.buildTable = function() {
    for (var i = this.width-1; i >= 0; i--) {
      var tr = this.el.insertRow();
      for (var j = this.height-1; j >= 0; j--) {
        var td = tr.insertCell();
        td.id = i + "x" + j;
      }
    }
  };

  Grid.prototype.setCell = function(cell) {
    var row = cell.row,
        col = cell.col,
        isAlive = cell.isAlive();

    var domCell = document.getElementById(row + "x" + col);
    if (isAlive) {
      domCell.className = "alive";
    } else {
      domCell.className = "dead";
    }
  };

  // diplay seeded elements onto the grid
  Grid.prototype.displayGrid = function() {
    for (var i = 0; i < this.width; i++) {
      for (var j = 0; j < this.height; j++ ){
        var cell = this.grid[i][j];
        this.setCell(cell);        
      }
    }
  };

  //populates the number of living/cells to start with
  //create an object for each individual cell
  Grid.prototype.seed = function() {
    var grid = [];
    for (var i = 0; i < this.width; i++ ){
      var row = [];
        for (var j = 0; j < this.height; j++) {
          var cell = new Cell(i, j);
          if (Math.random() <= 0.5) {
            cell.live();
          } else {
            cell.die();
          }
          row.push(cell);
        }
        grid.push(row);
    }
    return grid;
  };
  Grid.prototype.generate = function() {
    this.updateCells();
    this.displayGrid();
  }
  Grid.prototype.updateCells = function() {
    var oldArray = this.grid;
    var newArray = [];
    for (var i = 0; i < this.width; i++) {
      var newRowArray = [];
      for (var j = 0; j < this.height; j++) {
        var cell = this.grid[i][j];
        var lifeRules = this.calculateNeighbors(oldArray, i, j);
        var newCell = new Cell(i, j);
        if (lifeRules === 1) {
          newCell.live();
        } else if (lifeRules === 0) {
          newCell.die();
        }
        newRowArray.push(newCell);
      }
      newArray.push(newRowArray);
    }
    this.grid = newArray;
    return this.grid;
  };

  Grid.prototype.calculateNeighbors = function(arr, x, y) {
    var neighborsCount = 0;
    var isAlive = arr[x][y].status === 1;

    var left = (x - 1 < 0)         ? this.width - 1 : x-1,
        right = (x + 1 > this.width-1)  ? 0        : x + 1,
        top = (y - 1 < 0)          ? this.height - 1 : y - 1,
        bottom = (y + 1 > this.height-1)? 0       : y + 1;

      neighborsCount = 
        // top left
        arr[left][top].status +
        // top right
        arr[right][top].status +
        // top
        arr[x][top].status +
        // right
        arr[right][y].status +
        // left
        arr[left][y].status +
        // bottom
        arr[x][bottom].status +
        // bottom left
        arr[left][bottom].status +
        // bottom right
        arr[right][bottom].status;

    if (isAlive) {
      // Any live cell with fewer than two live neighbours dies, as if caused by under-population.
      if (neighborsCount < 2) {
        return 0;
      } 
      // Any live cell with two or three live neighbours lives on to the next generation.
        else if (neighborsCount === 2 || neighborsCount === 3) {
          return 1;
        } 
      // Any live cell with more than three live neighbours dies, as if by overcrowding.
        else if (neighborsCount > 3) {
          return 0;
        } 

    } 
    // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
    else if (!isAlive && neighborsCount === 3) {
      return 1;
    }
  }

  // Cell object to determine if the cell is alive or dead.
  // status 0 = DEAD
  // status 1 = ALIVE
  function Cell(width, height) {
    this.row = width;
    this.col = height;
    this.status = 0;
  }

  Cell.prototype.live = function() {
    this.status = 1;
  };
  Cell.prototype.die = function() {
    this.status = 0;
  };
  Cell.prototype.getStatus = function() {
    return this.status;
  };
  Cell.prototype.isAlive = function() {
    return this.status === 1;
  };



  //   test.buildTable(100,100);
  // var seed = test.seed(100,100);
  // test.displayGrid(seed);

var defaults = {
  width: '80',
  height: '80',
  interval: 150
};
var initiator = new Grid(defaults.width,defaults.height);
setInterval(function() { initiator.generate() }, defaults.interval);
