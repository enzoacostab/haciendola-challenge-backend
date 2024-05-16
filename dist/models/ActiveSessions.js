"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../util/db");
const sequelize_1 = require("sequelize");
const ActiveSession = db_1.sequelize.define('active_sessions', {
    'id': {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    'token': {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    'userId': {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
    }
}, { timestamps: false });
exports.default = ActiveSession;
