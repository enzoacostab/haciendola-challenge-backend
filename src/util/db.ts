import { Sequelize } from "sequelize"
import config from './config'
import { Umzug, SequelizeStorage } from "umzug"

const { POSTGRES_USER, POSTGRES_URL, POSTGRES_DB, POSTGRES_PASS, POSTGRES_HOST } = config

export let sequelize: Sequelize

if (POSTGRES_URL) {
  sequelize = new Sequelize(POSTGRES_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  })
} else {
  sequelize = new Sequelize(POSTGRES_DB!, POSTGRES_USER!, POSTGRES_PASS, {
    host: POSTGRES_HOST,
    dialect: 'postgres'
  })
}

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    console.log('connected to the database')
  } catch (err) {
    console.log('failed to connect to the database')
    console.log(err);
    
    return process.exit(1)
  }
}

const migrationConf = {
  migrations: {
    glob: 'src/migrations/*.ts'
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console
}

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf)
  const migrations = await migrator.up()
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name)
  })
}

export const rollbackMigration = async () => {
  await sequelize?.authenticate()
  const migrator = new Umzug(migrationConf)
  await migrator.down()
}
