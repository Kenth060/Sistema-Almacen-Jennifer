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

function abrirPanelReportes()
{
  console.log('Abriendo panel de reportes siuu');

  var panel = document.getElementById("PanelReportes");
  panel.style.display = "block";

}

function cerrarPanelReportes()
{
  console.log('Cerrando panel de reportes siuu');

  var panel = document.getElementById("PanelReportes");
  panel.style.display = "none";

}

function updateVendedorName() 
{
    var select = document.getElementById('select-vendedor');
    var selectedOption = select.options[select.selectedIndex];
    var vendedorName = selectedOption.text;
    document.getElementById('vendedor-name').value = vendedorName;
}

document.addEventListener('DOMContentLoaded', function () 
{
  const periodRadios = document.querySelectorAll('input[name="period"]');
  const selectMesDiv = document.getElementById('select-mes');
  const rangoFechasInputs = document.getElementById('rango-fechas-inputs');
  const mesSelect = document.getElementById('mes-select');
  const fechaInicioInput = document.getElementById('fecha_inicio');
  const fechaFinInput = document.getElementById('fecha_fin');
  const reportForm = document.getElementById('report-form');

  periodRadios.forEach(radio => {
      radio.addEventListener('change', function () {
          if (this.value === 'mes') {
              selectMesDiv.style.display = 'block';
              rangoFechasInputs.style.display = 'none';
              populateMonths();
          } else if (this.value === 'rango') {
              selectMesDiv.style.display = 'none';
              rangoFechasInputs.style.display = 'block';
              setDateRange();
          } else {
              selectMesDiv.style.display = 'none';
              rangoFechasInputs.style.display = 'none';
          }
      });
  });

  function populateMonths() {
      mesSelect.innerHTML = ''; // Clear previous options
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth();
      const startYear = 2023;
      const startMonth = 11; // December (0-based index)
      
      for (let year = startYear; year <= currentYear; year++) {
          const monthStart = (year === startYear) ? startMonth : 0;
          const monthEnd = (year === currentYear) ? currentMonth : 11;
          
          for (let month = monthStart; month <= monthEnd; month++) {
              const monthName = new Date(year, month).toLocaleString('es-ES', { month: 'long' });
              const option = document.createElement('option');
              option.value = `${year}-${month + 1}`;
              option.text = `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${year}`;
              mesSelect.appendChild(option);
          }
      }
  }

  function setDateRange() {
      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      
      fechaInicioInput.value = firstDayOfMonth.toISOString().substr(0, 10);
      fechaFinInput.value = now.toISOString().substr(0, 10);
  }

  reportForm.addEventListener('submit', function (event) {
      const selectedPeriod = document.querySelector('input[name="period"]:checked');
      if (!selectedPeriod) {
          event.preventDefault();
          Swal.fire({
              icon: 'warning',
              title: 'Atención',
              text: 'Debe seleccionar una opción de periodo de tiempo.'
          });
          return;
      }

      if (selectedPeriod.value === 'mes' && !mesSelect.value) {
          event.preventDefault();
          Swal.fire({
              icon: 'warning',
              title: 'Atención',
              text: 'Debe seleccionar un mes.'
          });
          return;
      }

      if (selectedPeriod.value === 'rango' && (!fechaInicioInput.value || !fechaFinInput.value)) {
          event.preventDefault();
          Swal.fire({
              icon: 'warning',
              title: 'Atención',
              text: 'Debe seleccionar una fecha de inicio y una fecha de fin.'
          });
          return;
      }
  });
});