const sequelize = require('../db')
const {DataTypes, HasMany} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false}
})

const Token = sequelize.define('token', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    refreshToken: {type: DataTypes.STRING, allowNull: false}
})

const Debtor = sequelize.define('debtor', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull:false},
    
})

const Debt = sequelize.define('debt', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull:false},
    debt: {type: DataTypes.INTEGER, allowNull:false, defaultValue: 0}
})

User.hasOne(Token)
Token.belongsTo(User)

User.hasMany(Debtor)
Debtor.belongsTo(User)

Debtor.hasMany(Debt)
Debt.belongsTo(Debtor)

module.exports = {
    Debtor,
    Debt,
    User,
    Token
}