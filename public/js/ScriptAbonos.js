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

