const sequelize = require('sequelize');
const db = require('../../db/mysql');
const data_barang = require('../data_barang/model');
const data_divisi = require('../data_divisi/model');
const data_person = require('../data_person/model');
const data_ruang = require('../data_ruang/model');


const data_inventaris = db.define('data_inventaris', {
    kode: {
        type: sequelize.DataTypes.STRING,
        allowNull: true,
        primaryKey: true
    },
    code: {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    },
    barang: {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    },
    harga: {
        type: sequelize.DataTypes.DOUBLE,
        allowNull: true
    },
    person_donatur: {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    },
    divisi: {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    },
    ruang: {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    },
    kepemilikan:{
        type: sequelize.DataTypes.STRING,
        allowNull: true
    },
    kondisi: {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    },
    status_lokasi: {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    },
    dokumen: {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    },
    person_pencatat: {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    },
    tanggal_masuk: {
        type: sequelize.DataTypes.DATE,
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

data_inventaris.belongsTo(data_barang, {
    foreignKey: {
        name: 'barang'
    }
});
data_inventaris.belongsTo(data_person,{
    foreignKey: {
        name: 'person_donatur'
    }
});
data_inventaris.belongsTo(data_divisi,{
    foreignKey: {
        name: 'divisi'
    }
});
data_inventaris.belongsTo(data_ruang,{
    foreignKey: {
        name: 'ruang'
    }
});
data_inventaris.belongsTo(data_person,{
    foreignKey: {
        name: 'kepemilikan'
    }
});
data_inventaris.belongsTo(data_person,{
    foreignKey: {
        name: 'person_pencatat'
    }
}); 


// area.removeAttribute('id');
module.exports = data_inventaris;