function confirmDelete(clientID) {
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
