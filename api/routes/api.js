const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController')

router.post('/user/add', UserController.create);

module.exports = router;