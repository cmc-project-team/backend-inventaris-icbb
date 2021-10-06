const sequelize = require('sequelize');
const db = require('../../db/mysql');
const data_inventaris = require('../data_inventaris/model');
const data_person = require('../data_person/model');


const data_pengecekan = db.define('data_pengecekan', {
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
    kondisi: {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    },
    person_pengecek: {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

data_pengecekan.belongsTo(data_inventaris,{
    foreignKey: {
        name: 'inventaris'
    }
});
data_pengecekan.belongsTo(data_person,{
    foreignKey: {
        name: 'person_pengecek'
    }
});



module.exports = data_pengecekan;