const mongoose = require('mongoose'); // [cite: 75]

const contatoSchema = new mongoose.Schema({ // [cite: 77]
  nome: { type: String, required: true }, // [cite: 78]
  email: String, // [cite: 79]
  telefone: String, // [cite: 80]
  endereco: String, // [cite: 81]
  fotoId: { type: mongoose.Schema.Types.ObjectId }, // [cite: 82]
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true } // [cite: 83]
});

module.exports = mongoose.model('Contato', contatoSchema); // [cite: 87]