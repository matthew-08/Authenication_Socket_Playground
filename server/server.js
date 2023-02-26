const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const http = require('http')
const session = require('express-session')
require('dotenv').config()

const RedisStore = require('connect-redis')(session)

const app = express()

const server = http.createServer(app)

const redisClient = require('./redis')


app.use(session({
    secret: 'a secret key',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        sameSite: 'lax'
    },
    credentials: true,
    name: 'sid',
    store: new RedisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: false,
}))

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))

app.use(helmet())

app.use(express.json())

app.use('/auth', require('./routes/auth'))

app.listen(3000, () => console.log('server listening'))

