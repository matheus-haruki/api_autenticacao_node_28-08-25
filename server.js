const app = require('./app'); // [cite: 299]

const PORT = process.env.PORT || 3000; // [cite: 300]

app.listen(PORT, () => { // [cite: 301]
  console.log(`Servidor rodando na porta ${PORT}`); // [cite: 302]
});