const sequelize = require('sequelize');
const db = require('../../db/mysql');
const data_divisi = require('../data_divisi/model');
const data_person = require('../data_person/model');
const data_ruang = require('../data_ruang/model');


const data_divisi_ruang = db.define('data_divisi_ruang', {
    kode: {
        type: sequelize.DataTypes.STRING,
        allowNull: true,
        primaryKey: true
    },
    divisi: {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    },
    ruang: {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    },
    person_penanggung_jawab: {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    },
}, {
    freezeTableName: true,
    timestamps: false
});

data_divisi_ruang.belongsTo(data_person, {
    foreignKey: {
        name: 'person_penanggung_jawab'
    }
});

data_divisi_ruang.belongsTo(data_divisi, {
    foreignKey: {
        name: 'divisi'
    }
});

data_divisi_ruang.belongsTo(data_ruang, {
    foreignKey: {
        name: 'ruang'
    }
});




// area.removeAttribute('id');
module.exports = data_divisi_ruang;