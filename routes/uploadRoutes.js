const express = require('express'); // [cite: 200]
const router = express.Router(); // [cite: 201]
const upload = require('../middleware/upload'); // [cite: 202]
const auth = require('../middleware/authMiddleware'); // [cite: 203]
const controller = require('../controllers/uploadController'); // [cite: 203]

router.post('/', auth, upload.single('foto'), controller.enviar); // 
router.get('/:id', controller.baixar); // 

module.exports = router; // [cite: 205]