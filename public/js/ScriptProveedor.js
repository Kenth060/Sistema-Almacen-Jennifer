function mostrarPanelRegistroProveedor() {
    var panel = document.getElementById("panelRegistroProveedor");
    panel.style.display = "block";
  }
  const inputLetra = document.querySelectorAll('input[type="text"]');
  const inputnumero = document.querySelectorAll('input[type="number"]');

  // Recorre cada input encontrado
  inputLetra.forEach(input => {
    // Agrega un evento "keypress" a cada input
    input.addEventListener("keypress", (e) => {
      let expre;

    // Verifica si el input es para la cédula
    if (input.id === 'Cedula') { // Supongamos que el input de la cédula tiene el ID 'cedulaInput'
        // Expresión regular para permitir números y guion "-"
        expre = /^[a-zA-Z0-9-]+$/; // Solo números del 0-9 y guion "-"
    }else
    if (input.id === 'Residencia' || input.id === 'PuntoReferencia' || input.id === 'Distancia' || input.id === 'Casa') { // Supongamos que el input de la cédula tiene el ID 'cedulaInput'
        // Expresión regular para permitir números y guion "-"
        expre = /^[a-zA-Z0-9\sñÑ]+$/; // Solo números del 0-9 y guion "-"
    }else{ 
        expre = /^[a-zA-Z\sñÑ]+$/; 
      } 
      // Verifica si la tecla presionada cumple con la expresión regular
      if (!expre.test(e.key)) {
          e.preventDefault(); // Evita que se ingrese la tecla en el input
      }
    });
  });
 inputnumero.forEach(input => {
  // Agrega un evento "keypress" a cada input
  input.addEventListener("keypress", (e) => {
    let expre;

    expre = /^[0-9]+$/; // Solo números del 0-9
    
    // Verifica si la tecla presionada cumple con la expresión regular
    if (!expre.test(e.key)) {
        e.preventDefault(); // Evita que se ingrese la tecla en el input
    }
  });
});

  function cerrarPanelRegistroProveedor() {
    var panel = document.getElementById("panelRegistroProveedor");
    panel.style.display = "none";
  }