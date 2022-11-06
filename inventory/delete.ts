import mysql from 'mysql2/promise';
import { Request, Response } from 'express';
import connectionConfig from '../mysql/connectionConfig';
import databaseName from "../mysql/dbName";

export default async function deleteItem(req: Request, res: Response) {
    try {
        const { ID  } = req.body;
        if (!ID) {
            res.status(400).send({ message: "ID is missing in the request." });
            return;
        }

        connectionConfig.database = databaseName
        const connection = await mysql.createConnection(connectionConfig);
        connection.connect();

        const tableName = "inventory";
        const commandToDeleteData = `DELETE FROM ${tableName} WHERE ID=` + mysql.escape(ID);;
        await connection.query(commandToDeleteData);

        res.send({ message: "success" });
    } catch (err) {
        res.status(500).send({ message: "Error." });
    }

}