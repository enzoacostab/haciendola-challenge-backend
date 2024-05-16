"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../util/db");
const sequelize_1 = require("sequelize");
const Product = db_1.sequelize.define('products', {
    'id': {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'Handle': {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    'Title': {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    'Description': {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    'SKU': {
        type: sequelize_1.DataTypes.BIGINT,
        unique: true,
        allowNull: false
    },
    'Grams': {
        type: sequelize_1.DataTypes.FLOAT,
        defaultValue: 100.0,
    },
    'Stock': {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    'Price': {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    'Compare Price': {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    'Barcode': {
        type: sequelize_1.DataTypes.BIGINT,
        unique: true,
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
exports.default = Product;
