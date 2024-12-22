import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express()

app.get('/', (req, res) => {
  res.send('<h1>Ruleta de perdigones</h1>')
})

const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
})

io.on('connection', (socket) => {
  console.log('New connection:', socket.id)

  socket.on('shoot', () => {
    const result = Math.random() < 0.5 ? 'hit' : 'fail'
    socket.emit('shoot-result', result)
  })
})

const PORT = process.env.PORT ?? 3002

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
