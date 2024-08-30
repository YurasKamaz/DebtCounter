const {Debtor} = require('../models/models')
const ApiError = require('../error/ApiError')

class debtorController{
    async create(req, res){
        const {name, userId} = req.body
        const debtor = await Debtor.create({name, userId})
        return res.json(debtor)
    }

    async delete(req, res){
        const {id} = req.body;
        const debtor = await Debtor.destroy({where: {id: id}})
        return res.json(debtor)
    }

    async update(req, res){
        const {id, name} = req.body
        const debtor = await Debtor.update({name: name}, {where: {id: id}})
        return res.json(debtor)
    }

    async getAll(req, res, next){
        try {
            const accessToken = req.headers.authorization.split(' ')[1]
            const tokenParts = accessToken.split('.');
            const encodedPayload = tokenParts[1];
            const rawPayload = atob(encodedPayload);
            const user = JSON.parse(rawPayload);
            //console.log(user.id);
            const debtors = await Debtor.findAll({where: {userId: user.id}})
            return res.json(debtors)
        } catch (env) {
            next(ApiError.UnauthorizedError())
        }
        
    }
}

module.exports = new debtorController()