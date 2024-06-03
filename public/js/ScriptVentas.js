var productosSeleccionados = [];
var ID_Venta = generarIdVenta();

Fecha_Actual('Fecha_Venta');
ActualizarFecha();

document.getElementById('IdVenta').textContent='N° Venta: '+ID_Venta;

function mostrarTablaSegunCategoria() {
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

function TipoVenta()
{
  var tipoVenta = document.getElementById("TipoDeVenta_Select").value;

  document.getElementById("formularioCredito").style.display = "block";

  if (tipoVenta === "Contado") 
  {
    document.getElementById("plazo_compra").style.display = "none";
    document.getElementById("FrecuenciaAbono").style.display = "none";
    document.getElementById("lb_plazo_compra").style.display = "none";
    document.getElementById("lb_FrecuenciaAbono").style.display = "none";
  } 
else if (tipoVenta === "Credito") 
{
  document.getElementById("plazo_compra").style.display = "block";
  document.getElementById("FrecuenciaAbono").style.display = "block";
  document.getElementById("lb_plazo_compra").style.display = "block";
  document.getElementById("lb_FrecuenciaAbono").style.display = "block";
}
}

function AñadirProducto(Id_Producto,Nombre_Producto,Precio, CantidadExistente) 
{
  var tabla = document.getElementById("tablacliente").getElementsByTagName('tbody')[1];
  const celda_total = document.getElementById("celda_total");

  var nuevaFila = document.createElement("tr");
  var celdaProducto = document.createElement("td");
  var celdaCantidad = document.createElement("td");
  var celdaPrecio = document.createElement("td");
  var celdaBoton = document.createElement("td")
  var celdaSubtotal = document.createElement("td")

  var inputCantidad = document.createElement("input");
  inputCantidad.type = "number";
  inputCantidad.style.textAlign = 'center';
  inputCantidad.id = 'CantProduct';
  inputCantidad.value=1;
  inputCantidad.style.border = "none";
  inputCantidad.addEventListener('keypress', (e) => {
    let expre;
    expre = /^[0-9]+$/;
    
    // Verificar si la tecla presionada cumple con la expresión regular
    if (!expre.test(e.key)) {
        e.preventDefault(); // Evitar que se ingrese la tecla en el input
    }
});
  inputCantidad.addEventListener('keypress', (e) => {
    // Obtener el valor actual del input como un número
    const cantidadIngresada = parseInt(inputCantidad.value + e.key);
    
    // Obtener la existencia del producto como un número
    const existenciaProducto = producto.Existencia;
    
    // Validar si la tecla presionada es un número y si la cantidad ingresada es mayor que la existencia del producto
    if (cantidadIngresada > existenciaProducto) {
        e.preventDefault(); // Prevenir la entrada de más caracteres
    }
  });
  inputCantidad.onchange = function() 
  {
    var nuevaCantidad = parseInt(inputCantidad.value);
    if (nuevaCantidad < 1) 
    {
      // Si es negativa, establecer la cantidad a 1 (o al valor mínimo aceptable)
      inputCantidad.value = 1;
      nuevaCantidad = 1;
    }

    inputCantidad.max = producto.Existencia;
    if (nuevaCantidad > producto.Existencia) {

      inputCantidad.value = producto.Existencia;
      nuevaCantidad = producto.Existencia;
      Swal.fire({
        title: "Stock Excedido",
        text: "La cantidad no puede ser más de "+producto.Existencia,
        icon: 'warning',
        showConfirmButton: true,
        timer: false,
      });
    }
    
    actualizarCantidadProductoEnArreglo(Id_Producto, nuevaCantidad);
    actualizarTotalEnTabla();
    celdaSubtotal.textContent = 'C$' + Precio*inputCantidad.value;
  };

  var BotonEliminar = document.createElement("button");
  BotonEliminar.className = "btn btn-danger px-3"
  BotonEliminar.innerHTML = "<i class='fa-solid fa-trash'>";
  BotonEliminar.onclick = function() 
  { EliminarProducto(this , Id_Producto ); };

  var productoExistente = productosSeleccionados.find(function(producto) { return producto.IdProducto === Id_Producto; });

  if (productoExistente) 
  { 
    Swal.fire({
      title: "Producto repetido",
      text: "El producto ya ha sido añadido",
      icon: 'warning',
      showConfirmButton: true,
      timer: false,
    });
  }
  else
  {
    // Agregar contenido a las celdas
    celdaProducto.textContent = Nombre_Producto;
    celdaCantidad.appendChild(inputCantidad);
    celdaPrecio.textContent = 'C$ '+Precio;
    celdaBoton.appendChild(BotonEliminar);
    celdaSubtotal.textContent = 'C$' + Precio*inputCantidad.value;

    // Agregar las celdas a la fila
    nuevaFila.appendChild(celdaProducto);
    nuevaFila.appendChild(celdaCantidad);
    nuevaFila.appendChild(celdaPrecio);
    nuevaFila.appendChild(celdaSubtotal);
    nuevaFila.appendChild(celdaBoton);
    

    // Agregar la fila a la tabla
    tabla.appendChild(nuevaFila);

    var producto = 
    {
      IdProducto: Id_Producto,
      Cantidad: 1,
      Precio: Precio,
      Existencia: CantidadExistente
    };

    productosSeleccionados.push(producto);
    console.log("Productos seleccionados:", productosSeleccionados);

    let total_venta = 0;

    productosSeleccionados.forEach(function(producto) 
    { total_venta += producto.Precio * producto.Cantidad; });

    celda_total.innerHTML = 'C$ ' + total_venta.toFixed(2);  
  }

}

function AñadirVenta()
{
  const Cliente = document.getElementById('CedulaCliente').value;
  const Vendedor = document.getElementById('CedulaVendedor').value;
  const tipo_venta = document.getElementById('TipoDeVenta_Select').value;
  const Fecha_Venta = document.getElementById('Fecha_Venta').value;
  const Total_venta_td = document.getElementById('celda_total').innerText;
  const Plazo = document.getElementById('plazo_compra').value;
  const Frecuencia_Abonos = document.getElementById('FrecuenciaAbono').value;

  const Total_venta = parseFloat(Total_venta_td.replace("C$", "").trim());
  
  const DatosVenta = 
  {
    Tipo_Venta:tipo_venta,
    Cliente:Cliente,
    Vendedor:Vendedor,
    Fecha_Venta:Fecha_Venta,
    Productos: productosSeleccionados,
    Plazo: Plazo,
    Frecuencia_Abonos: Frecuencia_Abonos,
    Total: Total_venta,
    Id_Venta:ID_Venta
  }

    
  if (productosSeleccionados.length == 0)
  {
    Swal.fire({
      title: "No ha agregado Productos",
      text: "No ha agregado ningun producto a la venta, por favor agregue productos e intentelo nuevamente",
      icon: 'warning',
      showConfirmButton: true,
      timer: false,
    });
  }
  else  
  {
    fetch('/AddVenta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(DatosVenta)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('La solicitud ha fallado');
        }
        return response.json();
      })
      .then(data => 
      {
        if (data.success)
        {
          Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'Venta agregada correctamente',
                    confirmButtonText: 'Aceptar'})
                .then(() => { window.location.reload();});
        } 
        else 
        {
          Swal.fire({
            icon: 'error',
            title: 'No se pudo ingresar la venta',
            text: 'Hubo un error al ingresar la venta, verifique los datos e intentelo nuevamente x',
            confirmButtonText: 'Aceptar'
          })
        }
      })
      .catch(error => 
      {
        Swal.fire({
          icon: 'error',
          title: 'No se pudo ingresar la venta',
          text: 'Hubo un error al ingresar la venta, verifique los datos e intentelo nuevamente',
          confirmButtonText: 'Aceptar'
        })
      });
  }
 


}

