console.log("script.js carregado com sucesso!");


document.addEventListener('DOMContentLoaded', function() {
  var usuarioModal = new bootstrap.Modal(document.getElementById('usuarioModal'));

  var turmaDiv = document.querySelector('#class').closest('.mb-2'); // div que envolve o select Turma
  var isInstrutorCheckbox = document.getElementById('isInstrutor');

  // Função para mostrar/ocultar campo Turma
  function toggleTurma() {
    if (isInstrutorCheckbox.checked) {
      turmaDiv.style.display = 'none';
      // Se quiser, pode limpar o valor do select
      document.getElementById('class').value = '';
    } else {
      turmaDiv.style.display = 'block';
    }
  }

  // Chama ao carregar para garantir estado inicial correto
  toggleTurma();

  // Escuta mudança do checkbox
  isInstrutorCheckbox.addEventListener('change', toggleTurma);

  document.getElementById('btnAbrirModal').onclick = function() {
    usuarioModal.show();
  };

  var form = document.getElementById('registrationForm');
  form.onsubmit = function(event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    var isInstrutor = isInstrutorCheckbox.checked;
    var role = isInstrutor ? "instrutor" : "aluno";

    alert("Cadastro realizado com sucesso!\nTipo: " + role);

    usuarioModal.hide();
    document.getElementById('usuarioModal').addEventListener('hidden.bs.modal', function () {
    form.reset();
    form.classList.remove('was-validated');
    toggleTurma();
  }, { once: true });
};})
