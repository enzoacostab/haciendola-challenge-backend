"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../util/db");
const ActiveSessions_1 = __importDefault(require("./ActiveSessions"));
const sequelize_1 = require("sequelize");
const User = db_1.sequelize.define('users', {
    'id': {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    'name': {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    'email': {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    'disabled': {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    'passwordHash': {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    'createdAt': {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    'updatedAt': {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.Sequelize.literal('CURRENT_TIMESTAMP')
    }
});
User.hasOne(ActiveSessions_1.default, {
    foreignKey: 'userId',
    sourceKey: 'id'
});
ActiveSessions_1.default.belongsTo(User, {
    foreignKey: 'userId',
    targetKey: 'id'
});
exports.default = User;
