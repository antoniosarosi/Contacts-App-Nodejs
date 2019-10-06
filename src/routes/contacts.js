const express = require('express');
const router = express.Router();
const pool = require('../database');

const { checkAuthentication } = require('../lib/authentication');


router.get('/contacts', checkAuthentication, async (req, res) => {
    console.log(req.user);
    const contacts = await pool.query('SELECT * FROM contacts WHERE user = ?', [req.user.username]);
    console.log(contacts);
    res.render('contacts/list', {contacts});
});

// Add new contact

router.get('/contacts/add', checkAuthentication, (req, res) => {
    res.render('contacts/add');
});

router.post('/contacts/add', async (req, res) => {
    const contact = req.body;
    contact.user = req.user.username;
    await pool.query('INSERT INTO contacts SET ?', [contact]);
    res.redirect('/contacts');
});

// Delete contact

router.get('/contacts/delete/:id', checkAuthentication, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM contacts WHERE id = ?', [id]);
    res.redirect('/contacts');
});

// Edit contact

router.get('/contacts/edit/:id', checkAuthentication, async (req, res) => {
    const { id } = req.params;
    const contact = await pool.query('SELECT * FROM contacts WHERE id = ?', [id]);
    res.render('contacts/edit', { contact: contact[0] });
});

router.post('/contacts/edit/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('UPDATE contacts SET ? WHERE id = ?', [req.body, id]);
    res.redirect('/contacts');
});

module.exports = router;
