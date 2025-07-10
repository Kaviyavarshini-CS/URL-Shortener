const express = require('express');
const router = express.Router();
const controller = require('../controllers/urlController');

router.post('/shorten', controller.shortenUrl);
router.get('/:code', controller.redirectUrl);

module.exports = router;
