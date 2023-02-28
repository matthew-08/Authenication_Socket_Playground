const router = require('express').Router()
const formValidation = require('../middleware/formValidation')
const pool = require('../db')
const bcrypt = require('bcrypt')
const rateLimiter = require('../controllers/rateLimiter')

router.route('/signIn').get(async (req, res) => {
    if(req.session.user && req.session.user.username) {
        res.status(200).json({ loggedIn: true, username: req.session.user.username, id: req.session.user.id })
    } else {
        res.json({loggedIn:false , username: ''})
    }
}).post(rateLimiter,async (req, res) => {
    const {username, password} = req.body
    console.log('ok')


    const checkForUser = await pool.query('SELECT * FROM users WHERE username=$1', [username])
    
    if(checkForUser.rowCount === 0) {
        return res.status(402).json({loggedIn: false, status: 'no user found'})
    }

    const verifyPass = await bcrypt.compare(password, checkForUser.rows[0].passhash)

    if(verifyPass) {
        req.session.user = {
            username: username,
            id: checkForUser.rows[0].id
        }
        res.json({loggedIn: true, username, id: checkForUser.rows[0].id})
    } else {
        res.status(402).json({loggedin: false, status: 'Incorrect password'})
    }
    

})

router.post('/register', async  (req, res) => {
    const { username, email, password } = req.body

    
    const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if(existingUser.rowCount !== 0) {
        return res.status(402).json({loggedIn: false, status: 'username taken' })
    }
    else {
        const hashedPass = await bcrypt.hash(password, 10);
        const insertUser = await pool.query('INSERT INTO users (username, passhash) VALUES($1, $2)', [username, hashedPass])
        req.session.user = {
            username,
        }
        return res.status(200).json({loggedIn: true, status: 'logged in'})
    }
})

module.exports = router