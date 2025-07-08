$(document).ready(function () {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario) {
    window.location.href = "index.html";
    return;
  }

  // Função para buscar dados via AJAX (promises)
  function getData(url) {
    return $.get(url);
  }

  // Função para montar ranking por usuário com soma de pontos das manobras aprendidas
  function montarRanking(desempenhos, usuarios, manobras) {
    // Map de pontos por nível
    const pontosPorNivel = { 'Fácil': 5, 'Médio': 7, 'Avançado': 10 };

    // Map de usuário_id → pontos acumulados
    const pontuacaoUsuarios = {};

    // Para cada desempenho (aluno + manobra)
    desempenhos.forEach(d => {
      const manobra = manobras.find(m => m.id === d.manobra_id);
      if (!manobra) return;

      const pontos = pontosPorNivel[manobra.nivel] || 0;

      if (!pontuacaoUsuarios[d.aluno_id]) {
        pontuacaoUsuarios[d.aluno_id] = 0;
      }
      pontuacaoUsuarios[d.aluno_id] += pontos;
    });

    // Criar array com usuário + pontos
    const ranking = usuarios
      .filter(u => !u.isInstrutor) // só alunos
      .map(u => ({
        nome: u.nome + ' ' + u.sobrenome,
        pontos: pontuacaoUsuarios[u.id] || 0
      }))
      .sort((a, b) => b.pontos - a.pontos); // ordenar desc

    return ranking;
  }

  // Popular dados do dashboard
  $.when(
    getData('/usuarios/get'),
    getData('/manobras/get'),
    getData('/eventos/get'),
    getData('/ranking/get')
  ).done((usuariosData, manobrasData, eventosData, desempenhosData) => {
    const usuarios = usuariosData[0];
    const manobras = manobrasData[0];
    const eventos = eventosData[0];
    const desempenhos = desempenhosData[0];

    // Filtrar apenas alunos
    const alunos = usuarios.filter(u => !u.isInstrutor);

    $('#total-alunos').text(alunos.length);
    $('#total-manobras').text(manobras.length);
    $('#total-eventos').text(eventos.length);

    // Montar ranking
    const ranking = montarRanking(desempenhos, usuarios, manobras);

    // Montar tabela de ranking
    const tabelaRanking = $('#tabelaRanking tbody');
    tabelaRanking.empty();

    if (ranking.length === 0) {
      tabelaRanking.append('<tr><td colspan="2">Nenhum ranking disponível</td></tr>');
    } else {
      ranking.forEach((item, i) => {
        tabelaRanking.append(`
          <tr>
            <td>${i + 1}</td>
            <td>${item.nome}</td>
            <td>${item.pontos}</td>
          </tr>
        `);
      });
    }
  }).fail(() => {
    alert('Erro ao carregar dados do dashboard.');
  });
});
