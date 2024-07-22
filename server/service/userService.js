const ApiError = require('../error/ApiError')
const {User} = require('../models/models')
const bcrypt = require('bcrypt')
const tokenService = require('./tokenService')
const UserDto = require('../dtos/userDto')

class UserService{
    async registration(username, password){
        const candidate = await User.findOne({where: {username}})
        if(candidate){
            throw ApiError.badRequest("Пользователь с таким именем уже существует")
        }
        const hashPassword = await bcrypt.hash(password, 7)

        const user = await User.create({username, password: hashPassword})
        
        const userDto = new UserDto(user)
        const tokens = tokenService.generateToken({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async login(username, password){
        const user = await User.findOne({where: {username}})
        if(!user){
            throw ApiError.badRequest("Пользователя с таким именем не существует")
        }

        const isPassRight = await bcrypt.compare(password, user.password)
        if(!isPassRight){
            throw ApiError.badRequest("Неверный пароль")
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if(!refreshToken){
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        //console.log(userData)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if(!userData || !tokenFromDb) throw ApiError.UnauthorizedError()

        const user = await User.findOne({where: {id: userData.id}})
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async getUsers(){
        const users = await User.findAll()
        return users
    }
}

module.exports = new UserService()