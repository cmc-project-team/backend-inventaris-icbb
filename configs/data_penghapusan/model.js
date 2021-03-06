const sequelize = require('sequelize');
const db = require('../../db/mysql');
const data_inventaris = require('../data_inventaris/model');


const data_penghapusan = db.define('data_penghapusan', {
    kode: {
        type: sequelize.DataTypes.STRING,
        allowNull: true,
        primaryKey: true
    },
    code : {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    },
    inventaris: {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    },
    alasan: {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    },
    status_penghapusan: {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

data_penghapusan.belongsTo(data_inventaris,{
    foreignKey:{
        name: 'inventaris'
    }
});



module.exports = data_penghapusan;