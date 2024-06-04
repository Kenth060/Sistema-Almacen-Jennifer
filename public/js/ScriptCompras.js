Fecha_Actual('FCompra');
ActualizarFecha();
var invalidProductFound = false;

var productosSeleccionados = [];
const Id_Compra = generarIdCompra();
document.getElementById('NumCompra').textContent='N° Compra: '+ Id_Compra;

function mostrarTablaSegunCategoria() 
{
    // Ocultar todas las tablas
    document.getElementById('tablaCalzado').style.display = 'none';
    document.getElementById('tablaPrendas').style.display = 'none';
    document.getElementById('tablaCosmeticos').style.display = 'none';
    document.getElementById('tablaElectrodomesticos').style.display = 'none';
    document.getElementById('tablaPPlasticos').style.display = 'none';

    // Obtener la categoría seleccionada
    var seleccion = document.getElementById('categoriaSelect1').value;

    // Mostrar la tabla correspondiente
    switch (seleccion) 
    {
        case '1': 
            document.getElementById('tablaCalzado').style.display = 'block';
            break;
        case '2': 
            document.getElementById('tablaPrendas').style.display = 'block';
            break;
        case '3': 
            document.getElementById('tablaCosmeticos').style.display = 'block';
            break;
        case '4': 
            document.getElementById('tablaElectrodomesticos').style.display = 'block';
            break;
        case '5': 
            document.getElementById('tablaPPlasticos').style.display = 'block';
            break;
        
    }
}

function AbrirPanelProductoCompra() 
{
    //alert('Abrir PANEL');
    let panel = document.getElementById("CompraProducto");
    panel.style.display = "block";
}

function CerrarPanelProductoCompra() 
{
    //alert('Cerrar PANEL');
    var panel = document.getElementById("CompraProducto");
    panel.style.display = "none";
} 

function mostrarDetallesCompra(Id_Compra, Proveedor, Comprador, Fecha , Total) 
{
  var panel = document.getElementById("panelDetalleCompras");
  panel.style.display = "block";

  document.getElementById("DetalleCompraTitle").innerText = 'Detalles de la Compra N° '+Id_Compra;
  document.getElementById("ProveedorDetalle").textContent = Proveedor;
  document.getElementById("CompradorDetalle").textContent = Comprador;
  document.getElementById("FechaCompraDetalle").textContent = Fecha;
  document.getElementById("TotalCompraDetalle").textContent = 'C$ '+Total;

  fetch(`/buscar-detallecompra?id=${encodeURIComponent(Id_Compra)}`)
  .then(response => response.json())
  .then( data => 
  {
    const Detalles = data.DetallesCompra;

    Detalles.forEach((Detalle) => 
    {
      AddProductoTabla(Detalle.Producto,Detalle.Cantidad_Comprada,Detalle.Precio_Compra,Detalle.Precio_Venta,Detalle.Sub_Total)
    })

  })
  .catch(error => console.error('Error:', error)); 


}

function cerrarDetallesCompra() 
{
  var panel = document.getElementById("panelDetalleCompras");
  panel.style.display = "none";

  var tabla = document.getElementById("tablaDetalleCompra").getElementsByTagName('tbody')[1];
    
  while (tabla.firstChild) 
  { tabla.removeChild(tabla.firstChild);}
  
}

function mostrarProveedorCompras() 
{
    var panel = document.getElementById("BuscarProveedorVenta");
    panel.style.display = "block";
}

function cerrarProveedorCompras() 
{
    var panel = document.getElementById("BuscarProveedorVenta");
    panel.style.display = "none";
}

function mostrarGerenteCompras() 
{
    var panel = document.getElementById("BuscarGerenteVenta");
    panel.style.display = "block";
}

