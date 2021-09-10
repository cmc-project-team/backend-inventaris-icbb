const sequelize = require('sequelize');
const db = require('../../db/mysql');


const data_person_type = db.define('data_person_type', {
    kode: {
        type: sequelize.DataTypes.STRING,
        allowNull: true,
        primaryKey: true
    },
    nama: {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});




// area.removeAttribute('id');
module.exports = data_person_type;