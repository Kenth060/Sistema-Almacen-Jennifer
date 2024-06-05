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
        expre = /^[A-Z0-9-]+$/;
        /*
        document.getElementById('Cedula').addEventListener('input', function(event) {
          let cedula = event.target.value;
          
          // Eliminar caracteres no válidos
          cedula = cedula.replace(/[^0-9A-Za-z]/g, '');
      
          // Agregar guiones
          if (cedula.length > 0 && cedula.length <= 3) {
              cedula = cedula.slice(0, 3) + '-';
          } else if (cedula.length > 3 && cedula.length <= 9) {
              cedula = cedula.slice(0, 3) + '-' + cedula.slice(3, 9) + '-';
          } else if (cedula.length > 9 && cedula.length <= 14) {
              cedula = cedula.slice(0, 3) + '-' + cedula.slice(3, 9) + '-' + cedula.slice(9, 14);
          } else if (cedula.length > 14) {
            
              cedula = cedula.slice(0, 14);
          }
      
          // Validar formato
          let regex = /^[0-9]{3}-[0-9]{6}-[0-9A-Za-z]$/;
          if (!regex.test(cedula)) {
              event.target.value = cedula.slice(0, -1);
          } else {
              event.target.value = cedula; // Convertir a mayúsculas
          }
        });*/
        
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