function cerrarGerenteCompras() 
{
    var panel = document.getElementById("BuscarGerenteVenta");
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
 
//btnBuscarProveedor
function BuscarProveedor(cedula)
{
  fetch(`/buscar-prov?cedula=${encodeURIComponent(cedula)}`)
  .then(response => response.json())
  .then(data => {

      // Mostrar el resultado en la tabla
      const btnBusqueda = document.getElementById("btnBuscarProveedor");

      if(data.nombreProveedor== "No se encontro al Proveedor" )
      {
        btnBusqueda.className = "btn btn-outline-danger";
        btnBusqueda.innerHTML = "No se encontro al Proveedor <i class='bx bx-search'></i> ";
      }
      else
      {
        btnBusqueda.className = "btn btn-outline-success";
        btnBusqueda.innerText = data.nombreProveedor;
        document.getElementById('ProveedorFactura').textContent = data.comercio + '/'+ data.nombreProveedor;
        document.getElementById('ProveedorCed').value = cedula;
        cerrarProveedorCompras();
      }
  })
  .catch(error => console.error('Error:', error));

}

function BuscarGerente(cedula)
{
    fetch(`/buscar-gerente?cedula=${encodeURIComponent(cedula)}`)
    .then(response => response.json())
    .then(data => 
    {
        // Mostrar el resultado en la tabla
        const btnBusqueda = document.getElementById("btnBuscarGerente");
  
        if(data.nombreGerente == "No se encontro al Gerente" )
        {
          btnBusqueda.className = "btn btn-outline-danger";
          btnBusqueda.innerHTML = "No se encontro al Comprador <i class='bx bx-search'></i> ";
        }
        else
        {
          btnBusqueda.className = "btn btn-outline-success";
          btnBusqueda.innerText = data.nombreGerente;
          document.getElementById('GerenteFactura').textContent = 'Almacen Jennifer/'+data.nombreGerente;
          document.getElementById('GerenteCed').value = cedula;
          cerrarGerenteCompras();
        }
    })
    .catch(error => console.error('Error:', error));
  
}

function ActualizarFecha()
{
  const InputFecha = document.getElementById('FechatablaCompra');

  InputFecha.textContent = document.getElementById('FCompra').value;
}

function generarIdCompra() 
{
  const numeroAleatorio = Math.floor(Math.random() * 1000000);
  return numeroAleatorio;
}

function AñadirProducto(Id_Producto,Nombre_Producto,Precio_Compra,Precio_Venta) 
{
  var tabla = document.getElementById("tablacompra").getElementsByTagName('thead')[1];
  const celda_total = document.getElementById("celda_totalCompra");

  if(Precio_Compra == '')
  {Precio_Compra=0;}

  if(Precio_Venta == '')
  {Precio_Venta=0;}

  var nuevaFila = document.createElement("tr");
  var celdaProducto = document.createElement("th");
  var celdaCantidad = document.createElement("th");
  var celdaPrecioCompra = document.createElement("th");
  var celdaPrecioVenta = document.createElement("th");
  var celdaBoton = document.createElement("th");
  var celdaSubtotal = document.createElement("th");

  var inputCantidad = document.createElement("input");
  inputCantidad.type = "number";
  inputCantidad.style.textAlign = 'center';
  inputCantidad.id = 'CantProductCompra';
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

  inputCantidad.onchange = function() 
  {
    let Precio = inputPrecioCompra.value;
    var nuevaCantidad = parseInt(inputCantidad.value);
    if (nuevaCantidad < 1) {
      // Si es negativa, establecer la cantidad a 1 (o al valor mínimo aceptable)
      inputCantidad.value = 1;
      nuevaCantidad = 1;
    }

    var nuevaCantidad = parseInt(inputCantidad.value);
    actualizarCantidadProductoEnArreglo(Id_Producto, nuevaCantidad);
    actualizarTotalEnTabla();
    celdaSubtotal.textContent = 'C$' + Precio*inputCantidad.value;
  };

  /*****   Input Precio de Compra *************************************************************/
  var contenedorCompra = document.createElement("div");
  contenedorCompra.className="d-flex align-items-center justify-content-center";

  var inputPrecioCompra = document.createElement("input");
  inputPrecioCompra.type = "number";
  inputPrecioCompra.style.textAlign = 'center';
  inputPrecioCompra.id = 'PrecioProductCompra';
  inputPrecioCompra.value=Precio_Compra;
  inputPrecioCompra.style.border = "none";
  inputPrecioCompra.addEventListener('keypress', (e) => 
  {
    let expre;
    expre = /^[0-9]+$/;
    
    // Verificar si la tecla presionada cumple con la expresión regular
    if (!expre.test(e.key)) {
        e.preventDefault(); // Evitar que se ingrese la tecla en el input
    }
  });

  inputPrecioCompra.onchange = function() 
  {
    var nuevoPrecio = parseInt(inputPrecioCompra.value);
    if (nuevoPrecio < 1) 
    {
      // Si es negativo, establecer la cantidad a 1 (o al valor mínimo aceptable)
      inputPrecioCompra.value = Precio_Compra;
    }
    celdaSubtotal.textContent = 'C$' + nuevoPrecio*inputCantidad.value; 
    actualizarPrecioCompraProductoEnArreglo(Id_Producto, nuevoPrecio);
    actualizarTotalEnTabla(); 
  };
 
/***************************************************************************************/

  /*****   Input Precio de Venta *************************************************************/
  var contenedorVenta = document.createElement("div");
  contenedorVenta.className="d-flex align-items-center justify-content-center";

  var inputPrecioVenta = document.createElement("input");
  inputPrecioVenta.type = "number";
  inputPrecioVenta.style.textAlign = 'center';
  inputPrecioVenta.id = 'PrecioProductCompra';
  inputPrecioVenta.value=Precio_Venta;
  inputPrecioVenta.style.border = "none";
  inputPrecioVenta.addEventListener('keypress', (e) => 
  {
    let expre;
    expre = /^[0-9]+$/;
    
    // Verificar si la tecla presionada cumple con la expresión regular
    if (!expre.test(e.key)) {
        e.preventDefault(); // Evitar que se ingrese la tecla en el input
    }
  });

  inputPrecioVenta.onchange = function() 
  {
    var nuevoPrecio = parseInt(inputPrecioVenta.value);
    if (nuevoPrecio < 1) 
    {
      // Si es negativo, establecer la cantidad a 1 (o al valor mínimo aceptable)
      inputPrecioVenta.value = Precio_Venta;
    }

    actualizarPrecioVentaProductoEnArreglo(Id_Producto, nuevoPrecio);
  };
 
/***************************************************************************************/


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

    //Agregar el texto y el input al div de compra
    contenedorCompra.textContent = 'C$ ';
    contenedorCompra.appendChild(inputPrecioCompra);
    //Agregar el contenedor a la celda
    celdaPrecioCompra.appendChild(contenedorCompra);

    //Agregar el texto y el input al div de venta
    contenedorVenta.textContent = 'C$ ';
    contenedorVenta.appendChild(inputPrecioVenta);
    //Agregar el contenedor a la celda
    celdaPrecioVenta.appendChild(contenedorVenta);

    //Agregar Boton eliminar a la celda
    celdaBoton.appendChild(BotonEliminar);
    //Columna Subtotal
    celdaSubtotal.textContent = 'C$' +( Precio_Compra * inputCantidad.value);

    // Agregar las celdas a la fila
    nuevaFila.appendChild(celdaProducto);
    nuevaFila.appendChild(celdaCantidad);
    nuevaFila.appendChild(celdaPrecioCompra);
    nuevaFila.appendChild(celdaPrecioVenta);
    nuevaFila.appendChild(celdaSubtotal);
    nuevaFila.appendChild(celdaBoton);
    
    // Agregar la fila a la tabla
    tabla.appendChild(nuevaFila);
    
    var producto = 
    {
      IdProducto: Id_Producto,
      Cantidad: 1,
      Precio_Compra: Precio_Compra,
      Precio_Venta: Precio_Venta
    };

    productosSeleccionados.push(producto);
    let total_venta = 0;

    productosSeleccionados.forEach(function(producto) 
    { total_venta += producto.Precio_Compra * producto.Cantidad; });
    celda_total.innerHTML = 'C$ ' + total_venta.toFixed(2);  
  } 

}

