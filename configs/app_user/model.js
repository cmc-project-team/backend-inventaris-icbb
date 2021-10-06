const sequelize = require('sequelize');
const app_jabatan = require('../app_jabatan/model');
const data_divisi = require('../data_divisi/model');
const db = require('../../db/mysql');


const app_user = db.define('app_user', {
    kode: {
        type: sequelize.DataTypes.STRING,
        allowNull: true,
        primaryKey: true,
    },
    nip: {
        type: sequelize.DataTypes.STRING,
        allowNull: true,
    },
    nama : {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    },
    jabatan: {
        type: sequelize.DataTypes.STRING,
        allowNull: true,
    },
    divisi: {
        type: sequelize.DataTypes.STRING,
        allowNull: true,
    },
    no_hp: {
        type: sequelize.DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: sequelize.DataTypes.STRING,
        allowNull: true,
    },
    password: {
        type: sequelize.DataTypes.STRING,
        allowNull: true,
    },
    alamat: {
        type: sequelize.DataTypes.STRING,
        allowNull: true,
    },
    role:{
        type: sequelize.DataTypes.INTEGER,
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

app_user.belongsTo(app_jabatan, {
    foreignKey: {
        name: 'jabatan'
    }
});
app_user.belongsTo(data_divisi, {
    foreignKey: {
        name: 'divisi'
    }
});





module.exports = app_user;