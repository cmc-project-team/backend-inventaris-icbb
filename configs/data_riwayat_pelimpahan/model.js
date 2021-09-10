const sequelize = require('sequelize');
const db = require('../../db/mysql');
const data_divisi = require('../data_divisi/model');
const data_inventaris = require('../data_inventaris/model');
const data_ruang = require('../data_ruang/model');


const data_riwayat_pelimpahan = db.define('data_riwayat_pelimpahan', {
    kode: {
        type: sequelize.DataTypes.STRING,
        allowNull: true,
        primaryKey: true
    },
    inventaris: {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    },
    tanggal: {
        type: sequelize.DataTypes.DATE,
        allowNull: true
    },
    divisi: {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    },
    ruang: {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

data_riwayat_pelimpahan.belongsTo(data_inventaris,{
    foreignKey: {
        name: 'inventaris'
    }
});
data_riwayat_pelimpahan.belongsTo(data_divisi,{
    foreignKey: {
        name: 'divisi'
    }
});
data_riwayat_pelimpahan.belongsTo(data_ruang,{
    foreignKey: {
        name: 'ruang'
    }
});



// area.removeAttribute('id');
module.exports = data_riwayat_pelimpahan;