// models/Message.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Message = sequelize.define('Message', {
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
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        profile_picture: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, {
        tableName: 'messages',
        timestamps: false,
    });

    /**
     * Add a new message to the messages table.
     * @param {string} discordId - The Discord ID of the user.
     * @param {string} name - The name of the user.
     * @param {string} messageText - The content of the message.
     * @returns {Promise<Model>} - The created message entry.
     */
    Message.addMessage = async function (discordId, name, messageText) {
        try {
            const newMessage = await Message.create({
                discord_id: discordId,
                name: name,
                message: messageText,
            });
            console.log('Message added:', newMessage.toJSON());
            return newMessage;
        } catch (error) {
            console.error('Error adding message:', error);
            throw error;
        }
    };

    return Message;
};
