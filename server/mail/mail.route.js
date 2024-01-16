const express = require('express');
const router = express.Router();
const mailService = require('./service');

router.get('/api/mail', mailService.getMail);
router.post('/api/mail', mailService.sendMail);
router.delete('/api/mail/:id', mailService.deleteMail);

module.exports = router;
