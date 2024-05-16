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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rollbackMigration = exports.connectToDatabase = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("./config"));
const umzug_1 = require("umzug");
const { POSTGRES_USER, POSTGRES_URL, POSTGRES_DB, POSTGRES_PASS, POSTGRES_HOST } = config_1.default;
exports.sequelize = new sequelize_1.Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASS, {
    host: POSTGRES_HOST,
    dialect: 'postgres'
});
if (POSTGRES_URL) {
    exports.sequelize = new sequelize_1.Sequelize(POSTGRES_URL);
}
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.sequelize.authenticate();
        yield runMigrations();
        console.log('connected to the database');
    }
    catch (err) {
        console.log('failed to connect to the database');
        console.log(err);
        return process.exit(1);
    }
});
exports.connectToDatabase = connectToDatabase;
const migrationConf = {
    migrations: {
        glob: 'migrations/*.ts'
    },
    storage: new umzug_1.SequelizeStorage({ sequelize: exports.sequelize, tableName: 'migrations' }),
    context: exports.sequelize.getQueryInterface(),
    logger: console
};
const runMigrations = () => __awaiter(void 0, void 0, void 0, function* () {
    const migrator = new umzug_1.Umzug(migrationConf);
    const migrations = yield migrator.up();
    console.log('Migrations up to date', {
        files: migrations.map((mig) => mig.name)
    });
});
const rollbackMigration = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (exports.sequelize === null || exports.sequelize === void 0 ? void 0 : exports.sequelize.authenticate());
    const migrator = new umzug_1.Umzug(migrationConf);
    yield migrator.down();
});
exports.rollbackMigration = rollbackMigration;
