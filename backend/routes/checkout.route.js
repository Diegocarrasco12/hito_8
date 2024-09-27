
import express from 'express';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; // Agregar dotenv

dotenv.config(); // Cargar las variables de entorno

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY 

// Leer y escribir datos del archivo JSON
const readCheckouts = () => JSON.parse(fs.readFileSync('./db/checkouts.json', 'utf8'));
const writeCheckouts = (checkouts) => fs.writeFileSync('./db/checkouts.json', JSON.stringify(checkouts, null, 2));

// Ruta para realizar el checkout
router.post('/', (req, res) => {

    console.log('Cuerpo de la solicitud recibido:', req.body); // Verifica los datos aquí

    const token = req.headers['authorization'];
    
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token.split(' ')[1], SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to authenticate token' });
        }

        const { cart } = req.body   // extraer cart en lugar de pizzas
        const pizzas = cart  // aqui estan las pizzas dentro de cart
        const total = pizzas.reduce((acc, pizza) => acc + (pizza.price * pizza.quantity), 0) // calcular el total basado en las pizzas

        console.log('Pizzas:', pizzas); // Verifica aquí si se recibe correctamente
        console.log('Total:', total);      

        const checkouts = readCheckouts();

        const newCheckout = {
            id: checkouts.length + 1,
            userId: decoded.id,
            pizzas,
            total,
            date: new Date().toISOString()
        };

        checkouts.push(newCheckout);
        writeCheckouts(checkouts);

        return res.json({ message: 'Checkout realizado con éxito', checkoutId: newCheckout.id });
    });
});

export default router;

