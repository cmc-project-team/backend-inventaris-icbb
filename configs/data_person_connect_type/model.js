const sequelize = require('sequelize');
const db = require('../../db/mysql');
const data_person = require('../data_person/model');
const data_person_type = require('../data_person_type/model');


const data_person_connect_type = db.define('data_person_connect_type', {
    kode: {
        type: sequelize.DataTypes.STRING,
        allowNull: true,
        primaryKey: true
    },
    person: {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    },
    person_type: {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

data_person_connect_type.belongsTo(data_person, {
    foreignKey: {
        name: 'person'
    }
});
data_person_connect_type.belongsTo(data_person_type,{
    foreignKey: {
        name: 'person_type'
    }
});




// area.removeAttribute('id');
module.exports = data_person_connect_type;