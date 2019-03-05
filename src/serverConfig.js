const express = require('express')
const http = require('http')
const path = require('path')
const socketIO = require('socket.io')

const app = express()
const server = http.Server(app)
const io = socketIO(server)

const port = 5000

app.set('port', port)
app.use('/static', express.static(__dirname + '/static'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/static/index.html'))
})

server.listen(port, () => {
  console.log(`Starting server on port ${port}`)
})

module.exports = io