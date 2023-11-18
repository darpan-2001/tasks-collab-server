const express = require('express')
const router = express()

const {signup, login, getUser} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

router.route('/signup', signup)
router.route('/login', login)
router.route('/getUser', protect, getUser)

module.exports = router