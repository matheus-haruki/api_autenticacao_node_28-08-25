const mongoose = require('mongoose'); // [cite: 64]

const usuarioSchema = new mongoose.Schema({ // [cite: 65]
  nome: { type: String, required: true }, // [cite: 67]
  email: { type: String, required: true, unique: true }, // [cite: 67]
  senhaHash: { type: String, required: true } // [cite: 67]
}); // [cite: 66]

module.exports = mongoose.model('Usuario', usuarioSchema); // [cite: 68]