import mysql from 'mysql2/promise';
import { Request, Response } from 'express';
import connectionConfig from '../mysql/connectionConfig';
import databaseName from "../mysql/dbName";

export default async function createItem(req: Request, res: Response) {
    try {
        const { asin, stock, price } = req.body;
        if (!(asin && stock && price)) {
            res.status(400).send({ message: "asin, stock quantity and price information are required to create an item. " });
            return;
        }
        
        connectionConfig.database = databaseName
        const connection = await mysql.createConnection(connectionConfig);
        connection.connect();

        const tableName = "inventory";
        const commandToInsertData = `INSERT INTO ${tableName} (asin, stock, price) values ?`;
        const values = [[asin, stock, price]];
        await connection.query(commandToInsertData, [values]);
        res.send({ message: "success" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "error" });
    }

}