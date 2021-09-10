const sequelize = require('sequelize');
const db = new sequelize('inventaris-yysan', 'root', '',{
    dialect: 'mysql',
    host: 'localhost'
});
console.log("koneksi berhasil");

module.exports = db;