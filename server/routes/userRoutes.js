const express = require('express')
const router = express()

const {signup, login, getUser} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

router.post('/signup', signup)
router.post('/login', login)
router.get('/getUser', protect, getUser)

module.exports = router