require('dotenv').config();
const sequelize = require('sequelize');
const {StatusCodes} = require('http-status-codes');
const { connect } = require('../app/enum');
const db = new sequelize(process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST
});
console.log(connect);

module.exports = db;