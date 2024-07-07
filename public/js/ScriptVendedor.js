function confirmDeleteVendedor(VendedorID) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará permanentemente al vendedor.¿Está seguro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Si el usuario confirma, redirecciona a la ruta de eliminar cliente
            window.location.shref = '/DeleteVendedor/' + VendedorID;
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

function mostrarPanelRegistroVendedor() {
    var panel = document.getElementById("panelRegistroVendedor");
    panel.style.display = "block";
}

function cerrarPanelRegistroVendedor() {
var panel = document.getElementById("panelRegistroVendedor");
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
    if (input.id === 'Residencia' || input.id === 'PuntoReferencia' || input.id === 'Distancia' || input.id === 'casa') { // Supongamos que el input de la cédula tiene el ID 'cedulaInput'
        // Expresión regular para permitir números y guion "-"
        expre = /^[a-zA-Z0-9\sñÑ]+$/; // Solo números del 0-9 y guion "-"
    }else{ 
        expre = /^[a-zA-Z\sñÑáéíóúÁÉÍÓÚÜü]+$/; 
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

function crearUsuario() 
{
    let nombre = document.getElementById('Nombre_vd').value;
    let apellido = document.getElementById('Apellido_vd').value;
    let cedula = document.getElementById('Cedula').value;

    if( (nombre != '') && (apellido != '') && (cedula!= '' ))
    {   
        document.getElementById('uservd_lb').style.display='block';
        document.getElementById('uservd').style.display='block';

        // Convertir el nombre y apellido a minúsculas y eliminar espacios
        nombre = nombre.toLowerCase().trim();
        apellido = apellido.toLowerCase().trim();
        
        // Extraer la fecha de nacimiento del número de cédula
        // Suponiendo que el formato de cédula es xxx-xxxxxx-xxxx
        let fechaNacimiento = cedula.split('-')[1];
        
        // Crear el nombre de usuario
        let usuario = nombre.charAt(0) +'.'+ apellido + '.'+fechaNacimiento;
        
        console.log(usuario);
        const input_usuario =document.getElementById('uservd');
        input_usuario.value=usuario;
    }
}
