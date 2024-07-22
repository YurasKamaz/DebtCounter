const {User} = require('../models/models')
const ApiError = require('../error/ApiError')
const userService = require('../service/userService')


class userController{
    async registration(req, res, next){
        try {
            const {username, password} = req.body
            const userData = await userService.registration(username, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            
            return res.json(userData)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async login(req, res, next){
        try {
            const {username, password} = req.body;
            const userData = await userService.login(username, password);
            await res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async logout(req, res, next){
        try {
            const {refreshToken} = req.cookies
            //const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return true
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async refresh(req, res, next){
        try {
            const {refreshToken} = req.cookies
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.username)
        return res.json({token})
    }
    
    async getUsers(req, res, next){
        try {
            const users = await userService.getUsers()
            return res.json(users)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new userController()