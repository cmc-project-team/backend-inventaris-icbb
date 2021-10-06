const sequelize = require('sequelize');
const db = require('../../db/mysql');
const data_person = require('../data_person/model');


const data_ruang = db.define('data_ruang', {
    kode: {
        type: sequelize.DataTypes.STRING,
        allowNull: true,
        primaryKey: true
    },
    code: {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    },
    nama: {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});



module.exports = data_ruang;