const app = require('./app') // varsinainen Express-sovellus
const config = require('./utils/config')
const logger = require('./utils/logger')
const http = require('http')
const cors = require('cors')

const { Server } = require('socket.io')

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id)

  socket.on('join_room', (data) => {
    console.log('joined', data)
    socket.join(data)
  })

  socket.on('send_message', (data) => {
    socket.to(data.id).emit('receive_message', data)
  })

  socket.on('send_task', (data) => {
    socket.to(data.id).emit('receive_tasks', data)
  })

})

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})