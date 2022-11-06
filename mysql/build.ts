import mysql from 'mysql2/promise';
import connectionConfig from './connectionConfig';
import databaseName from "../mysql/dbName";

export default async function initDB() {

  const connection = await mysql.createConnection(connectionConfig);

  await connection.connect();

  const createDBAndTables = `
  CREATE DATABASE IF NOT EXISTS ${databaseName};
  use ${databaseName};

  CREATE TABLE IF NOT EXISTS inventory (
  ID int NOT NULL AUTO_INCREMENT,
  asin varchar(255) NOT NULL,
  stock int NOT NULL,
  price int NOT NULL,
  PRIMARY KEY (ID));
  `;

  await connection.query(createDBAndTables);

}

