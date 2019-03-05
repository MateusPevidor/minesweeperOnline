class Board {
  constructor(rows, cols) {
    this.rows = rows
    this.cols = cols
    this.createMatrix()
  }

  createMatrix() {
    this.squares = []
    for (let i = 0; i < this.rows; i++) {
      this.squares[i] = []
      for (let j = 0; j < this.cols; j++) {
        this.squares[i].push(new Square(i, j))
      }
    }
  }

  getSquare(i, j) {
    if (i >= 0 && i < this.rows  && j >= 0 && j < this.cols){
      return this.squares[i][j]
    }
  }

  openSquare(x, y) {
    if (y > currentX) {
      currentX = y
    }
    let square = this.getSquare(x, y)
    if (square.isOpen) {
      let flagCount = 0
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          if (!(i == 0 && j == 0)) {
            if (x + i >= 0 && x + i <= this.rows-1 && y + j >= 0 && y + j <= this.cols-1){
              flagCount += this.squares[x + i][y + j].flagged
            }
          }
        }
      }
      if (flagCount == this.squares[x][y].nearbyBombs) {
        for (let i = -1; i < 2; i++) {
          for (let j = -1; j < 2; j++) {
            if (!(i == 0 && j == 0)) {
              if (x + i >= 0 && x + i <= this.rows-1 && y + j >= 0 && y + j <= this.cols-1){
                if (!this.getSquare(x + i, y + j).isOpen && !square.flagged) {
                  this.openSquare(x + i, y + j)
                }
              }
            }
          }
        }
      }
      return
    }
    if (square.flagged || square.isOpen)
      return
    if (square.hasBomb) {
      this.squares.forEach(row => {
        row.forEach(square => {
          square.isOpen = true
        })
      })
    } else {
      square.isOpen = true
      increaseScore()
      if (square.nearbyBombs == 0) {
        for (let i = -1; i < 2; i++) {
          for (let j = -1; j < 2; j++) {
            if (!(i == 0 && j == 0)) {
              if (x + i >= 0 && x + i <= this.rows-1 && y + j >= 0 && y + j <= this.cols-1){
                if (!this.getSquare(x + i, y + j).isOpen && !square.flagged) {
                  this.openSquare(x + i, y + j)
                }
              }
            }
          }
        }
      }
    }
  }

  addFlag(x, y) {
    let square = this.getSquare(x, y)
    
    if (!square.isOpen) {
      square.flagged = !square.flagged
      square.flagged ? flags++ : flags--
      changeFlagCount()
    }
  }

  update() {

  }

  draw() {
    this.squares.forEach((row, i) => {
      row.forEach((square, j) => {
        square.draw()
      })
    })
  }
}