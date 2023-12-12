const sequelizeConfig = {
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '12345',
  database: process.env.DB_NAME || 'time_tracking_system_db',
  port: process.env.PORT,
};

export default sequelizeConfig;
