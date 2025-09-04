const express = require('express'); // [cite: 269]
const router = express.Router(); // [cite: 270]
const controller = require('../controllers/contatoController'); // [cite: 271]
const auth = require('../middleware/authMiddleware'); // [cite: 272]

router.use(auth); // Aplica autenticação a todas as rotas abaixo 

router.get('/', controller.listar); // [cite: 274]
router.get('/:id', controller.buscarPorId); // [cite: 274]
router.post('/', controller.criar); // [cite: 274]
router.put('/:id', controller.atualizar); // [cite: 275]
router.delete('/:id', controller.deletar); // [cite: 275]

module.exports = router; // [cite: 276]