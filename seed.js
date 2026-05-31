const db = require("./db");

db.serialize(() => {
  db.run(`
        INSERT INTO games (nome, genero, plataforma)
        VALUES
        ('Elden Ring', 'RPG', 'PC')
    `);

  db.run(`
        INSERT INTO games (nome, genero, plataforma)
        VALUES
        ('Hollow Knight', 'Metroidvania', 'PC')
    `);

  db.run(`
        INSERT INTO played_games (game_id, username, nota, horas_jogadas)
        VALUES
        (1, 'Kaique', 10, 150)
    `);

  db.run(`
        INSERT INTO played_games (game_id, username, nota, horas_jogadas)
        VALUES
        (2, 'Maria', 9, 40)
    `);
});

console.log("Dados inseridos.");