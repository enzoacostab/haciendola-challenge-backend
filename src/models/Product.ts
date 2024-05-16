import { sequelize } from '../util/db'
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize'

interface Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
  'id': CreationOptional<number>;
  'handle': string
  'title': string
  'description': string
  'sku': number
  'grams': CreationOptional<number>
  'stock': number
  'price': number
  'comparePrice': number
  'barcode': CreationOptional<number>
  'createdAt': CreationOptional<string>
  'updatedAt': CreationOptional<string>
}

const Product = sequelize.define<Product>('products', {
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
    defaultValue: 100.0,
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

export default Product
