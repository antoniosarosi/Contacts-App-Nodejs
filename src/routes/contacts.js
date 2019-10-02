const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/contacts', async (req, res) => {
    const contacts = await pool.query('SELECT * FROM contacts');
    console.log(contacts);
    res.render('contacts/list', {contacts});
});

router.get('/contacts/add', (req, res) => {
    res.render('contacts/add');
});

router.post('/add', async (req, res) => {
    const { name, number } = req.body;
    const contact = { name, number };
    await pool.query('INSERT INTO contacts SET ?', [contact]);
    res.send('Contact Added');
});

module.exports = router;
