import { sequelize } from '../util/db'
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from 'sequelize'
import User from './User';

interface ActiveSession extends Model<InferAttributes<ActiveSession>, InferCreationAttributes<ActiveSession>> {
  'id': CreationOptional<number>;
  'token': string
  'userId': number
  'user': NonAttribute<User>

}

const ActiveSession = sequelize.define<ActiveSession>('active_sessions', {
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
}, { timestamps: false })

export default ActiveSession
