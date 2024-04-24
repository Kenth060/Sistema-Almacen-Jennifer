const Clasificacion = document.getElementById('Clasificacion');
const U_med = document.getElementById('UnidadMedida');
const Dimensiones = document.getElementById('Dimensiones');
const Talla = document.getElementById('Talla');
const Modelo = document.getElementById('Modelo')
const Categoria_Prod = document.getElementById('Categoria_Prod');

const Clasificacionlb = document.getElementById('Clasificacionlb');
const U_medlb = document.getElementById('UnidadMedidalb');
const Dimensioneslb = document.getElementById('Dimensioneslb');
const Tallalb = document.getElementById('Tallalb');
const Modelolb = document.getElementById('Modelolb')

Talla.style.display='none';
Modelo.style.display='none';
Clasificacion.style.display='none';
U_med .style.display='none';
Dimensiones.style.display='none';

Tallalb.style.display='none';
Modelolb.style.display='none';
Clasificacionlb.style.display='none';
U_medlb.style.display='none';
Dimensioneslb.style.display='none'; 

var opcionSeleccionada = document.getElementById('categoria').value;

if(opcionSeleccionada === '1') /*seleccion de Calzado en el Dropdown */
{
  /*deshabilitacion de inputs */
  Clasificacion.style.display='none';
  U_med .style.display='none';
  Dimensiones.style.display='none';

  /*deshabilitacion de labels */
  Clasificacionlb.style.display='none';
  Dimensioneslb.style.display='none';
  U_medlb.style.display='none';

  /*Habilitacion*/
  Talla.style.display='block';
  Tallalb.style.display='block';
  Modelo.style.display='block';
  Modelolb.style.display='block';

  Categoria_Prod.value = 'Calzado';
}
else if(opcionSeleccionada === '2') /*seleccion de Prendas en el Dropdown */
{
  Categoria_Prod.value = 'Prendas de Vestir';
  /*deshabilitacion de inputs */

    Clasificacion.style.display='none';
    U_med.style.display='none';
    Dimensiones.style.display='none';
    Modelo.style.display='none';

    /*deshabilitacion de labels */
    Clasificacionlb.style.display='none';
    U_medlb.style.display='none';
    Dimensioneslb.style.display='none';
    Modelolb.style.display='none';

    /*Habilitacion*/
    Talla.style.display='block';
    Tallalb.style.display='block';

}
else if (opcionSeleccionada === '3') /*seleccion de Cosmeticos en el Dropdown */
{
  Categoria_Prod.value = 'Cosmeticos';
  /*deshabilitacion de inputs */
  U_med.style.display='none';
  Dimensiones.style.display='none';
  Modelo.style.display='none';
  Talla.style.display='none';

  /*deshabilitacion de labels */
  Tallalb.style.display='none';
  Dimensioneslb.style.display='none';
  U_medlb.style.display='none';
  Modelolb.style.display='none';

  /*Habilitacion*/
  Clasificacion.style.display='block';
  Clasificacionlb.style.display='block';

}
else if(opcionSeleccionada === '4') /*seleccion de Electrodomesticos en el Dropdown */
{
  Categoria_Prod.value = 'Electrodomesticos';
  /*deshabilitacion de inputs */
    Clasificacion.style.display='none';
    U_med.style.display='none';
    Dimensiones.style.display='none';
    Talla.style.display='none';

    /*deshabilitacion de labels */
    Clasificacionlb.style.display='none';
    Dimensioneslb.style.display='none';
    U_medlb.style.display='none';
    Tallalb.style.display='none';

    /*Habilitacion*/
    Modelo.style.display='block';
    Modelolb.style.display='block';
}
else if(opcionSeleccionada === '5') /*seleccion de productos plasticos en el Dorpdown */
{   
  Categoria_Prod.value = 'Productos Plasticos';
  /*Habilitacion de inputs */
    Clasificacion.style.display='none';
    Talla.style.display='none';
    Modelo.style.display='none';

  /*Habilitacion de labels */
    Clasificacionlb.style.display='none';
    Tallalb.style.display='none';
    Modelolb.style.display='none';

  /*Habilitacion*/
    Dimensiones.style.display='block';
    Dimensioneslb.style.display='block';
    U_med.style.display='block';
    U_medlb.style.display='block';
}
else if(opcionSeleccionada === '0')
{
  Talla.style.display='none';
  Modelo.style.display='none';
  Clasificacion.style.display='none';
  U_med .style.display='none';
  Dimensiones.style.display='none';

  Tallalb.style.display='none';
  Modelolb.style.display='none';
  Clasificacionlb.style.display='none';
  U_medlb.style.display='none';
  Dimensioneslb.style.display='none';
}




