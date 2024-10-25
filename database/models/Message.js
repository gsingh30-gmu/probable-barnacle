// models/Message.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Message', {
        discord_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        tableName: 'messages',
        timestamps: false,
    });
};
