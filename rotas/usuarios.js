const express = require('express');
const router = express.Router();

const usuarios = [{
    id: 1,
    nome: 'João',
    sobrenome: 'Silva',
    isInstrutor: false,
    idade: 15,
    base: 'Regular',
    turma: 'T1',
    email: 'joao.silva@example.com',
    senha: '123456'
  },
  {
    id: 2,
    nome: 'Maria',
    sobrenome: 'Oliveira',
    isInstrutor: true,
    idade: null,
    base: null,
    turma: null,
    email: 'maria.oliveira@example.com',
    senha: 'senha123'
  },
  {
    id: 3,
    nome: 'Carlos',
    sobrenome: 'Pereira',
    isInstrutor: false,
    idade: 17,
    base: 'Goofy',
    turma: 'T2',
    email: 'carlos.pereira@example.com',
    senha: 'abc123'
  },
  {
    id: 4,
    nome: 'Ana',
    sobrenome: 'Souza',
    isInstrutor: false,
    idade: 14,
    base: 'Regular',
    turma: 'T3',
    email: 'ana.souza@example.com',
    senha: 'senha321'
  }]; 

router.get('/', (req, res) => {
  res.render('usuarios', {
    title: 'Usuários'
  });
});

// Criar usuário
router.post('/create', (req, res) => {
  const { nome, sobrenome, isInstrutor, idade, base, turma, email, senha } = req.body;

  if (!nome || !sobrenome || !email || !senha) {
    return res.status(400).json({ erro: 'Campos obrigatórios faltando' });
  }

    const isInstrutorBool = isInstrutor === 'on' || isInstrutor === true;

    const novoUsuario = {
    id: usuarios.length + 1,
    nome,
    sobrenome,
    isInstrutor: isInstrutorBool,
    idade: isInstrutorBool ? null : idade,
    base: isInstrutorBool ? null : base,
    turma: isInstrutorBool ? null : turma,
    email,
    senha
    };

  usuarios.push(novoUsuario);

  res.json({ mensagem: 'Usuário criado com sucesso', usuario: novoUsuario });
});

// Listar usuários
router.get('/get', (req, res) => {
  res.json(usuarios);
});

// Editar usuário
router.put('/edit/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, sobrenome, isInstrutor, idade, base, turma, email, senha } = req.body;

  const usuario = usuarios.find(u => u.id === id);
  if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });

  usuario.nome = nome;
  usuario.sobrenome = sobrenome;
  usuario.isInstrutor = Boolean(isInstrutor);
  usuario.idade = usuario.isInstrutor ? null : idade;
  usuario.base = usuario.isInstrutor ? null : base;
  usuario.turma = usuario.isInstrutor ? null : turma;
  usuario.email = email;
  usuario.senha = senha;

  res.json({ mensagem: 'Usuário alterado com sucesso', usuario });
});

// Deletar usuário
router.delete('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = usuarios.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ erro: 'Usuário não encontrado' });

  const removido = usuarios.splice(index, 1);
  res.json({ mensagem: 'Usuário removido com sucesso', removido });
});

module.exports = router;
