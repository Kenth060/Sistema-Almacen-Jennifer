var productosSeleccionados = [];

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

function AñadirProducto(Id_Producto,Nombre_Producto,Precio, Button) 
{
    const input_cantidad = Button.parentElement.querySelector("#CantProduct");
    var cantidad = input_cantidad.value;
    var tabla = document.getElementById("tablacliente").getElementsByTagName('tbody')[1];

<<<<<<< HEAD
    var nuevaFila = document.createElement("tr");
    var celdaProducto = document.createElement("td");
    var celdaCantidad = document.createElement("td");
    var celdaPrecio = document.createElement("td");
    var celdaBoton = document.createElement("td")

    var inputCantidad = document.createElement("input");
    inputCantidad.type = "number";
    inputCantidad.value = cantidad;

    var BotonEliminar = document.createElement("button");
    BotonEliminar.className = "btn btn-danger px-3"
    BotonEliminar.innerHTML = "<i class='fa-solid fa-trash'>";
    BotonEliminar.onclick = function() {
        EliminarProducto(this , Id_Producto ); // Pasamos el botón como parámetro
    };

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

    var producto = {
        IdProducto: Id_Producto,
        Cantidad: cantidad,
        Precio: Precio
    };

    productosSeleccionados.push(producto);
    console.log("Productos seleccionados:", productosSeleccionados);
}

function AñadirVenta()
{
    const tipo_venta = document.getElementById('TipoDeVenta_Select').value;

    const DatosVenta = {
        Tipo_Venta:tipo_venta,
        Productos: productosSeleccionados
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
  .then(data => {
    console.log('Venta agregada con éxito:', data);
  })
  .catch(error => {
    console.error('Ha ocurrido un error:', error);
  });


}

function EliminarProducto(boton,id) {
    
    // Obtener el índice de la fila en la tabla
    var filaTabla = boton.parentNode.parentNode;
    var indexFila = filaTabla.rowIndex;
    
    // Eliminar la fila de la tabla
    document.getElementById("tablacliente").deleteRow(indexFila);

    productosSeleccionados = productosSeleccionados.filter(producto => producto.IdProducto !== id);
}
=======
}

function mostrarDetallesVenta() {
    var panel = document.getElementById("panelDetalleVentas");
    panel.style.display = "block";
  }

  function cerrarDetallesVenta() {
    var panel = document.getElementById("panelDetalleVentas");
    panel.style.display = "none";
  }
>>>>>>> 53df3d97c24c8ddff855a39f904c16915722aa53
