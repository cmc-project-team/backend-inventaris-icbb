require('dotenv').config();
const sequelize = require('sequelize');
const db = new sequelize(process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST
});
console.log("koneksi berhasil");

module.exports = db;