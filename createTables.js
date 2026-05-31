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

db.get("SELECT COUNT(*) as total FROM games", (err, row) => {

    if (err) {
        console.error(err);
        return;
    }

    if (row.total === 0) {

        db.run(`
            INSERT INTO games (nome, genero, plataforma)
            VALUES ('Elden Ring', 'RPG', 'PC')
        `);

        db.run(`
            INSERT INTO games (nome, genero, plataforma)
            VALUES ('Hollow Knight', 'Metroidvania', 'PC')
        `);

        db.run(`
            INSERT INTO played_games
            (game_id, username, nota, horas_jogadas)
            VALUES (1, 'Kaique', 10, 150)
        `);

        db.run(`
            INSERT INTO played_games
            (game_id, username, nota, horas_jogadas)
            VALUES (2, 'Maria', 9, 40)
        `);

        console.log("Dados iniciais inseridos.");
    }

});

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