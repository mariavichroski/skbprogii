const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// configura ejs
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const session= require("express-session");
app.use(
    session({
      secret: '"INVENTARALGODEPOIS',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: true},
    }),
  );

//Importa rotas
const manobrasRotas = require('./rotas/manobras');

//Usa as rotas
app.use('/manobras', manobrasRotas); 

app.get('/', (req, res) => {
    res.render('login');
});

app.get('/menu', (req, res) => {
  res.render('menu'); 
});

app.get('/usuarios', (req, res) => {
    res.render('usuarios', {
        });
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard', {
        });
});

app.get('/eventos', (req, res) => {
    res.render('eventos', {
        });
});

app.get('/turmas', (req, res) => {
    res.render('turmas', {
        });
});

app.get('/ranking', (req, res) => {
  res.render('ranking'); 
});


// Servir arquivos estáticos das pastas com prefixo de rota
app.use('/login', express.static(path.join(__dirname, 'login')));
app.use('/main', express.static(path.join(__dirname, 'main')));
app.use('/imagens', express.static(path.join(__dirname, 'imagens')));
app.use('/manobras', express.static(path.join(__dirname, 'manobras')));
app.use('/usuarios', express.static(path.join(__dirname, 'usuarios')));
app.use('/dashboard', express.static(path.join(__dirname, 'dashboard')));
app.use('/eventos', express.static(path.join(__dirname, 'eventos')));
app.use('/turmas', express.static(path.join(__dirname, 'turmas')));
app.use('/ranking', express.static(path.join(__dirname, 'ranking')));

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
