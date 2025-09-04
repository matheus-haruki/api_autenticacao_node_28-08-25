const Usuario = require('../models/Usuario'); // [cite: 109]
const bcrypt = require('bcryptjs'); // [cite: 110]
const jwt = require('jsonwebtoken'); // [cite: 111]

exports.registrar = async (req, res) => { // [cite: 112]
  const { nome, email, senha } = req.body; // [cite: 113]
  try { // [cite: 114]
    const senhaHash = bcrypt.hashSync(senha, 10); // [cite: 115]
    const usuario = new Usuario({ nome, email, senhaHash }); // [cite: 116]
    await usuario.save(); // [cite: 116]
    res.status(201).json({ mensagem: 'Usuário criado' }); // [cite: 117]
  } catch (err) { // [cite: 118]
    if (err.code === 11000) { // [cite: 120]
      return res.status(409).json({ mensagem: 'Email já cadastrado' }); // [cite: 120]
    }
    res.status(500).json({ mensagem: 'Erro ao registrar', detalhe: err.message }); // [cite: 122]
  }
}; // [cite: 125]

exports.login = async (req, res) => { // [cite: 126]
  const { email, senha } = req.body;
  try { // [cite: 127]
    const usuario = await Usuario.findOne({ email }); // [cite: 128]
    if (!usuario) { // [cite: 129]
      return res.status(404).json({ mensagem: 'Usuário não encontrado' }); // [cite: 129]
    }
    const senhaValida = bcrypt.compareSync(senha, usuario.senhaHash); // [cite: 131]
    if (!senhaValida) { // [cite: 131]
      return res.status(401).json({ mensagem: 'Senha incorreta' }); // [cite: 131]
    }
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // [cite: 132]
    res.json({ token }); // [cite: 133]
  } catch (err) { // [cite: 134]
    res.status(500).json({ mensagem: 'Erro ao autenticar', detalhe: err.message }); // [cite: 135]
  }
}; // [cite: 138]