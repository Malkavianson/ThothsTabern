import Sequelize from 'sequelize';
import { connection } from '../database/connection.js';

export const usersWords = connection.define('words',{
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
	},
	username: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	words: {
		type: Sequelize.STRING,
		allowNull: true,		
	},
},{
	freezeTableName: true,
	createdAt: false,
	updateAt: false,
	timestamps: false,
});