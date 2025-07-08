$(document).ready(function () {
  var usuarioModal = new bootstrap.Modal(document.getElementById('usuarioModal'));

  // Elementos do formulário
  var alunoDiv = $('#alunoContainer');
  var isInstrutorCheckbox = $('#isInstrutor');
  var idadeInput = $('#idade');
  var baseInput = $('#base');
  var turmaSelect = $('#turma');
  var form = $('#registrationForm');

  // Limpar modal para novo usuário
  $('#btnAbrirModal').on('click', function () {
    form[0].reset();
    form.removeClass('was-validated');
    $('#usuarioModal').removeData('editarId');
    toggleAluno();
  });

  // Mostrar/ocultar campos aluno
  function toggleAluno() {
    if (isInstrutorCheckbox.is(':checked')) {
      alunoDiv.hide();
      idadeInput.prop('required', false).val('');
      baseInput.prop('required', false).val('');
      turmaSelect.prop('required', false).val('Choose...');
    } else {
      alunoDiv.show();
      idadeInput.prop('required', true);
      baseInput.prop('required', true);
      turmaSelect.prop('required', true);
    }
  }
  toggleAluno();

  isInstrutorCheckbox.on('change', toggleAluno);

  // Carregar usuários da API e preencher tabela
  function carregarUsuarios() {
    $.get('/usuarios/get', function (data) {
      const tabela = $('#tabelaUsuarios');
      tabela.empty();
      data.forEach(function (usuario) {
        tabela.append(`
          <tr data-id="${usuario.id}">
            <td>
              <button class="btn btn-warning btn-sm editar">Editar</button>
              <button class="btn btn-danger btn-sm deletar">Excluir</button>
            </td>
            <td>${usuario.nome}</td>
            <td>${usuario.sobrenome}</td>
            <td>${usuario.isInstrutor ? 'Instrutor' : 'Aluno'}</td>
            <td>${usuario.isInstrutor ? '-' : usuario.idade}</td>
            <td>${usuario.isInstrutor ? '-' : usuario.base}</td>
            <td>${usuario.isInstrutor ? '-' : usuario.turma}</td>
            <td>${usuario.email}</td>
          </tr>
        `);
      });
    });
  }
  carregarUsuarios();

  // Submissão do formulário (create/edit)
  form.on('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();

    if (!form[0].checkValidity()) {
      form.addClass('was-validated');
      return;
    }

    var idEditar = $('#usuarioModal').data('editarId');

    var data = {
      nome: $('#name').val(),
      sobrenome: $('#sobrenome').val(),
      isInstrutor: isInstrutorCheckbox.is(':checked'),
      idade: $('#idade').val(),
      base: $('#base').val(),
      turma: $('#turma').val(),
      email: $('#email').val(),
      senha: $('#senha').val(),
    };

    var url = idEditar ? `/usuarios/edit/${idEditar}` : '/usuarios/create';
    var method = idEditar ? 'PUT' : 'POST';

    $.ajax({
      url: url,
      method: method,
      data: data,
      success: function () {
        usuarioModal.hide();
        form.removeClass('was-validated');
        $('#usuarioModal').removeData('editarId');
        carregarUsuarios();
      },
      error: function () {
        alert('Erro ao salvar usuário.');
      }
    });
  });

  // Editar usuário - preenche o modal
  $('#tabelaUsuarios').on('click', '.editar', function () {
    var linha = $(this).closest('tr');
    var id = linha.data('id');

    $.get('/usuarios/get', function (data) {
      var usuario = data.find(u => u.id === id);
      if (!usuario) return alert('Usuário não encontrado');

      $('#name').val(usuario.nome);
      $('#sobrenome').val(usuario.sobrenome);
      $('#isInstrutor').prop('checked', usuario.isInstrutor);
      $('#idade').val(usuario.idade);
      $('#base').val(usuario.base);
      $('#turma').val(usuario.turma);
      $('#email').val(usuario.email);
      $('#senha').val(usuario.senha);

      toggleAluno();

      $('#usuarioModal').data('editarId', id);
      usuarioModal.show();
    });
  });

  // Deletar usuário
  $('#tabelaUsuarios').on('click', '.deletar', function () {
    var linha = $(this).closest('tr');
    var id = linha.data('id');

    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      $.ajax({
        url: `/usuarios/delete/${id}`,
        method: 'DELETE',
        success: function () {
          carregarUsuarios();
        },
        error: function () {
          alert('Erro ao deletar usuário.');
        }
      });
    }
  });

  // Filtro por coluna
  $('.filtro-coluna').on('input', function () {
    const filtros = [];
    
    $('.filtro-coluna').each(function () {
      filtros.push($(this).val().toLowerCase());
    });

    $('#tabelaUsuarios tr').each(function () {
      let mostrar = true;
      $(this).find('td').each(function (index) {
        // ignorar coluna ações (index 0)
        if (index === 0) return true;

        const valor = $(this).text().toLowerCase();
        const colunaReal = index - 1; 

        if (filtros[colunaReal] && !valor.includes(filtros[colunaReal])) {
          mostrar = false;
        }
      });
      $(this).toggle(mostrar);
    });
  });

});
