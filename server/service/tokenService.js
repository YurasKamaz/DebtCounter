const jwt = require('jsonwebtoken')
const {Token} = require('../models/models')

class TokenService{
    generateToken(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {expiresIn: '15m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {expiresIn: '30d'})
        return {accessToken, refreshToken}
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY)
            return userData
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY)
            return userData
        } catch (e) {
            return null
        }
    }

    async saveToken(userID, refreshToken){
        const tokenData = await Token.findOne({where: {userId: userID}})
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await Token.create({userId: userID, refreshToken})
        return token
    }

    async removeToken(refreshToken){
        const tokenData = await Token.destroy({where: {refreshToken}})
        return tokenData
    }

    async findToken(refreshToken){
        const tokenData = await Token.findOne({where: {refreshToken}})
        return tokenData
    }
}

module.exports = new TokenService()