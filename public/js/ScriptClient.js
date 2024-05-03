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

function mostrarPanelRecordCrediticio() {
    var panel = document.getElementById("panelRecordCrediticio");
    panel.style.display = "block";
  }

  function cerrarPanelRecordCrediticio() {
    var panel = document.getElementById("panelRecordCrediticio");
    panel.style.display = "none";
  }

  function mostrarPanelRegistroCliente() {
    var panel = document.getElementById("panelRegistroCliente");
    panel.style.display = "block";
  }

  function cerrarPanelRegistroCliente() {
    var panel = document.getElementById("panelRegistroCliente");
    panel.style.display = "none";
  }

  