$(document).ready(function () {
    $('#btnLogin').click(function () {
      const email = $('#email').val();
      const senha = $('#senha').val();
      const perfil = $('#perfil').val();
  
      if (!email || !senha) {
        $('#mensagem-erro').text("Preencha todos os campos.");
        return;
      }
  
      // Simulação de login
      const usuario = {
        email,
        perfil
      };
  
      localStorage.setItem("usuario", JSON.stringify(usuario));
      window.location.href = "dashboard.html";
    });
  });
  