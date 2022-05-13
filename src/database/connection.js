import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// export const connection = new Sequelize(
	// process.env.DB_BASE,
	// process.env.DB_USER,
	// process.env.DB_PASS,
	// {
		// host: process.env.DB_LOCAL,
		// port: 5432,
		// dialect: 'postgres',
	// },
// );


export const connection = new Sequelize(
'postgres://players_user:ov6ERb1LN8aJ9UoLtyyJR476NUCriBYA@dpg-c9shfcfd17cfvotu8sag-a.oregon-postgres.render.com/players',
    {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
);