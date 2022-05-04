import Sequelize from 'sequelize';
import { connection } from '../database/connection.js';

export const user = connection.define('users',{
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
	pw: {
		type: Sequelize.STRING,
		allowNull: false,		
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,		
	},
	img: {
		type: Sequelize.STRING,
		allowNull: true,		
	},
	pts: {
		type: Sequelize.INTEGER,
		allowNull: true,		
	},
},{
	freezeTableName: true,
	createdAt: false,
	updateAt: false,
	timestamps: false,
});