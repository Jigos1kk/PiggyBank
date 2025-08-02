const express = require('express');
const router = express.Router();

router.get('/status', (req, res) => {
  res.json({ message: 'Подключение установлено' });
});

module.exports = router;