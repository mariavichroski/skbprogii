const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('login');
});

app.get('/menu', (req, res) => {
  res.render('menu'); 
});


app.get('/manobras', (req, res) => {
    res.render('manobrass', {
      title: 'TESTEA',
  });
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


// Servir arquivos estáticos das pastas com prefixo de rota
app.use('/login', express.static(path.join(__dirname, 'login')));
app.use('/main', express.static(path.join(__dirname, 'main')));
app.use('/imagens', express.static(path.join(__dirname, 'imagens')));
app.use('/manobras', express.static(path.join(__dirname, 'manobras')));
app.use('/usuarios', express.static(path.join(__dirname, 'usuarios')));
app.use('/dashboard', express.static(path.join(__dirname, 'dashboard')));
app.use('/eventos', express.static(path.join(__dirname, 'eventos')));
app.use('/turmas', express.static(path.join(__dirname, 'turmas')));

// Rota principal serve login.html
//app.get('/', (req, res) => {
//  res.sendFile(path.join(__dirname, 'login', 'login.html'));
//});

// /login também serve login.html
//app.get('/login', (req, res) => {
//  res.sendFile(path.join(__dirname, 'login', 'login.html'));
//});

// /main serve dashboard
//app.get('/main', (req, res) => {
//  res.sendFile(path.join(__dirname, 'main', 'index.html'));
//});


// Para evitar erro 404 quando acessam /index.html direto, serve o dashboard também
//app.get('/index.html', (req, res) => {
//  res.sendFile(path.join(__dirname, 'main', 'index.html'));
//});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
