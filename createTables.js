const db = require('./db');

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS games (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            genero TEXT,
            plataforma TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS played_games (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            game_id INTEGER,
            username TEXT NOT NULL,
            nota INTEGER,
            horas_jogadas INTEGER,
            FOREIGN KEY(game_id) REFERENCES games(id)
        )
    `);

});

console.log('Tabelas criadas.');