console.log("script.js carregado com sucesso!");

document.addEventListener('DOMContentLoaded', function() {
  var usuarioModal = new bootstrap.Modal(document.getElementById('usuarioModal'));

  // Elementos do formulário
  var alunoDiv = document.getElementById('alunoContainer');
  var isInstrutorCheckbox = document.getElementById('isInstrutor');
  var idadeInput = document.getElementById('idade');
  var baseInput = document.getElementById('base');
  var turmaSelect = document.getElementById('turma');
  var form = document.getElementById('registrationForm');

  // Função para mostrar ou ocultar campos de aluno
  function toggleAluno() {
    const isInstrutor = isInstrutorCheckbox.checked;

    if (isInstrutor) {
      alunoDiv.style.display = 'none';
      idadeInput.required = false;
      baseInput.required = false;
      turmaSelect.required = false;

      idadeInput.value = '';
      baseInput.value = '';
      turmaSelect.value = 'Choose...';
    } else {
      alunoDiv.style.display = 'flex'; // ou 'block', dependendo do seu layout
      idadeInput.required = true;
      baseInput.required = true;
      turmaSelect.required = true;
    }
  }

  // Estado inicial ao carregar a página
  toggleAluno();

  // Atualiza ao clicar no checkbox
  isInstrutorCheckbox.addEventListener('change', toggleAluno);

  // Abre o modal
  document.getElementById('btnAbrirModal').onclick = function() {
    usuarioModal.show();
  };

  // Tratamento de envio do formulário
  form.onsubmit = function(event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    var isInstrutor = isInstrutorCheckbox.checked;
    var role = isInstrutor ? "Instrutor" : "Aluno";

    alert("Cadastro realizado com sucesso!\nTipo: " + role);

    usuarioModal.hide();

    // Resetar formulário ao fechar modal
    document.getElementById('usuarioModal').addEventListener('hidden.bs.modal', function () {
      form.reset();
      form.classList.remove('was-validated');
      toggleAluno(); // Garante que a interface reflita o novo estado do checkbox
    }, { once: true });
  };
});
