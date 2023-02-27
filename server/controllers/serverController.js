const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const redisClient = require('../redis')


const sessionMiddleware = session({
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
})

const wrap = (expressMiddleware) => {
    (socket, next) => expressMiddleware(socket.request, {}, next)
}

module.exports = { sessionMiddleware }