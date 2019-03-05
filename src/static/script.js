// ------ Canvas Setup ------ //

const canvas = document.querySelector('canvas')
canvas.width = width
canvas.height = height
const c = canvas.getContext('2d')

// -------------------------- //

let flags = 0
let score = 0

let socketID = ''
let slot = 0
let currentX = 0

let bombCount = 100
let boardSize = { rows: 16, cols: 60 }
let board = new Board(boardSize.rows, boardSize.cols)

function setup() {
  for (let k = 0; k < bombCount; k++) {
    let i = Math.floor(Math.random()*boardSize.rows)
    let j = Math.floor(Math.random()*boardSize.cols)
    
    while(!board.getSquare(i, j).addBomb()) {
      i = Math.floor(Math.random()*boardSize.rows)
      j = Math.floor(Math.random()*boardSize.cols)
    }
  }
  board.squares.forEach((row, i) => {
    row.forEach((square, j) => {
      square.calcNearbyBombs()
    })
  })
  setupProgressColors()
}

function draw() {
  requestAnimationFrame(draw)
  c.clearRect(0, 0, width, height)

  board.draw()
}

let scrolling = false
let mouseX = 0
let deltaX = 0
let shouldOpen = true

canvas.addEventListener('mousedown', e => {
  shouldOpen = true
  scrolling = true
  mouseX = e.offsetX
})

canvas.addEventListener('mouseup', e => {
  if (e.which == 1 && shouldOpen){
    board.openSquare(Math.floor(e.offsetY/32), Math.floor((e.offsetX + (-deltaX))/32))
    sendMove()
    updateProgressBar(1, currentX)
  }
  scrolling = false
})

window.addEventListener('mousemove', e => {
  if (scrolling) {
    let variation = e.offsetX - mouseX
    if (variation > 1 || variation < 1) {
      shouldOpen = false
    }
    mouseX = e.offsetX
    deltaX += variation
    if (deltaX > 0)
      deltaX = 0
    if (deltaX < -((boardSize.cols-30)*32))
      deltaX = -(boardSize.cols-30)*32
    c.resetTransform()
    c.translate(deltaX, 0)
  }
})

addEventListener('contextmenu', e => {
  board.addFlag(Math.floor(e.offsetY/32), Math.floor((e.offsetX + (-deltaX))/32))

  e.preventDefault()
  return false;
}, false);

addEventListener('keydown', e => {
  if (e.keyCode == 37) {
    deltaX += 320
  } else if (e.keyCode == 39) {
    deltaX -= 320
  }
  if (deltaX > 0)
    deltaX = 0
  else if (deltaX < -((boardSize.cols-30)*32))
    deltaX = -(boardSize.cols-30)*32
  c.resetTransform()
  c.translate(deltaX, 0)
})

setup()
draw()

function increaseScore() {
  score++
  document.getElementById('score').innerHTML = `Score: ${score}`
}

function changeFlagCount() {
  document.getElementById('flags').innerHTML = `Flags: ${flags}`
}

function setupProgressColors() {
  let colors = [
    'rgba(255, 255, 0',
    'rgba(0, 192, 255',
    'rgba(255, 0, 0',
    'rgba(0, 255, 0'
  ]
  for (let i = 0; i < 4; i++) {
    let elem = document.getElementById(`runner_${i+1}`)
    elem.style.backgroundColor = `${colors[i]}, 0.5)`
    elem.style.borderRight = `2px solid ${colors[i]}, 1)`
  }
}

function updatePlayers(players) {
  let runner = 2
  players.forEach(player => {
    if (player.slot != slot) {
      updateProgressBar(runner, player.currentX)
      runner++
    }
  })
}

///////

function updateProgressBar(idx, x) {
  let elem = document.getElementById(`runner_${idx}`)
  let currentWidth = getComputedStyle(elem).width
  currentWidth = currentWidth.substr(0, currentWidth.indexOf('px'))
  currentWidth = 988 / boardSize.cols * (x + 1) + 'px'
  elem.style.width = currentWidth
}