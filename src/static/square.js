class Square {
  constructor(i, j) {
    this.i = i
    this.j = j
    this.isOpen = false
    this.hasBomb = false
    this.flagged = false
    this.flagSprite = new Image()
    this.flagSprite.src = 'static/flag.png'
    this.bombSprite = new Image()
    this.bombSprite.src = 'static/bomb.png'
  }

  addBomb() {
    if (this.hasBomb) {
      return false
    }
    this.hasBomb = true
    return true
  }

  calcNearbyBombs() {
    this.nearbyBombs = 0
    if (this.hasBomb)
      return
    for (let deltaI = -1; deltaI < 2; deltaI++) {
      for (let deltaJ = -1; deltaJ < 2; deltaJ++) {
        if (!(deltaI == 0 && deltaJ == 0)) {
          if (board.getSquare(this.i + deltaI, this.j + deltaJ) != undefined) {
            this.nearbyBombs += board.getSquare(this.i + deltaI, this.j + deltaJ).hasBomb
          }
        }
          
      }
    }
  }

  update() {

  }

  draw() {
    c.font = 'bold 28px Arial'
    c.fillStyle = '#ffffff'
    c.strokeStyle = '#000000'
    if (this.isOpen) {
      c.fillStyle = '#cccccc'
      c.strokeStyle = '#999999'
    }
    c.fillRect(this.j * 32, this.i * 32, width / widthCoef , height / boardSize.rows)
    c.strokeRect(this.j * 32, this.i * 32, width / widthCoef , height / boardSize.rows)
    if (this.isOpen) {
      c.fillStyle = this.getColor(this.nearbyBombs)
      c.textBaseline = 'top'
      c.textAlign = 'center'
      c.fillText(this.nearbyBombs, this.j * 32 + 16, this.i * 32 + 4)
    }
    if (this.flagged) {
      c.drawImage(this.flagSprite, this.j * 32, this.i * 32)
    } else if (this.hasBomb && this.isOpen){
      c.drawImage(this.bombSprite, this.j * 32, this.i * 32)
    }


  }

  getColor(i) {
    switch(i) {
      case 1:
        return '#0000ff'
      case 2:
        return '#008000'
      case 3:
        return '#ff0000'
      case 4:
        return '#000066'
      case 5:
        return '#990066'
      case 6:
        return '#007878'
      case 7:
        return '#000000'
      case 8:
        return '#666666'
      
    }
  }
}