//MOSTRAR FORMULARIO PARA REALIZAR ABONOS
function mostrarPanelAbono(Id_Venta, Cliente,Vendedor) 
{
  var panel = document.getElementById("panelAbono");
  panel.style.display = "block";

  document.getElementById('Abono_Title').innerText = 'Realizar abono a la Venta N° '+Id_Venta;

  document.getElementById('Id_Venta_Abono').value = Id_Venta;
  document.getElementById('Nombre_cliente_Abono').value = Cliente;
  document.getElementById('Nombre_cliente_Abono').disabled = true;

  document.getElementById('Nombre_vendedor_Abono').value = Vendedor;
  document.getElementById('Nombre_vendedor_Abono').disabled = true;

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



  //MOSTAR HISTORIAL DE ABONOS
  function mostrarPanelHistorialAbonosUnico(Id,Cliente,Vendedor) 
  {
    var panel = document.getElementById("panelHistorialAbonosUnico");
    panel.style.display = "block";

    document.getElementById('TitleHistorial').innerText = 'Historial de abonos Venta N° '+Id;
  }

  function cerrarPanelHistorialAbonosUnico() {
    var panel = document.getElementById("panelHistorialAbonosUnico");
    panel.style.display = "none";
  }
  //FIN MOSTRAR HISTORIAL

  document.addEventListener('DOMContentLoaded', function() {
    // Obtener la referencia al elemento de fecha
    const fechaVentaInput = document.getElementById('Fecha_Abono');
  
    // Obtener la fecha actual
    const fechaActual = new Date();
  
    // Obtener la hora y los minutos actuales
    const horaActual = fechaActual.getHours();
    const minutosActuales = fechaActual.getMinutes();
  
    // Definir la hora y minutos de corte (6:45 PM)
    const horaCorte = 17; // 6 PM en formato militar
    const minutosCorte = 0; // 45 minutos
  
    // Verificar si la hora actual es después de las 6:45 PM
    const esDespuesDeLas645PM = horaActual > horaCorte || (horaActual === horaCorte && minutosActuales >= minutosCorte);
  
    // Calcular la fecha mínima permitida
    const fechaMinima = new Date();
    if (esDespuesDeLas645PM) {
      // Si es después de las 6:45 PM, permitir seleccionar a partir del día siguiente
      fechaMinima.setDate(fechaActual.getDate() - 1);
    } else {
      // Si es antes de las 6:45 PM, permitir seleccionar a partir de hoy
      fechaMinima.setDate(fechaActual.getDate());
    }
  
    // Establecer la fecha mínima en el campo de fecha
    const fechaMinimaISO = fechaMinima.toISOString().split('T')[0];
    fechaVentaInput.setAttribute('max', fechaMinimaISO);
  });