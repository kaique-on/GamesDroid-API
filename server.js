const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;


app.get('/games', (req, res) => {

    db.all(
        'SELECT * FROM games',
        [],
        (err, rows) => {

            if (err) {
                return res.status(500).json({
                    erro: err.message
                });
            }

            res.json(rows);
        }
    );

});


app.get('/games/:id', (req, res) => {

    const id = req.params.id;

    db.get(
        'SELECT * FROM games WHERE id = ?',
        [id],
        (err, row) => {

            if (err) {
                return res.status(500).json({
                    erro: err.message
                });
            }

            if (!row) {
                return res.status(404).json({
                    mensagem: 'Jogo não encontrado'
                });
            }

            res.json(row);
        }
    );

});


app.post('/games', (req, res) => {

    const { nome, genero, plataforma } = req.body;

    db.run(
        `
        INSERT INTO games (nome, genero, plataforma)
        VALUES (?, ?, ?)
        `,
        [nome, genero, plataforma],
        function(err) {

            if (err) {
                return res.status(500).json({
                    erro: err.message
                });
            }

            res.status(201).json({
                mensagem: 'Jogo criado',
                id: this.lastID
            });

        }
    );

});


app.put('/games/:id', (req, res) => {

    const id = req.params.id;

    const {
        nome,
        genero,
        plataforma
    } = req.body;

    db.run(
        `
        UPDATE games
        SET nome = ?, genero = ?, plataforma = ?
        WHERE id = ?
        `,
        [nome, genero, plataforma, id],
        function(err) {

            if (err) {
                return res.status(500).json({
                    erro: err.message
                });
            }

            res.json({
                mensagem: 'Jogo atualizado'
            });

        }
    );

});


app.delete('/games/:id', (req, res) => {

    const id = req.params.id;

    db.run(
        'DELETE FROM games WHERE id = ?',
        [id],
        function(err) {

            if (err) {
                return res.status(500).json({
                    erro: err.message
                });
            }

            res.json({
                mensagem: 'Jogo removido'
            });

        }
    );

});


app.get('/played-games', (req, res) => {

    db.all(
        `
        SELECT
            pg.id,
            pg.game_id,
            g.nome AS nome_jogo,
            pg.username,
            pg.nota,
            pg.horas_jogadas
        FROM played_games pg
        JOIN games g
            ON pg.game_id = g.id
        `,
        [],
        (err, rows) => {

            if (err) {
                return res.status(500).json({
                    erro: err.message
                });
            }

            res.json(rows);
        }
    );

});

app.get('/played-games/:id', (req, res) => {

    const id = req.params.id;

    db.get(
        `
        SELECT
            pg.id,
            pg.game_id,
            g.nome AS nome_jogo,
            pg.username,
            pg.nota,
            pg.horas_jogadas
        FROM played_games pg
        JOIN games g
            ON pg.game_id = g.id
        WHERE pg.id = ?
        `,
        [id],
        (err, row) => {

            if (err) {
                return res.status(500).json({
                    erro: err.message
                });
            }

            if (!row) {
                return res.status(404).json({
                    mensagem: 'Registro não encontrado'
                });
            }

            res.json(row);
        }
    );

});

app.post('/played-games', (req, res) => {

    const {
        game_id,
        username,
        nota,
        horas_jogadas
    } = req.body;

    db.run(
        `
        INSERT INTO played_games
        (game_id, username, nota, horas_jogadas)
        VALUES (?, ?, ?, ?)
        `,
        [game_id, username, nota, horas_jogadas],
        function(err) {

            if (err) {
                return res.status(500).json({
                    erro: err.message
                });
            }

            res.status(201).json({
                mensagem: 'Registro criado',
                id: this.lastID
            });

        }
    );

});

app.put('/played-games/:id', (req, res) => {

    const id = req.params.id;

    const {
        game_id,
        username,
        nota,
        horas_jogadas
    } = req.body;

    db.run(
        `
        UPDATE played_games
        SET game_id = ?,
            username = ?,
            nota = ?,
            horas_jogadas = ?
        WHERE id = ?
        `,
        [game_id, username, nota, horas_jogadas, id],
        function(err) {

            if (err) {
                return res.status(500).json({
                    erro: err.message
                });
            }

            res.json({
                mensagem: 'Registro atualizado'
            });

        }
    );

});

app.delete('/played-games/:id', (req, res) => {

    const id = req.params.id;

    db.run(
        'DELETE FROM played_games WHERE id = ?',
        [id],
        function(err) {

            if (err) {
                return res.status(500).json({
                    erro: err.message
                });
            }

            res.json({
                mensagem: 'Registro removido'
            });

        }
    );

});


app.get('/games-with-rating', (req, res) => {

    db.all(
        `
        SELECT
            g.id,
            g.nome,
            g.genero,
            g.plataforma,
            ROUND(AVG(pg.nota), 1) AS media_nota
        FROM games g
        LEFT JOIN played_games pg
            ON g.id = pg.game_id
        GROUP BY g.id
        `,
        [],
        (err, rows) => {

            if (err) {
                return res.status(500).json({
                    erro: err.message
                });
            }

            res.json(rows);
        }
    );

});


app.get('/games/:id/reviews', (req, res) => {

    const gameId = req.params.id;

    db.all(
        `
        SELECT
            id,
            username,
            nota,
            horas_jogadas
        FROM played_games
        WHERE game_id = ?
        ORDER BY nota DESC
        `,
        [gameId],
        (err, rows) => {

            if (err) {
                return res.status(500).json({
                    erro: err.message
                });
            }

            res.json(rows);
        }
    );

});


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});