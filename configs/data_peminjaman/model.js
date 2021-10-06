const sequelize = require('sequelize');
const db = require('../../db/mysql');
const data_barang = require('../data_barang/model');
const data_person = require('../data_person/model');


const data_peminjaman = db.define('data_peminjaman', {
    kode: {
        type: sequelize.DataTypes.STRING,
        allowNull: true,
        primaryKey: true
    },
    code: {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    },
    tanggal_pinjam: {
        type: sequelize.DataTypes.DATE,
        allowNull: true
    },
    tanggal_kembali: {
        type: sequelize.DataTypes.DATE,
        allowNull: true
    },
    barang: {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    },
    kondisi_pinjam: {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    },
    kondisi_kembali: {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    },
    dokumen: {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    },
    person_peminjam: {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

data_peminjaman.belongsTo(data_barang,{
    foreignKey: {
        name: 'barang'
    }
});
data_peminjaman.belongsTo(data_person,{
    foreignKey:{
        name: 'person_peminjam'
    }
});




module.exports = data_peminjaman;