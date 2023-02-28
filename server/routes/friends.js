const router = require('express').Router()
const pool = require('../db')
const redisClient = require('../redis')


router.post('/add', async (req, res) => {
    const { username } = req.body
    const userId = req.session.user.id
    const checkForUser = await pool.query('SELECT username, id FROM USERS WHERE username = $1', [username])

    if(checkForUser.rowCount === 0 || !checkForUser.rowCount) {
        return res.status(402).json({errorMsg: 'User doesn\'t exist'})
    }
    const requestedUserId = checkForUser.rows[0].id

    const checkForExistingFriendship = await pool.query(
    `SELECT * FROM friend_connection 
    WHERE userId1 = $1 and userId2 = $2
    UNION
    SELECT * FROM friend_connection
    WHERE userId1 = $2 and userID2 = $1
    `, [requestedUserId, userId])
    

    if(checkForExistingFriendship.rowCount !== 0) {
        return res.status(402).json({errorMsg:'You are already friends with this user'})
    }

    const addFriend = await pool.query('INSERT INTO friend_connection (userId1, userId2) VALUES($1, $2)', [userId, requestedUserId])
    
    const friendAdded = checkForUser.rows[0]
    const userOnline = await redisClient.exists(friendAdded.id)
    if(userOnline) {
        friendAdded.online = true
    }
    return res.status(200).json(friendAdded)
})

router.get('/friendsList/:id', async (req, res) => {
    const { id: userId } = req.params;

    const getAllUsers = await pool.query(
        `SELECT users.id, users.username FROM friend_connection
         JOIN users ON friend_connection.userId2=users.id WHERE friend_connection.userId1 = $1
         UNION
         SELECT users.id, users.username FROM friend_connection
         JOIN users ON friend_connection.userId1=users.id WHERE friend_connection.userId2 = $1
        `, [userId]
    )
    const result = await (getAllUsers.rows)

    for (const friend of result) {
        const { id } = friend
        const exists = await redisClient.exists(id)
        if(exists) {
            friend.online = true
        }
        else {
            friend.online = false
        }
    }
    console.log(result);


    return res.status(200).json({result})
})

module.exports = router