function EliminarProducto(boton,id) 
{
    // Obtener el índice de la fila en la tabla
    var filaTabla = boton.parentNode.parentNode;
    var indexFila = filaTabla.rowIndex;
    
    // Eliminar la fila de la tabla
    document.getElementById("tablacompra").deleteRow(indexFila);

    productosSeleccionados = productosSeleccionados.filter(producto => producto.IdProducto !== id);
    actualizarTotalEnTabla();


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
  const celda_total = document.getElementById("celda_totalCompra");
  
  productosSeleccionados.forEach(function(producto) 
  { totalVenta += producto.Precio_Compra * producto.Cantidad; });
  celda_total.textContent = 'C$ ' + totalVenta.toFixed(2);
}

function actualizarPrecioCompraProductoEnArreglo(idProducto, nuevoPrecio) 
{
  productosSeleccionados.forEach(function(producto) 
  {
    if (producto.IdProducto === idProducto) 
    { producto.Precio_Compra = nuevoPrecio; 
      invalidProductFound = false;
    }
  });


}

function actualizarPrecioVentaProductoEnArreglo(idProducto, nuevoPrecio) 
{
  productosSeleccionados.forEach(function(producto) 
  {
    if (producto.IdProducto === idProducto) 
    { 
      producto.Precio_Venta = nuevoPrecio; 
      invalidProductFound = false;
    }
  });


}

