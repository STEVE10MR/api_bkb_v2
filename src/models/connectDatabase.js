
import dotenv from 'dotenv'
dotenv.config({ path: './config.env' });
import databaseConnect from '../config/databaseConnect.js';

export const connection = () => databaseConnect.getConnection(process.env.MONGO_NAMEDATABASE_01);
