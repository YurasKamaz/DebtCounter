const Router = require('express')
const router = new Router()
const debtController = require('../controllers/debtController')

router.post('/', debtController.create)
router.get('/', debtController.getAll)
router.delete('/', debtController.delete)
router.put('/', debtController.update)

module.exports = router