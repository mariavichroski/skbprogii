const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Servir arquivos estáticos das pastas com prefixo de rota
app.use('/login', express.static(path.join(__dirname, 'login')));
app.use('/main', express.static(path.join(__dirname, 'main')));
app.use('/imagens', express.static(path.join(__dirname, 'imagens')));
app.use('/manobras', express.static(path.join(__dirname, 'manobras')));

// Rota principal serve login.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login', 'login.html'));
});

// /login também serve login.html
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login', 'login.html'));
});

// /main serve dashboard
app.get('/main', (req, res) => {
  res.sendFile(path.join(__dirname, 'main', 'index.html'));
});


// Para evitar erro 404 quando acessam /index.html direto, serve o dashboard também
app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'main', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
