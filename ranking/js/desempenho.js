// Dados mockados (simulam o backend)
const alunos = [
  { id: 1, nome: 'João' },
  { id: 2, nome: 'Maria' },
  { id: 3, nome: 'Carlos' }
];

const manobras = [
  { id: 1, nome: 'Ollie', nivel: 'Fácil' },
  { id: 2, nome: 'Shove-it', nivel: 'Médio' },
  { id: 3, nome: 'Kickflip', nivel: 'Avançado' }
];

let desempenhos = []; // Aqui serão salvos os dados inseridos

// Preencher selects
function preencherSelects() {
  const alunoSelect = document.getElementById('alunoSelect');
  const manobraSelect = document.getElementById('manobraSelect');

  alunos.forEach(aluno => {
    const opt = document.createElement('option');
    opt.value = aluno.id;
    opt.textContent = aluno.nome;
    alunoSelect.appendChild(opt);
  });

  manobras.forEach(manobra => {
    const opt = document.createElement('option');
    opt.value = manobra.id;
    opt.textContent = `${manobra.nome} (${manobra.nivel})`;
    manobraSelect.appendChild(opt);
  });
}

// Exibir desempenhos na tabela
function renderizarTabela() {
  const tabela = document.getElementById('tabelaDesempenho');
  tabela.innerHTML = '';
  desempenhos.forEach(item => {
    const aluno = alunos.find(a => a.id === item.aluno_id);
    const manobra = manobras.find(m => m.id === item.manobra_id);

    const row = document.createElement('tr');
    row.innerHTML = `<td>${aluno?.nome}</td><td>${manobra?.nome} (${manobra?.nivel})</td>`;
    tabela.appendChild(row);
  });
}

// Submeter novo desempenho
document.getElementById('formDesempenho').addEventListener('submit', function (e) {
  e.preventDefault();

  const alunoId = parseInt(document.getElementById('alunoSelect').value);
  const manobraId = parseInt(document.getElementById('manobraSelect').value);

  // Validação simples (sem repetições)
  const jaExiste = desempenhos.some(d => d.aluno_id === alunoId && d.manobra_id === manobraId);
  if (jaExiste) {
    document.getElementById('mensagemErro').textContent = 'Esse desempenho já foi registrado.';
    return;
  }

  desempenhos.push({ aluno_id: alunoId, manobra_id: manobraId });
  renderizarTabela();

  document.getElementById('mensagemErro').textContent = '';
  document.getElementById('formDesempenho').reset();
  bootstrap.Modal.getInstance(document.getElementById('desempenhoModal')).hide();
});

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  preencherSelects();
  renderizarTabela();
});
