const express = require('express');
const router = express.Router();

router.get('/connect', (req, res) => {
    return res.json({ message: 'Connect is success 123' })
});

module.exports = router;