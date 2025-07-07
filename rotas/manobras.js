const express = require('express');
const router = express.Router();

const manobras= [];

router.get('/', (req, res) => {
    res.render('manobras', {
      title: 'TESTEA',
  });
});

// Criar nova manobra
router.post('/create', (req, res) => {
  const { nome, nivel } = req.body;
  const novaManobra = {
    id: manobras.length + 1,
    nome,
    nivel
  };
  manobras.push(novaManobra);
  res.json({ mensagem: 'Manobra criada com sucesso', manobra: novaManobra });
});

router.get('/get', (req, res) => {
  res.json(manobras);
});

// Editar manobra
router.put('/edit/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, nivel } = req.body;

  const manobra = manobras.find(m => m.id === id);
  if (!manobra) {
    return res.status(404).json({ erro: 'Manobra não encontrada' });
  }

  manobra.nome = nome;
  manobra.nivel = nivel;

  res.json({ mensagem: 'Manobra editada com sucesso', manobra });
});

// Deletar manobra
router.delete('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = manobras.findIndex(m => m.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Manobra não encontrada' });
  }

  const removida = manobras.splice(index, 1);
  res.json({ mensagem: 'Manobra removida com sucesso', removida });
});


module.exports = router;