function EliminarProducto(boton,id) {
    
    // Obtener el índice de la fila en la tabla
    var filaTabla = boton.parentNode.parentNode;
    var indexFila = filaTabla.rowIndex;
    
    // Eliminar la fila de la tabla
    document.getElementById("tablacliente").deleteRow(indexFila);

    productosSeleccionados = productosSeleccionados.filter(producto => producto.IdProducto !== id);
    actualizarTotalEnTabla() 
}

function mostrarDetallesVenta(Id_Venta, Cliente, Vendedor, Fecha , Total) 
{
  var panel = document.getElementById("panelDetalleVentas");
  panel.style.display = "block";

  document.getElementById("DetalleTitle").innerText = 'Detalles de la Venta N° '+Id_Venta;
  document.getElementById("ClienteDetalle").textContent = Cliente;
  document.getElementById("VendedorDetalle").textContent = Vendedor;
  document.getElementById("FechaDetalle").textContent = Fecha;
  document.getElementById("TotalDetalle").textContent = 'C$ '+Total;
  
  fetch(`/buscar-detalleventa?id=${encodeURIComponent(Id_Venta)}`)
  .then(response => response.json())
  .then(data => 
  {
    const Detalles = data.DetallesVenta;
    Detalles.forEach((Detalle) => 
    {
      AddProductoTabla (Detalle.Producto,Detalle.Cant_Vendida,Detalle.Precio_Unitario,Detalle.Sub_Total, Id_Venta,Cliente,Vendedor,Detalle.Id_Producto)
    })

  })
  .catch(error => console.error('Error:', error)); 




}

