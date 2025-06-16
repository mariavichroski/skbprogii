$(document).ready(function () {
  $('#manobraModal').on('hide.bs.modal', function () {
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
          const nome = $('#nomeManobra').val();
          const nivel = $('#nivelDeManobra').val();

          const modalEl = document.getElementById('manobraModal');
          const myModal = bootstrap.Modal.getInstance(modalEl);
          myModal.hide();

          $('#nomeManobra').val('');
          $('#nivelDeManobra').val('');
          form.classList.remove('was-validated');

          adicionarManobraNaTabela(nome, nivel);
        } else {
          form.classList.add('was-validated');
        }
      }, false)
    })
  })();
});

function adicionarManobraNaTabela(nome, nivel) {
  const tabela = document.getElementById('tabelaManobras');
  const novaLinha = document.createElement('tr');
  novaLinha.innerHTML = `
    <td>${nome}</td>
    <td>${nivel}</td>
  `;
  tabela.appendChild(novaLinha);
}
