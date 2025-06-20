$(document).ready(function () {
  $('#eventoModal').on('hide.bs.modal', function () {
    $('#btnAbrirModal').focus();
  });

  (() => {
    'use strict'

    const forms = document.querySelectorAll('.needs-validation')

    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        event.preventDefault()
        event.stopPropagation()

        if (form.checkValidity()) {
          const descricao = $('#descricao').val();
          const premio = $('#premios').val();
          const data = $('#data').val();
          
          const modalEl = document.getElementById('eventoModal');
          const myModal = bootstrap.Modal.getInstance(modalEl);
          myModal.hide();

          $('#descricao').val('');
          $('#premios').val('');
          form.classList.remove('was-validated');

          adicionarEventoNaTabela(descricao, premio, data);
        } else {
          form.classList.add('was-validated');
        }
      }, false)
    })
  })();
});

function adicionarEventoNaTabela(descricao, premio, data) {
  const tabela = document.getElementById('tabelaEventos');
  const novaLinha = document.createElement('tr');
  novaLinha.innerHTML = `
    <td>${descricao}</td>
    <td>${premio}</td>
    <td>${data}</td>
  `;
  tabela.appendChild(novaLinha);
}