function cerrarDetallesVenta() 
{
    var panel = document.getElementById("panelDetalleVentas");
    panel.style.display = "none";
    
    var tabla = document.getElementById("tablaDetalleVenta").getElementsByTagName('tbody')[1];
    
    while (tabla.firstChild) 
    { tabla.removeChild(tabla.firstChild);}
    
}

function actualizarCantidadProductoEnArreglo(idProducto, nuevaCantidad) 
{
  productosSeleccionados.forEach(function(producto) 
  {
    if (producto.IdProducto === idProducto) 
    { producto.Cantidad = nuevaCantidad; }
  });
}

function actualizarTotalEnTabla() 
{
  let totalVenta = 0;
  const celda_total = document.getElementById("celda_total");
  
  productosSeleccionados.forEach(function(producto) 
  { totalVenta += producto.Precio * producto.Cantidad; });
  celda_total.innerHTML = 'C$ ' + totalVenta.toFixed(2);
}

function BuscarCliente(cedula)
{
  fetch(`/buscar-cliente?cedula=${encodeURIComponent(cedula)}`)
  .then(response => response.json())
  .then(data => {
      // Mostrar el resultado en la tabla de factura
      const btnBusqueda = document.getElementById("btnBuscarCliente");

      if(data.nombreCliente == "No se encontro al Cliente")
      {
        btnBusqueda.className = "btn btn-outline-danger";
        btnBusqueda.innerHTML = "No se encontro al Cliente <i class='bx bx-search'></i> ";
      }
      else
      {
        btnBusqueda.className = "btn btn-outline-success";
        btnBusqueda.innerText = data.nombreCliente;
        document.getElementById('ClienteFactura').textContent = data.nombreCliente;
        document.getElementById('CedulaCliente').value = cedula;
        cerrarClienteVenta();
      }
  })
  .catch(error => console.error('Error:', error));
}

function BuscarVendedor(cedula)
{
  fetch(`/buscar-vendedor?cedula=${encodeURIComponent(cedula)}`)
  .then(response => response.json())
  .then(data => {
      // Mostrar el resultado en la tabla de factura
      const btnBusqueda = document.getElementById("btnBuscarVendedor");

      if(data.nombreVendedor == "No se encontro al Vendedor")
      {
        btnBusqueda.className = "btn btn-outline-danger";
        btnBusqueda.innerHTML = "No se encontro al Vendedor <i class='bx bx-search'></i> ";
      }
      else
      {
        btnBusqueda.className = "btn btn-outline-success";
        btnBusqueda.innerText = data.nombreVendedor;
        document.getElementById('VendedorFactura').textContent =  data.nombreVendedor;
        document.getElementById('CedulaVendedor').value = cedula;
        cerrarVendedorVenta();
      }
  })
  .catch(error => console.error('Error:', error));
}

function generarIdVenta() 
{
  const numeroAleatorio = Math.floor(Math.random() * 1000000);
  const idVenta = numeroAleatorio;
  return idVenta;
}
var filasAgregadas = [];
function AddProductoTabla (Producto,Cantidad,Precio,SubTotal,Id_Venta, Cliente,Vendedor,Id_Producto)
{
  var tabla = document.getElementById("tablaDetalleVenta").getElementsByTagName('tbody')[1];

  var nuevaFila = document.createElement("tr");
  var celda_Producto = document.createElement("td");
  var celda_Cantidad = document.createElement("td");
  var celda_Precio = document.createElement("td");
  var celda_Subtotal = document.createElement("td")
  var celda_Vacia = document.createElement("td")
  var celda_boton_devolver = document.createElement("td")

  // Agregar contenido a las celdas
  celda_Producto.textContent = Producto;
  celda_Cantidad.textContent = Cantidad;
  celda_Precio.textContent = 'C$ '+Precio;
  celda_Subtotal.textContent = 'C$ '+ SubTotal;

  var BotonDevolver = document.createElement("button");
  BotonDevolver.className = "btn btn-primary px-3"
  BotonDevolver.innerHTML = " <i class='fa-solid fa-rotate-left'></i>";
  BotonDevolver.onclick = function() 
  { mostrarPanelDevolverProducto(Id_Venta,Cliente,Vendedor,Id_Producto,Producto,Cantidad); };
  
  celda_boton_devolver.appendChild(BotonDevolver);

  // Agregar las celdas a la fila
  nuevaFila.appendChild(celda_Producto);
  nuevaFila.appendChild(celda_Cantidad);
  nuevaFila.appendChild(celda_Vacia);
  nuevaFila.appendChild(celda_Precio);
  nuevaFila.appendChild(celda_Subtotal);
  nuevaFila.appendChild(celda_boton_devolver);
  
  // Agregar la fila a la tabla
  tabla.appendChild(nuevaFila);
  var fila = {
    Producto: Producto,
    Cantidad: Cantidad,
    Precio: Precio,
    SubTotal: SubTotal,
    Id_Venta: Id_Venta,
    Cliente: Cliente,
    Vendedor: Vendedor,
    Id_Producto: Id_Producto
  };
  filasAgregadas.push(fila);
}