function AñadirCompra()
{
  const Proveedor = document.getElementById('ProveedorCed').value;
  const Gerente = document.getElementById('GerenteCed').value;
  const Fecha_Compra = document.getElementById('FCompra').value;
  const Total_Compra_td = document.getElementById('celda_totalCompra').innerText;


  const Total_compra = parseFloat(Total_Compra_td.replace("C$", "").trim());
  
  const DatosCompra = 
  {
    Proveedor:Proveedor,
    Comprador:Gerente,
    Fecha_Compra:Fecha_Compra,
    Productos: productosSeleccionados,
    Total_compra: Total_compra,
    Id_Compra:Id_Compra
  }
    
  if(Proveedor != '')
  {
    if(Gerente != '')
    {
      if (productosSeleccionados.length != 0)
      {
        productosSeleccionados.forEach(function(product) 
        {
          if (product.Precio_Compra == 0 || product.Precio_Venta == 0) 
          {invalidProductFound = true;}
        });
  
        if(invalidProductFound == false)
        {
          fetch('/AddCompra', 
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(DatosCompra)
          })
          .then(response => 
          {
            if (!response.ok) 
            { throw new Error('La solicitud ha fallado'); }
            return response.json();
          })
          .then( data => 
          {
            if (data.success)
            {
              Swal.fire(
              {
                icon: 'success',
                title: '¡Éxito!',
                text: 'Compra agregada correctamente',
                confirmButtonText: 'Aceptar'
              })
              .then(() => { window.location.reload();});
            } 
            else 
            {
              Swal.fire(
              {
                icon: 'error',
                title: 'No se pudo ingresar la Compra',
                text: 'Hubo un error al ingresar la Compra, verifique los datos e intentelo nuevamente x',
                confirmButtonText: 'Aceptar'
              })
            }
          })
          .catch( error => 
          {
            Swal.fire(
            {
              icon: 'error',
              title: 'No se pudo ingresar la Compra',
              text: 'Hubo un error al ingresar la Compra, verifique los datos e intentelo nuevamente',
              confirmButtonText: 'Aceptar'
            })
          });
        }
        else
        {showAlert('Falta Informacion','No ha agregado precio a uno de los producto a Comprar, por favor agregue el precio e intentelo nuevamente','warning');}
      }   
      else
      {showAlert('No ha agregado Productos','No ha agregado ningun producto a la Compra, por favor agregue productos e intentelo nuevamente','warning');}
    }
    else {showAlert('¡Faltan Datos!','Aun faltan datos por agregar, aun no ha agregado al Gerente', 'warning'); }
  }
  else
  { showAlert('¡Faltan Datos!','Aun faltan datos por agregar, aun no ha agregado al Proveedor', 'warning'); }



 


}

function showAlert(Titulo,Mensaje, icono)
{
  Swal.fire({
    title: Titulo,
    text: Mensaje,
    icon: icono,
    showConfirmButton: true,
    timer: false,
  });
}

function AddProductoTabla (Producto,Cantidad,Precio_Compra, Precio_Venta,SubTotal)
{
  var tabla = document.getElementById("tablaDetalleCompra").getElementsByTagName('tbody')[1];

  var nuevaFila = document.createElement("tr");

  var celda_Producto = document.createElement("td");
  var celda_Cantidad = document.createElement("td");
  var celda_Vacia = document.createElement("td");
  var celda_Precio_compra = document.createElement("td");
  var celda_Precio_venta = document.createElement("td");
  var celda_Subtotal = document.createElement("td");

  // Agregar contenido a las celdas
  celda_Producto.textContent = Producto;
  celda_Cantidad.textContent = Cantidad;
  celda_Precio_compra.textContent = 'C$ '+Precio_Compra;
  celda_Precio_venta.textContent = 'C$ '+Precio_Venta;
  celda_Subtotal.textContent = 'C$ '+ SubTotal;

  // Agregar las celdas a la fila
  nuevaFila.appendChild(celda_Producto);
  nuevaFila.appendChild(celda_Cantidad);
  nuevaFila.appendChild(celda_Vacia);
  nuevaFila.appendChild(celda_Precio_compra);
  nuevaFila.appendChild(celda_Precio_venta);
  nuevaFila.appendChild(celda_Subtotal);
  
  // Agregar la fila a la tabla
  tabla.appendChild(nuevaFila);
}