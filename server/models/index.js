require ('mysql2')
const dbConfig = require("../db.config.js");


const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER,
    dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operationsAliases: false
})

const db = {};

db.Sequelize = sequelize;
db.models = {}
db.models.Students = require('./sudents/students.js')(Sequelize, sequelize)
db.models.Classes = require('./classes/classes.js')(Sequelize, sequelize)
module.exports = db

