$(document).ready(function () {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
  
    if (!usuario) {
      window.location.href = "index.html";
    }
  
    $('#btnLogout').click(function () {
      localStorage.removeItem("usuario");
      window.location.href = "index.html";
    });
  
    // Simulação de dados
    const alunos = [{ nome: 'Maria'}, {nome:"Joao"}, {nome: "carlos"}]; // 3 alunos
    const manobras = [{nome: 'Ollie'}, {nome:'Flip'}, {nome: 'Heelflip'}, {nome:'Frontside Ollie'}]; // 4 manobras
    const eventos = [{nome: 'Dia das crianças'}]; // 1 evento
  
    $('#total-alunos').text(alunos.length);
    $('#total-manobras').text(manobras.length);
    $('#total-eventos').text(eventos.length);
  });
  