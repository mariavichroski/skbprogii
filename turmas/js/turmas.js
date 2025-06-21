$(document).ready(function () {
  $('#turmaModal').on('hide.bs.modal', function () {
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
          
          const modalEl = document.getElementById('turmaModal');
          const myModal = bootstrap.Modal.getInstance(modalEl);
          myModal.hide();

          $('#descricao').val('');
          form.classList.remove('was-validated');

          adicionarTurmaNaTabela(descricao);
        } else {
          form.classList.add('was-validated');
        }
      }, false)
    })
  })();
});

function adicionarTurmaNaTabela(descricao) {
  const tabela = document.getElementById('tabelaTurmas');
  const novaLinha = document.createElement('tr');
  novaLinha.innerHTML = `
    <td>${descricao}</td>
  `;
  tabela.appendChild(novaLinha);
}
