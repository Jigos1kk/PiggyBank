const express = require('express');
const router = express.Router();

const UserController = require('./controller/UserController')

router.get('/connect', (req, res) => {
    return res.json({ message: 'Connect is success 123' })
});

router.post('/sign/up', UserController.signUp);

module.exports = router;