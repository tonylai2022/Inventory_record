import mysql from 'mysql2/promise';
import { Request, Response } from 'express';
import connectionConfig from '../mysql/connectionConfig';
import databaseName from "../mysql/dbName";

export default async function createItem(req: Request, res: Response){
    connectionConfig.database = databaseName
    const connection = await mysql.createConnection(connectionConfig);
    connection.connect();

    const tableName = "inventory";
    const queryCommand = `SELECT * FROM ${tableName}`;
    const result = await connection.query(queryCommand);
    res.send(result[0]);
}