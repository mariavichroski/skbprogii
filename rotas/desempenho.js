const express = require('express');
const router = express.Router();

let desempenhos = []; // banco na memória
// id incremental para desempenho
let proxId = 1;

// Listar desempenhos
// Cada desempenho terá aluno_id e manobra_id
router.get('/get', (req, res) => {
  res.json(desempenhos);
});

// Criar desempenho
router.post('/create', (req, res) => {
  const { aluno_id, manobra_id } = req.body;

  if (!aluno_id || !manobra_id) {
    return res.status(400).json({ erro: 'Campos aluno_id e manobra_id são obrigatórios.' });
  }

  // Verificar se já existe (evitar duplicados)
  const existe = desempenhos.some(d => d.aluno_id === aluno_id && d.manobra_id === manobra_id);
  if (existe) {
    return res.status(400).json({ erro: 'Desempenho já registrado para esse aluno e manobra.' });
  }

  const novoDesempenho = {
    id: proxId++,
    aluno_id,
    manobra_id
  };

  desempenhos.push(novoDesempenho);

  res.json({ mensagem: 'Desempenho registrado com sucesso.', desempenho: novoDesempenho });
});

// Remover desempenho
router.delete('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = desempenhos.findIndex(d => d.id === id);
  if (index === -1) return res.status(404).json({ erro: 'Desempenho não encontrado.' });

  const removido = desempenhos.splice(index, 1);
  res.json({ mensagem: 'Desempenho removido com sucesso.', removido });
});

module.exports = router;
