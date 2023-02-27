const redisClient = require('../redis')


module.exports.authorizeUser = (socket, next) => {
    console.log(socket.request);
     if(!socket.request.session || !socket.request.session.user) {
        console.log('bad req')
        next(new Error('not authorized'))
    }
    else {
        socket.user = {...socket.request.session.user}
        next();
    }
}
