
import bcrypt from 'bcryptjs'

const password = '123123'; // Contraseña en texto plano

// Cifrar la contraseña
const hashedPassword = bcrypt.hashSync(password, 10);

console.log(hashedPassword); // Mostrar la contraseña cifrada
