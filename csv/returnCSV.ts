import mysql from 'mysql2/promise';
import { Request, Response } from 'express';
import connectionConfig from '../mysql/connectionConfig';
import databaseName from "../mysql/dbName";
import createCSV from './createCSV';
import IInventoryItem from '../inventory/IInventoryItem';

export default async function returnCSV(req: Request, res: Response) {
    try {
        connectionConfig.database = databaseName
        const connection = await mysql.createConnection(connectionConfig);
        connection.connect();

        const tableName = "inventory";
        const commandToInsertData = "SELECT * FROM " + tableName;
        const queryResult = await connection.query(commandToInsertData);

        const csv = createCSV((queryResult[0] as IInventoryItem[]));
        res.header('Content-Type', 'text/csv');
        res.attachment("data.csv");
        res.send(csv);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "error" });
    }

}