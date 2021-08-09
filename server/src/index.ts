import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
//Crear el servidor
const app = express();

// Conectar a la BBDD
connectDB();

//Habilitar cors
app.use(cors());

//Habilitar express.json
// app.use(express.json({ extends: true } as any));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Puerto de la app
const port: any = process.env.PORT || 5000;
app.get('/', (_, res) => {
    res.status(200).send();
});

// //Importar rutas
app.use('/api/users', require('./routes/user'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/restaurants', require('./routes/restaurant'));

//Arrancar la app
app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`)
});
