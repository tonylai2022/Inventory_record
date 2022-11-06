interface IConnectionConfig {
    host: string,
    user: string,
    password: string,
    multipleStatements: boolean,
    database?: string    
}

const connectionConfig: IConnectionConfig = {
    host:'my-sql-database',
    user: 'root',
    password: 'password',
    multipleStatements: true
}

export default connectionConfig;