const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// Generate a new key pair
const key = ec.genKeyPair();

// Get the public and private keys in hexadecimal format
const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');

// Print the keys to the console
console.log('Private key:', privateKey);
console.log('Public key:', publicKey);
