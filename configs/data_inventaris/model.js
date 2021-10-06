const sequelize = require('sequelize');
const db = require('../../db/mysql');
const data_barang = require('../data_barang/model');
const app_user = require('../app_user/model');
const data_divisi_ruang = require('../data_divisi_ruang/model');
const data_person = require('../data_person/model');
const data_divisi = require('../data_divisi/model');


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
    lokasi: {
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
    as: 'donatur',
    foreignKey: {
        name: 'person_donatur'
    }
});
data_inventaris.belongsTo(data_divisi,{
    foreignKey: {
        name: 'divisi'
    }
});
data_inventaris.belongsTo(data_divisi_ruang,{
    foreignKey: {
        name: 'lokasi'
    }
});
data_inventaris.belongsTo(data_divisi,{
    as: 'pemilik',
    foreignKey: {
        name: 'kepemilikan'
    }
});
data_inventaris.belongsTo(app_user,{
    foreignKey: {
        name: 'person_pencatat'
    }
}); 


module.exports = data_inventaris;