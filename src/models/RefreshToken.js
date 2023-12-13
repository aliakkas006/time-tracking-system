import { DataTypes } from 'sequelize';
import sequelize from '../config/config.js';

const RefreshToken = sequelize.define('RefreshToken', {
  user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  issuedIp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiredAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  revokedAt: {
    type: DataTypes.DATE,
  },
  revokedIp: {
    type: DataTypes.STRING,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

export default RefreshToken;
