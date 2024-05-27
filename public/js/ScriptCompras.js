function mostrarTablaSegunCategoria() {
    // Ocultar todas las tablas
    document.getElementById('tablaCalzado').style.display = 'none';
    document.getElementById('tablaPrendas').style.display = 'none';
    document.getElementById('tablaCosmeticos').style.display = 'none';
    document.getElementById('tablaElectrodomesticos').style.display = 'none';
    document.getElementById('tablaPPlasticos').style.display = 'none';

    // Obtener la categoría seleccionada
    var seleccion = document.getElementById('categoriaSelect1').value;

    // Mostrar la tabla correspondiente
    switch (seleccion) {
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

function AbrirPanelProductoCompra() {
    var panel = document.getElementById("CompraProductos");
    panel.style.display = "block";
}

function CerrarPanelProductoCompra() {
    var panel = document.getElementById("CompraProductos");
    panel.style.display = "none";
} 

function mostrarDetallesCompra() {
    var panel = document.getElementById("panelDetalleCompras");
    panel.style.display = "block";
}

function cerrarDetallesCompra() {
    var panel = document.getElementById("panelDetalleCompras");
    panel.style.display = "none";
}

function mostrarProveedorCompras() {
    var panel = document.getElementById("BuscarProveedorVenta");
    panel.style.display = "block";
}

function cerrarProveedorCompras() {
    var panel = document.getElementById("BuscarProveedorVenta");
    panel.style.display = "none";
}

