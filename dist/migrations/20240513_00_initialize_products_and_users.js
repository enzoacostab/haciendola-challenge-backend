"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable quote-props */
const sequelize_1 = require("sequelize");
module.exports = {
    up: (_a) => __awaiter(void 0, [_a], void 0, function* ({ context: queryInterface }) {
        yield queryInterface.createTable('products', {
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
                defaultValue: 100.0
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
        yield queryInterface.createTable('users', {
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
        yield queryInterface.createTable('active_sessions', {
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
        });
        // await queryInterface.addColumn('active_sessions', 'userId', {
        //   type: DataTypes.INTEGER,
        //   allowNull: false,
        //   references: { model: 'users', key: 'id' }
        // })
    }),
    down: (_b) => __awaiter(void 0, [_b], void 0, function* ({ context: queryInterface }) {
        yield queryInterface.dropTable('products');
        yield queryInterface.dropTable('users');
    })
};
