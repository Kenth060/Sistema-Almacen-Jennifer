//MOSTRAR FORMULARIO PARA REALIZAR ABONOS
function mostrarPanelAbono(Id_Venta, Cliente,Vendedor,Saldo_Restante) 
{
  var panel = document.getElementById("panelAbono");
  panel.style.display = "block";

  document.getElementById('Abono_Title').innerText = 'Realizar abono a la Venta N° '+Id_Venta;

  document.getElementById('Id_Venta_Abono').value = Id_Venta;
  document.getElementById('Nombre_cliente_Abono').value = Cliente;
  document.getElementById('Nombre_cliente_Abono').disabled = true;

  document.getElementById('Nombre_vendedor_Abono').value = Vendedor;
  document.getElementById('Nombre_vendedor_Abono').disabled = true;

  var Monto_Abonando = document.getElementById("Monto_Abono");


  var fecha = new Date(fechaconvertida);
  
  // Incrementar la fecha en un día
  fecha.setDate(fecha.getDate() + 1);
  
  // Convertir la fecha a formato yyyy-mm-dd
  var fechaMinima = fecha.toISOString().slice(0,10);
  

  fechaAbonoInput.min = fechaMinima;
  Monto_Abonando.addEventListener('keypress', (e) => {
    // Obtener el valor actual del input como un número
    const cantidadIngresada = parseInt(Monto_Abonando.value + e.key);

    // Validar si la tecla presionada es un número y si la cantidad ingresada es mayor que la existencia del producto
    if (cantidadIngresada > Saldo_Restante) {
        e.preventDefault(); // Prevenir la entrada de más caracteres
    }
  });

  Monto_Abonando.onchange = function() 
  {
    var Cantidad = parseInt(Monto_Abonando.value);
    if (Cantidad < 1) {
      // Si es negativa, establecer la cantidad a 1 (o al valor mínimo aceptable)
      Monto_Abonando.value = 1;
      Cantidad = 1;
    }
    Monto_Abonando.max = Saldo_Restante;
    if (Cantidad > Saldo_Restante) {

      Monto_Abonando.value = Saldo_Restante;
      Cantidad = Saldo_Restante;
      Swal.fire({
        title: "Saldo restante Excedido",
        text: "El monto no puede pasar a más de C$ "+Saldo_Restante,
        icon: 'warning',
        showConfirmButton: true,
        timer: false,
      });
    }
  };
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

    var tabla = document.getElementById("Tabla_Historial_Abonos").getElementsByTagName('tbody')[0];
    
    while (tabla.firstChild) 
    { tabla.removeChild(tabla.firstChild);}
  }
  //FIN MOSTRAR HISTORIAL



  //MOSTAR HISTORIAL DE ABONOS
  function mostrarPanelHistorialAbonosUnico(Id,Cliente,Vendedor) 
  {
    var panel = document.getElementById("panelHistorialAbonosUnico");
    panel.style.display = "block";

    document.getElementById('TitleHistorial').innerText = 'Historial de abonos Venta N° '+Id;

    fetch(`/buscar-abonos?id=${encodeURIComponent(Id)}`)
  .then(response => response.json())
  .then(data => {

    data.Abonos.forEach((abono) => {
      AgregarAbonosHistorial(Cliente,Vendedor,abono.Fecha_Abono,abono.Monto_Abonado,abono.Saldo_Restante);
    })
      


  })
  .catch(error => console.error('Error:', error));


  }

  function cerrarPanelHistorialAbonosUnico() {
    var panel = document.getElementById("panelHistorialAbonosUnico");
    panel.style.display = "none";

    var tabla = document.getElementById("Tabla_Historial_Abonos").getElementsByTagName('tbody')[0];
    
    while (tabla.firstChild) 
    { tabla.removeChild(tabla.firstChild);}

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

  const inputnumero = document.querySelectorAll('input[type="number"]');
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
  
  function AgregarAbonosHistorial(Cliente,Vendedor,Fecha,Monto,Saldo)
  {
    var tabla = document.getElementById("Tabla_Historial_Abonos").getElementsByTagName('tbody')[0];

    var nuevaFila = document.createElement("tr");
    var celda_Cliente = document.createElement("td");
    var celda_Vendedor = document.createElement("td");
    var celda_Fecha_Abono = document.createElement("td");
    var celda_Monto_abonado = document.createElement("td");
    var celda_Saldo_Restante = document.createElement("td");

    celda_Cliente.textContent = Cliente;
    celda_Vendedor.textContent = Vendedor;
    celda_Fecha_Abono.textContent = Fecha;
    celda_Monto_abonado.textContent = 'C$ '+Monto;
    celda_Saldo_Restante.textContent = 'C$ '+ Saldo;
    
    // Agregar las celdas a la fila
    nuevaFila.appendChild(celda_Cliente);
    nuevaFila.appendChild(celda_Vendedor);
    nuevaFila.appendChild(celda_Fecha_Abono);
    nuevaFila.appendChild(celda_Monto_abonado);
    nuevaFila.appendChild(celda_Saldo_Restante);
    
    // Agregar la fila a la tabla
    tabla.appendChild(nuevaFila);
  }