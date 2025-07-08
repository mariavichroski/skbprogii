$(document).ready(function () {
  // Fecha modal e retorna foco
  $('#eventoModal').on('hide.bs.modal', function () {
    $('#btnAbrirModal').focus();
    $('#eventoModal').removeData('editarId');
  });

  // Validação e envio do formulário
  (() => {
    'use strict'

    const forms = document.querySelectorAll('.needs-validation')

    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        event.preventDefault()
        event.stopPropagation()

        if (form.checkValidity()) {
          const descricao = $('#descricao').val();
          const premios = $('#premios').val();
          const data = $('#data').val();
          const idEditar = $('#eventoModal').data('editarId');

          const ajaxConfig = {
            url: idEditar ? `/eventos/edit/${idEditar}` : '/eventos/create',
            method: idEditar ? 'PUT' : 'POST',
            data: { descricao, premios, data },
            success: function () {
              const modalEl = document.getElementById('eventoModal');
              const myModal = bootstrap.Modal.getInstance(modalEl);
              myModal.hide();

              $('#descricao').val('');
              $('#premios').val('');
              $('#data').val('');
              form.classList.remove('was-validated');
              $('#eventoModal').removeData('editarId');

              carregarEventos();
            },
            error: function () {
              alert('Erro ao salvar evento.');
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

  $('#tabelaEventos tr').each(function () {
    let mostrar = true;
    $(this).find('td').each(function (index) {
      const valor = $(this).text().toLowerCase();

      // Pula a coluna 0 (botões)
      const colunaReal = index - 1;

      if (colunaReal >= 0 && filtros[colunaReal] && !valor.includes(filtros[colunaReal])) {
        mostrar = false;
      }
    });
    $(this).toggle(mostrar);
  });
});



  // Editar evento
  $('#tabelaEventos').on('click', '.editar', function () {
    const linha = $(this).closest('tr');
    const id = linha.data('id');
    const descricao = linha.find('td:eq(1)').text();
    const premios = linha.find('td:eq(2)').text();
    const data = linha.find('td:eq(3)').text();

    $('#descricao').val(descricao);
    $('#premios').val(premios);
    $('#data').val(data);
    $('#eventoModal').data('editarId', id);

    const modalEl = new bootstrap.Modal(document.getElementById('eventoModal'));
    modalEl.show();
  });

  // Deletar evento
  $('#tabelaEventos').on('click', '.deletar', function () {
    const linha = $(this).closest('tr');
    const id = linha.data('id');

    if (confirm('Tem certeza que deseja excluir este evento?')) {
      $.ajax({
        url: `/eventos/delete/${id}`,
        method: 'DELETE',
        success: function () {
          carregarEventos();
        },
        error: function () {
          alert('Erro ao deletar evento.');
        }
      });
    }
  });

  // Carrega eventos da API e preenche tabela
  function carregarEventos() {
    $.get('/eventos/get/', function (data) {
      const tabela = $('#tabelaEventos');
      tabela.empty();
      data.forEach(function (evento) {
        tabela.append(`
          <tr data-id="${evento.id}">
            <td>
              <button class="btn btn-warning btn-sm editar">Editar</button>
              <button class="btn btn-danger btn-sm deletar">Excluir</button>
            </td>
            <td>${evento.descricao}</td>
            <td>${evento.premios}</td>
            <td>${evento.data}</td>
          </tr>
        `);
      });
    });
  }

  carregarEventos(); // Inicial
});
