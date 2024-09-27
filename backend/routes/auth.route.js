
import express from 'express'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import dotenv from 'dotenv'; // Agregar dotenv

dotenv.config(); // Cargar las variables de entorno

const router = express.Router()
const SECRET_KEY = process.env.SECRET_KEY

console.log('Auth Route SECRET_KEY:', SECRET_KEY); // Verificar aquí también

// leer los datos del archivo JSON
const readUsers = () => JSON.parse(fs.readFileSync('./db/users.json', 'utf8'))
const writeUsers = (users) => fs.writeFileSync('./db/users.json', JSON.stringify(users, null, 2))

// registro
router.post('/register', (req, res) => {
    const { email, password } = req.body

    let users = readUsers()

    // verificar si el usuario ya existe
    const userExists = users.find(user => user.mail === email)

    if (userExists) {
        return res.status(400).json({ message: 'El usuario ya existe' })
    }

    // encriptar la contraseña
    const hashedPassword = bcrypt.hashSync(password, 10)

    // crear un nuevo usuario
    const newUser = {
        id: users.length + 1,  // generar un ID basado en la cantidad de usuarios
        email, 
        password: hashedPassword
    }

    // guardar el nuevo usuario en el archivo JSON
    users.push(newUser)
    writeUsers(users)

    return res.json({message: 'Usuario registrado con exito'})
})

// LOGIN
router.post('/login', (req, res) => {
    const { email, password } = req.body

    // Leer los datos del archivo JSON
    let users = readUsers()

    // buscar el usuario por email
    const user = users.find(user => user.email === email)

    if (!user) {
        return res.status(401).json({message: 'Usuario no encontrado'})
    }

    // Comparar la contraseña enviada con la contraseña almacenada
    const passwordIsValid = bcrypt.compareSync(password, user.password)

    if (!passwordIsValid) {
        return res.status(401).json({ message: 'Contraseña incorrecta' })
    }

    // si el LOGIn es exitoso, generar el token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
        expiresIn: '1h', // El token expirará en 1 hora
    })
    return res.json({ token });
})

// Obtener información del usuario autenticado
router.get('/me', (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token.split(' ')[1], SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to authenticate token' });
        }

        const users = readUsers();
        const user = users.find(u => u.id === decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        return res.json({ id: user.id, email: user.email });
    });
});

export default router;