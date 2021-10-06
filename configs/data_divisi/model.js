const sequelize = require('sequelize');
const  data_person  = require('../data_person/model');
const db = require('../../db/mysql');


const data_divisi = db.define('data_divisi', {
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
    },
    batas_pengecekan_awal: {
        type: sequelize.DataTypes.DATE,
        allowNull: true
    },
    batas_pengecekan_akhir: {
        type: sequelize.DataTypes.DATE,
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});





module.exports = data_divisi;