import express from 'express';
import returnCSV from './csv/returnCSV';
import inventoryRoutes from './inventory/routes';
import initDB from './mysql/build';

const app = express();
const port = 8080;

app.use(express.json());

app.use('/inventory', inventoryRoutes);

app.get('/csv', returnCSV);

app.use(express.static('public'));


app.listen(port, async () => {
    await initDB();
    console.log(`Listening at PORT ${port}`)
})