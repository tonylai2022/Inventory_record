import mysql from 'mysql2/promise';
import { Request, Response } from 'express';
import connectionConfig from '../mysql/connectionConfig';
import databaseName from "../mysql/dbName";

export default async function editItem(req: Request, res: Response) {
    try {
        const { ID, asin, stock, price } = req.body;
        
        if (!ID) {
            res.status(400).send({ message: "ID is missing in the request." });
            return;
        }

        if (!(asin && stock && price)) {
            res.status(400).send({ message: "Name, stock quantity and price information are required to edit an item. " });
            return;
        }

        if (typeof stock !== "number"){
            res.status(400).send({ message: "Stock quantity must be a number" });
            return;
        }

        if (typeof price !== "number"){
            res.status(400).send({ message: "Price quantity must be a number" });
            return;
        }

        connectionConfig.database = databaseName
        const connection = await mysql.createConnection(connectionConfig);
        connection.connect();

        const tableName = "inventory";
        const queryCommand = `SELECT * FROM ${tableName} WHERE ID=` + mysql.escape(ID);
        const resultFoundWithSpecificID = await connection.query(queryCommand);
        
        if ((resultFoundWithSpecificID[0] as any).length === 0) {
            res.status(400).send({ message: "Request failed due to input of invalid ID." });
        }

        const commandToUpdateData = `UPDATE inventory SET asin=?, stock=?, price=? WHERE ID=?`;
        const values = [asin, stock, price, ID];
        await connection.query(commandToUpdateData, values);

        res.send({ message: "success" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "error" });
    }

}