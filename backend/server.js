import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoute from './routes/auth.route.js';
import checkoutRoute from './routes/checkout.route.js';
import pizzaRoute from './routes/pizza.route.js';
import dotenv from 'dotenv';


dotenv.config()

// Inicializar la aplicación Express
const app = express();

// Leer la clave secreta desde el archivo .env
const SECRET_KEY = process.env.SECRET_KEY;
console.log('SECRET_KEY:', SECRET_KEY);


// Middleware
app.use(express.json()); // Manejo de JSON en el cuerpo de las solicitudes
app.use(cors()); // Habilitar CORS
app.use(bodyParser.json()); // Middleware para manejar JSON

// Rutas
app.use('/api/auth', authRoute);
app.use('/api/pizzas', pizzaRoute);
app.use('/api/checkouts', checkoutRoute);

app.use((_, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Configurar el puerto y arrancar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
