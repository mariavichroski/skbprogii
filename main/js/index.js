$(document).ready(function() {
  $('#link-manobras').click(function(e) {
    e.preventDefault(); // impede o redirecionamento
    $('#conteudo-principal').load('/manobras/manobras.html');
  });
});
