/* eslint-disable quote-props */
import { Sequelize, DataTypes, QueryInterface } from "sequelize"

module.exports = {
  up: async ({ context: queryInterface }: { context: QueryInterface }) => {
    await queryInterface.createTable('products', {
      'id': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      'handle': {
        type: DataTypes.STRING,
        allowNull: false
      },
      'title': {
        type: DataTypes.STRING,
        allowNull: false
      },
      'description': {
        type: DataTypes.TEXT,
        allowNull: false
      },
      'sku': {
        type: DataTypes.BIGINT,
        unique: true,
        allowNull: false
      },
      'grams': {
        type: DataTypes.FLOAT,
        defaultValue: 100.0
      },
      'stock': {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      'price': {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      'comparePrice': {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      'barcode': {
        type: DataTypes.BIGINT,
        unique: true,
      },
      'createdAt': {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      'updatedAt': {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    })
    await queryInterface.createTable('users', {
      'id': {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      'name': {
        type: DataTypes.TEXT,
        allowNull: false
      },
      'email': {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      'disabled': {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      'passwordHash': {
        type: DataTypes.STRING,
        allowNull: false
      },
      'createdAt': {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      'updatedAt': {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    })
    await queryInterface.createTable('active_sessions', {
      'id': {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      'token': {
        type: DataTypes.STRING,
        allowNull: false
      },
      'userId': {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
      }
    })
    // await queryInterface.addColumn('active_sessions', 'userId', {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: { model: 'users', key: 'id' }
    // })
  },
  down: async ({ context: queryInterface }: { context: QueryInterface }) => {
    await queryInterface.dropTable('products')
    await queryInterface.dropTable('users')
  }
}
