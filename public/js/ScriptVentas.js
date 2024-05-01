function mostrarTablaSegunCategoria1() {
    // Ocultar todas las tablas
    document.getElementById('tablaCalzado').style.display = 'none';
    document.getElementById('tablaPrendas').style.display = 'none';
    document.getElementById('tablaCosmeticos').style.display = 'none';
    document.getElementById('tablaElectrodomesticos').style.display = 'none';
    document.getElementById('tablaPPlasticos').style.display = 'none';
    document.getElementById('factura').style.display = 'none';

    // Obtener la categoría seleccionada
    var seleccion = document.getElementById('categoriaSelect1').value;

    // Mostrar la tabla correspondiente
    switch (seleccion) {
        case '1': 
            document.getElementById('tablaCalzado').style.display = 'block';
            document.getElementById('factura').style.display = 'block';
            break;
        case '2': 
            document.getElementById('tablaPrendas').style.display = 'block';
            document.getElementById('factura').style.display = 'block';
            break;
        case '3': 
            document.getElementById('tablaCosmeticos').style.display = 'block';
            document.getElementById('factura').style.display = 'block';
            break;
        case '4': 
            document.getElementById('tablaElectrodomesticos').style.display = 'block';
            document.getElementById('factura').style.display = 'block';
            break;
        case '5': 
            document.getElementById('tablaPPlasticos').style.display = 'block';
            document.getElementById('factura').style.display = 'block';
            break;
        
    }
}

function mostrarTablaSegunCategoria2() {
  // Ocultar todas las tablas
  document.getElementById('tablaCalzado').style.display = 'none';
  document.getElementById('tablaPrendas').style.display = 'none';
  document.getElementById('tablaCosmeticos').style.display = 'none';
  document.getElementById('tablaElectrodomesticos').style.display = 'none';
  document.getElementById('tablaPPlasticos').style.display = 'none';

  // Obtener la categoría seleccionada
  var seleccion = document.getElementById('categoriaSelect2').value;

  // Mostrar la tabla correspondiente
  switch (seleccion) {
      case '1': 
          document.getElementById('tablaCalzado').style.display = 'block';
          document.getElementById('factura').style.display = 'block';
          break;
      case '2': 
          document.getElementById('tablaPrendas').style.display = 'block';
          document.getElementById('factura').style.display = 'block';
          break;
      case '3': 
          document.getElementById('tablaCosmeticos').style.display = 'block';
          document.getElementById('factura').style.display = 'block';
          break;
      case '4': 
          document.getElementById('tablaElectrodomesticos').style.display = 'block';
          document.getElementById('factura').style.display = 'block';
          break;
      case '5': 
          document.getElementById('tablaPPlasticos').style.display = 'block';
          document.getElementById('factura').style.display = 'block';
          break;
      
  }
}


function mostrarPanelAbono() {
    var panel = document.getElementById("panelAbono");
    panel.style.display = "block";
  }

  function cerrarPanelAbono() {
    var panel = document.getElementById("panelAbono");
    panel.style.display = "none";
  }
  //FIN FORMULARIO

  //MOSTAR HISTORIAL DE ABONOS
  function mostrarPanelHistorialAbonos() {
    var panel = document.getElementById("panelHistorialAbonos");
    panel.style.display = "block";
  }

  function cerrarPanelHistorialAbonos() {
    var panel = document.getElementById("panelHistorialAbonos");
    panel.style.display = "none";
  }
  //FIN MOSTRAR HISTORIAL

  //AQUI TERMINA


function mostrarFormulario() {
    var tipoVenta = document.getElementById("TipoDeVenta_Select").value;

    // Ocultar todos los formularios
    document.getElementById("formularioContado").style.display = "none";
    document.getElementById("formularioCredito").style.display = "none";

    // Mostrar el formulario correspondiente según la opción seleccionada
    if (tipoVenta === "1") {
        document.getElementById("formularioContado").style.display = "block";
    } else if (tipoVenta === "2") {
        document.getElementById("formularioCredito").style.display = "block";
    }
}

function SearchVenta(){
    const input = document.getElementById('inputSearch');

}

function mostrarDetallesVenta() {
    var panel = document.getElementById("panelDetalleVentas");
    panel.style.display = "block";
  }

  function cerrarDetallesVenta() {
    var panel = document.getElementById("panelDetalleVentas");
    panel.style.display = "none";
  }