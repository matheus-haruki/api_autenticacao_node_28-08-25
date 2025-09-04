const express = require('express'); // [cite: 140]
const router = express.Router(); // [cite: 141]
const controller = require('../controllers/usuarioController'); // [cite: 142]

router.post('/registrar', controller.registrar); // [cite: 143]
router.post('/login', controller.login); // [cite: 143]

module.exports = router; // [cite: 144]