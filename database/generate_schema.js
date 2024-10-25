// database.js
const { Sequelize } = require('sequelize');
const defineMessage = require('./models/Message');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'data.db',
    logging: console.log, // Logs SQL queries, can be removed in production
});

// Define the models (i.e. database tables) here
const Message = defineMessage(sequelize);
const models = [Message]; // Add other models here as needed

async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connected to the SQLite database.');

        // Sync the models with the database
        for (let model of models) {
            await model.sync();
            console.log(`The '${model.tableName}' table is ready.`);
        }
    } catch (error) {
        console.error('Error connecting to the database:', error);
    } finally {
        // Close the database connection
        await sequelize.close();
        console.log('Database connection closed.');
    }
}

initializeDatabase();
