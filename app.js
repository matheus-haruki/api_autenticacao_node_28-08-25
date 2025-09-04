const express = require('express'); // [cite: 280]
const app = express(); // [cite: 281]
require('dotenv').config(); // [cite: 282]
const mongoose = require('mongoose'); // [cite: 283]
const cors = require('cors'); // [cite: 284]

// 1) Conexão com o MongoDB [cite: 285]
mongoose.connect(process.env.MONGO_URI) // [cite: 285]
  .then(() => console.log('MongoDB conectado')) // [cite: 286]
  .catch(err => console.error('Erro ao conectar no MongoDB:', err)); // [cite: 287]

// 2) Middlewares globais [cite: 288]
app.use(cors()); // [cite: 289]
app.use(express.json()); // [cite: 291]

// 3) Rotas [cite: 292]
const usuarioRoutes = require('./routes/usuarioRoutes'); // [cite: 293]
const contatoRoutes = require('./routes/contatoRoutes'); // [cite: 295]
const uploadRoutes = require('./routes/uploadRoutes'); // [cite: 295]

app.use('/usuarios', usuarioRoutes); // [cite: 296]
app.use('/contatos', contatoRoutes); // [cite: 296]
app.use('/upload', uploadRoutes); // [cite: 296]

module.exports = app; // [cite: 297]