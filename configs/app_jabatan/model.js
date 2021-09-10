const sequelize = require('sequelize');
const db = require('../../db/mysql');


const app_jabatan = db.define('app_jabatan', {
    kode: {
        type: sequelize.DataTypes.STRING,
        allowNull: true,
        primaryKey: true
    },
    nama : {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});




// area.removeAttribute('id');
module.exports = app_jabatan;