import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const connection = new Sequelize(
	process.env.DB_BASE,
	process.env.DB_USER,
	process.env.DB_PASS,
	{
		host: process.env.DB_LOCAL,
		port: 5432,
		dialect: 'postgres',
	},
)