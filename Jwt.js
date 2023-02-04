const jwt = require('jsonwebtoken');

// Secret key
const secretKey = 'YaGkBiSaBuKaYaa#ok@wok';

// Contoh penggunaan secret key
const token = jwt.sign({ id: 123 }, secretKey, { expiresIn: '24h' });

console.log(token);
