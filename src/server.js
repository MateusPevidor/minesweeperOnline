const io = require('./serverConfig')

let players = new Array()

io.on('connection', socket => {
  socket.on('newPlayer', () => {
    console.log(`New player connected: ${socket.id}`)
    players.push({ id: socket.id, currentX: 0, slot: io.sockets.server.engine.clientsCount })
    io.to(socket.id).emit('playerInfo', {id: socket.id, slot: io.sockets.server.engine.clientsCount})
  })

  socket.on('newMove', x => {
    players.forEach((player, i) => {
      if (player.id == socket.id) {
        players[i].currentX = x
      }
    })
    io.sockets.emit('userPayload', players)
  })

  socket.on('disconnect', () => {
    players.forEach(player => {
      if (player.id == socket.id) {
        players.splice(players.indexOf(player), 1)
      }
    })
  })
})

setInterval(() => {
  //io.sockets.emit('enemiesData', players.map(a => a.data))
  console.log(players)
}, 1000)