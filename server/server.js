const express = require('express')
const cors = require('cors')
const { Server } = require('socket.io')
const helmet = require('helmet')
const http = require('http')
const session = require('express-session')
require('dotenv').config()
const sessionMiddleware = require('./controllers/serverController').sessionMiddleware
const authorizeMiddleware = require('./controllers/socketcontroller').authorizeUser

const RedisStore = require('connect-redis')(session)

const app = express()

const server = http.createServer(app)

const redisClient = require('./redis')

const io = new Server(server, {
    cors: {
        credentials: true,
        origin: 'http://localhost:5173'
    }

})
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))

io.engine.use(sessionMiddleware);
io.use(authorizeMiddleware);
app.use(sessionMiddleware)

io.on('connect', socket => {
    console.log(socket.user.id)
    console.log(socket.rooms)
    console.log(socket.request.session.user)
})



app.use(helmet())

app.use(express.json())

app.use('/auth', require('./routes/auth'))

app.use('/friends', require('./routes/friends'))

server.listen(3000, () => console.log('server listening'))