function ActualizarFecha()
{
  const InputFecha = document.getElementById('FechatablaFactura');

  InputFecha.textContent = document.getElementById('Fecha_Venta').value;
}

document.addEventListener('DOMContentLoaded', function() {
  // Obtener la referencia al elemento de fecha
  const fechaVentaInput = document.getElementById('Fecha_Venta');

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

  // Validación de texto para los inputs de texto
  const inputLetra = document.querySelectorAll('input[type="text"]');

  // Recorre cada input encontrado
  inputLetra.forEach(input => {
    // Agrega un evento "keypress" a cada input
    input.addEventListener("keypress", (e) => {
      let expre;

      if(input.id === 'plazo_compra'){
        expre = /^[a-zA-Z0-9\sñÑ]+$/; 
      }else{
        expre = /^[a-zA-Z0-9-]+$/; 
      }

      // Verifica si la tecla presionada cumple con la expresión regular
      if (!expre.test(e.key)) {
          e.preventDefault(); // Evita que se ingrese la tecla en el input
      }
    });
  });


  function mostrarPanelDevolverProducto(ID_Venta,Cliente,Vendedor,ID_Producto,Nombre_Producto,Cantidad) 
  {
    cerrarDetallesVenta();
    var panel = document.getElementById("ProductoDevuelto");
    panel.style.display = "block";

    document.getElementById('Title_Devolucion').innerText = 'Devolver Producto de la Venta N° '+ID_Venta;
    document.getElementById('ClienteDevuelto').textContent = Cliente;
    document.getElementById('VendedorDevuelto').textContent = Vendedor;
    document.getElementById('NombreProductoDevuelto').textContent = Nombre_Producto;
    document.getElementById('StockAvailable').textContent = Cantidad; 
    document.getElementById('Cantidad_Devolver').max = Cantidad;
    document.getElementById('idventadevolver').value = ID_Venta;
    document.getElementById('idproductodevolver').value=ID_Producto;


  }

  function cerrarPanelDevolverProducto() {
    var panel = document.getElementById("ProductoDevuelto");
    panel.style.display = "none";
  }

  function DevolverProducto()
  {
    const ID_Producto = document.getElementById('idproductodevolver').value;
    const Fecha_Devolver = document.getElementById('FechaDevuelto').value;
    const Cantidad_Devolver = document.getElementById('Cantidad_Devolver').value;
    const motivo = document.getElementById('MotivoDevolucion').value;
    const ID_Venta = document.getElementById('idventadevolver').value
    
    const DatosDevolucion = 
    {
      Id_Producto: ID_Producto,
      Id_Venta: ID_Venta,
      Cantidad_Devuelta:Cantidad_Devolver,
      Motivo: motivo,
      Fecha_Devolucion: Fecha_Devolver
    }

    fetch('/DevolverProducto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(DatosDevolucion)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud ha fallado');
      }
      return response.json();
    })
    .then(data => 
    {
      if (data.success)
      {
        Swal.fire({
                  icon: 'success',
                  title: '¡Éxito!',
                  text: 'Producto Devuelto correctamente',
                  confirmButtonText: 'Aceptar'})
              .then(() => { window.location.reload();});
      } 
      else 
      {
        Swal.fire({
          icon: 'error',
          title: 'No se pudo Devolver el producto',
          text: 'Hubo un error al devolver el producto, verifique los datos e intentelo nuevamente',
          confirmButtonText: 'Aceptar'
        })
      }
    })
    .catch(error => 
    {
      Swal.fire({
        icon: 'error',
        title: 'No se pudo Devolver el producto',
        text: 'Hubo un error al devolver el producto, verifique los datos e intentelo nuevamente',
        confirmButtonText: 'Aceptar'
      })
    }); 


  }

  function mostrarClienteVenta() {
    var panel = document.getElementById("BuscarClienteVenta");
    panel.style.display = "block";
  }

  function cerrarClienteVenta() {
    var panel = document.getElementById("BuscarClienteVenta");
    panel.style.display = "none";
  }

  function mostrarVendedorVenta() {
    var panel = document.getElementById("BuscarVendedorVenta");
    panel.style.display = "block";
  }

  function cerrarVendedorVenta() {
    var panel = document.getElementById("BuscarVendedorVenta");
    panel.style.display = "none";
  }

  function Fecha_Actual(Fecha)
  {
    const InputFecha = document.getElementById(Fecha);
    // Obtiene la fecha actual
    var today = new Date();

    // Formatea la fecha a 'YYYY-MM-DD'
    var day = String(today.getDate()).padStart(2, '0');
    var month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses comienzan en 0
    var year = today.getFullYear();

    // Establece el valor del input con la fecha formateada
    InputFecha.value = `${year}-${month}-${day}`;
  }

  //MOSTAR HISTORIAL DE ABONOS
  function mostrarPanelHistorialAbonosUnico(Id,Cliente,Vendedor) 
  {
    var panel = document.getElementById("panelHistorialAbonosVenta");
    panel.style.display = "block";
  
    document.getElementById('TitleHistorialAbonosVenta').innerText = 'Historial de abonos Venta N° '+Id;
  
    fetch(`/buscar-abonos?id=${encodeURIComponent(Id)}`)
    .then(response => response.json())
    .then(data => 
    {
      data.Abonos.forEach((abono) => 
      { AgregarAbonosHistorial(Cliente,Vendedor,abono.Fecha_Abono,abono.Monto_Abonado,abono.Saldo_Restante); })
    })
    .catch(error => console.error('Error:', error));
  }
  
  function cerrarPanelHistorialAbonosUnico() 
  {
    var panel = document.getElementById("panelHistorialAbonosVenta");
    panel.style.display = "none";
    
    var tabla = document.getElementById("Tabla_Historial_Abonos_Venta").getElementsByTagName('tbody')[0];
      
    while (tabla.firstChild) 
    { tabla.removeChild(tabla.firstChild);}
  
  }

  function AgregarAbonosHistorial(Cliente,Vendedor,Fecha,Monto,Saldo)
  {
    var tabla = document.getElementById("Tabla_Historial_Abonos_Venta").getElementsByTagName('tbody')[0];

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
  document.addEventListener('DOMContentLoaded', function() {
    // Obtener la referencia al elemento de fecha
    const fechaVentaInput = document.getElementById('plazo_compra');
  
    // Obtener la fecha actual
    const fechaActual = new Date();
  
    // Obtener la hora y los minutos actuales
    const horaActual = fechaActual.getHours();
    const minutosActuales = fechaActual.getMinutes();
  
    const horaCorte = 17;
    const minutosCorte = 0; 
  
    // Verificar si la hora actual es después de las 6:45 PM
    const esDespuesDeLas645PM = horaActual > horaCorte || (horaActual === horaCorte && minutosActuales >= minutosCorte);
  
    // Calcular la fecha mínima permitida
    const fechaMinima = new Date();
    if (esDespuesDeLas645PM) {
      // Si es después de las 
      fechaMinima.setDate(fechaActual.getDate());
    } else {
      // Si es antes de las 
      fechaMinima.setDate(fechaActual.getDate() + 1);
    }
  
    // Establecer la fecha mínima en el campo de fecha
    const fechaMinimaISO = fechaMinima.toISOString().split('T')[0];
    fechaVentaInput.setAttribute('min', fechaMinimaISO);
  });

  function genPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Título del documento
    doc.text("Factura", 20, 20);
    
  
    const headers = ['Cliente'];
    const data = filasAgregadas.map(fila => [fila.Cliente]);
    const headers2 = ['Vendedor','Producto', 'Cantidad', '', 'Precio', 'SubTotal'];
    const data2 = filasAgregadas.map(fila => [fila.Vendedor,fila.Producto, fila.Cantidad, '', fila.Precio, fila.SubTotal]);
  

    doc.autoTable({
      head: [headers],
      body: data
    });
    doc.autoTable({
      head: [headers2],
      body: data2
    });
    
    // Guardar el PDF
    doc.save(`factura_${data}.pdf`);
    filasAgregadas = [];
  }

