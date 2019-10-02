const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/contacts', async (req, res) => {
    const contacts = await pool.query('SELECT * FROM contacts');
    console.log(contacts);
    res.render('contacts/list', {contacts});
});

// Add new contact

router.get('/contacts/add', (req, res) => {
    res.render('contacts/add');
});

router.post('/contacts/add', async (req, res) => {
    const { name, number } = req.body;
    const contact = { name, number };
    await pool.query('INSERT INTO contacts SET ?', [contact]);
    res.send('Contact Added');
});

// Delete contact

router.get('/contacts/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM contacts WHERE id = ?', [id]);
    res.send('Contact Deleted Successfully');
});

// Edit contact

router.get('/contacts/edit/:id', async (req, res) => {
    const { id } = req.params;
    const contact = await pool.query('SELECT * FROM contacts WHERE id = ?', [id]);
    res.render('contacts/edit', { contact: contact[0] });
});

router.post('/contacts/edit/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('UPDATE contacts SET ? WHERE id = ?', [req.body, id]);
    res.send('Modified Succesffully');
});

module.exports = router;
