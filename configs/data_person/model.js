const sequelize = require('sequelize');
const db = require('../../db/mysql');


const data_person = db.define('data_person', {
    kode: {
        type: sequelize.DataTypes.STRING,
        allowNull: true,
        primaryKey: true
    },
    nama: {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    },
    alamat: {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    },
    no_telp: {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});




// area.removeAttribute('id');
module.exports = data_person;