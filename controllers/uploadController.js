const { GridFSBucket, ObjectId } = require('mongodb'); // [cite: 156]
const mongoose = require('mongoose'); // [cite: 157]

// Validação de tipos de imagem permitidos [cite: 158]
const TIPOS_PERMITIDOS = new Set(['image/jpeg', 'image/png', 'image/webp']); // [cite: 159]

exports.enviar = async (req, res) => { // [cite: 160]
  if (!req.file) { // [cite: 161]
    return res.status(400).json({ erro: 'Nenhum arquivo enviado' }); // [cite: 161]
  }
  if (!TIPOS_PERMITIDOS.has(req.file.mimetype)) { // [cite: 162]
    return res.status(415).json({ erro: 'Tipo de arquivo não suportado' }); // [cite: 164]
  }
  try { // [cite: 165]
    const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'imagens' }); // [cite: 166]
    const uploadStream = bucket.openUploadStream(req.file.originalname, { // [cite: 169]
      contentType: req.file.mimetype, // [cite: 170]
      metadata: { usuarioId: req.usuarioId } // [cite: 171]
    });
    uploadStream.end(req.file.buffer, () => { // [cite: 172]
      res.status(201).json({ // [cite: 173]
        fileId: uploadStream.id.toString(), // [cite: 174]
        filename: uploadStream.filename, // [cite: 175]
        contentType: req.file.mimetype // [cite: 176]
      });
    });
  } catch (err) { // [cite: 179]
    res.status(500).json({ erro: 'Falha no upload', detalhe: err.message }); // [cite: 180]
  }
}; // [cite: 182]

exports.baixar = async (req, res) => { // [cite: 183]
  try { // [cite: 184]
    const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'imagens' }); // [cite: 185]
    const fileId = new ObjectId(req.params.id); // [cite: 186]
    bucket.openDownloadStream(fileId).pipe(res) // [cite: 193]
      .on('error', () => res.status(404).send('Arquivo não encontrado')); // [cite: 194]
  } catch (err) { // [cite: 195]
    res.status(400).send('ID inválido'); // [cite: 196]
  }
}; // [cite: 198]