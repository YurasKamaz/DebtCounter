const Router = require('express')
const router = new Router()
const debtorController = require('../controllers/debtorController')

router.post('/', debtorController.create)
router.get('/', debtorController.getAll)
router.delete('/', debtorController.delete)
router.put('/', debtorController.update)

module.exports = router