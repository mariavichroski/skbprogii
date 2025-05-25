$(document).ready(function () {
  // Ao fechar o modal, joga o foco para o botão que abre o modal
  $('#manobraModal').on('hide.bs.modal', function () {
    $('#btnAbrirModal').focus();
  });

  // Código Bootstrap para validar forms .needs-validation
  (() => {
    'use strict'

    const forms = document.querySelectorAll('.needs-validation')

    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        event.preventDefault()
        event.stopPropagation()

        if (form.checkValidity()) {
          // Se validou, fecha o modal, limpa campos e remove validação para próxima vez
          const modalEl = document.getElementById('manobraModal');
          const myModal = bootstrap.Modal.getInstance(modalEl);
          myModal.hide();

          $('#nomeManobra').val('');
          $('#nivelDeManobra').val('');
          form.classList.remove('was-validated');

          // Console log de sucesso
          console.log('Manobra salva:', $('#nomeManobra').val(), $('#nivelDeManobra').val());
        } else {
          // Se invalidou, adiciona as classes para mostrar erro
          form.classList.add('was-validated');
        }
      }, false)
    })
  })();
});
