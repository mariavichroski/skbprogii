// Variáveis globais para armazenar dados carregados do backend
let alunos = [];
let manobras = [];
let desempenhos = [];

// Função para carregar alunos do backend
function carregarAlunos() {
  return $.get('/usuarios/get').then(data => {
    // Filtra só os alunos (não instrutores)
    alunos = data.filter(u => !u.isInstrutor);
  });
}

// Função para carregar manobras do backend
function carregarManobras() {
  return $.get('/manobras/get').then(data => {
    manobras = data;
  });
}

// Função para carregar desempenhos do backend
function carregarDesempenhos() {
  return $.get('/ranking/get').then(data => {
    desempenhos = data;
  });
}

// Preencher selects de alunos e manobras
function preencherSelects() {
  const alunoSelect = $('#alunoSelect').empty().append('<option value="">Selecione um aluno</option>');
  const manobraSelect = $('#manobraSelect').empty().append('<option value="">Selecione uma manobra</option>');

  alunos.forEach(aluno => {
    alunoSelect.append(`<option value="${aluno.id}">${aluno.nome} ${aluno.sobrenome}</option>`);
  });

  manobras.forEach(manobra => {
    manobraSelect.append(`<option value="${manobra.id}">${manobra.nome} (${manobra.nivel})</option>`);
  });
}

// Exibir desempenhos na tabela
function renderizarTabela() {
  const tabela = $('#tabelaDesempenho').empty();

  desempenhos.forEach(item => {
    const aluno = alunos.find(a => a.id === item.aluno_id);
    const manobra = manobras.find(m => m.id === item.manobra_id);

    if (aluno && manobra) {
      const row = `
        <tr data-id="${item.id}">
          <td>
            <button class="btn btn-danger btn-sm btn-excluir" data-id="${item.id}">Excluir</button>
          </td>
          <td>${aluno.nome} ${aluno.sobrenome}</td>
          <td>${manobra.nome} (${manobra.nivel})</td>
        </tr>
      `;
      tabela.append(row);
    }
  });
}

// Submeter novo desempenho
$('#formDesempenho').on('submit', function(e) {
  e.preventDefault();

  const alunoId = parseInt($('#alunoSelect').val());
  const manobraId = parseInt($('#manobraSelect').val());

  if (!alunoId || !manobraId) {
    $('#mensagemErro').text('Por favor, selecione aluno e manobra.');
    return;
  }

  // Verifica se já existe para evitar duplicidade
  const jaExiste = desempenhos.some(d => d.aluno_id === alunoId && d.manobra_id === manobraId);
  if (jaExiste) {
    $('#mensagemErro').text('Esse desempenho já foi registrado.');
    return;
  }

  $.ajax({
    url: '/ranking/create',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ aluno_id: alunoId, manobra_id: manobraId }),
    success: function(res) {
      desempenhos.push(res.desempenho);
      renderizarTabela();
      $('#mensagemErro').text('');
      $('#formDesempenho')[0].reset();
      bootstrap.Modal.getInstance($('#desempenhoModal')[0]).hide();
    },
    error: function(xhr) {
      $('#mensagemErro').text(xhr.responseJSON?.erro || 'Erro ao salvar desempenho');
    }
  });
});

// Deletar desempenho ao clicar no botão excluir
$('#tabelaDesempenho').on('click', '.btn-excluir', function() {
  const id = $(this).data('id');

  $.ajax({
    url: `/ranking/delete/${id}`,
    method: 'DELETE',
    success: function(res) {
      desempenhos = desempenhos.filter(d => d.id !== id);
      renderizarTabela();
    },
    error: function() {
      alert('Erro ao excluir desempenho');
    }
  });
});

// Inicializar
$(document).ready(function() {
  $.when(carregarAlunos(), carregarManobras(), carregarDesempenhos())
    .done(function() {
      preencherSelects();
      renderizarTabela();
    })
    .fail(function() {
      alert('Erro ao carregar dados do backend');
    });
});
