import { sequelize } from '../util/db'
import ActiveSession from './ActiveSessions'
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize'

interface User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  'id': CreationOptional<number>;
  'name': string
  'email': string
  'disabled': CreationOptional<boolean>
  'passwordHash': string
  'createdAt': CreationOptional<string>
  'updatedAt': CreationOptional<string>
}

const User = sequelize.define<User>('users', {
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

User.hasOne(ActiveSession, {
  foreignKey: 'userId',
  sourceKey: 'id'
})
ActiveSession.belongsTo(User, {
  foreignKey: 'userId',
  targetKey: 'id'
})

export default User
