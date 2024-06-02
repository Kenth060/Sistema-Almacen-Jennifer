//MOSTRAR FORMULARIO PARA REALIZAR ABONOS
function mostrarPanelAbono(Id_Venta, Cliente,Vendedor,Saldo_Restante,fecha_venta) 
{
  var panel = document.getElementById("panelAbono");
  panel.style.display = "block";

  var fechaconvertida = convertirFecha(fecha_venta);

  document.getElementById('Abono_Title').innerText = 'Realizar abono a la Venta N° '+Id_Venta;

  document.getElementById('Id_Venta_Abono').value = Id_Venta;
  document.getElementById('Nombre_cliente_Abono').value = Cliente;
  document.getElementById('Nombre_cliente_Abono').disabled = true;

  document.getElementById('Nombre_vendedor_Abono').value = Vendedor;
  document.getElementById('Nombre_vendedor_Abono').disabled = true;

  var fechaAbonoInput = document.getElementById("Fecha_Abono");
  var Monto_Abonando = document.getElementById("Monto_Abono");

  var fecha = new Date(fechaconvertida);
  
  // Incrementar la fecha en un día
  fecha.setDate(fecha.getDate() + 1);
  
  // Convertir la fecha a formato yyyy-mm-dd
  var fechaMinima = fecha.toISOString().slice(0,10);
  

  fechaAbonoInput.min = fechaMinima;
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
    Monto_Abonando.addEventListener('keypress', (e) => {
      // Obtener el valor actual del input como un número
      const cantidadIngresada = parseInt(Monto_Abonando.value + e.key);

      // Validar si la tecla presionada es un número y si la cantidad ingresada es mayor que la existencia del producto
      if (cantidadIngresada > Saldo_Restante) {
          e.preventDefault(); // Prevenir la entrada de más caracteres
      }
    });
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
  function convertirFecha(fecha) {
    const meses = {
        "enero": "01",
        "febrero": "02",
        "marzo": "03",
        "abril": "04",
        "mayo": "05",
        "junio": "06",
        "julio": "07",
        "agosto": "08",
        "septiembre": "09",
        "octubre": "10",
        "noviembre": "11",
        "diciembre": "12"
    };

    // Dividir la fecha en partes
    const partes = fecha.toLowerCase().split(" de ");
    const dia = partes[0].padStart(2, '0');  // Asegurar que el día tenga dos dígitos
    const mes = meses[partes[1]];  // Obtener el número del mes
    const año = partes[2];  // Obtener el año

    // Formatear la fecha en el formato deseado
    const fechaFormateada = `${año}-${mes}-${dia}`;
    return fechaFormateada;
}