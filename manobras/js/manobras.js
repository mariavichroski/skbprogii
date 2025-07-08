 $(document).ready(function () {
  // Limpar campos e editarId ao abrir modal para novo cadastro
  $('#btnAbrirModal').on('click', function() {
    $('#nomeManobra').val('');
    $('#nivelDeManobra').val('');
    $('#manobraModal').removeData('editarId');
  });

  // Fecha modal e retorna foco
  $('#manobraModal').on('hide.bs.modal', function () {
    $('#btnAbrirModal').focus();
    $('#manobraModal').removeData('editarId');
  });

  // ... o resto do seu código permanece igual ...

  // Validação e envio do formulário
  (() => {
    'use strict'

    const forms = document.querySelectorAll('.needs-validation')

    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        event.preventDefault()
        event.stopPropagation()

        if (form.checkValidity()) {
          const nome = $('#nomeManobra').val();
          const nivel = $('#nivelDeManobra').val();
          const idEditar = $('#manobraModal').data('editarId');

          const ajaxConfig = {
            url: idEditar ? `/manobras/edit/${idEditar}` : '/manobras/create',
            method: idEditar ? 'PUT' : 'POST',
            data: { nome: nome, nivel: nivel },
            success: function () {
              const modalEl = document.getElementById('manobraModal');
              const myModal = bootstrap.Modal.getInstance(modalEl);
              myModal.hide();

              $('#nomeManobra').val('');
              $('#nivelDeManobra').val('');
              form.classList.remove('was-validated');
              $('#manobraModal').removeData('editarId');

              carregarManobras();
            },
            error: function () {
              alert('Erro ao salvar manobra.');
            }
          };

          $.ajax(ajaxConfig);
        } else {
          form.classList.add('was-validated');
        }
      }, false)
    });
  })();

  // Filtro por coluna
  $('.filtro-coluna').on('input', function () {
    const filtros = [];
    
    $('.filtro-coluna').each(function () {
      filtros.push($(this).val().toLowerCase());
    });

    $('#tabelaManobras tr').each(function () {
      let mostrar = true;
      $(this).find('td').each(function (index) {
        const valor = $(this).text().toLowerCase();
        const colunaReal = index - 1; // remover a coluna de ações
        
        if (colunaReal >= 0 && filtros[colunaReal] && !valor.includes(filtros[colunaReal])) {
          mostrar = false;
        }
      });
      $(this).toggle(mostrar);
    });
  });

  // Editar manobra
  $('#tabelaManobras').on('click', '.editar', function () {
    const linha = $(this).closest('tr');
    const id = linha.data('id');
    const nome = linha.find('td:eq(1)').text();
    const nivel = linha.find('td:eq(2)').text();

    $('#nomeManobra').val(nome);
    $('#nivelDeManobra').val(nivel);
    $('#manobraModal').data('editarId', id);

    const modalEl = new bootstrap.Modal(document.getElementById('manobraModal'));
    modalEl.show();
  });

  // Deletar manobra
  $('#tabelaManobras').on('click', '.deletar', function () {
    const linha = $(this).closest('tr');
    const id = linha.data('id');

    if (confirm('Tem certeza que deseja excluir esta manobra?')) {
      $.ajax({
        url: `/manobras/delete/${id}`,
        method: 'DELETE',
        success: function () {
          carregarManobras();
        },
        error: function () {
          alert('Erro ao deletar.');
        }
      });
    }
  });

  // Carrega manobras da API e preenche tabela
  function carregarManobras() {
    $.get('/manobras/get/', function (data) {
      const tabela = $('#tabelaManobras');
      tabela.empty();
      data.forEach(function (manobra) {
        tabela.append(`
          <tr data-id="${manobra.id}">
            <td>
              <button class="btn btn-warning btn-sm editar">Editar</button>
              <button class="btn btn-danger btn-sm deletar">Excluir</button>
            </td>
            <td>${manobra.nome}</td>
            <td>${manobra.nivel}</td>
          </tr>
        `);
      });
    });
  }

  carregarManobras(); // Inicial
});
