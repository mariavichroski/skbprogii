const express = require('express');
const router = express.Router();

const eventos = [];

// Página principal de eventos
router.get('/', (req, res) => {
  res.render('eventos');
});

// Criar novo evento
router.post('/create', (req, res) => {
  const { descricao, premios, data } = req.body;
  const novoEvento = {
    id: eventos.length + 1,
    descricao,
    premios,
    data,
  };
  eventos.push(novoEvento);
  res.json({ mensagem: 'Evento criado com sucesso', evento: novoEvento });
});

// Listar eventos
router.get('/get', (req, res) => {
  res.json(eventos);
});

// Editar evento
router.put('/edit/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { descricao, premios, data } = req.body;

  const evento = eventos.find(e => e.id === id);
  if (!evento) {
    return res.status(404).json({ erro: 'Evento não encontrado' });
  }

  evento.descricao = descricao;
  evento.premios = premios;
  evento.data = data;

  res.json({ mensagem: 'Evento editado com sucesso', evento });
});

// Deletar evento
router.delete('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = eventos.findIndex(e => e.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Evento não encontrado' });
  }

  const removido = eventos.splice(index, 1);
  res.json({ mensagem: 'Evento removido com sucesso', removido });
});

module.exports = router;