document.getElementById('categoria').addEventListener('change',function()
{
    var opcionSeleccionada = this.value;
  
    if(opcionSeleccionada === '1') /*seleccion de Calzado en el Dropdown */
    {
      /*deshabilitacion de inputs */
      Clasificacion.style.display='none';
      U_med .style.display='none';
      Dimensiones.style.display='none';

      /*deshabilitacion de labels */
      Clasificacionlb.style.display='none';
      Dimensioneslb.style.display='none';
      U_medlb.style.display='none';

      /*Habilitacion*/
      Talla.style.display='block';
      Tallalb.style.display='block';
      Modelo.style.display='block';
      Modelolb.style.display='block';

      Categoria_Prod.value = 'Calzado';
    }
    else if(opcionSeleccionada === '2') /*seleccion de Prendas en el Dropdown */
    {
      Categoria_Prod.value = 'Prendas de Vestir';
      /*deshabilitacion de inputs */

        Clasificacion.style.display='none';
        U_med.style.display='none';
        Dimensiones.style.display='none';
        Modelo.style.display='none';

        /*deshabilitacion de labels */
        Clasificacionlb.style.display='none';
        U_medlb.style.display='none';
        Dimensioneslb.style.display='none';
        Modelolb.style.display='none';

        /*Habilitacion*/
        Talla.style.display='block';
        Tallalb.style.display='block';

    }
    else if (opcionSeleccionada === '3') /*seleccion de Cosmeticos en el Dropdown */
    {
      Categoria_Prod.value = 'Cosmeticos';
      /*deshabilitacion de inputs */
      U_med.style.display='none';
      Dimensiones.style.display='none';
      Modelo.style.display='none';
      Talla.style.display='none';

      /*deshabilitacion de labels */
      Tallalb.style.display='none';
      Dimensioneslb.style.display='none';
      U_medlb.style.display='none';
      Modelolb.style.display='none';

      /*Habilitacion*/
      Clasificacion.style.display='block';
      Clasificacionlb.style.display='block';

    }
    else if(opcionSeleccionada === '4') /*seleccion de Electrodomesticos en el Dropdown */
    {
      Categoria_Prod.value = 'Electrodomesticos';
      /*deshabilitacion de inputs */
        Clasificacion.style.display='none';
        U_med.style.display='none';
        Dimensiones.style.display='none';
        Talla.style.display='none';

        /*deshabilitacion de labels */
        Clasificacionlb.style.display='none';
        Dimensioneslb.style.display='none';
        U_medlb.style.display='none';
        Tallalb.style.display='none';

        /*Habilitacion*/
        Modelo.style.display='block';
        Modelolb.style.display='block';
    }
    else if(opcionSeleccionada === '5') /*seleccion de productos plasticos en el Dorpdown */
    {   
      Categoria_Prod.value = 'Productos Plasticos';
      /*Habilitacion de inputs */
        Clasificacion.style.display='none';
        Talla.style.display='none';
        Modelo.style.display='none';

      /*Habilitacion de labels */
        Clasificacionlb.style.display='none';
        Tallalb.style.display='none';
        Modelolb.style.display='none';

      /*Habilitacion*/
        Dimensiones.style.display='block';
        Dimensioneslb.style.display='block';
        U_med.style.display='block';
        U_medlb.style.display='block';
    }
    else if(opcionSeleccionada === '0')
    {
      Talla.style.display='none';
      Modelo.style.display='none';
      Clasificacion.style.display='none';
      U_med .style.display='none';
      Dimensiones.style.display='none';

      Tallalb.style.display='none';
      Modelolb.style.display='none';
      Clasificacionlb.style.display='none';
      U_medlb.style.display='none';
      Dimensioneslb.style.display='none';
    }
  });

/*   function MostrarForm1() {
    document.getElementById('formContado').style.display = 'block'; // Muestra el formulario de venta al contado
    document.getElementById('formCredito').style.display = 'none';  // Oculta el formulario de venta al crédito
}

function MostrarForm2() {
    document.getElementById('formCredito').style.display = 'block'; // Muestra el formulario de venta al crédito
    document.getElementById('formContado').style.display = 'none';  // Oculta el formulario de venta al contado
}

//NWEE


function mostrarTablaSegunCategoria1() {
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
 */

function confirmDelete(Categoria,id_prod,idcat) {
  Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará permanentemente el Producto. ¿Estás seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
  }).then((result) => {
      if (result.isConfirmed) {
          // Si el usuario confirma, redirecciona a la ruta de eliminar cliente
          window.location.href = '/DeleteProduct/' + Categoria+'/Producto/'+id_prod+'/Cat/'+idcat;
      }
  });
}
