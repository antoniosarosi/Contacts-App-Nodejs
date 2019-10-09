const express = require('express');
const router = express.Router();
const pool = require('../database');

// Get all users
router.get('/api/users', async (req, res) => {
    const users = await pool.query('SELECT * FROM users');
    res.json(users);
});

// Get one user
router.get('/api/users/:username', async (req, res) => {
    const { username } = req.params;
    const user = await pool.query('SELECT * FROM users WHERE username = ?', [username])
    res.json(user);
});

// Create user
router.post('/api/users', async (req, res) => {
    try {
        // Password should be encypted before inserting user
        await pool.query('INSERT INTO users SET ?', [req.body]);
        res.json({status: 'created'});
    } catch(err) {
        console.log(err);
        res.json({status: 'error'});
    }
});

// Update user
router.put('/api/users/:username', async (req, res) => {
    try {
        const { username } = req.params;
        await pool.query('UPDATE users SET ? WHERE username = ?', [req.body, username]);
        res.json({status: 'updated'});
    } catch(err) {
        res.json({status: 'error'});
    }
});

// Delete user
router.delete('/api/users/:username', async (req, res) => {
    try {
        const { username } = req.params;
        await pool.query('DELETE FROM users WHERE username = ?', username);
        res.json({status: 'deleted'});
    } catch(err) {
        res.json({status: 'error'});
    }
});

// Get all contacts
router.get('/api/contacts', async (req, res) => {
    const contacts = await pool.query('SELECT * FROM contacts');
    res.json(contacts);
});

// Get one contact
router.get('/api/contacts/:id', async (req, res) => {
    const { id } = req.params;
    const contact = await pool.query('SELECT * FROM contacts WHERE id = ?', [id])
    res.json(contact);
});

// Create contact
router.post('/api/contacts', async (req, res) => {
    try {
        await pool.query('INSERT INTO contacts SET ?', [req.body]);
        res.json({status: 'created'});
    } catch(err) {
        console.log(err);
        res.json({status: 'error'});
    }
});

// Update contact
router.put('/api/contacts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('UPDATE contacts SET ? WHERE id = ?', [req.body, id]);
        res.json({status: 'updated'});
    } catch(err) {
        res.json({status: 'error'});
    }
});

// Delete Contact
router.delete('/api/contacts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM contacts WHERE id = ?', id);
        res.json({status: 'deleted'});
    } catch(err) {
        res.json({status: 'error'});
    }
});

// Get contacts for specific user
router.get('/api/contacts/user/:username', async (req, res) => {
    const { username } = req.params;
    const users = await pool.query('SELECT * FROM contacts WHERE user = ?', [username]);
    res.json(users);
});

module.exports = router;