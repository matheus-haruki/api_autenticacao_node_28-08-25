const multer = require('multer'); // [cite: 148]

const storage = multer.memoryStorage(); // [cite: 149]

// Limite de tamanho do arquivo (ex: 10 MB) [cite: 150]
module.exports = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } }); // [cite: 152]