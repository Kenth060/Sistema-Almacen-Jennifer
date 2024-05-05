let table = new DataTable('#TableClients');


function confirmDelete(clientID) 
{
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará permanentemente al cliente. ¿Estás seguro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Si el usuario confirma, redirecciona a la ruta de eliminar cliente
            window.location.href = '/DeleteClient/' + clientID;
        }
    });
}

function Limpiar()
{
    document.getElementById('Nombre').value='';
    document.getElementById('Apellido').value='';
    document.getElementById('Telefono').value='';
    document.getElementById('Cedula').value='';
    document.getElementById('Residencia').value='';
    document.getElementById('PuntoReferencia').value='';
    document.getElementById('Distancia').value='';
    document.getElementById('Casa').value='';
    const SelectDistrito = document.getElementById('Distrito');

    SelectDistrito.selectedIndex = 0;
}

function mostrarPanelRecordCrediticio(ID,Cliente) 
{
  var panel = document.getElementById("panelRecordCrediticio");
  panel.style.display = "block";

  fetch(`/buscar-records?id=${encodeURIComponent(ID)}`)
  .then(response => response.json())
  .then(data => {
    data.Records.forEach((record) => {
      AgregarRecords(Cliente,record.Fecha_Compra,record.Total_Comprado,record.Estado_Compra);
    })
  })
  .catch(error => console.error('Error:', error));





}

  function cerrarPanelRecordCrediticio() {
    var panel = document.getElementById("panelRecordCrediticio");
    panel.style.display = "none";

    var tabla = document.getElementById("TablaRecordCrediticio").getElementsByTagName('tbody')[0];
    
    while (tabla.firstChild) 
    { tabla.removeChild(tabla.firstChild);}
  }

  function mostrarPanelRegistroCliente() {
    var panel = document.getElementById("panelRegistroCliente");
    panel.style.display = "block";
  }

  function cerrarPanelRegistroCliente() {
    var panel = document.getElementById("panelRegistroCliente");
    panel.style.display = "none";
  }
  // Validación de texto para los inputs de texto
  const inputLetra = document.querySelectorAll('input[type="text"]');
  const inputnumero = document.querySelectorAll('input[type="number"]');

  // Recorre cada input encontrado
  inputLetra.forEach(input => {
    // Agrega un evento "keypress" a cada input
    input.addEventListener("keypress", (e) => {
      let expre;

    // Verifica si el input es para la cédula
    if (input.id === 'Cedula') { // Supongamos que el input de la cédula tiene el ID 'cedulaInput'
        // Expresión regular para permitir números y guion "-"
        expre = /^[a-zA-Z0-9-]+$/; // Solo números del 0-9 y guion "-"
    }else
    if (input.id === 'Residencia' || input.id === 'PuntoReferencia' || input.id === 'Distancia' || input.id === 'Casa') { // Supongamos que el input de la cédula tiene el ID 'cedulaInput'
        // Expresión regular para permitir números y guion "-"
        expre = /^[a-zA-Z0-9\s]+$/; // Solo números del 0-9 y guion "-"
    }else{ 
        expre = /^[a-zA-Z\s]+$/; 
      } 
      // Verifica si la tecla presionada cumple con la expresión regular
      if (!expre.test(e.key)) {
          e.preventDefault(); // Evita que se ingrese la tecla en el input
      }
    });
 });
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


function AgregarRecords(Cliente,Fecha,Total,Estado)
  {
    var tabla = document.getElementById("TablaRecordCrediticio").getElementsByTagName('tbody')[0];

    var nuevaFila = document.createElement("tr");
    var celda_Cliente = document.createElement("td");
    var celda_Fecha_Venta = document.createElement("td");
    var celda_Total_Venta = document.createElement("td");
    var celda_Estado = document.createElement("td");

    celda_Cliente.textContent = Cliente;
    celda_Fecha_Venta.textContent = Fecha;
    celda_Total_Venta.textContent = 'C$ '+Total;
    celda_Estado.textContent = Estado;
    
    // Agregar las celdas a la fila
    nuevaFila.appendChild(celda_Cliente);
    nuevaFila.appendChild(celda_Fecha_Venta);
    nuevaFila.appendChild(celda_Total_Venta);
    nuevaFila.appendChild(celda_Estado);
    
    // Agregar la fila a la tabla
    tabla.appendChild(nuevaFila);
  }