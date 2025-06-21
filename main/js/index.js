    $('#btnLogout').click(function () {
      localStorage.removeItem("usuario");
      window.location.href = "/";
    });