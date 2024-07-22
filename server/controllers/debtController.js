const {Debt} = require('../models/models')
const ApiError = require('../error/ApiError')

class debtController{
    async create(req, res, next){
        try {
            let {title} = req.body
            let {debt} = req.body
            let {debtorId} = req.body
            const debts = await Debt.create({title, debt, debtorId})
            return res.json(debts)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }       
    }

    async delete(req, res){
        const {id} = req.body;
        //console.log(req.body)
        const debts = await Debt.destroy({where: {id: id}})
        return res.json(debts)
    }

    async update(req, res){
        const {id, title, debt} = req.body
        const debts = await Debt.update({title: title, debt: debt}, {where: {id: id}})
        return res.json(debts)
    }

    async getAll(req, res){
        const debts = await Debt.findAll()
        return res.json(debts)
    }
}

module.exports = new debtController()