function confirmDeleteVendedor(VendedorID) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará permanentemente al vendedor. ¿Está seguro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Si el usuario confirma, redirecciona a la ruta de eliminar cliente
            window.location.href = '/DeleteVendedor/' + VendedorID;
        }
    });
}

function Limpiar()
{
    document.getElementById('nombre').value='';
    document.getElementById('apellido').value='';
    document.getElementById('Telefono').value='';
    document.getElementById('Cedula').value='';
    document.getElementById('Residencia').value='';
    document.getElementById('PuntoReferencia').value='';
    document.getElementById('Distancia').value='';
    document.getElementById('casa').value='';
    const SelectDistrito = document.getElementById('selectDistritoVd');

    SelectDistrito.selectedIndex = 0;
}