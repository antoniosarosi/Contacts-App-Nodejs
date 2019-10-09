const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { index: true });
});

module.exports = router;