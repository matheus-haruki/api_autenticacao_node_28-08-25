const jwt = require('jsonwebtoken'); // [cite: 92]

module.exports = (req, res, next) => { // [cite: 93]
  const token = req.headers.authorization?.split(' ')[1]; // [cite: 94, 95]

  if (!token) { // [cite: 96]
    return res.status(401).json({ mensagem: 'Token ausente' }); // [cite: 96]
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { // [cite: 97]
    if (err) { // [cite: 98]
      return res.status(403).json({ mensagem: 'Token inválido' }); // [cite: 98]
    }
    req.usuarioId = decoded.id; // [cite: 98]
    next(); // [cite: 99]
  }); // [cite: 100]
}; // [cite: 101]