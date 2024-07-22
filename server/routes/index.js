const Router = require('express')
const debtsRouter = require('./debtsRouter')
const debtorRouter = require('./debtorRouter')
const userRouter = require('./userRouter')
const router = new Router()

router.use('/', userRouter)
router.use('/debtors', debtorRouter)
router.use('/debts', debtsRouter)

module.exports = router