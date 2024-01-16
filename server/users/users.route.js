const express = require('express');
const router = express.Router();
const usersService = require('./service');

router.get('/api/emails', usersService.getEmails);
router.get('/api/users', usersService.getUsers);
router.post('/api/user', usersService.addUser);
router.post('/api/admin/login', usersService.adminLogin);
router.post('/api/user/login', usersService.userLogin);

module.exports = router;
