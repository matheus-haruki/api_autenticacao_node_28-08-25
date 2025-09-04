const Contato = require('../models/Contato'); // [cite: 231]

exports.criar = async (req, res) => { // [cite: 232]
  const { nome, email, telefone, endereco, fotoId } = req.body; // [cite: 233]
  try {
    const contato = new Contato({ nome, email, telefone, endereco, fotoId, usuarioId: req.usuarioId }); // [cite: 234, 235]
    await contato.save(); // [cite: 236]
    res.status(201).json({ mensagem: 'Contato criado', contato }); // [cite: 237]
  } catch (err) { // [cite: 238]
    res.status(500).json({ mensagem: 'Erro ao criar', detalhe: err.message }); // [cite: 239]
  }
}; // [cite: 241]

exports.listar = async (req, res) => { // [cite: 242]
  const contatos = await Contato.find({ usuarioId: req.usuarioId }).lean(); // [cite: 244, 246]
  res.json(contatos); // [cite: 247]
}; // [cite: 243]

exports.buscarPorId = async (req, res) => { // [cite: 248]
  const contato = await Contato.findOne({ _id: req.params.id, usuarioId: req.usuarioId }).lean(); // [cite: 249]
  if (!contato) return res.status(404).json({ mensagem: 'Contato não encontrado' }); // [cite: 250]
  res.json(contato); // [cite: 252]
};

exports.atualizar = async (req, res) => { // [cite: 253]
  const atualizado = await Contato.findOneAndUpdate( // [cite: 255]
    { _id: req.params.id, usuarioId: req.usuarioId }, // [cite: 256]
    req.body, // [cite: 257]
    { new: true } // [cite: 258]
  ).lean();
  if (!atualizado) return res.status(404).json({ mensagem: 'Contato não encontrado' }); // [cite: 260]
  res.json(atualizado); // [cite: 262]
};

exports.deletar = async (req, res) => { // [cite: 263]
  const excluido = await Contato.findOneAndDelete({ _id: req.params.id, usuarioId: req.usuarioId }); // [cite: 264]
  if (!excluido) return res.status(404).json({ mensagem: 'Contato não encontrado' }); // [cite: 265]
  res.json({ mensagem: 'Contato deletado' }); // [cite: 267]
};