const sequelize = require('sequelize');
const db = require('../../db/mysql');
const data_barang_golongan = require('../data_barang_golongan/model');


const data_barang = db.define('data_barang', {
    kode: {
        type: sequelize.DataTypes.STRING,
        allowNull: true,
        primaryKey: true
    },
    golongan: {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    },
    code: {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    },
    nama : {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

data_barang.belongsTo(data_barang_golongan, {
    foreignKey: {
        name: 'golongan'
    }
});




// area.removeAttribute('id');
module.exports = data_barang;