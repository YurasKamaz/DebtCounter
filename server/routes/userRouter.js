const Router = require('express')
const router = new Router()
const {body} = require('express-validator')
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration',
    body('password').isLength({min: 3, max:16}),
    userController.registration);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers)

module.exports = router