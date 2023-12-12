import dotenv from 'dotenv';
import { createServer } from 'http';
import { Sequelize } from 'sequelize';
import app from './app.js';
import sequelizeConfig from './config/config.js';

dotenv.config();

const server = createServer(app);
const port = 4000;

// Initialize Sequelize
const sequelize = new Sequelize(sequelizeConfig);

const main = async () => {
  try {
    // Database connection
    await sequelize.authenticate();
    console.log('Database connected successfully!');

    // Sync the models with the database
    await sequelize.sync({ force: false });
    console.log('Models synchronized with the database.');

    // Server connection
    server.listen(port, async () => {
      console.log(`Express server is listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

main();
