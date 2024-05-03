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


function AñadirProducto(Id_Producto,Nombre_Producto,Precio, Button) 
{
  var tabla = document.getElementById("tablacliente").getElementsByTagName('tbody')[1];
  const celda_total = document.getElementById("celda_total");

  var nuevaFila = document.createElement("tr");
  var celdaProducto = document.createElement("td");
  var celdaCantidad = document.createElement("td");
  var celdaPrecio = document.createElement("td");
  var celdaBoton = document.createElement("td")

  var inputCantidad = document.createElement("input");
  inputCantidad.type = "number";
  inputCantidad.value = 1;
  inputCantidad.style.textAlign = 'center';
  inputCantidad.id = 'CantProduct';
  inputCantidad.style.border = "none";

  inputCantidad.onchange = function() 
  {
    var nuevaCantidad = parseInt(inputCantidad.value);
    actualizarCantidadProductoEnArreglo(Id_Producto, nuevaCantidad);
    actualizarTotalEnTabla();
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

    // Agregar las celdas a la fila
    nuevaFila.appendChild(celdaProducto);
    nuevaFila.appendChild(celdaCantidad);
    nuevaFila.appendChild(celdaPrecio);
    nuevaFila.appendChild(celdaBoton);

    // Agregar la fila a la tabla
    tabla.appendChild(nuevaFila);

    var producto = 
    {
      IdProducto: Id_Producto,
      Cantidad: 1,
      Precio: Precio
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

    
    const DatosVenta = {
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

function EliminarProducto(boton,id) {
    
    // Obtener el índice de la fila en la tabla
    var filaTabla = boton.parentNode.parentNode;
    var indexFila = filaTabla.rowIndex;
    
    // Eliminar la fila de la tabla
    document.getElementById("tablacliente").deleteRow(indexFila);

    productosSeleccionados = productosSeleccionados.filter(producto => producto.IdProducto !== id);
    actualizarTotalEnTabla() 
}


function mostrarDetallesVenta() {
    var panel = document.getElementById("panelDetalleVentas");
    panel.style.display = "block";
  }

function cerrarDetallesVenta() {
    var panel = document.getElementById("panelDetalleVentas");
    panel.style.display = "none";
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


  
