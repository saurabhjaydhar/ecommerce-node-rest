const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.end('this is api user / page or kuc?');
});

router.post('/', (req, res) => {
  res.status(200).json({ message: 'menu created succesfully' });
  res.end();
});

module.exports = router;
