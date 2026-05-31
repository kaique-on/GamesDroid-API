const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/database.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Banco conectado.');
    }
});

module.exports = db;