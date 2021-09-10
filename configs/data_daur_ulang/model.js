const sequelize = require('sequelize');
const db = require('../../db/mysql');
const data_inventaris = require('../data_inventaris/model');


const data_daur_ulang = db.define('data_daur_ulang', {
    kode: {
        type: sequelize.DataTypes.STRING,
        allowNull: true,
        primaryKey: true
    },
    inventaris_lama: {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    },
    inventaris_baru: {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    },
    tanggal: {
        type: sequelize.DataTypes.DATE,
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

data_daur_ulang.belongsTo(data_inventaris, {
    foreignKey: {
        name: 'inventaris_lama'
    }
});
data_daur_ulang.belongsTo(data_inventaris,{
    foreignKey:{
        name: 'inventaris_baru'
    }
});


// area.removeAttribute('id');
module.exports = data_daur_ulang;