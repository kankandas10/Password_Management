const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3000;

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Test@123',
    database: 'passwordmanager'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/passwords', (req, res) => {
    db.query('SELECT * FROM passwords', (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(rows);
        }
    });
});

app.post('/passwords', (req, res) => {
    const { provider, password } = req.body;
    db.query('INSERT INTO passwords (provider, password) VALUES (?, ?)', [provider, password], err => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.sendStatus(200);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
