var productosSeleccionados = [];
var ID_Venta = generarIdVenta();

document.getElementById('IdVenta').textContent='N° Venta: '+ID_Venta;

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
    if (tipoVenta === "Contado") {
        document.getElementById("formularioContado").style.display = "block";
    } else if (tipoVenta === "Credito") {
        document.getElementById("formularioCredito").style.display = "block";
    }
}

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
  inputCantidad.value = 1;
  inputCantidad.style.textAlign = 'center';
  inputCantidad.id = 'CantProduct';
  inputCantidad.style.border = "none";
  inputCantidad.addEventListener('keypress', (e) => {
    let expre;
    expre = /^[0-9]+$/;
    
    // Verificar si la tecla presionada cumple con la expresión regular
    if (!expre.test(e.key)) {
        e.preventDefault(); // Evitar que se ingrese la tecla en el input
    }
});

  inputCantidad.onchange = function() 
  {
    var nuevaCantidad = parseInt(inputCantidad.value);
    if (nuevaCantidad < 1) {
      // Si es negativa, establecer la cantidad a 1 (o al valor mínimo aceptable)
      inputCantidad.value = 1;
      nuevaCantidad = 1;
      validarCant(Id_Producto, nuevaCantidad);
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
      AddProductoTabla (Detalle.Producto,Detalle.Cant_Vendida,Detalle.Precio_Unitario,Detalle.Sub_Total)
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

function validarCant(idProducto, nuevaCantidad) 
{
  productosSeleccionados.forEach(function(producto) 
  {
    if (producto.IdProducto === idProducto) 
    { if(nuevaCantidad >= producto.Cantidad){
        Swal.fire({
          title: "Cantidad excedida",
          text: "La cantidad disponible es " + producto.Cantidad,
          icon: 'warning',
          showConfirmButton: true,
          timer: false,
        });
      }
    }
  });
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

function BuscarCliente()
{
  const cedula = document.getElementById("CedulaCliente").value;

  fetch(`/buscar-cliente?cedula=${encodeURIComponent(cedula)}`)
  .then(response => response.json())
  .then(data => {
      // Mostrar el resultado en la tabla de factura
      const NameLabel = document.getElementById("client_name");
      NameLabel.removeAttribute("hidden");

      if(data.nombreCliente == "No se encontro al Cliente")
      {
        NameLabel.className = "text-danger";
        NameLabel.innerText = data.nombreCliente;
      }
      else
      {
        NameLabel.className = "text-success";
        NameLabel.innerText = 'Cliente: '+data.nombreCliente;
        document.getElementById('ClienteFactura').textContent = data.nombreCliente;
      }
  })
  .catch(error => console.error('Error:', error));
}

function BuscarVendedor()
{
  const cedula = document.getElementById("CedulaVendedor").value;

  fetch(`/buscar-vendedor?cedula=${encodeURIComponent(cedula)}`)
  .then(response => response.json())
  .then(data => {
      // Mostrar el resultado en la tabla de factura
      const NameLabel = document.getElementById("vendedor_name");
      NameLabel.removeAttribute("hidden");

      if(data.nombreVendedor == "No se encontro al Vendedor")
      {
        NameLabel.className = "text-danger";
        NameLabel.innerText = data.nombreVendedor;
      }
      else
      {
        NameLabel.className = "text-success";
        NameLabel.innerText = 'Vendedor: '+data.nombreVendedor;
        document.getElementById('VendedorFactura').textContent =  data.nombreVendedor;
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

function AddProductoTabla (Producto,Cantidad,Precio,SubTotal)
{
  var tabla = document.getElementById("tablaDetalleVenta").getElementsByTagName('tbody')[1];

  var nuevaFila = document.createElement("tr");
  var celda_Producto = document.createElement("td");
  var celda_Cantidad = document.createElement("td");
  var celda_Precio = document.createElement("td");
  var celda_Subtotal = document.createElement("td")
  var celda_Vacia = document.createElement("td")

  // Agregar contenido a las celdas
  celda_Producto.textContent = Producto;
  celda_Cantidad.textContent = Cantidad;
  celda_Precio.textContent = 'C$ '+Precio;
  celda_Subtotal.textContent = 'C$ '+ SubTotal;
  
  // Agregar las celdas a la fila
  nuevaFila.appendChild(celda_Producto);
  nuevaFila.appendChild(celda_Cantidad);
  nuevaFila.appendChild(celda_Vacia);
  nuevaFila.appendChild(celda_Precio);
  nuevaFila.appendChild(celda_Subtotal);
  
  // Agregar la fila a la tabla
  tabla.appendChild(nuevaFila);
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
        expre = /^[a-zA-Z0-9]+$/; 
      }else{
        expre = /^[a-zA-Z0-9-]+$/; 
      }

      // Verifica si la tecla presionada cumple con la expresión regular
      if (!expre.test(e.key)) {
          e.preventDefault(); // Evita que se ingrese la tecla en el input
      }
    });
  });