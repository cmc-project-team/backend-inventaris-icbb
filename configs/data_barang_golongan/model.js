const sequelize = require('sequelize');
const db = require('../../db/mysql');


const data_barang_golongan = db.define('data_barang_golongan', {
    kode: {
        type: sequelize.DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
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




module.exports = data_barang_golongan;