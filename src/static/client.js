const socket = io()

socket.emit('newPlayer')

socket.on('playerInfo', info => {
  socketID = info.id
  slot = info.slot
})

socket.on('userPayload', players => {
  updatePlayers(players)
})

function sendMove() {
  socket.emit('newMove', currentX)
}