let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");

if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    menuBtnChange(); //llamando a la función (opcional)
  });
}

if (searchBtn) {
  searchBtn.addEventListener("click", () => {
    // La barra lateral se abre al hacer clic en el ícono de búsqueda.
    sidebar.classList.toggle("open");
    menuBtnChange(); //llamando a la función (opcional)
  });
}
//codigo para cambiar el botón de la barra lateral (opcional)
function menuBtnChange() {
  if (sidebar.classList.contains("open")) {
    closeBtn.classList.replace("bx-menu", "bx-menu-alt-right"); //reemplazando la clase de iconos
  } else {
    closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); //reemplazando la clase de iconos
  }
}

document.querySelector("clientes.html").addEventListener("click", function () {
  window.location = "clientes.html";
});

document.querySelector("vendedores.html").addEventListener("click", function () {
  window.location = "vendedores.html";
});

document.querySelector("productos.html").addEventListener("click", function () {
  window.location = "productos.html";
});
